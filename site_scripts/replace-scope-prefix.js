const fs = require('fs-extra');
const path = require('path');

const changelogPath = path.resolve(__dirname, `../CHANGELOG.md`);

async function replace(path) {
  const content = await fs.readFile(path, 'utf8');
  const replaced = content
    .replace(/\*\*\w+:(?!\*\*)/g, '**')
    .replace(/\*\s\*\*\s/g, '* **');
  await fs.outputFile(path, replaced);
}

replace(changelogPath);