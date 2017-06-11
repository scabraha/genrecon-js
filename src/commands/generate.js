import getMappingFunctions from '../extractors/MappingFunctionExtractors';
import getStateTree from '../extractors/StateTreeExtractor';

const ProgressBar = require('progress');

// Dammit what about derivation functions? ZOMG
function generateTestForSource(source) {
  const mappingFunctions = getMappingFunctions(source);
  const stateTree = getStateTree(mappingFunctions);
  console.dir(mappingFunctions);

  // Generate Tests here
  // create generator folder to do this ungodly task, prease?
}


export default function (files = []) {
  const opts = {
    width: 20,
    total: files.length,
    clear: true
  };
  const progressBar = new ProgressBar('generating [:bar] :percent :etas', opts);

  files.forEach((file) => {
    // Extract shit using source.body. IDGAF about the type or sourceType
    generateTestForSource(file.parsedFile.body);
    // Write file here
    progressBar.tick(1);
  });
}
