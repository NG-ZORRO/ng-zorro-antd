/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';

/** Create a base app used for testing. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createTestApp(runner: SchematicTestRunner, appOptions: any = {}, tree?: Tree):
  Promise<UnitTestTree> {
  const workspaceTree = await runner.runExternalSchematic('@schematics/angular', 'workspace', {
    name: 'workspace',
    version: '6.0.0',
    newProjectRoot: 'projects'
  }, tree);

  return runner.runExternalSchematic('@schematics/angular', 'application',
    {name: 'ng-zorro', ...appOptions}, workspaceTree);
}
