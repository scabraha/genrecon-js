const esprima = require('esprima');
const fs = require('fs');

const FILE_NAME_REGEX = /(?:\.([^.]+))?$/;
const SHEBANG_REGEX = /^#!(.*\n)/;

export default function (filePaths = []) {
  return filePaths.reduce((parsedFiles, filePath) => {
    const fileType = FILE_NAME_REGEX.exec(filePath)[1];
    if (fileType !== 'js') {
      return parsedFiles;
    }

    // Read the file and remove the shebang (#!) if present
    const file = fs.readFileSync(filePath, 'utf8').replace(SHEBANG_REGEX, '');
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
