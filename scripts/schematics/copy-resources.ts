/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import * as fs from 'fs-extra';

import * as path from 'path';


import { buildConfig } from '../build-config';

const srcPath = path.join(buildConfig.projectDir, `schematics`);
const targetPath = path.join(buildConfig.publishDir, `schematics`);
const copyFilter = (p: string): boolean => (/files(\/|\\)__path__/.test(p) || !/.+\.ts/.test(p) || /.template$/.test(p));

function mergeDemoCollection(): void {
  const demoCollectionPath = path.resolve(targetPath, `demo/collection.json`);
  const targetCollectionPath = path.resolve(targetPath, `collection.json`);
  const demoCollectionJson = fs.readJsonSync(demoCollectionPath, { throws: false }) || {schematics: {}};
  const targetCollectionJson = fs.readJsonSync(targetCollectionPath, { throws: false }) || {schematics: {}};
  targetCollectionJson.schematics = {
    ...targetCollectionJson.schematics,
    ...demoCollectionJson.schematics
    };
  fs.outputJsonSync(targetCollectionPath, targetCollectionJson);
  fs.removeSync(demoCollectionPath);
}

export function copyResources(): void {
  fs.copySync(srcPath, targetPath, { filter: copyFilter });
  mergeDemoCollection();
}
