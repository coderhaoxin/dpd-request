'use strict';

const Channel = require('../lib/channel');
const assert = require('assert');

describe('## channel', function() {
  describe('# pipe', function() {
    let channel;

    it('init', function(done) {
      channel = new Channel({
        name: 'mosql',
        table: 'users',
        document: 'users',
        schema: ['username', 'password', 'info'],
        postgre: 'postgres://hx@localhost/mosql',
        mongodb: 'mongodb://localhost/mosql'
      });

      setTimeout(done, 1000);
    });

    it('pipe()', function() {
      return channel.pipe();
    });
  });
});
