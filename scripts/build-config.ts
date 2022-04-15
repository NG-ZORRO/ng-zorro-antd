/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { existsSync } from 'fs';
import { dirname, join, resolve } from 'path';

export interface BuildConfig {
  projectVersion: string;
  projectDir: string;
  componentsDir: string;
  scriptsDir: string;
  outputDir: string;
  publishDir: string;
  libDir: string;
}

const BUILD_CONFIG_FILENAME = 'build-config.js';

export function findBuildConfig(): string {
  let currentDir = process.cwd();

  while (!existsSync(resolve(currentDir, BUILD_CONFIG_FILENAME))) {
    currentDir = dirname(currentDir);
  }

  return join(currentDir, BUILD_CONFIG_FILENAME);
}

const buildConfigPath = findBuildConfig();

export const buildConfig = require(buildConfigPath) as BuildConfig;
