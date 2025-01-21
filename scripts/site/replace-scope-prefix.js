const fs = require('fs-extra');
const path = require('path');

const changelogPath = path.resolve(__dirname, `../../CHANGELOG.md`);

function replace(path) {
  const content = fs.readFileSync(path, 'utf8');
  const replaced = content
    .replace(/\*\*\w+:(?!\*\*)/g, '**')
    .replace(/\*\s\*\*\s/g, '* **');
  fs.writeFileSync(path, replaced);
}

replace(changelogPath);