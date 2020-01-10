import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import { Style } from '@schematics/angular/ng-new/schema';
import { getFileContent } from '@schematics/angular/utility/test';
import { createTestApp } from '../../testing/test-app';

describe('side-menu schematic', () => {
  let runner: SchematicTestRunner;
  let appTree: Tree;

  beforeEach(async () => {
    runner = new SchematicTestRunner('schematics', require.resolve('../../collection.json'));
    appTree = await createTestApp(runner);
  });

  it('should create side-menu files', async () => {
    const tree = await runner.runSchematicAsync('sidemenu', {}, appTree).toPromise();
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
    const tree = await runner.runSchematicAsync('sidemenu', {style: Style.Less}, appTree).toPromise();
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
    appTree = await createTestApp(runner, {style: Style.Less});
    await runner.runSchematicAsync(
      'ng-add',
      {template: 'sidemenu'},
      appTree).toPromise();

    // tslint:disable-next-line:no-any
    const sideMenuSchematic = runner.tasks.find(task => task.name === 'run-schematic' && (task.options as any).name  && (task.options as any).name! === 'sidemenu');
    expect(sideMenuSchematic).toBeDefined();

    // tslint:disable-next-line:no-any
    const sideMenuSchematicOption = (sideMenuSchematic.options as any).options;
    expect(sideMenuSchematicOption).toBeDefined();
    expect(sideMenuSchematicOption.template).toBe('sidemenu');
    expect(sideMenuSchematicOption.style).toBe(Style.Less);

  });

  it('should set the prefix correctly', async () => {
    const tree = await runner.runSchematicAsync('sidemenu', {prefix: 'nz'}, appTree).toPromise();
    const appContent = getFileContent(tree, '/projects/ng-zorro/src/app/app.component.ts');
    const welcomeContent = getFileContent(tree, '/projects/ng-zorro/src/app/pages/welcome/welcome.component.ts');

    expect(appContent).toContain(`selector: 'nz-root'`);
    expect(welcomeContent).toContain(`selector: 'nz-welcome'`);
  });

});
