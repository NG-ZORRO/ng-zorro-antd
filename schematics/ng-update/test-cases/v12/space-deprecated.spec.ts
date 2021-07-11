import { getSystemPath, normalize, virtualFs } from '@angular-devkit/core';
import { TempScopedNodeJsSyncHost } from '@angular-devkit/core/node/testing';
import { HostTree } from '@angular-devkit/schematics';
import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
import * as shx from 'shelljs';

import { SchematicsTestNGConfig, SchematicsTestTsConfig } from '../config';

describe('tabs migration', () => {
  let runner: SchematicTestRunner;
  let host: TempScopedNodeJsSyncHost;
  let tree: UnitTestTree;
  let tmpDirPath: string;
  let previousWorkingDir: string;
  let warnOutput: string[];

  beforeEach(() => {
    runner = new SchematicTestRunner('test', require.resolve('../../../migration.json'));
    host = new TempScopedNodeJsSyncHost();
    tree = new UnitTestTree(new HostTree(host));

    writeFile('/tsconfig.json', JSON.stringify(SchematicsTestTsConfig));
    writeFile('/angular.json', JSON.stringify(SchematicsTestNGConfig));

    warnOutput = [];
    runner.logger.subscribe(logEntry => {
      if (logEntry.level === 'warn') {
        warnOutput.push(logEntry.message);
      }
    });

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
    await runner.runSchematicAsync('migration-v12', {}, tree).toPromise();
  }

  describe('nz-space components', () => {

    it('should properly report deprecated component', async () => {
      writeFile('/index.ts', `
      import {Component} from '@angular/core';
      @Component({
        template: \`
          <nz-space>
            <nz-space-item>
              foo
            </nz-space-item>
          </nz-tabset>
        \`
      })
      export class MyComp {
      }`);
      await runMigration();
      const output = warnOutput.toString();
      expect(output).toContain( '/index.ts@6:13 - Found deprecated component \'nz-space-item\', please use \'ng-template[nzSpaceItem] instead.');
    });
  });

});
