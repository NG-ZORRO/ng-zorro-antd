import { normalize } from '@angular-devkit/core';
import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import { addModuleImportToRootModule, getProjectFromWorkspace, getProjectTargetOptions } from '@angular/cdk/schematics';
import { getWorkspace } from '@schematics/angular/utility/config';
import { getFileContent } from '@schematics/angular/utility/test';
import { join } from "path";
import { createTestApp } from '../testing/test-app';

describe('ng-add schematic', () => {
  let runner: SchematicTestRunner;
  let appTree: Tree;

  beforeEach(async () => {
    runner = new SchematicTestRunner('schematics', require.resolve('../collection.json'));
    appTree = await createTestApp(runner);
  });

  it('should update package.json', async () => {
    const tree = await runner.runSchematicAsync('ng-add', {}, appTree).toPromise();

    const packageJson = JSON.parse(getFileContent(tree, '/package.json'));
    const dependencies = packageJson.dependencies;

    expect(dependencies['ng-zorro-antd']).toBeDefined();
    expect(runner.tasks.some(task => task.name === 'run-schematic')).toBe(true);
  });

  it('should add hammerjs to package.json', async () => {
    const tree = await runner.runSchematicAsync('ng-add', {gestures: true}, appTree).toPromise();

    const packageJson = JSON.parse(getFileContent(tree, '/package.json'));
    const dependencies = packageJson.dependencies;

    expect(dependencies.hammerjs).toBeDefined();
  });

  it('should skip package.json', async () => {
    const tree = await runner.runSchematicAsync('ng-add', {skipPackageJson: true}, appTree).toPromise();

    const packageJson = JSON.parse(getFileContent(tree, '/package.json'));
    const dependencies = packageJson.dependencies;

    expect(dependencies['ng-zorro-antd']).toBeUndefined();
  });

  it('should add hammerjs import to project main file', async () => {
    const tree = await runner.runSchematicAsync('ng-add-setup-project', {gestures: true}, appTree).toPromise();
    const workspace = getWorkspace(tree);
    const project = getProjectFromWorkspace(workspace);
    const fileContent = getFileContent(tree, normalize(join(project.sourceRoot, 'main.ts')));

    expect(fileContent).toContain(`import 'hammerjs';`);
  });

  it('should add default theme', async () => {
    const tree = await runner.runSchematicAsync('ng-add-setup-project', {}, appTree).toPromise();
    const workspace = getWorkspace(tree);
    const project = getProjectFromWorkspace(workspace);

    expect(getProjectTargetOptions(project, 'build').styles)
    .toContain('./node_modules/ng-zorro-antd/ng-zorro-antd.min.css');
  });

  it('should add custom theme', async () => {
    appTree = await createTestApp(runner, {style: 'less'});
    const tree = await runner.runSchematicAsync('ng-add-setup-project', {theme: true}, appTree).toPromise();
    const workspace = getWorkspace(tree);
    const project = getProjectFromWorkspace(workspace);

    const customThemePath = normalize(join(project.sourceRoot, 'styles.less'));
    const buffer = tree.read(customThemePath);
    const themeContent = buffer!.toString();

    expect(themeContent).toContain(`@import "../node_modules/ng-zorro-antd/ng-zorro-antd.less`);
    expect(themeContent).toContain(`@ant-prefix: ant;`);
    expect(themeContent).toContain(`@primary-color: @blue-6;`);
    expect(getProjectTargetOptions(project, 'build').styles)
    .toContain('projects/ng-zorro/src/styles.less');
  });

  it('should add custom theme file when no LESS file in project', async () => {
    const tree = await runner.runSchematicAsync('ng-add-setup-project', {theme: true}, appTree).toPromise();
    const workspace = getWorkspace(tree);
    const project = getProjectFromWorkspace(workspace);

    expect(getProjectTargetOptions(project, 'build').styles)
    .toContain('projects/ng-zorro/src/theme.less');
  });

  it('should add icon assets', async () => {
    const tree = await runner.runSchematicAsync('ng-add-setup-project', {dynamicIcon: true}, appTree).toPromise();
    const workspace = getWorkspace(tree);
    const project = getProjectFromWorkspace(workspace);
    const assets = getProjectTargetOptions(project, 'build').assets;

    const assetsString = JSON.stringify(assets);
    const iconPathSegment = '@ant-design/icons-angular';

    expect(assetsString).toContain(iconPathSegment);
  });

  it('should required modules', async () => {
    const tree = await runner.runSchematicAsync('ng-add-setup-project', {}, appTree).toPromise();
    const fileContent = getFileContent(tree, '/projects/ng-zorro/src/app/app.module.ts');

    expect(fileContent).toContain('NgZorroAntdModule');
    expect(fileContent).toContain('FormsModule');
    expect(fileContent).toContain('HttpClientModule');
  });

  it('should add browserAnimationsModuleName if animations is enable', async () => {
    const tree = await runner.runSchematicAsync('ng-add-setup-project', {animations: true}, appTree).toPromise();
    const fileContent = getFileContent(tree, '/projects/ng-zorro/src/app/app.module.ts');

    expect(fileContent).toContain('BrowserAnimationsModule');
  });

  it('should add noopAnimationsModuleName if animations is disable', async () => {
    const tree = await runner.runSchematicAsync('ng-add-setup-project', {animations: false}, appTree).toPromise();
    const fileContent = getFileContent(tree, '/projects/ng-zorro/src/app/app.module.ts');

    expect(fileContent).toContain('NoopAnimationsModule');
  });

  it('should not add BrowserAnimationsModule if NoopAnimationsModule is set up', async () => {
    const workspace = getWorkspace(appTree);
    const project = getProjectFromWorkspace(workspace);

    addModuleImportToRootModule(
      appTree, 'NoopAnimationsModule', '@angular/platform-browser/animations', project);

    spyOn(console, 'log');

    const tree = await runner.runSchematicAsync('ng-add-setup-project', {animations: true}, appTree).toPromise();
    const fileContent = getFileContent(tree, '/projects/ng-zorro/src/app/app.module.ts');

    expect(fileContent).toContain('NoopAnimationsModule');
    expect(fileContent).not.toContain('BrowserAnimationsModule');

    expect(console.log)
    .toHaveBeenCalledWith(
      jasmine.stringMatching(
        /Could not set up ".+BrowserAnimationsModule.+" because ".+NoopAnimationsModule.+" is already imported./
      )
    );
  });

  it('should not add NoopAnimationsModule if BrowserAnimationsModule is set up', async () => {
    const workspace = getWorkspace(appTree);
    const project = getProjectFromWorkspace(workspace);

    addModuleImportToRootModule(
      appTree, 'BrowserAnimationsModule', '@angular/platform-browser/animations', project);

    const tree = await runner.runSchematicAsync('ng-add-setup-project', {animations: false}, appTree).toPromise();
    const fileContent = getFileContent(tree, '/projects/ng-zorro/src/app/app.module.ts');

    expect(fileContent).not.toContain('NoopAnimationsModule');
    expect(fileContent).toContain('BrowserAnimationsModule');
  });

  it('should register default locale id', async () => {
    const tree = await runner.runSchematicAsync('ng-add-setup-project', {}, appTree).toPromise();
    const fileContent = getFileContent(tree, '/projects/ng-zorro/src/app/app.module.ts');

    expect(fileContent).toContain('{ provide: NZ_I18N, useValue: en_US }');
    expect(fileContent).toContain('registerLocaleData(en)');
  });

  it('should register specified locale id', async () => {
    const tree = await runner.runSchematicAsync('ng-add-setup-project', {locale: 'zh_CN'}, appTree).toPromise();
    const fileContent = getFileContent(tree, '/projects/ng-zorro/src/app/app.module.ts');

    expect(fileContent).toContain('{ provide: NZ_I18N, useValue: zh_CN }');
    expect(fileContent).toContain('registerLocaleData(zh)');
  });

  it('should have a deprecation `--i18n` warning', async () => {
    spyOn(console, 'log');

    const tree = await runner.runSchematicAsync('ng-add-setup-project', {i18n: 'zh_CN'}, appTree).toPromise();
    const fileContent = getFileContent(tree, '/projects/ng-zorro/src/app/app.module.ts');

    expect(fileContent).toContain('{ provide: NZ_I18N, useValue: zh_CN }');
    expect(fileContent).toContain('registerLocaleData(zh)');

    expect(console.log)
    .toHaveBeenCalledWith(
      jasmine.stringMatching(
        /.+WARN.+ .+--i18n.+ option will be deprecated, use .+--locale.+ instead/
      )
    );
  });

  it('should not add locale id if locale id is set up', async () => {
    await runner.runSchematicAsync('ng-add-setup-project', {}, appTree).toPromise();

    spyOn(console, 'log');

    const tree = await runner.runSchematicAsync('ng-add-setup-project', {i18n: 'zh_CN'}, appTree).toPromise();
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
