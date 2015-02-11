'use strict';

const _ = require('lodash');

exports.getInsertSQL = getInsertSQL;
exports.pickData = pickData;

/**
 * @param {Object} origin
 * @param {object} schema
 */
function pickData(origin, schema) {
  if (Array.isArray(schema)) {
    return _.pick(origin, schema);
  } else if (typeof schema === 'object') {
    // todo: check schema
    let keys = Object.keys(schema);
    return _.pick(origin, keys);
  }
}

/**
 * @param {String} table
 * @param {Object} data
 */
// jshint ignore: start
function getInsertSQL(table, data) {
  let keys = Object.keys(data);

  let sql = `INSERT INTO ${table} (${keys.join(', ')}) VALUES (${
    keys.map(function(key) { return escape(data[key]); }).join(', ')
  })`;
  return sql;
}

function escape(v) {
  if (typeof v === 'object') {
    return '\'' + JSON.stringify(v) + '\'';
  }
  if (typeof v === 'string') {
    return '\'' + v + '\'';
  }
  if (v === undefined) {
    throw new TypeError('invalid value: undefined');
  }

  return String(v);
}
// jshint ignore: end
