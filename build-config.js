const { readFileSync } = require('fs');
const { resolve } = require('path');
const os = require('os');

const { join } = require('path');

const packageJson = require(`${__dirname}/components/package.json`);
const buildVersion = packageJson.version;
const ROUTES = readFileSync(resolve(__dirname, 'route-paths.txt')).toString().split(os.EOL);

module.exports = {
  projectVersion: buildVersion,
  projectDir: __dirname,
  componentsDir: join(__dirname, 'components'),
  scriptsDir: join(__dirname, 'scripts'),
  outputDir: join(__dirname, 'dist'),
  publishDir: join(__dirname, 'publish'),
  libDir: join(__dirname, 'lib'),
  routers: ROUTES
};
