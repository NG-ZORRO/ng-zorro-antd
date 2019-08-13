import { series, task } from 'gulp';
import { join } from "path";
import { buildConfig } from '../../build-config';

import { copyResources } from '../../schematics/copy-resources';
import { generate as demo2schematics } from '../../schematics/demo2schematics';
import { setTheme } from '../../schematics/set-theme';
import { setVersion } from '../../schematics/set-version';
import { cleanTask, execNodeTask } from '../util/task-helpers';

const schematicsDir = join(buildConfig.projectDir, 'schematics');
const tsconfigFile = join(schematicsDir, 'tsconfig.json');
const cleanGlob = [
  join(schematicsDir, 'demo'),
  join(schematicsDir, 'utils/+(create-custom-theme|version-names).ts')
];

/** Generate the schematics in the schematics directory */
task('generate:schematics', done => {
  demo2schematics();
  setTheme();
  setVersion();
  done()
});

/** Build the schematics in the publish directory. */
task('tsc:schematics', execNodeTask(
  'typescript',
  'tsc',
  [ '-p', tsconfigFile ]
));

/** Copies all resources files to the publish directory. */
task('schematics:copy-resources', done => {
  copyResources();
  done();
});

/** Deletes the schematics/ directory and utils/(create-custom-theme|version-names).ts. files */
task('clean:schematics', cleanTask(cleanGlob));

/** Task that run the generate script and builds the schematics in the publish directory. */
task('build:schematics', series(
  'generate:schematics',
  'tsc:schematics',
  'schematics:copy-resources',
  'clean:schematics'
));

/** Test the schematics */
task('test:schematics', execNodeTask(
  'jasmine',
  'jasmine',
  [ 'publish/schematics/**/*.spec.js' ]
));
