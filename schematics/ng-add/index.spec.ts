import { addModuleImportToRootModule, getProjectFromWorkspace, getProjectTargetOptions } from '@angular/cdk/schematics';


import { normalize } from '@angular-devkit/core';
import { WorkspaceDefinition } from '@angular-devkit/core/src/workspace';
import { Tree } from '@angular-devkit/schematics';
import { NodePackageName } from '@angular-devkit/schematics/tasks/package-manager/options';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import { getFileContent } from '@schematics/angular/utility/test/get-file-content';
import { getWorkspace } from '@schematics/angular/utility/workspace';

import { join } from "path";

import { createTestApp } from '../testing/test-app';
import { createCustomTheme } from '../utils/create-custom-theme';
import { Schema as NzOptions } from './schema';

describe('ng-add schematic', () => {
  const defaultOptions: NzOptions = {
    project: 'ng-zorro',
  };

  let runner: SchematicTestRunner;
  let appTree: Tree;

  beforeEach(async () => {
    runner = new SchematicTestRunner('schematics', require.resolve('../collection.json'));
    appTree = await createTestApp(runner);
  });

  it('should update package.json', async () => {
    const options = {...defaultOptions};
    const tree = await runner.runSchematicAsync('ng-add', options, appTree).toPromise();
    const packageJson = JSON.parse(getFileContent(tree, '/package.json'));
    const dependencies = packageJson.dependencies;

    expect(dependencies['ng-zorro-antd']).toBeDefined();

    expect(runner.tasks.some(task => task.name === NodePackageName)).toBe(true);
  });

  it('should add hammerjs to package.json', async () => {
    const options = {...defaultOptions, gestures: true};
    const tree = await runner.runSchematicAsync('ng-add', options, appTree).toPromise();

    const packageJson = JSON.parse(getFileContent(tree, '/package.json'));
    const dependencies = packageJson.dependencies;

    expect(dependencies.hammerjs).toBeDefined();
  });

  it('should skip package.json', async () => {
    const options = {...defaultOptions, skipPackageJson: true};
    const tree = await runner.runSchematicAsync('ng-add', options, appTree).toPromise();

    const packageJson = JSON.parse(getFileContent(tree, '/package.json'));
    const dependencies = packageJson.dependencies;

    expect(dependencies['ng-zorro-antd']).toBeUndefined();
  });

  it('should skip install dependency package', async () => {
    const options = {...defaultOptions, skipInstall: true};
    await runner.runSchematicAsync('ng-add', options, appTree).toPromise();

    expect(runner.tasks.some(task => task.name === NodePackageName)).toBe(false);
  });

  it('should add hammerjs import to project main file', async () => {
    const options = {...defaultOptions, gestures: true};
    const tree = await runner.runSchematicAsync('ng-add-setup-project', options, appTree).toPromise();
    const workspace = await getWorkspace(tree);
    const project = getProjectFromWorkspace(workspace as unknown as WorkspaceDefinition, defaultOptions.project);
    const fileContent = getFileContent(tree, normalize(join(project.sourceRoot, 'main.ts')));

    expect(fileContent).toContain(`import 'hammerjs';`);
  });

  it('should add default theme', async () => {
    const options = {...defaultOptions};
    const tree = await runner.runSchematicAsync('ng-add-setup-project', options, appTree).toPromise();
    const workspace = await getWorkspace(tree);
    const project = getProjectFromWorkspace(workspace as unknown as WorkspaceDefinition, defaultOptions.project);

    expect(getProjectTargetOptions(project, 'build').styles)
    .toContain('./node_modules/ng-zorro-antd/ng-zorro-antd.min.css');
  });

  it('should add custom theme', async () => {
    const options = {...defaultOptions, theme: true};

    appTree = await createTestApp(runner, {style: 'less'});
    const tree = await runner.runSchematicAsync('ng-add-setup-project', options, appTree).toPromise();
    const workspace = await getWorkspace(tree);
    const project = getProjectFromWorkspace(workspace as unknown as WorkspaceDefinition, defaultOptions.project);

    const customThemePath = normalize(join(project.sourceRoot, 'styles.less'));
    const buffer = tree.read(customThemePath);
    const themeContent = buffer!.toString();

    expect(themeContent).toContain(createCustomTheme())

    expect(getProjectTargetOptions(project, 'build').styles)
    .toContain('projects/ng-zorro/src/styles.less');
  });

  it('should add custom theme file when no LESS file in project', async () => {
    const options = {...defaultOptions, theme: true};
    const tree = await runner.runSchematicAsync('ng-add-setup-project', options, appTree).toPromise();
    const workspace = await getWorkspace(tree);
    const project = getProjectFromWorkspace(workspace as unknown as WorkspaceDefinition, defaultOptions.project);

    expect(getProjectTargetOptions(project, 'build').styles)
    .toContain('projects/ng-zorro/src/theme.less');
  });

  it('should add icon assets', async () => {
    const options = {...defaultOptions, dynamicIcon: true};
    const tree = await runner.runSchematicAsync('ng-add-setup-project', options, appTree).toPromise();
    const workspace = await getWorkspace(tree);
    const project = getProjectFromWorkspace(workspace as unknown as WorkspaceDefinition, defaultOptions.project);
    const assets = getProjectTargetOptions(project, 'build').assets;

    const assetsString = JSON.stringify(assets);
    const iconPathSegment = '@ant-design/icons-angular';

    expect(assetsString).toContain(iconPathSegment);
  });

  it('should required modules', async () => {
    const options = {...defaultOptions};
    const tree = await runner.runSchematicAsync('ng-add-setup-project', options, appTree).toPromise();
    const fileContent = getFileContent(tree, '/projects/ng-zorro/src/app/app.module.ts');

    expect(fileContent).toContain('FormsModule');
    expect(fileContent).toContain('HttpClientModule');
  });

  it('should add browserAnimationsModuleName if animations is enable', async () => {
    const options = {...defaultOptions, animations: true};
    const tree = await runner.runSchematicAsync('ng-add-setup-project', options, appTree).toPromise();
    const fileContent = getFileContent(tree, '/projects/ng-zorro/src/app/app.module.ts');

    expect(fileContent).toContain('BrowserAnimationsModule');
  });

  it('should add noopAnimationsModuleName if animations is disable', async () => {
    const options = {...defaultOptions, animations: false};
    const tree = await runner.runSchematicAsync('ng-add-setup-project', options, appTree).toPromise();
    const fileContent = getFileContent(tree, '/projects/ng-zorro/src/app/app.module.ts');

    expect(fileContent).toContain('NoopAnimationsModule');
  });

  it('should not add BrowserAnimationsModule if NoopAnimationsModule is set up', async () => {
    const options = {...defaultOptions, animations: true};

    const workspace = await getWorkspace(appTree);
    const project = getProjectFromWorkspace(workspace as unknown as WorkspaceDefinition, defaultOptions.project);

    addModuleImportToRootModule(
      appTree, 'NoopAnimationsModule', '@angular/platform-browser/animations', project);

    const tree = await runner.runSchematicAsync('ng-add-setup-project', options, appTree).toPromise();
    const fileContent = getFileContent(tree, '/projects/ng-zorro/src/app/app.module.ts');

    expect(fileContent).toContain('NoopAnimationsModule');
    expect(fileContent).not.toContain('BrowserAnimationsModule');

  });

  it('should not add NoopAnimationsModule if BrowserAnimationsModule is set up', async () => {
    const options = {...defaultOptions, animations: false};

    const workspace = await getWorkspace(appTree);
    const project = getProjectFromWorkspace(workspace as unknown as WorkspaceDefinition, defaultOptions.project);

    addModuleImportToRootModule(
      appTree, 'BrowserAnimationsModule', '@angular/platform-browser/animations', project);

    const tree = await runner.runSchematicAsync('ng-add-setup-project', options, appTree).toPromise();
    const fileContent = getFileContent(tree, '/projects/ng-zorro/src/app/app.module.ts');

    expect(fileContent).not.toContain('NoopAnimationsModule');
    expect(fileContent).toContain('BrowserAnimationsModule');
  });

  it('should register default locale id', async () => {
    const options = {...defaultOptions};
    const tree = await runner.runSchematicAsync('ng-add-setup-project', options, appTree).toPromise();
    const fileContent = getFileContent(tree, '/projects/ng-zorro/src/app/app.module.ts');

    expect(fileContent).toContain('{ provide: NZ_I18N, useValue: en_US }');
    expect(fileContent).toContain('registerLocaleData(en)');
  });

  it('should register specified locale id', async () => {
    const options = {...defaultOptions, locale: 'zh_CN'};
    const tree = await runner.runSchematicAsync('ng-add-setup-project', options, appTree).toPromise();
    const fileContent = getFileContent(tree, '/projects/ng-zorro/src/app/app.module.ts');

    expect(fileContent).toContain('{ provide: NZ_I18N, useValue: zh_CN }');
    expect(fileContent).toContain('registerLocaleData(zh)');
  });

  it('should not add locale id if locale id is set up', async () => {
    const options = {...defaultOptions, i18n: 'zh_CN'};
    await runner.runSchematicAsync('ng-add-setup-project', { ...defaultOptions }, appTree).toPromise();

    spyOn(console, 'log');

    const tree = await runner.runSchematicAsync('ng-add-setup-project', options, appTree).toPromise();
    const fileContent = getFileContent(tree, '/projects/ng-zorro/src/app/app.module.ts');

    expect(fileContent).toContain('{ provide: NZ_I18N, useValue: en_US }');
    expect(fileContent).toContain('registerLocaleData(en)');
    expect(fileContent).not.toContain('{ provide: NZ_I18N, useValue: zh_CN }');
    expect(fileContent).not.toContain('registerLocaleData(zh)');

    expect(console.log)
    .toHaveBeenCalledWith(
      jasmine.stringMatching(
        /Could not add the registerLocaleData to your app.module file/
      )
    );
  });

});
