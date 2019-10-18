import * as fs from 'fs-extra';
import { parallel, series, task, watch } from 'gulp';
import { join } from 'path';
import { execNodeTask, execTask } from '../util/task-helpers';
const detectPort = require('detect-port');
import { buildConfig } from '../../build-config';

const siteGenerate = require('../../site/generate-site');
const colorGenerate = require('../../site/generateColorLess');

const docsGlob = join(buildConfig.componentsDir, `**/doc/*.+(md|txt)`);
const demoGlob = join(buildConfig.componentsDir, `**/demo/*.+(md|ts)`);
const issueHelperScriptFile = join(buildConfig.scriptsDir, 'release-helper.sh');
const tsconfigFile = join(buildConfig.projectDir, 'site/tsconfig.app.json');

/**
 * Development app watch task,
 * to ensures the demos and docs have changes are rebuild.
 */
task('watch:site', () => {
  watch([docsGlob, demoGlob], {delay: 700})
  .on('change', path =>  {
    const execArray = /components\/(.+)\/(doc|demo)/.exec(path);
    if (execArray && execArray[1]) {
      const component = execArray[1];
      console.log(`Reload '${component}'`);
      siteGenerate(component);
    }
  })
});

/** Parse demos and docs to site directory. */
task('init:site', done => {
  siteGenerate('init');
  colorGenerate().then(() => {
    done();
  });
});

/** Run `ng serve` */
task('serve:site', done => {
  detectPort(4200).then((port: number) => {
    execNodeTask(
      '@angular/cli',
      'ng',
      [ 'serve', '--port', port === 4200 ? '4200' : '0' ]
    )(done);
  });
});

/** Run `ng serve --configuration ivy` */
task('serve-ivy:site', done => {
  detectPort(4200).then((port: number) => {
    execNodeTask(
      '@angular/cli',
      'ng',
      [ 'serve', '--port', port === 4200 ? '4200' : '0', '--configuration=ivy' ]
    )(done);
  });
});

/** Run `ng build --prod --project=ng-zorro-antd-doc` */
task('build:site-doc', execNodeTask(
  '@angular/cli',
  'ng',
  [ 'build', '--project=ng-zorro-antd-doc', '--prod' ]
));

/** Run `ng build --prod --project=ng-zorro-antd-doc --configuration es5` */
task('build:site-doc-es5', execNodeTask(
  '@angular/cli',
  'ng',
  [ 'build', '--project=ng-zorro-antd-doc', '--prod', '--configuration=es5' ]
));

/** Run `ng build --prod --base-href ./ --project=ng-zorro-antd-iframe` */
task('build:site-iframe', execNodeTask(
  '@angular/cli',
  'ng',
  [ 'build', '--project=ng-zorro-antd-iframe', '--prod', '--base-href=./' ]
));

/** Replace the library paths to publish/ directory */
task('site:replace-path', () => {
  // tslint:disable-next-line:no-any
  const tsconfig: any = fs.readJSONSync(tsconfigFile);
  tsconfig.compilerOptions.paths['ng-zorro-antd'] = ['../publish'];
  tsconfig.compilerOptions.paths['ng-zorro-antd/*'] = ['../publish/*'];
  return fs.writeJSON(tsconfigFile, tsconfig);
});

/** Run release-helper.sh
 * Clone issue-helper builds from github and copy to the output directory.
 */
task('build:site-issue-helper', execTask(
  'bash',
  [issueHelperScriptFile]
));

/** Build all site projects to the output directory. */
task('build:site', series(
  process.env.CI ? 'build:site-doc-es5' : 'build:site-doc',
  'build:site-iframe',
  'build:site-issue-helper'
));

/** Init site directory, and start watch and ng-serve */
task('start:site', series(
  'init:site',
  parallel('watch:site', 'serve:site')
));

/** Init site directory, and start watch and ng-serve */
task('start-ivy:site', series(
  'init:site',
  parallel('watch:site', 'serve-ivy:site')
));

/** Task that use source code to build ng-zorro-antd-doc project,
 * output not included issue-helper/iframe and prerender.
 */
task('build:simple-site', series(
  'init:site',
  'build:site-doc'
));

/** Task that use publish code to build ng-zorro-antd-doc project,
 * output included issue-helper/iframe and prerender.
 */
task('build:release-site', series(
  'init:site',
  'site:replace-path',
  'build:site',
  'prerender'
));
