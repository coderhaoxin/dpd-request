'use strict';

module.exports = Schema;

function Schema() {

}

/**
 * @param {Object} schema
 */
Schema.prototype.define = function(schema) {};

/**
 * @param {Object} doc
 * @return {String} sql
 */
Schema.prototype.translate = function(doc) {};
