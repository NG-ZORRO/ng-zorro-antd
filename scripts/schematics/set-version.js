const fs = require('fs-extra');
const path = require('path');

const packageJson = fs.readJsonSync(path.resolve(__dirname, `../../components/package.json`));
fs.outputFileSync(
  path.resolve(__dirname, `../../schematics/utils/version-names.ts`),
  `
export const zorroVersion = '^${packageJson.version}';
export const hammerjsVersion = '^2.0.8';
`
);
