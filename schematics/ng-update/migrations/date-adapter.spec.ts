/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { createMigrationSchematicRule, TargetVersion } from '@angular/cdk/schematics';
import { lastValueFrom } from 'rxjs';

import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';

import { DateAdapterMigration } from './date-adapter';
import { createTestApp } from '../../testing/test-app';
import { getFileContent } from '../../utils/get-file-content';
import { nzUpgradeData } from '../upgrade-data';

describe('date adapter migration', () => {
  let runner: SchematicTestRunner;

  beforeEach(() => {
    runner = new SchematicTestRunner('schematics', require.resolve('../../collection.json'));
  });

  it('should add provideNzDateFnsAdapter to standalone app config providers', async () => {
    const tree = await runDateAdapterMigration(await createTestApp(runner));
    const appConfig = getFileContent(tree, '/projects/ng-zorro/src/app/app.config.ts');

    expect(appConfig).toContain(`import { provideNzDateFnsAdapter } from 'ng-zorro-antd/core/time';`);
    expect(appConfig).toContain('provideNzDateFnsAdapter()');
  });

  it('should not add provideNzDateFnsAdapter twice', async () => {
    const appTree = await createTestApp(runner);
    const content = `${getFileContent(appTree, '/projects/ng-zorro/src/app/app.config.ts').replace(
      'providers: [',
      `providers: [provideNzDateFnsAdapter(), `
    )}\nimport { provideNzDateFnsAdapter } from 'ng-zorro-antd/core/time';\n`;
    appTree.overwrite('/projects/ng-zorro/src/app/app.config.ts', content);

    const tree = await runDateAdapterMigration(appTree);
    const appConfig = getFileContent(tree, '/projects/ng-zorro/src/app/app.config.ts');

    expect(countMatches(appConfig, 'provideNzDateFnsAdapter()')).toBe(1);
  });

  it('should not override an explicit native date adapter provider', async () => {
    const appTree = await createTestApp(runner);
    const content = `${getFileContent(appTree, '/projects/ng-zorro/src/app/app.config.ts').replace(
      'providers: [',
      `providers: [provideNzNativeDateAdapter(), `
    )}\nimport { provideNzNativeDateAdapter } from 'ng-zorro-antd/core/time';\n`;
    appTree.overwrite('/projects/ng-zorro/src/app/app.config.ts', content);

    const tree = await runDateAdapterMigration(appTree);
    const appConfig = getFileContent(tree, '/projects/ng-zorro/src/app/app.config.ts');

    expect(appConfig).toContain('provideNzNativeDateAdapter()');
    expect(appConfig).not.toContain('provideNzDateFnsAdapter()');
  });

  it('should add provideNzDateFnsAdapter to NgModule providers', async () => {
    const tree = await runDateAdapterMigration(await createTestApp(runner, { standalone: false }));
    const appModule = getFileContent(tree, '/projects/ng-zorro/src/app/app-module.ts');

    expect(appModule).toContain(`import { provideNzDateFnsAdapter } from 'ng-zorro-antd/core/time';`);
    expect(appModule).toContain('provideNzDateFnsAdapter()');
  });

  async function runDateAdapterMigration(tree: Tree): Promise<UnitTestTree> {
    const rule = createMigrationSchematicRule(TargetVersion.V22, [DateAdapterMigration], nzUpgradeData);
    return lastValueFrom(runner.callRule(rule, tree)) as Promise<UnitTestTree>;
  }

  function countMatches(value: string, pattern: string): number {
    return value.split(pattern).length - 1;
  }
});
