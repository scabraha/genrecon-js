const esprima = require('esprima');
const fs = require('fs');

const FILE_NAME_REGEX = /(?:\.([^.]+))?$/;

export default function (filePaths = []) {
  return filePaths.reduce((parsedFiles, filePath) => {
    const fileType = FILE_NAME_REGEX.exec(filePath)[1];
    if (fileType !== 'js') {
      return parsedFiles;
    }
    const file = fs.readFileSync(filePath, 'utf8');
    let parsedFile;
    try {
      parsedFile = esprima.parse(file, { sourceType: 'script' });
    } catch (e) {
      parsedFile = esprima.parse(file, { sourceType: 'module' });
    }
    parsedFiles.push({ filePath, parsedFile });
    return parsedFiles;
  }, []);
}
