/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

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
  project: 'ng-zorro'
};

function generateModuleContent(moduleName: string): string {
  return `
import { NgModule } from '@angular/core';
@NgModule({
  imports: [],
  declarations: []
})
export class ${moduleName} {}
`;
}

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

  describe('style', () => {
    it('should create specified style', async () => {
      const options = { ...defaultOptions, style: Style.Sass };
      const tree = await runner.runSchematic('component', options, appTree);
      const files = tree.files.filter(file => file.startsWith('/projects/ng-zorro/src/app/test/'));

      expect(files).toEqual(
        jasmine.arrayContaining([
          '/projects/ng-zorro/src/app/test/test.component.sass',
          '/projects/ng-zorro/src/app/test/test.component.html',
          '/projects/ng-zorro/src/app/test/test.component.spec.ts',
          '/projects/ng-zorro/src/app/test/test.component.ts'
        ])
      );
    });

    it('should not create style file when inlineStyle is true', async () => {
      const options = { ...defaultOptions, inlineStyle: true };
      const tree = await runner.runSchematic('component', options, appTree);
      const files = tree.files.filter(file => file.startsWith('/projects/ng-zorro/src/app/test/'));

      expect(files.length).toEqual(3);
      expect(files).toEqual(
        jasmine.arrayContaining([
          '/projects/ng-zorro/src/app/test/test.component.html',
          '/projects/ng-zorro/src/app/test/test.component.spec.ts',
          '/projects/ng-zorro/src/app/test/test.component.ts'
        ])
      );
    });

    it('should not create style file when style is none', async () => {
      const options = { ...defaultOptions, style: Style.None };
      const tree = await runner.runSchematic('component', options, appTree);
      const files = tree.files.filter(file => file.startsWith('/projects/ng-zorro/src/app/test/'));

      expect(files.length).toEqual(3);
      expect(files).toEqual(
        jasmine.arrayContaining([
          '/projects/ng-zorro/src/app/test/test.component.html',
          '/projects/ng-zorro/src/app/test/test.component.spec.ts',
          '/projects/ng-zorro/src/app/test/test.component.ts'
        ])
      );
    });
  });

  describe('displayBlock', () => {
    it('should add display block styles to the component', async () => {
      const options = { ...defaultOptions, displayBlock: true };
      const tree = await runner.runSchematic('component', options, appTree);
      const content = tree.readContent('/projects/ng-zorro/src/app/test/test.component.less');

      expect(content).toMatch(/display: block/);
    });

    it('should add display block styles to the component when inlineStyle is true', async () => {
      const options = { ...defaultOptions, displayBlock: true, inlineStyle: true };
      const tree = await runner.runSchematic('component', options, appTree);
      const content = tree.readContent('/projects/ng-zorro/src/app/test/test.component.ts');

      expect(content).toMatch(/display: block/);
    });
  });

  describe('flat', () => {
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
  });

  describe('classnameWithModule', () => {
    it('should find the closest module', async () => {
      const options = { ...defaultOptions, standalone: false };
      const closestModule = '/projects/ng-zorro/src/app/test/test.module.ts';

      appTree.create(
        closestModule,
        generateModuleContent('ClosestModule')
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
        generateModuleContent('TestModule')
      );

      const tree = await runner.runSchematic('component', options, appTree);
      const fooModuleContent = tree.readContent(testModule);

      expect(fooModuleContent).toMatch(/import { TestTestComponent } from '.\/test.component'/);
    });

    it('should set classname with the specified module', async () => {
      const options = { ...defaultOptions, classnameWithModule: true, module: 'app-module.ts', standalone: false };
      const app = await createTestApp(runner, { ...appOptions, standalone: false });
      const tree = await runner.runSchematic('component', options, app);

      const appComponentContent = tree.readContent('/projects/ng-zorro/src/app/app-module.ts');
      expect(appComponentContent).toMatch(/import { AppTestComponent } from '.\/test\/test.component'/);
    });
  });
});
