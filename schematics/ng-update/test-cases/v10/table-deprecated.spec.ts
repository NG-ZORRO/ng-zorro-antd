import { getSystemPath, normalize, virtualFs } from '@angular-devkit/core';
import { TempScopedNodeJsSyncHost } from '@angular-devkit/core/node/testing';
import { HostTree } from '@angular-devkit/schematics';
import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
import * as shx from 'shelljs';
import { SchematicsTestNGConfig, SchematicsTestTsConfig } from '../config';

describe('v10 table components migration', () => {
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

  function writeFakeAngular(): void { writeFile('/node_modules/@angular/core/index.d.ts', ``); }

  function writeFile(filePath: string, contents: string): void {
    host.sync.write(normalize(filePath), virtualFs.stringToFileBuffer(contents));
  }

  // tslint:disable-next-line:no-any
  async function runMigration(): Promise<any> {
    await runner.runSchematicAsync('migration-v10', {}, tree).toPromise();
  }

  describe('table component', () => {

    it('should properly report deprecated input', async() => {
      writeFile('/index.ts', `;
      import {Component} from '@angular/core'
      @Component({
        template: \`
        <table>
          <thead nzSingleSort (nzSortChange)="change()">
            <th nzSortKey="key" nzSort="ascend" (nzSortChange)="change()"></th>
          </thead>
        </table>
        \`
      })
      export class MyComp {
        change() {}
      }`);
      await runMigration();
      const output = warnOutput.toString();
      const content = tree.readContent('/index.ts');

      expect(output).toContain( '/index.ts@6:18 - Found deprecated input \'thead[nzSingleSort]\'.');
      expect(output).toContain( '/index.ts@7:17 - Found deprecated input \'th[nzSortKey]\'.');

      expect(content).toContain(`<table>
          <thead nzSingleSort (nzSortOrderChange)="change()">
            <th nzSortKey="key" nzSortOrder="ascend" (nzSortOrderChange)="change()"></th>
          </thead>
        </table>`)
    });

  });

});
