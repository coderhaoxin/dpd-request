'use strict';

const tailer = require('../lib/tailer')('test');
const assert = require('assert');
const path = require('path');
const fs = require('fs');

describe('## tailer', function() {
  it('set()', function() {
    return tailer.set('user', '54dc5723acece4a784668c8c').then(function() {
      assert.strictEqual(getFileData().user, '54dc5723acece4a784668c8c');
    });
  });

  it('get()', function() {
    assert.strictEqual(tailer.get('user'), '54dc5723acece4a784668c8c');
  });

  it('clear()', function() {
    return tailer.clear().then(function() {
      assert.strictEqual(tailer.get('user'), 0);
    });
  });
});

function getFileData() {
  let filepath = path.join(__dirname, '../data/test-tailer.json');
  return JSON.parse(fs.readFileSync(filepath));
}
