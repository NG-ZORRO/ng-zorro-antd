import { dest, parallel, series, src, task } from 'gulp';
import { join } from 'path';
import { buildConfig } from '../../build-config';
import { compile as compileLess } from '../../build/compile-styles';
import { copyStylesToSrc } from '../../build/migration-styles';
import { execNodeTask } from '../util/task-helpers';

/** Run `ng build ng-zorro-antd-lib` */
task('library:build-zorro', execNodeTask(
  '@angular/cli',
  'ng',
  [ 'build', 'ng-zorro-antd-lib' ]
));

// Compile less to the public directory.
task('library:compile-less', done => {
  compileLess().then(() => {
    copyStylesToSrc();
    done();
  });
});

// Copies README.md file to the public directory.
task('library:copy-resources', () => {
  return src(join(buildConfig.projectDir, 'README.md'))
  .pipe(dest(join(buildConfig.publishDir)))
});

task('build:library', series(
  'library:build-zorro',
  parallel('library:compile-less', 'library:copy-resources', 'build:schematics')
));
