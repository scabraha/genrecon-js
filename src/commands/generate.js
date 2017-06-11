const ProgressBar = require('progress');

function generateTestForFile(file) {
  // Generate Tests here
}


export default function (files = []) {
  const opts = {
    width: 20,
    total: files.length,
    clear: true,
  };
  const progressBar = new ProgressBar('generating [:bar] :percent :etas', opts);

  files.forEach((file) => {
    // Extract shit using source.body. IDGAF about the type or sourceType
    generateTestForFile(file.body);
    // Write file here
    progressBar.tick(1);
  });
}
