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
  type: 'Component',
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

describe('[schematic] ng-component', () => {
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

  it('should respect the type option', async () => {
    const options = { ...defaultOptions, type: 'container' };
    const tree = await runner.runSchematic('component', options, appTree);
    const files = tree.files;

    expect(files).toEqual(
      jasmine.arrayContaining([
        '/projects/ng-zorro/src/app/test/test.container.less',
        '/projects/ng-zorro/src/app/test/test.container.html',
        '/projects/ng-zorro/src/app/test/test.container.spec.ts',
        '/projects/ng-zorro/src/app/test/test.container.ts'
      ])
    );
  });

  it('should allow empty string in the type option', async () => {
    const options = { ...defaultOptions, type: '' };
    const tree = await runner.runSchematic('component', options, appTree);
    const files = tree.files;

    expect(files).toEqual(
      jasmine.arrayContaining([
        '/projects/ng-zorro/src/app/test/test.less',
        '/projects/ng-zorro/src/app/test/test.html',
        '/projects/ng-zorro/src/app/test/test.spec.ts',
        '/projects/ng-zorro/src/app/test/test.ts'
      ])
    );
  });

  it('should not use `.ng.html` extension when ngHtml is false', async () => {
    const options = { ...defaultOptions, ngHtml: false };
    const tree = await runner.runSchematic('component', options, appTree);
    const content = tree.readContent('/projects/ng-zorro/src/app/test/test.component.ts');
    const files = tree.files;

    expect(content).toContain('test.component.html');
    expect(files).toContain('/projects/ng-zorro/src/app/test/test.component.less');
    expect(files).toContain('/projects/ng-zorro/src/app/test/test.component.html');
  });

  it('should use `.ng.html` extension when ngHtml is true', async () => {
    const options = { ...defaultOptions, ngHtml: true };
    const tree = await runner.runSchematic('component', options, appTree);
    const content = tree.readContent('/projects/ng-zorro/src/app/test/test.component.ts');
    const files = tree.files;

    expect(content).toContain('test.component.ng.html');
    expect(files).toContain('/projects/ng-zorro/src/app/test/test.component.less');
    expect(files).toContain('/projects/ng-zorro/src/app/test/test.component.ng.html');
  });

  describe('style', () => {
    it('should create specified style', async () => {
      const options = { ...defaultOptions, style: Style.Sass };
      const tree = await runner.runSchematic('component', options, appTree);
      const files = tree.files;

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
      const files = tree.files;

      expect(files).toEqual(
        jasmine.arrayContaining([
          '/projects/ng-zorro/src/app/test/test.component.html',
          '/projects/ng-zorro/src/app/test/test.component.spec.ts',
          '/projects/ng-zorro/src/app/test/test.component.ts'
        ])
      );
      expect(files).not.toContain('/projects/ng-zorro/src/app/test/test.component.less');
    });

    it('should not create style file when style is none', async () => {
      const options = { ...defaultOptions, style: Style.None };
      const tree = await runner.runSchematic('component', options, appTree);
      const files = tree.files;

      expect(files).toEqual(
        jasmine.arrayContaining([
          '/projects/ng-zorro/src/app/test/test.component.html',
          '/projects/ng-zorro/src/app/test/test.component.spec.ts',
          '/projects/ng-zorro/src/app/test/test.component.ts'
        ])
      );
      expect(files).not.toContain('/projects/ng-zorro/src/app/test/test.component.less');
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
      const closestModule = '/projects/ng-zorro/src/app/test/test-module.ts';

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
      const testModule = '/projects/ng-zorro/src/app/test/test-module.ts';

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
