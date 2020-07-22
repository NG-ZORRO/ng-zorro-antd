import { dest, parallel, series, src, task } from 'gulp';
import { join } from 'path';
import { buildConfig } from '../../build-config';
import { compile as compileLess } from '../../build/compile-styles';
import { generateLessVars } from '../../build/generate-less-vars';
import { copyStylesToSrc } from '../../build/migration-styles';
import { execNodeTask } from '../util/task-helpers';

/** Run `ng build ng-zorro-antd-lib --prod` */
task('library:build-zorro', execNodeTask('@angular/cli', 'ng', ['build', 'ng-zorro-antd-lib', '--prod']));

/** Run `ng build ng-zorro-antd-lib` */
task('library:ivy-prebuild', execNodeTask('@angular/cli', 'ng', ['build', 'ng-zorro-antd-lib']));

// Compile less to the public directory.
task('library:compile-less', done => {
  compileLess().then(() => {
    copyStylesToSrc();
    done();
  });
});

// Compile less to the public directory.
task('library:generate-less-vars', done => {
  generateLessVars();
  done();
});

// Copies README.md file to the public directory.
task('library:copy-resources', () => {
  return src([join(buildConfig.projectDir, 'README.md'), join(buildConfig.componentsDir)]).pipe(dest(join(buildConfig.publishDir)));
});

// Copies files without ngcc to lib folder.
task('library:copy-libs', () => {
  return src([join(buildConfig.publishDir, '**/*')]).pipe(dest(join(buildConfig.libDir)));
});

task(
  'build:library',
  series(
    'library:build-zorro',
    parallel('library:compile-less', 'library:copy-resources', 'library:generate-less-vars', 'build:schematics'),
    'library:copy-libs'
  )
);
