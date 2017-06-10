#!/usr/bin/env node

const program = require('commander');

function main(file) {
  console.log('File: %s Overwrite(Y/N): %s', file, program.overwrite);
}

program.arguments('<file>');
program.option('-w --overwrite', 'overwrite existing tests');

program.action(main);

program.parse(process.argv);

