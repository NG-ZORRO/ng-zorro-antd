/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { buildConfig } from '../../build-config';
import { compile as compileLess } from '../../build/compile-styles';
import { generateLessVars } from '../../build/generate-less-vars';
import { copyStylesToSrc } from '../../build/migration-styles';
import { execTask } from '../utils/task-helpers';
import { buildSchematics } from './schematics';

/** Run `ng build ng-zorro-antd-lib` */
async function buildNgZorro(): Promise<void> {
  await execTask('ng', ['build', 'ng-zorro-antd-lib']);
}

// Compile less to the public directory.
async function buildLess(): Promise<void> {
  await compileLess();
  copyStylesToSrc();
}

// Copies README.md file to the public directory.
async function copyResources(): Promise<void> {
  return execTask('cp', [
    '-r',
    `${buildConfig.projectDir}/README.md`,
    buildConfig.componentsDir,
    buildConfig.publishDir
  ]);
}

// Copies files without ngcc to lib folder.
async function copyLibrary(): Promise<void> {
  return execTask('cp', ['-r', `${buildConfig.publishDir}/*`, buildConfig.libDir]);
}

async function buildAll(): Promise<void> {
  await buildNgZorro();
  await buildLess();
  generateLessVars();
  await Promise.all([buildLess(), copyResources(), buildSchematics()]);
  await copyLibrary();
}

export const library = {
  build: buildAll
};
