#!/usr/bin/env node
import generate from './commands/generate';
import parseFiles from './parsers';

const program = require('commander');


program.option('-w --overwrite', 'overwrite existing tests');
program.usage('<command> [options] <file> [otherFiles...]');

program
  .command('gen <file> [otherFiles...]')
  .description('Generate unit tests for the supplied files')
  .action((file, otherFiles) => {
    try {
      const files = [file];
      if (otherFiles) {
        otherFiles.forEach(f => files.push(f));
      }
      const parsedFiles = parseFiles(files);
      generate(parsedFiles);
      process.exit(0);
    } catch (e) {
      console.error(e);
      process.exit(1);
    }
  });

program.parse(process.argv);

