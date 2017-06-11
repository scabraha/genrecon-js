#!/usr/bin/env node
import generate from './commands/generate';
import parseFiles from './parsers';

const program = require('commander');


program.option('-w --overwrite', 'overwrite existing tests');
program.usage('<command> [options] <file> [otherFiles...]');

program
  .command('gen <file> [otherFiles...]')
  .description('Generate unit tests for the supplied files')
  .action((primaryFileName, otherFileNames) => {
    try {
      const fileNames = new Set([primaryFileName]);
      if (otherFileNames) {
        otherFileNames.forEach(fileName => files.add(fileName));
      }
      const parsedFiles = parseFiles(fileNames);
      generate(parsedFiles);
      process.exit(0);
    } catch (e) {
      console.error(e);
      process.exit(1);
    }
  });

program.parse(process.argv);

