/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import * as child_process from 'child_process';
import { resolve } from 'path';
import { readFile, readJSON, writeFile, writeJSON } from 'fs-extra';
import { sync as glob } from 'glob';
import { buildConfig } from '../build-config';
import { minifyFile } from './minify';

type Local = 'en' | 'zh';

const distFiles: {
  [key: string]: string[];
} = {
  html: ['index.html', 'docs/**/index.html', 'experimental/**/index.html', 'components/**/index.html'],
  js: ['ngsw-worker.js', 'worker-basic.min.js', 'safety-worker.js'],
  json: ['manifest.json']
};

async function minifyFiles(): Promise<void> {
  for (const type of Object.keys(distFiles)) {
    const paths: string[] = distFiles[type]
      .map(pattern => glob(pattern, { cwd: buildConfig.outputDir }))
      .reduce((a, b) => [...a, ...b], []);
    for (const contentPath of paths) {
      await minifyFile(resolve(buildConfig.outputDir, contentPath), type);
    }
  }
}

async function runNGSWConfig(): Promise<void> {
  return new Promise((res, reject) => {
    const childProcess = child_process.spawn('node_modules/.bin/ngsw-config', ['dist', 'ngsw-config.json'], {
      env: { ...process.env },
      cwd: buildConfig.projectDir,
      stdio: ['pipe', 'ignore', 'ignore']
    });
    childProcess.on('close', (code: number) => {
      code !== 0 ? reject(`Process failed with code ${code}`) : res();
    });
  });
}

async function setLocalizedIndex(local: Local): Promise<void> {
  const content = await readFile(resolve(buildConfig.outputDir, 'docs/introduce', local, 'index.html'));
  await writeFile(resolve(buildConfig.outputDir, 'index.html'), content);
}

async function saveAsNGSWConfig(local: Local): Promise<void> {
  const config = await readJSON(resolve(buildConfig.outputDir, 'ngsw.json'));
  config.local = local;
  await writeJSON(resolve(buildConfig.outputDir, `ngsw.${local}.json`), config);
}

async function rewriteConfig(local: Local): Promise<void> {
  await setLocalizedIndex(local);
  await runNGSWConfig();
  await saveAsNGSWConfig(local);
}

export const generate = async (): Promise<void> => {
  await minifyFiles();
  await rewriteConfig('zh');
  await rewriteConfig('en');
};
