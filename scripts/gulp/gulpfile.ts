// tslint:disable:no-import-side-effect
import { series, task } from 'gulp';
import './tasks/clean';
import './tasks/default';
import './tasks/schematic';
import './tasks/unit-test';
import './tasks/universal';

import './tasks/library';
import './tasks/site';

task('build:release', series(
  'clean',
  'build:library',
  'build:release-site'
));

task('build:preview', series(
  'clean',
  'init:site',
  'build:site-doc-es5'
));

task('start:dev', series(
  'clean',
  'start:site'
));

task('start-ivy:dev', series(
  'clean',
  'start-ivy:site'
));
