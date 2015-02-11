'use strict';

const path = require('path');
const fs = require('fs');

module.exports = Tailer;

function Tailer(name) {
  if (!(this instanceof Tailer)) {
    return new Tailer(name);
  }

  this.name = name;
  this.syncing = false;
  this.filepath = '';

  // init
  // jshint ignore: start
  this.filepath = path.join(__dirname, `../data/${name}-tailer.json`);
  // jshint ignore: end

  try {
    this.data = require(this.filepath);
  } catch (e) {
    this.data = {};
    fs.writeFileSync(this.filepath, '{}');
  }
}

/**
 * @param {String} doc
 * @param {Number} id
 * @return {Promise}
 */
Tailer.prototype.set = function(doc, id) {
  this.data[doc] = id;
  return this.sync();
};

/**
 * @param {String} doc
 * @return {Number}
 */
Tailer.prototype.get = function(doc) {
  let data = this.data;
  return data && data[doc] || 0;
};

/**
 * @return {Promise}
 */
Tailer.prototype.clear = function() {
  this.data = {};
  return this.sync();
};

/**
 * sync
 */

Tailer.prototype.sync = function() {
  // TODO: this._promise.then...
  if (this.syncing) return this._promise;
  let self = this;

  this.syncing = true;
  this._promise = new Promise(function(resolve, reject) {
    fs.writeFile(self.filepath, JSON.stringify(self.data), function(error) {
      self.syncing = false;
      if (error) {
        reject(error);
      } else {
        resolve();
      }

    });
  });

  return this._promise;
};
