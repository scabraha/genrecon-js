#!/usr/bin/env node
import generate from './commands/generate';
const program = require('commander');

function runCommand(command, args) {
  process.exit(command(...args) ? 0 : 1);
}

program.option('-w --overwrite', 'overwrite existing tests');
program.usage('<command> [options] <file> [otherFiles...]');

program
  .command('gen <file> [otherFiles...]')
  .description('Generate unit tests for the supplied files')
  .action((file, otherFiles) => 
    runCommand(generate, [program.overwrite, file, otherFiles])
  );

program.parse(process.argv);

