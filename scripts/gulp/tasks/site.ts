/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import * as fs from 'fs-extra';
import { parallel, series, task, watch } from 'gulp';
import { debounce } from 'lodash';

import { join } from 'path';

import { buildConfig } from '../../build-config';
import { execNodeTask, execTask } from '../util/task-helpers';

const detectPort = require('detect-port');

const siteGenerate = require('../../site/generate-site');
const themeGenerate = require('../../site/generate-theme');
const colorGenerate = require('../../site/generateColorLess');

const docsGlob = join(buildConfig.componentsDir, `**/doc/*.+(md|txt)`);
const demoGlob = join(buildConfig.componentsDir, `**/demo/*.+(md|ts)`);
const issueHelperScriptFile = join(buildConfig.scriptsDir, 'release-helper.sh');
const tsconfigFile = join(buildConfig.projectDir, 'site/tsconfig.app.json');

const CI = process.env.CI;

/**
 * Development app watch task,
 * to ensures the demos and docs have changes are rebuild.
 */
task('watch:site', () => {
  // Globs accepts the Unix-style path separators only
  const globs = [docsGlob, demoGlob].map(p => p.replace(/\\/g, '/'));
  watch(globs).on(
    'change',
    debounce(path => {
      const p = path.replace(/\\/g, '/');
      const execArray = /components\/(.+)\/(doc|demo)/.exec(p);
      if (execArray && execArray[1]) {
        const component = execArray[1];
        console.log(`Reload '${component}'`);
        siteGenerate(component);
      }
    }, 3000)
  );
});

/** Parse demos and docs to site directory. */
task('init:site', done => {
  siteGenerate('init');
  colorGenerate().then(themeGenerate).then(done);
});

/** Run `ng serve` */
task('serve:site', done => {
  detectPort(4200).then((port: number) => {
    execNodeTask('@angular/cli', 'ng', [
      'serve',
      '--port',
      port === 4200 ? '4200' : '0',
      '--project=ng-zorro-antd-doc'
    ])(done);
  });
});

/** Run `ng build --prod --project=ng-zorro-antd-doc` */
task(
  'build:site-doc',
  execNodeTask(
    '@angular/cli',
    'ng',
    CI
      ? ['build', '--project=ng-zorro-antd-doc', '--configuration', 'production,pre-production']
      : ['build', '--project=ng-zorro-antd-doc', '--configuration', 'production']
  )
);

/** Run `ng build --prod --project=ng-zorro-antd-doc --configuration es5` */
task(
  'build:site-doc-es5',
  execNodeTask('@angular/cli', 'ng', ['build', '--project=ng-zorro-antd-doc', '--configuration', 'production,es5'])
);

/** Run `ng build --prod --base-href ./ --project=ng-zorro-antd-iframe` */
task(
  'build:site-iframe',
  execNodeTask('@angular/cli', 'ng', [
    'build',
    '--project=ng-zorro-antd-iframe',
    '--configuration',
    'production',
    '--base-href=./'
  ])
);

/** Replace the library paths to publish/ directory */
task('site:replace-path', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tsconfig: any = fs.readJSONSync(tsconfigFile);
  tsconfig.compilerOptions.paths['ng-zorro-antd'] = ['../publish'];
  tsconfig.compilerOptions.paths['ng-zorro-antd/*'] = ['../publish/*'];
  return fs.writeJSON(tsconfigFile, tsconfig);
});

/** Run release-helper.sh
 * Clone issue-helper builds from github and copy to the output directory.
 */
task('build:site-issue-helper', execTask('bash', [issueHelperScriptFile]));

/** Build all site projects to the output directory. */
task('build:site', series('prerender', 'build:site-iframe', 'build:site-issue-helper'));

/** Init site directory, and start watch and ng-serve */
task('start:site', series('init:site', parallel('watch:site', 'serve:site')));

/** Task that use source code to build ng-zorro-antd-doc project,
 * output not included issue-helper/iframe and prerender.
 */
task('build:simple-site', series('init:site', 'build:site-doc'));

/** Task that use publish code to build ng-zorro-antd-doc project,
 * output included issue-helper/iframe and prerender.
 */
task('build:release-site', series('init:site', 'site:replace-path', 'build:site'));
