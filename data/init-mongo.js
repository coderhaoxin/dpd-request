'use strict';

const uri = 'mongodb://localhost/mosql';
const DB = require('mongodb-next');

module.exports = init;
if (!module.parent) {
  init(function(error) {
    if (error) {
      console.error(error);
      console.error(error.stack);
      process.exit(1);
    } else {
      process.exit();
    }
  });
}

const user = {
  username: 'haoxin',
  password: '123456',
  info: {
    address: 'China',
    age: 123,
    record: {
      point: 111
    }
  }
};

let users = [];
for (let i = 0; i < 100; i++) {
  users.push({
    username: user.username + i,
    password: user.password,
    info: {
      address: user.info.address,
      age: user.info.age + i,
      record: {
        point: user.info.record.point + i
      }
    }
  });
}

function init(done) {
  if (typeof done !== 'function') {
    done = function() {};
  }

  let db = DB(uri);
  db.connect.then(function() {
    let batch = db.collection('users').batch();
    for (let u of users) {
      batch.insert(u);
    }

    return batch;
  }).then(function(result) {
    console.log('OK: %s, inserted count: %d', result.isOk(), result.nInserted);
    done();
  }).catch(function(error) {
    done(error);
  });
}
