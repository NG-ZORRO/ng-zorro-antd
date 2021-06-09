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
    await runner.runSchematicAsync('migration-v11', {}, tree).toPromise();
  }

  describe('nz-tab components', () => {

    it('should properly report deprecated input and output', async() => {
      writeFile('/index.ts', `
      import {Component} from '@angular/core';
      @Component({
        template: \`
          <nz-tabset (nzOnPrevClick)="mockPre()" (nzOnNextClick)="mockNext()" [nzShowPagination]="false">
            <nz-tab nzTitle="Tab 1">
              Content of Tab Pane 1
            </nz-tab>
            <nz-tab nzTitle="Tab 2">
              Content of Tab Pane 2
            </nz-tab>
            <nz-tab nzTitle="Tab 3">
              Content of Tab Pane 3
            </nz-tab>
          </nz-tabset>
        \`
      })
      export class MyComp {
        mockPre(): void {}
        mockNext(): void {}
      }`);
      await runMigration();
      const output = warnOutput.toString();
      expect(output).toContain( '/index.ts@5:23 - Found deprecated output \'(nzOnPrevClick)\'. Please manually remove this output.');
      expect(output).toContain( '/index.ts@5:51 - Found deprecated output \'(nzOnNextClick)\'. Please manually remove this output.');
      expect(output).toContain( '/index.ts@5:80 - Found deprecated input \'[nzShowPagination]\'. Please manually remove this input.');
    });

    it('should properly report deprecated selector', async () => {
      writeFile('/index.ts', `
      import {Component} from '@angular/core';
      @Component({
        template: \`
          <nz-tabset nzLinkRouter>
            <nz-tab>
              <a nz-tab-link [routerLink]="['.']">Default</a>
            </nz-tab>
          </nz-tabset>
        \`
      })
      export class MyComp {
      }`);
      await runMigration();
      const output = warnOutput.toString();
      expect(output).toContain( '/index.ts@7:15 - Found deprecated selector \'a[nz-tab-link]\', please use \'ng-template[nzTabLink] > a[nz-tab-link]\' instead.');
    });
  });

});
