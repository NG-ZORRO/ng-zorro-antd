/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { getProjectFromWorkspace, getProjectTargetOptions } from '@angular/cdk/schematics';

import { normalize } from '@angular-devkit/core';
import { Tree } from '@angular-devkit/schematics';
import { NodePackageName } from '@angular-devkit/schematics/tasks/package-manager/options';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import { readWorkspace } from '@schematics/angular/utility';

import { join } from 'path';

import { Schema as NzOptions } from './schema';
import { createTestApp } from '../testing/test-app';
import { createCustomTheme } from '../utils/create-custom-theme';
import { getFileContent } from '../utils/get-file-content';

describe('[standalone] ng-add schematic', () => {
  const defaultOptions: NzOptions = {
    project: 'ng-zorro'
  };

  let runner: SchematicTestRunner;
  let appTree: Tree;

  beforeEach(async () => {
    runner = new SchematicTestRunner('schematics', require.resolve('../collection.json'));
    appTree = await createTestApp(runner);
  });

  it('should update package.json', async () => {
    const options = { ...defaultOptions };
    const tree = await runner.runSchematic('ng-add', options, appTree);
    const packageJson = JSON.parse(getFileContent(tree, '/package.json'));
    const dependencies = packageJson.dependencies;

    expect(dependencies['ng-zorro-antd']).toBeDefined();

    expect(runner.tasks.some(task => task.name === NodePackageName)).toBe(true);
  });

  it('should add hammerjs to package.json', async () => {
    const options = { ...defaultOptions, gestures: true };
    const tree = await runner.runSchematic('ng-add', options, appTree);

    const packageJson = JSON.parse(getFileContent(tree, '/package.json'));
    const dependencies = packageJson.dependencies;

    expect(dependencies.hammerjs).toBeDefined();
  });

  it('should skip package.json', async () => {
    const options = { ...defaultOptions, skipPackageJson: true };
    const tree = await runner.runSchematic('ng-add', options, appTree);

    const packageJson = JSON.parse(getFileContent(tree, '/package.json'));
    const dependencies = packageJson.dependencies;

    expect(dependencies['ng-zorro-antd']).toBeUndefined();
  });

  it('should skip install dependency package', async () => {
    const options = { ...defaultOptions, skipInstall: true };
    await runner.runSchematic('ng-add', options, appTree);

    expect(runner.tasks.some(task => task.name === NodePackageName)).toBe(false);
  });

  it('should add hammerjs import to project main file', async () => {
    const options = { ...defaultOptions, gestures: true };
    const tree = await runner.runSchematic('ng-add-setup-project', options, appTree);
    const workspace = await readWorkspace(tree);
    const project = getProjectFromWorkspace(workspace, defaultOptions.project);
    const fileContent = getFileContent(tree, normalize(join(project.sourceRoot, 'main.ts')));

    expect(fileContent).toContain(`import 'hammerjs';`);
  });

  it('should add default theme', async () => {
    const options = { ...defaultOptions };
    const tree = await runner.runSchematic('ng-add-setup-project', options, appTree);
    const workspace = await readWorkspace(tree);
    const project = getProjectFromWorkspace(workspace, defaultOptions.project);

    expect(getProjectTargetOptions(project, 'build').styles).toContain(
      './node_modules/ng-zorro-antd/ng-zorro-antd.min.css'
    );
  });

  it('should add custom theme', async () => {
    const options = { ...defaultOptions, theme: true };

    appTree = await createTestApp(runner, { style: 'less' });
    const tree = await runner.runSchematic('ng-add-setup-project', options, appTree);
    const workspace = await readWorkspace(tree);
    const project = getProjectFromWorkspace(workspace, defaultOptions.project);

    const customThemePath = normalize(join(project.sourceRoot, 'styles.less'));
    const buffer = tree.read(customThemePath);
    const themeContent = buffer!.toString();

    expect(themeContent).toContain(createCustomTheme());

    expect(getProjectTargetOptions(project, 'build').styles).toContain('projects/ng-zorro/src/styles.less');
  });

  it('should add custom theme file when no LESS file in project', async () => {
    const options = { ...defaultOptions, theme: true };
    const tree = await runner.runSchematic('ng-add-setup-project', options, appTree);
    const workspace = await readWorkspace(tree);
    const project = getProjectFromWorkspace(workspace, defaultOptions.project);

    expect(getProjectTargetOptions(project, 'build').styles).toContain('projects/ng-zorro/src/theme.less');
  });

  it('should add icon assets', async () => {
    const options = { ...defaultOptions, dynamicIcon: true };
    const tree = await runner.runSchematic('ng-add-setup-project', options, appTree);
    const workspace = await readWorkspace(tree);
    const project = getProjectFromWorkspace(workspace, defaultOptions.project);
    const assets = getProjectTargetOptions(project, 'build').assets;

    const assetsString = JSON.stringify(assets);
    const iconPathSegment = '@ant-design/icons-angular';

    expect(assetsString).toContain(iconPathSegment);
  });

  it('should required modules and providers', async () => {
    const options = { ...defaultOptions };
    const tree = await runner.runSchematic('ng-add-setup-project', options, appTree);
    const fileContent = getFileContent(tree, '/projects/ng-zorro/src/app/app.config.ts');

    expect(fileContent).toContain('provideHttpClient()');
    expect(fileContent).toContain('FormsModule');
  });

  it('should add provideAnimationsAsync() call function if animations is enable', async () => {
    const options = { ...defaultOptions, animations: true };
    const tree = await runner.runSchematic('ng-add-setup-project', options, appTree);
    const fileContent = getFileContent(tree, '/projects/ng-zorro/src/app/app.config.ts');

    expect(fileContent).toContain('provideAnimationsAsync()');
  });

  it(`should add provideAnimationsAsync('noop') function call if animations is disable`, async () => {
    const options = { ...defaultOptions, animations: false };
    const tree = await runner.runSchematic('ng-add-setup-project', options, appTree);
    const fileContent = getFileContent(tree, '/projects/ng-zorro/src/app/app.config.ts');

    expect(fileContent).toContain(`provideAnimationsAsync('noop')`);
  });

  it('should register default locale id', async () => {
    const options = { ...defaultOptions };
    const tree = await runner.runSchematic('ng-add-setup-project', options, appTree);
    const fileContent = getFileContent(tree, '/projects/ng-zorro/src/app/app.config.ts');

    expect(fileContent).toContain('provideNzI18n(en_US)');
    expect(fileContent).toContain('registerLocaleData(en)');
  });

  it('should register specified locale id', async () => {
    const options = { ...defaultOptions, locale: 'zh_CN' };
    const tree = await runner.runSchematic('ng-add-setup-project', options, appTree);
    const fileContent = getFileContent(tree, '/projects/ng-zorro/src/app/app.config.ts');

    expect(fileContent).toContain('provideNzI18n(zh_CN)');
    expect(fileContent).toContain('registerLocaleData(zh)');
  });

  it('should not add locale id if locale id is set up', async () => {
    const options = { ...defaultOptions, i18n: 'zh_CN' };
    await runner.runSchematic('ng-add-setup-project', { ...defaultOptions }, appTree);

    spyOn(console, 'log');

    const tree = await runner.runSchematic('ng-add-setup-project', options, appTree);
    const fileContent = getFileContent(tree, '/projects/ng-zorro/src/app/app.config.ts');

    expect(fileContent).toContain('provideNzI18n(en_US)');
    expect(fileContent).toContain('registerLocaleData(en)');
    expect(fileContent).not.toContain('provideNzI18n(zh_CN)');
    expect(fileContent).not.toContain('registerLocaleData(zh)');

    expect(console.log).toHaveBeenCalledWith(jasmine.stringMatching(/Could not add the registerLocaleData to file/));
  });
});
