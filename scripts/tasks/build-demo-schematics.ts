/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { copySync, emptyDirSync, outputJsonSync, readJsonSync, removeSync } from 'fs-extra';

import { execFileSync } from 'child_process';
import { join } from 'path';

import { buildConfig } from '../build-config';
import { generate } from '../schematics/demo2schematics';

// Keep this package outside publish/, which is the ng-zorro-antd npm package.
const outputDir = join(buildConfig.outputDir, 'antd-schematics');
const sourceDir = join(buildConfig.outputDir, 'antd-schematics-source');
const packageDir = join(buildConfig.projectDir, 'schematics-demo');

emptyDirSync(outputDir);
emptyDirSync(sourceDir);

try {
  generate(sourceDir);
  // Share the implementation at build time, without importing private main-package files at runtime.
  copySync(
    join(buildConfig.projectDir, 'schematics/utils/build-component.ts'),
    join(sourceDir, 'utils/build-component.ts')
  );
  outputJsonSync(join(sourceDir, 'tsconfig.json'), {
    extends: join(buildConfig.projectDir, 'schematics/tsconfig.json'),
    compilerOptions: { rootDir: sourceDir, outDir: outputDir, sourceMap: false, noEmitOnError: true },
    include: ['**/*.ts'],
    exclude: ['**/files/**/*']
  });
  execFileSync(process.execPath, [require.resolve('typescript/bin/tsc'), '-p', join(sourceDir, 'tsconfig.json')], {
    stdio: 'inherit'
  });
  copySync(sourceDir, outputDir, {
    filter: file => !file.endsWith('.ts') && !file.endsWith('tsconfig.json')
  });

  const rootPackage = readJsonSync(join(buildConfig.projectDir, 'package.json')) as {
    engines: Record<string, string>;
    devDependencies: Record<string, string>;
  };
  const libraryPackage = readJsonSync(join(buildConfig.componentsDir, 'package.json')) as {
    version: string;
    dependencies: Record<string, string>;
  };
  const dependencies = Object.fromEntries(
    ['@angular-devkit/core', '@angular-devkit/schematics', '@schematics/angular', 'typescript'].map(name => [
      name,
      rootPackage.devDependencies[name]
    ])
  );
  outputJsonSync(
    join(outputDir, 'package.json'),
    {
      ...readJsonSync(join(packageDir, 'package.json')),
      private: false,
      engines: rootPackage.engines,
      dependencies: { ...dependencies, '@angular/cdk': libraryPackage.dependencies['@angular/cdk'] },
      peerDependencies: { 'ng-zorro-antd': `^${libraryPackage.version}` }
    },
    { spaces: 2 }
  );
  copySync(join(packageDir, 'README.md'), join(outputDir, 'README.md'));
  copySync(join(buildConfig.projectDir, 'LICENSE'), join(outputDir, 'LICENSE'));
} finally {
  removeSync(sourceDir);
}
