import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import { Style } from '@schematics/angular/ng-new/schema';
import { getFileContent } from '@schematics/angular/utility/test';
import { createTestApp } from '../../testing/test-app';

describe('top-nav schematic', () => {
  let runner: SchematicTestRunner;
  let appTree: Tree;

  beforeEach(async () => {
    runner = new SchematicTestRunner('schematics', require.resolve('../../collection.json'));
    appTree = await createTestApp(runner, {name: 'ng-zorro-top-nav'});
  });

  it('should create top-nav files', async () => {
    const tree = await runner.runSchematicAsync('topnav', {}, appTree).toPromise();
    const files = tree.files;
    expect(files).toEqual(
      jasmine.arrayContaining([
        '/projects/ng-zorro-top-nav/src/app/app.component.html',
        '/projects/ng-zorro-top-nav/src/app/app.component.css',
        '/projects/ng-zorro-top-nav/src/app/app.component.ts',
        '/projects/ng-zorro-top-nav/src/app/app-routing.module.ts',
        '/projects/ng-zorro-top-nav/src/app/pages/welcome/welcome-routing.module.ts',
        '/projects/ng-zorro-top-nav/src/app/pages/welcome/welcome.module.ts',
        '/projects/ng-zorro-top-nav/src/app/pages/welcome/welcome.component.ts',
        '/projects/ng-zorro-top-nav/src/app/pages/welcome/welcome.component.css',
        '/projects/ng-zorro-top-nav/src/app/pages/welcome/welcome.component.html'
      ])
    );
  });

  it('should set the style preprocessor correctly', async () => {
    const tree = await runner.runSchematicAsync('topnav', {style: Style.Less}, appTree).toPromise();
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
    const tree = await runner.runSchematicAsync('topnav', {prefix: 'nz'}, appTree).toPromise();
    const appContent = getFileContent(tree, '/projects/ng-zorro-top-nav/src/app/app.component.ts');
    const welcomeContent = getFileContent(tree, '/projects/ng-zorro-top-nav/src/app/pages/welcome/welcome.component.ts');

    expect(appContent).toContain(`selector: 'nz-root'`);
    expect(welcomeContent).toContain(`selector: 'nz-welcome'`);
  });

});
