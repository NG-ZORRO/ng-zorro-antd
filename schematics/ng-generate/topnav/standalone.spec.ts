import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import { Style } from '@schematics/angular/ng-new/schema';


import { Schema as NzOptions } from '../../ng-add/schema';
import { createTestApp } from '../../testing/test-app';
import { getFileContent } from '../../utils/get-file-content';

describe('[standalone] top-nav schematic', () => {
  const defaultOptions: NzOptions = {
    project: 'ng-zorro-top-nav',
  };
  let runner: SchematicTestRunner;
  let appTree: Tree;

  beforeEach(async () => {
    runner = new SchematicTestRunner('schematics', require.resolve('../../collection.json'));
    appTree = await createTestApp(runner, {name: 'ng-zorro-top-nav'});
  });

  it('should create top-nav files', async () => {
    const options = {...defaultOptions};

    const tree = await runner.runSchematic('topnav', options, appTree);
    const files = tree.files;
    expect(files).toEqual(
      jasmine.arrayContaining([
        '/projects/ng-zorro-top-nav/src/app/app.component.html',
        '/projects/ng-zorro-top-nav/src/app/app.component.css',
        '/projects/ng-zorro-top-nav/src/app/app.component.ts',
        '/projects/ng-zorro-top-nav/src/app/app.routes.ts',
        '/projects/ng-zorro-top-nav/src/app/pages/welcome/welcome.component.ts',
        '/projects/ng-zorro-top-nav/src/app/pages/welcome/welcome.component.css',
        '/projects/ng-zorro-top-nav/src/app/pages/welcome/welcome.component.html',
        '/projects/ng-zorro-top-nav/src/app/pages/welcome/welcome.routes.ts'
      ])
    );
  });

  it('should fall back to the @schematics/angular:component option value', async () => {
    const options = {...defaultOptions};
    const tree = await runner.runSchematic('topnav', options, appTree);
    const appContent = getFileContent(tree, '/projects/ng-zorro-top-nav/src/app/app.component.ts');

    expect(tree.exists('/projects/material/src/app/app.module.ts')).toBe(false);

    expect(appContent).toContain('standalone: true');
    expect(appContent).toContain('imports: [');
  });

  it('should set the style preprocessor correctly', async () => {
    const options = {...defaultOptions, style: Style.Less};

    const tree = await runner.runSchematic('topnav', options, appTree);
    const files = tree.files;
    const appContent = getFileContent(tree, '/projects/ng-zorro-top-nav/src/app/app.component.ts');
    const welcomeContent = getFileContent(tree, '/projects/ng-zorro-top-nav/src/app/pages/welcome/welcome.component.ts');

    expect(appContent).toContain('app.component.less');
    expect(welcomeContent).toContain('welcome.component.less');

    expect(files).toEqual(
      jasmine.arrayContaining([
        '/projects/ng-zorro-top-nav/src/app/app.component.less',
        '/projects/ng-zorro-top-nav/src/app/pages/welcome/welcome.component.less'
      ])
    );
  });

  it('should set the prefix correctly', async () => {
    const options = {...defaultOptions, prefix: 'nz'};
    const tree = await runner.runSchematic('topnav', options, appTree);
    const appContent = getFileContent(tree, '/projects/ng-zorro-top-nav/src/app/app.component.ts');
    const welcomeContent = getFileContent(tree, '/projects/ng-zorro-top-nav/src/app/pages/welcome/welcome.component.ts');

    expect(appContent).toContain(`selector: 'nz-root'`);
    expect(welcomeContent).toContain(`selector: 'nz-welcome'`);
  });
});
