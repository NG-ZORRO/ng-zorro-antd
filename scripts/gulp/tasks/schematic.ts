/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { series, task } from 'gulp';

import { join } from 'path';

import { buildConfig } from '../../build-config';
import { copyResources } from '../../schematics/copy-resources';
import { generate as demo2schematics } from '../../schematics/demo2schematics';
import { setVersion } from '../../schematics/set-version';
import { cleanTask, execTask } from '../util/task-helpers';

const schematicsDir = join(buildConfig.projectDir, 'schematics');
const tsconfigFile = join(schematicsDir, 'tsconfig.json');
const cleanGlob = [join(schematicsDir, 'demo'), join(schematicsDir, 'utils/version-names.ts')];

/** Generate the schematics in the schematics directory */
task('generate:schematics', done => {
  demo2schematics();
  setVersion();
  done();
});

/** Build the schematics in the publish directory. */
task('tsc:schematics', execTask('tsc', ['-p', tsconfigFile]));

/** Copies all resources files to the publish directory. */
task('schematics:copy-resources', done => {
  copyResources();
  done();
});

/** Deletes the schematics/ directory and utils/(version-names).ts. files */
task('clean:schematics', cleanTask(cleanGlob));

/** Task that run the generate script and builds the schematics in the publish directory. */
task(
  'build:schematics',
  series('generate:schematics', 'tsc:schematics', 'schematics:copy-resources', 'clean:schematics')
);

/** Test the schematics */
task('test:schematics', execTask('jasmine', ['publish/schematics/**/*.spec.js']));

/** Test the ng-update schematics */
task('test:schematics-update', execTask('jasmine', ['publish/schematics/ng-update/**/*.spec.js']));
