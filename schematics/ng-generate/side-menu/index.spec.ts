/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import { Style } from '@schematics/angular/ng-new/schema';

import { Schema as NzOptions } from '../../ng-add/schema';
import { createTestApp } from '../../testing/test-app';
import { getFileContent } from '../../utils/get-file-content';

describe('[schematic] side-menu', () => {
  const defaultOptions: NzOptions = {
    project: 'ng-zorro'
  };

  let runner: SchematicTestRunner;
  let appTree: Tree;

  beforeEach(async () => {
    runner = new SchematicTestRunner('schematics', require.resolve('../../collection.json'));
    appTree = await createTestApp(runner, { standalone: false });
  });

  it('should create side-menu files', async () => {
    const options = { ...defaultOptions };
    const tree = await runner.runSchematic('sidemenu', options, appTree);
    const appContent = getFileContent(tree, '/projects/ng-zorro/src/app/app.ts');
    const welcomeContent = getFileContent(tree, '/projects/ng-zorro/src/app/pages/welcome/welcome.component.ts');
    expect(appContent).toContain('standalone: false');
    expect(welcomeContent).toContain('standalone: false');

    expect(tree.files).toEqual(
      jasmine.arrayContaining([
        '/projects/ng-zorro/src/app/app.html',
        '/projects/ng-zorro/src/app/app.css',
        '/projects/ng-zorro/src/app/app.ts',
        '/projects/ng-zorro/src/app/app-routing-module.ts',
        '/projects/ng-zorro/src/app/pages/welcome/welcome-module.ts',
        '/projects/ng-zorro/src/app/pages/welcome/welcome-routing-module.ts',
        '/projects/ng-zorro/src/app/pages/welcome/welcome.component.ts',
        '/projects/ng-zorro/src/app/pages/welcome/welcome.component.css',
        '/projects/ng-zorro/src/app/pages/welcome/welcome.component.html'
      ])
    );
  });

  describe('style option', () => {
    it('should set the style preprocessor correctly', async () => {
      const options = { ...defaultOptions, style: Style.Less };
      const tree = await runner.runSchematic('sidemenu', options, appTree);
      const appContent = getFileContent(tree, '/projects/ng-zorro/src/app/app.ts');
      const welcomeContent = getFileContent(tree, '/projects/ng-zorro/src/app/pages/welcome/welcome.component.ts');
      expect(appContent).toContain('app.less');
      expect(welcomeContent).toContain('welcome.component.less');

      expect(tree.files).toEqual(
        jasmine.arrayContaining([
          '/projects/ng-zorro/src/app/app.less',
          '/projects/ng-zorro/src/app/pages/welcome/welcome.component.less'
        ])
      );
    });

    it('should fall back to the @schematics/angular:component option value', async () => {
      const options = { ...defaultOptions, template: 'sidemenu' };
      appTree = await createTestApp(runner, { style: Style.Less, standalone: false });
      const tree = await runner.runSchematic('ng-add', options, appTree);

      expect(tree.files).toEqual(
        jasmine.arrayContaining([
          '/projects/ng-zorro/src/app/app.less',
          '/projects/ng-zorro/src/app/pages/welcome/welcome.component.less'
        ])
      );
    });
  });

  it('should set the prefix correctly', async () => {
    const options = { ...defaultOptions, prefix: 'nz' };
    const tree = await runner.runSchematic('sidemenu', options, appTree);
    const appContent = getFileContent(tree, '/projects/ng-zorro/src/app/app.ts');
    const welcomeContent = getFileContent(tree, '/projects/ng-zorro/src/app/pages/welcome/welcome.component.ts');

    expect(appContent).toContain(`selector: 'nz-root'`);
    expect(welcomeContent).toContain(`selector: 'nz-welcome'`);
  });

  it('should set standalone to be false', async () => {
    const options = { ...defaultOptions };
    const tree = await runner.runSchematic('ng-add-setup-project', options, appTree);
    const appContent = getFileContent(tree, '/projects/ng-zorro/src/app/app.ts');
    expect(appContent).toContain('standalone: false');
  });
});
