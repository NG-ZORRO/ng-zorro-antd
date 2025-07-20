/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';

import { Schema as NzOptions } from '../../ng-add/schema';
import { createTestApp } from '../../testing/test-app';

describe('[schematic] ng-generate', () => {
  const defaultOptions: NzOptions = {
    project: 'ng-zorro',
  };
  let runner: SchematicTestRunner;
  let appTree: Tree;

  beforeEach(async () => {
    runner = new SchematicTestRunner('schematics', require.resolve('../../collection.json'));
    appTree = await createTestApp(runner);
  });

  it('should update app.html', async () => {
    const options = {...defaultOptions};
    const appComponentHTMLPath = '/projects/ng-zorro/src/app/app.html';
    const tree = await runner.runSchematic('blank', options, appTree);
    const appComponentHTML = tree.readContent(appComponentHTMLPath);
    const files = tree.files;

    expect(files).toEqual(jasmine.arrayContaining([ appComponentHTMLPath ]));
    expect(appComponentHTML).toContain('href="https://github.com/NG-ZORRO/ng-zorro-antd"');
  });
});
