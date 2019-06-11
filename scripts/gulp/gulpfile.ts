// tslint:disable:no-import-side-effect
import { series, task } from 'gulp';
import './tasks/clean';
import './tasks/default';
import './tasks/schematic';
import './tasks/universal';

import './tasks/library';
import './tasks/site';

task('build:release', series(
  'build:library',
  'build:release-site'
));
