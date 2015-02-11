#!/usr/bin/env iojs

'use strict';

const version = require('../package').version;
const debug = require('debug')('mosql:cli');
const program = require('commander');

program
  .version(version)
  .option('--pick', 'pick document properties')
  .option('--mo-db', 'mongodb database')
  .option('--pg-db', 'postgre database')
  .option('--doc', 'mongodb document')
  .option('--table', 'postgre table')
  .parse(process.argv);

debug('pick: %s; mo-db: %s; pg-db: %s; doc: %s; table: %s',
  program.pick, program.moDb, program.pgDb, program.doc, program.table);

program.on('--help', function() {
  console.info(global.usage);
  process.exit(0);
});
