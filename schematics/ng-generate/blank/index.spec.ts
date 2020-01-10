import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import { createTestApp } from '../../testing/test-app';

describe('ng-component schematic', () => {
  let runner: SchematicTestRunner;
  let appTree: Tree;

  beforeEach(async () => {
    runner = new SchematicTestRunner('schematics', require.resolve('../../collection.json'));
    appTree = await createTestApp(runner);
  });

  it('should update app.component.html', async () => {
    const appComponentHTMLPath = '/projects/ng-zorro/src/app/app.component.html';
    const tree = await runner.runSchematicAsync('blank', {}, appTree).toPromise();
    const appComponentHTML = tree.readContent(appComponentHTMLPath);
    const files = tree.files;

    expect(files).toEqual(jasmine.arrayContaining([ appComponentHTMLPath ]));

    expect(appComponentHTML).toContain('href="https://github.com/NG-ZORRO/ng-zorro-antd"');
  });

});
