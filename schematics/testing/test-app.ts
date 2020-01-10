import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';

/** Create a base app used for testing. */
// tslint:disable-next-line:no-any
export async function createTestApp(runner: SchematicTestRunner, appOptions: any = {}, tree?: Tree):
  Promise<UnitTestTree> {
  const workspaceTree = await runner.runExternalSchematicAsync('@schematics/angular', 'workspace', {
    name: 'workspace',
    version: '6.0.0',
    newProjectRoot: 'projects'
  }, tree).toPromise();

  return runner.runExternalSchematicAsync('@schematics/angular', 'application',
    {name: 'ng-zorro', ...appOptions}, workspaceTree).toPromise();
}
