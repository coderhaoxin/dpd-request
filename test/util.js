'use strict';

const util = require('../lib/util');
const assert = require('assert');

const getInsertSQL = util.getInsertSQL;
const pickData = util.pickData;

describe('## util', function() {
  describe('# pickData', function() {
    it('should success', function() {
      let result = pickData({
        username: 'haoxin',
        password: '123456',
        info: {
          address: 'hello'
        },
        point: 123456
      }, ['username', 'password', 'info']);

      assert.deepEqual(result, {
        username: 'haoxin',
        password: '123456',
        info: {
          address: 'hello'
        }
      });
    });
  });

  describe('# getInsertSQL', function() {
    it('should success', function() {
      let sql = getInsertSQL('user', {
        name: 'haoxin',
        age: 123,
        desc: {
          title: 'hello',
          content: 'world'
        }
      });

      assert.equal(sql, `INSERT INTO user (name, age, desc) VALUES ('haoxin', 123, '{"title":"hello","content":"world"}')`);
    });

    it('should throw error', function() {
      let catched = false;

      try {
        getInsertSQL('user', {
          name: undefined
        });
      } catch (e) {
        assert.equal(e.message, 'invalid value: undefined');
        catched = true;
      }

      assert(catched === true);
    });
  });
});
