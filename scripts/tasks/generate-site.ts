/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { readJSONSync, writeJSONSync } from 'fs-extra';

import { join } from 'path';

import { buildConfig } from '../build-config';
import { generateLLms } from '../generate-llms';
import siteGenerate from '../site/generate-site';
import themeGenerate from '../site/generate-theme';

const release = process.argv.includes('--release');
const tsconfigFile = join(buildConfig.projectDir, 'site/tsconfig.app.json');

/** Replace the library paths to publish/ directory, so the site is built against the packaged library. */
function replaceLibraryPaths(): void {
  const tsconfig = readJSONSync(tsconfigFile);
  tsconfig.compilerOptions.paths['ng-zorro-antd'] = ['../publish'];
  tsconfig.compilerOptions.paths['ng-zorro-antd/*'] = ['../publish/*'];
  writeJSONSync(tsconfigFile, tsconfig, { spaces: 2 });
}

/** Parse demos and docs to the site directory (gulp `init:site`), plus release-only steps. */
async function main(): Promise<void> {
  siteGenerate('init');
  await themeGenerate();

  if (release) {
    replaceLibraryPaths();
    await generateLLms();
  }
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
