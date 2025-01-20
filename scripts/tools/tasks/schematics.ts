/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { join } from 'path';

import { buildConfig } from '../../build-config';
import { copyResources } from '../../schematics/copy-resources';
import { generate as demo2schematics } from '../../schematics/demo2schematics';
import { setVersion } from '../../schematics/set-version';
import { cleanTask, execTask } from '../utils/task-helpers';

const schematicsDir = join(buildConfig.projectDir, 'schematics');
const tsconfigFile = join(schematicsDir, 'tsconfig.json');
const cleanGlob = [join(schematicsDir, 'demo'), join(schematicsDir, 'utils/version-names.ts')];
const specGlob = join(buildConfig.publishDir, 'schematics/**/*.spec.js');

/** Generate the schematics in the schematics directory */
function generateSchematics(): void {
  demo2schematics();
  setVersion();
}

/** Build the schematics in the ./publish directory. */
async function compileSchematics(): Promise<void> {
  return execTask('tsc', ['-p', tsconfigFile]);
}

/** Task that run the generate script and builds the schematics in the ./publish directory. */
export async function buildSchematics(): Promise<void> {
  generateSchematics();
  await compileSchematics();
  /** Copies all resources files to the ./publish directory. */
  copyResources();
  /** Deletes the schematics/ directory and utils/(version-names).ts. files */
  await cleanTask(cleanGlob);
}

/** Test the schematics */
export async function testSchematics(): Promise<void> {
  return execTask('npx', ['jasmine', specGlob]);
}
