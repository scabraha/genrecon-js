import parse from '../../src/parsers';

const esprima = require('esprima');
const fs = require('fs');

describe('Parser Tests', () => {
  it('supplies no file names and ensures correct return', () => {
    expect(parse()).toEqual([]);
  });

  it('supplies file names and ensures scripts are parsed', () => {
    const fileNames = ['example.txt', 'readme.md', 'script.js'];
    spyOn(fs, 'readFileSync').and.returnValue('file data');
    spyOn(esprima, 'parse').and.returnValue('parsed data');

    const parsedFiles = parse(fileNames);
    expect(parsedFiles).toEqual([{
      filePath: 'script.js',
      parsedFile: 'parsed data',
    }]);
    expect(fs.readFileSync).not.toHaveBeenCalledWith('example.txt', 'utf8');
    expect(fs.readFileSync).not.toHaveBeenCalledWith('readme.md', 'utf8');
    expect(fs.readFileSync).toHaveBeenCalledWith('script.js', 'utf8');
    expect(esprima.parse).toHaveBeenCalledWith('file data', { sourceType: 'script' });
  });

  it('supplies file names and ensures modules are parsed', () => {
    const fileNames = ['example.txt', 'readme.md', 'script.js'];
    spyOn(fs, 'readFileSync').and.returnValue('file data');
    spyOn(esprima, 'parse').and.callFake((path, options) => {
      if (options.sourceType === 'script') {
        throw new Error();
      }
      return 'parsed data';
    });

    const parsedFiles = parse(fileNames);
    expect(parsedFiles).toEqual([{
      filePath: 'script.js',
      parsedFile: 'parsed data',
    }]);
    expect(fs.readFileSync).not.toHaveBeenCalledWith('example.txt', 'utf8');
    expect(fs.readFileSync).not.toHaveBeenCalledWith('readme.md', 'utf8');
    expect(fs.readFileSync).toHaveBeenCalledWith('script.js', 'utf8');
    expect(esprima.parse).toHaveBeenCalledWith('file data', { sourceType: 'script' });
    expect(esprima.parse).toHaveBeenCalledWith('file data', { sourceType: 'module' });
  });

  it('supplies file names with a shebang ensures files are parsed', () => {
    const fileNames = ['example.txt', 'readme.md', 'script.js'];
    spyOn(fs, 'readFileSync').and.returnValue('#!/usr/bin/env node \nfile data');
    spyOn(esprima, 'parse').and.returnValue('parsed data');

    const parsedFiles = parse(fileNames);
    expect(parsedFiles).toEqual([{
      filePath: 'script.js',
      parsedFile: 'parsed data',
    }]);
    expect(fs.readFileSync).not.toHaveBeenCalledWith('example.txt', 'utf8');
    expect(fs.readFileSync).not.toHaveBeenCalledWith('readme.md', 'utf8');
    expect(fs.readFileSync).toHaveBeenCalledWith('script.js', 'utf8');
    expect(esprima.parse).toHaveBeenCalledWith('file data', { sourceType: 'script' });
  });
});
