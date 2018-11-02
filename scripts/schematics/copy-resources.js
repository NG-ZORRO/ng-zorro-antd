const fs = require('fs-extra');
const path = require('path');

const srcPath = path.resolve(__dirname, `../../schematics`);
const targetPath = path.resolve(__dirname, `../../publish/schematics`);
const copyFilter = (path) => (!/.+\.ts/.test(path)) || (/files\/__path__/.test(path));


function mergeDemoCollection() {
  const demoCollectionPath = path.resolve(targetPath, `demo/collection.json`);
  const targetCollectionPath = path.resolve(targetPath, `collection.json`);
  const demoCollectionJson = fs.readJsonSync(demoCollectionPath, { throws: false }) || {schematics: {}};
  const targetCollectionJson = fs.readJsonSync(targetCollectionPath, { throws: false }) || {schematics: {}};
  targetCollectionJson.schematics = Object.assign(targetCollectionJson.schematics, {
    ...demoCollectionJson.schematics
  });
  fs.outputJsonSync(targetCollectionPath, targetCollectionJson);
  fs.removeSync(demoCollectionPath)
}

fs.copySync(srcPath, targetPath, { filter: copyFilter });
mergeDemoCollection();