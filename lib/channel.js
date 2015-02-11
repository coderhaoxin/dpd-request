'use strict';

const debug = require('debug')('mosql:channel');
const DB = require('mongodb-next');
const Tailer = require('./tailer');
const assert = require('assert');
const util = require('./util');
const pg = require('pg-then');
const _ = require('lodash');

const getSQL = util.getInsertSQL;

module.exports = Channel;

function Channel(options) {
  if (!(this instanceof Channel)) {
    return new Channel(options);
  }

  assert(typeof options === 'object', 'invalid options');
  // todo: check `table`, `document`, `schema`
  let self = this;
  this.name = options.name || 'mosql';
  this.table = options.table;
  this.document = options.document;
  this.schema = options.schema;
  this.tailer = new Tailer(this.name);

  // db
  assert(typeof options.postgre === 'string', 'postgre required');
  assert(typeof options.mongodb === 'string', 'mongodb required');
  // postgre
  this.postgre = pg.Pool(options.postgre);
  // mongodb
  this.mongodb = DB(options.mongodb);
  this.mongodb.connect.then(function() {
    self.collection = self.mongodb.collection(self.document);
  }).catch(function(error) {
    throw error;
  });
}

/**
 * @param {Object} doc
 * @return {String} sql
 */
Channel.prototype.translate = function(doc) {
  let schema = this.schema;
  let table = this.table;

  let data = util.pickData(doc, schema);

  return getSQL(table, data);
};

/**
 * @return {Promise}
 */
Channel.prototype.pipe = function() {
  let self = this;

  return new Promise(function(resolve, reject) {
    self.exec(resolve, reject);
  });
};

Channel.prototype.exec = function(resolve, reject) {
  let cursor = this.tailer.get(this.document);
  let self = this;
  let doc;

  debug('cursor: %d', cursor);

  this.collection.findOne().skip(cursor).then(function(data) {
    doc = data;
    return self.tailer.set(self.document, cursor + 1);
  }).then(function() {
    handler.call(self, doc, resolve, reject);
  }).catch(function(error) {
    onerror.call(self, error, reject);
  });
}

function handler(doc, resolve, reject) {
  if (!doc) return resolve();

  let self = this;
  let sql = this.translate(doc);

  debug('document: %j \nSQL: %s', doc, sql);

  this.postgre.query(sql).then(function(result) {
    self.exec(resolve, reject);
  }).catch(function(error) {
    onerror.call(self, error, reject);
  });
}

function onerror(error, reject) {
  console.error(error);
  reject(error);
}
