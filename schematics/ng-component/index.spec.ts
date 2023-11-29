import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import { ChangeDetection, Style } from '@schematics/angular/component/schema';

import { createTestApp } from '../testing/test-app';

const appOptions = {
  name: 'ng-zorro',
  inlineStyle: false,
  inlineTemplate: false,
  routing: false,
  style: Style.Less,
  skipTests: false,
  skipPackageJson: false
};

const defaultOptions = {
  name: 'test',
  inlineStyle: false,
  inlineTemplate: false,
  changeDetection: ChangeDetection.Default,
  style: Style.Less,
  skipTests: false,
  module: undefined,
  export: false,
  standalone: true,
  project: 'ng-zorro'
};

describe('ng-component schematic', () => {
  let runner: SchematicTestRunner;
  let appTree: Tree;

  beforeEach(async () => {
    runner = new SchematicTestRunner('schematics', require.resolve('../collection.json'));
    appTree = await createTestApp(runner, { ...appOptions });
  });

  it('should create a component', async () => {
    const options = { ...defaultOptions };
    const tree = await runner.runSchematic('component', options, appTree);
    const files = tree.files;

    expect(files).toEqual(
      jasmine.arrayContaining([
        '/projects/ng-zorro/src/app/test/test.component.less',
        '/projects/ng-zorro/src/app/test/test.component.html',
        '/projects/ng-zorro/src/app/test/test.component.spec.ts',
        '/projects/ng-zorro/src/app/test/test.component.ts'
      ])
    );
  });

  it('should create a flat component', async () => {
    const options = { ...defaultOptions, flat: true };
    const tree = await runner.runSchematic('component', options, appTree);
    const files = tree.files;

    expect(files).toEqual(
      jasmine.arrayContaining([
        '/projects/ng-zorro/src/app/test.component.less',
        '/projects/ng-zorro/src/app/test.component.html',
        '/projects/ng-zorro/src/app/test.component.spec.ts',
        '/projects/ng-zorro/src/app/test.component.ts'
      ])
    );
  });

  it('should find the closest module', async () => {
    const options = { ...defaultOptions, standalone: false };
    const closestModule = '/projects/ng-zorro/src/app/test/test.module.ts';

    appTree.create(
      closestModule,
      `
      import { NgModule } from '@angular/core';
      @NgModule({
        imports: [],
        declarations: []
      })
      export class ClosestModule { }
    `
    );
    const tree = await runner.runSchematic('component', options, appTree);
    const fooModuleContent = tree.readContent(closestModule);

    expect(fooModuleContent).toMatch(/import { TestComponent } from '.\/test.component'/);
  });

  it('should set classname with the closest module', async () => {
    const options = { ...defaultOptions, classnameWithModule: true, standalone: false };
    const testModule = '/projects/ng-zorro/src/app/test/test.module.ts';

    appTree.create(
      testModule,
      `
      import { NgModule } from '@angular/core';
      @NgModule({
        imports: [],
        declarations: []
      })
      export class TestModule { }
    `
    );

    const tree = await runner.runSchematic('component', options, appTree);
    const fooModuleContent = tree.readContent(testModule);

    expect(fooModuleContent).toMatch(/import { TestTestComponent } from '.\/test.component'/);
  });

  it('should set classname with the specified module', async () => {
    const options = { ...defaultOptions, classnameWithModule: true, module: 'app.module.ts', standalone: false };
    const app = await createTestApp(runner, { ...appOptions, standalone: false });
    const tree = await runner.runSchematic('component', options, app);

    const appComponentContent = tree.readContent('/projects/ng-zorro/src/app/app.module.ts');
    expect(appComponentContent).toMatch(/import { AppTestComponent } from '.\/test\/test.component'/);
  });
});
