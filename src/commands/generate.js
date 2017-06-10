export default function generate(file, otherFiles) {
  console.dir(otherFiles)
  if (!file) {
    console.error('Please provide a valid file name');
    return false;
  }
  const files = [file];
  if (otherFiles) {
    otherFiles.forEach(file => files.push(file));
  }
  // Generate Tests here
  console.log('File: %s Overwrite(Y/N): %s', files, overwrite);
  return true;
}
