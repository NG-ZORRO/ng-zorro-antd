/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { detect as detectPort } from 'detect-port';
import fs from 'fs-extra';
import watch from 'glob-watcher';
import { debounce } from 'lodash';

import { join } from 'path';

import { buildConfig } from '../../build-config';
import { generate } from '../../prerender/ngsw-config';
import { generateSitemap } from '../../prerender/sitemap';
import { execTask, setEnv } from '../utils/task-helpers';

const siteGenerate = require('../../site/generate-site');
const themeGenerate = require('../../site/generate-theme');

const docsGlob = join(buildConfig.componentsDir, `**/doc/*.+(md|txt)`);
const demoGlob = join(buildConfig.componentsDir, `**/demo/*.+(md|ts)`);
const issueHelperScriptFile = join(buildConfig.scriptsDir, 'release-helper.sh');
const tsconfigFile = join(buildConfig.projectDir, 'site/tsconfig.app.json');

async function watchSite(): Promise<void> {
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
}

/** Parse demos and docs to site directory. */
async function initSite(): Promise<void> {
  siteGenerate('init');
  return themeGenerate();
}

/** Run `ng serve` */
async function serveSite(): Promise<void> {
  detectPort(4200).then((port: number) => {
    execTask('ng', ['serve', '--port', port === 4200 ? '4200' : '0', '--project=ng-zorro-antd-doc']);
  });
}

type SiteBuildConfiguration = 'production' | 'preview';

/** Run `ng build ng-zorro-antd-doc` */
async function buildSite(configuration: SiteBuildConfiguration = 'production'): Promise<void> {
  return execTask('ng', ['build', 'ng-zorro-antd-doc', `--configuration=${configuration}`]);
}

/** Run `ng build ng-zorro-antd-iframe --base-href=./ --configuration=production --delete-output-path=false` */
async function buildSiteIframe(): Promise<void> {
  return execTask('ng', [
    'build',
    'ng-zorro-antd-iframe',
    '--base-href=./',
    '--configuration=production',
    '--delete-output-path=false'
  ]);
}

/** Replace the library paths to publish/ directory */
async function replaceLibraryPaths(): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tsconfig: any = fs.readJSONSync(tsconfigFile);
  tsconfig.compilerOptions.paths['ng-zorro-antd'] = ['../publish'];
  tsconfig.compilerOptions.paths['ng-zorro-antd/*'] = ['../publish/*'];
  return fs.writeJSON(tsconfigFile, tsconfig);
}

/**
 * Run release-helper.sh
 * Clone issue-helper builds from GitHub and copy to the output directory.
 */
async function buildSiteIssueHelper(): Promise<void> {
  return execTask('bash', [issueHelperScriptFile]);
}

/** Build all site projects to the output directory. */
async function buildSiteAll(): Promise<void> {
  await initSite();
  await replaceLibraryPaths();
  await buildSite();
  generateSitemap();
  await generate();
  await Promise.all([buildSiteIframe(), buildSiteIssueHelper()]);
}

/** Init site directory, and start watch and ng-serve */
async function startSite(): Promise<void> {
  await setEnv('NODE_ENV', 'development');
  await initSite();
  watchSite().then();
  serveSite().then();
}

async function previewSite(): Promise<void> {
  await initSite();
  await buildSite('preview');
}

export const site = {
  start: startSite,
  build: buildSiteAll,
  preview: previewSite
};
