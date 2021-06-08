import { getSystemPath, normalize, virtualFs } from '@angular-devkit/core';
import { TempScopedNodeJsSyncHost } from '@angular-devkit/core/node/testing';
import { HostTree } from '@angular-devkit/schematics';
import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
import * as shx from 'shelljs';
import { SchematicsTestNGConfig, SchematicsTestTsConfig } from '../config';

describe('upload migration', () => {
  let runner: SchematicTestRunner;
  let host: TempScopedNodeJsSyncHost;
  let tree: UnitTestTree;
  let tmpDirPath: string;
  let previousWorkingDir: string;

  beforeEach(() => {
    runner = new SchematicTestRunner('test', require.resolve('../../../migration.json'));
    host = new TempScopedNodeJsSyncHost();
    tree = new UnitTestTree(new HostTree(host));

    writeFile('/tsconfig.json', JSON.stringify(SchematicsTestTsConfig));
    writeFile('/angular.json', JSON.stringify(SchematicsTestNGConfig));

    previousWorkingDir = shx.pwd();
    tmpDirPath = getSystemPath(host.root);

    shx.cd(tmpDirPath);

    writeFakeAngular();
  });

  afterEach(() => {
    shx.cd(previousWorkingDir);
    shx.rm('-r', tmpDirPath);
  });

  function writeFakeAngular(): void {
 writeFile('/node_modules/@angular/core/index.d.ts', ``);
}

  function writeFile(filePath: string, contents: string): void {
    host.sync.write(normalize(filePath), virtualFs.stringToFileBuffer(contents));
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function runMigration(): Promise<any> {
    await runner.runSchematicAsync('migration-v10', {}, tree).toPromise();
  }

  describe('Property names', () => {

    it('should replace deprecated property names', async() => {
      writeFile('/index.ts', `
export interface NzNotificationDataOptions {
  nzPlacement?: any;
  nzPosition?: any;
}
const option: NzNotificationDataOptions = {};
console.log(option.nzPosition);`);

      await runMigration();
      const content = tree.readContent('/index.ts');

      expect(content).toContain(`console.log(option.nzPlacement)`);
      expect(content).not.toContain(`console.log(option.nzPosition)`);
    });

  });

});
