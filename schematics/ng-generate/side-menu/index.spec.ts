import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import { Style } from '@schematics/angular/ng-new/schema';
import { getFileContent } from '@schematics/angular/utility/test/get-file-content';

import { Schema as NzOptions } from '../../ng-add/schema';
import { createTestApp } from '../../testing/test-app';

describe('side-menu schematic', () => {
  const defaultOptions: NzOptions = {
    project: 'ng-zorro',
  };

  let runner: SchematicTestRunner;
  let appTree: Tree;

  beforeEach(async () => {
    runner = new SchematicTestRunner('schematics', require.resolve('../../collection.json'));
    appTree = await createTestApp(runner);
  });

  it('should create side-menu files', async () => {
    const options = {...defaultOptions};
    const tree = await runner.runSchematicAsync('sidemenu', options, appTree).toPromise();
    const files = tree.files;
    expect(files).toEqual(
      jasmine.arrayContaining([
        '/projects/ng-zorro/src/app/app.component.html',
        '/projects/ng-zorro/src/app/app.component.css',
        '/projects/ng-zorro/src/app/app.component.ts',
        '/projects/ng-zorro/src/app/app-routing.module.ts',
        '/projects/ng-zorro/src/app/icons-provider.module.ts',
        '/projects/ng-zorro/src/app/pages/welcome/welcome-routing.module.ts',
        '/projects/ng-zorro/src/app/pages/welcome/welcome.module.ts',
        '/projects/ng-zorro/src/app/pages/welcome/welcome.component.ts',
        '/projects/ng-zorro/src/app/pages/welcome/welcome.component.css',
        '/projects/ng-zorro/src/app/pages/welcome/welcome.component.html'
      ])
    );
  });

  it('should set the style preprocessor correctly', async () => {
    const options = {...defaultOptions, style: Style.Less};
    const tree = await runner.runSchematicAsync('sidemenu', options, appTree).toPromise();
    const files = tree.files;
    const appContent = getFileContent(tree, '/projects/ng-zorro/src/app/app.component.ts');
    const welcomeContent = getFileContent(tree, '/projects/ng-zorro/src/app/pages/welcome/welcome.component.ts');

    expect(appContent).toContain('app.component.less');
    expect(welcomeContent).toContain('welcome.component.less');

    expect(files).toEqual(
      jasmine.arrayContaining([
        '/projects/ng-zorro/src/app/app.component.less',
        '/projects/ng-zorro/src/app/pages/welcome/welcome.component.less'
      ])
    );
  });

  it('should fall back to the @schematics/angular:component option value', async () => {
    const options = {...defaultOptions, template: 'sidemenu'};
    appTree = await createTestApp(runner, {style: Style.Less});
    const tree = await runner.runSchematicAsync(
      'ng-add',
      options,
      appTree).toPromise();

    expect(tree.files).toEqual(
      jasmine.arrayContaining([
        '/projects/ng-zorro/src/app/app.component.less',
        '/projects/ng-zorro/src/app/pages/welcome/welcome.component.less'
      ])
    );
  });

  it('should fall back to the @schematics/angular:component option value', async () => {
    const options = {...defaultOptions, template: 'sidemenu'};
    appTree = await createTestApp(runner, {inlineStyle: true});
    const tree = await runner.runSchematicAsync(
      'ng-add',
      options,
      appTree).toPromise();

    expect(tree.files).not.toEqual('/projects/ng-zorro/src/app/pages/welcome/welcome.component.css');
  });

  it('should fall back to the @schematics/angular:component option value', async () => {
    const options = {...defaultOptions, template: 'sidemenu'};
    appTree = await createTestApp(runner, {inlineTemplate: true});
    const tree = await runner.runSchematicAsync(
      'ng-add',
      options,
      appTree).toPromise();

    expect(tree.files).not.toEqual('/projects/ng-zorro/src/app/pages/welcome/welcome.component.html');
  });

  it('should set the prefix correctly', async () => {
    const options = {...defaultOptions, prefix: 'nz'};
    const tree = await runner.runSchematicAsync('sidemenu', options, appTree).toPromise();
    const appContent = getFileContent(tree, '/projects/ng-zorro/src/app/app.component.ts');
    const welcomeContent = getFileContent(tree, '/projects/ng-zorro/src/app/pages/welcome/welcome.component.ts');

    expect(appContent).toContain(`selector: 'nz-root'`);
    expect(welcomeContent).toContain(`selector: 'nz-welcome'`);
  });

});
