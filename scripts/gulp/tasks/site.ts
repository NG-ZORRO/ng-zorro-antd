/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { detect } from 'detect-port';
import * as fs from 'fs-extra';
import { parallel, series, task, watch } from 'gulp';
import { debounce } from 'lodash';

import { join } from 'path';

import { buildConfig } from '../../build-config';
import { generateLLms } from '../../generate-llms';
import { generate } from '../../prerender/ngsw-config';
import { generateSitemap } from '../../prerender/sitemap';
import { execNodeTask, execTask } from '../util/task-helpers';

const siteGenerate = require('../../site/generate-site');
const themeGenerate = require('../../site/generate-theme');

const docsGlob = join(buildConfig.componentsDir, `**/doc/*.+(md|txt)`);
const demoGlob = join(buildConfig.componentsDir, `**/demo/*.+(md|ts)`);
const issueHelperScriptFile = join(buildConfig.scriptsDir, 'release-helper.sh');
const tsconfigFile = join(buildConfig.projectDir, 'site/tsconfig.app.json');

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
task('init:site', async done => {
  siteGenerate('init');
  await themeGenerate();
  done();
});

/** Run `ng serve` */
task('serve:site', async done => {
  const port = await detect(4200);
  execNodeTask('@angular/cli', 'ng', ['serve', 'ng-zorro-antd-doc', '--port', port === 4200 ? '4200' : '0'])(done);
});

/** Run `ng build ng-zorro-antd-doc --configuration=production` */
task(
  'build:site-doc',
  execNodeTask('@angular/cli', 'ng', ['build', 'ng-zorro-antd-doc', '--configuration=production'])
);

/** Generate llms.txt and llms-full.txt */
task('site:llms-txt', generateLLms);

/** Replace the library paths to publish/ directory */
task('site:replace-path', () => {
  const tsconfig = fs.readJSONSync(tsconfigFile);
  tsconfig.compilerOptions.paths['ng-zorro-antd'] = ['../publish'];
  tsconfig.compilerOptions.paths['ng-zorro-antd/*'] = ['../publish/*'];
  return fs.writeJSON(tsconfigFile, tsconfig);
});

/** Run sitemap script on the output directory, to create sitemap.xml */
task('site:sitemap', generateSitemap);

/** Regenerate the ngsw-config to fix https://github.com/angular/angular/issues/23613 */
task('site:regen-ngsw-config', generate);

/** Run release-helper.sh
 * Clone issue-helper builds from GitHub and copy to the output directory.
 */
task('build:site-issue-helper', execTask('bash', [issueHelperScriptFile]));

/** Build all site projects to the output directory. */
task(
  'build:site',
  series('build:site-doc', parallel('site:sitemap', 'site:regen-ngsw-config', 'build:site-issue-helper'))
);

/** Init site directory, and start watch and ng-serve */
task('start:site', series('init:site', parallel('watch:site', 'serve:site')));

/** Task that use publish code to build ng-zorro-antd-doc project,
 * output included issue-helper and prerender.
 */
task('build:release-site', series('init:site', 'site:replace-path', 'site:llms-txt', 'build:site'));
