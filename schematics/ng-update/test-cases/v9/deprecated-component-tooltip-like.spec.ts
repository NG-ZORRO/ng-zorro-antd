import { getSystemPath, normalize, virtualFs } from '@angular-devkit/core';
import { TempScopedNodeJsSyncHost } from '@angular-devkit/core/node/testing';
import { HostTree } from '@angular-devkit/schematics';
import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
import * as shx from 'shelljs';
import { SchematicsTestNGConfig, SchematicsTestTsConfig } from '../config';

describe('tooltip-like migration', () => {
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
    await runner.runSchematicAsync('migration-v9', {}, tree).toPromise();
  }

  describe('Tooltip, Popconfirm, Popover', () => {

    it('should  properly report invalid deprecated component in TS file', async() => {
      writeFile('/index.ts', `;
      import {Component} from '@angular/core'
      @Component({
        template: \`
          <nz-tooltip nzTitle="title"></nz-tooltip>
          <nz-popover nzTitle="title"></nz-popover>
          <nz-popconfirm nzTitle="title"></nz-popconfirm>
        \`
      })
      export class MyComp {
      }`);
      await runMigration();

      expect(warnOutput).toContain( 'index.ts@5:11 - Found deprecated "<nz-tooltip>" ' +
        'component. Use "[nz-tooltip]" to instead please.');
      expect(warnOutput).toContain( 'index.ts@6:11 - Found deprecated "<nz-popover>" ' +
        'component. Use "[nz-popover]" to instead please.');
      expect(warnOutput).toContain(  'index.ts@7:11 - Found deprecated "<nz-popconfirm>" ' +
        'component. Use "[nz-popconfirm]" to instead please.'
      );
    });

    it('should  properly report invalid deprecated component in HTML', async() => {
      writeFile('/index.ts', `
      import {Component} from '@angular/core';
      @Component({
        templateUrl: './sub_dir/tmpl.html',
      })
      export class MyComp {}
     `);

      writeFile('/sub_dir/tmpl.html', `
      <nz-tooltip nzTitle="title"></nz-tooltip>
      <nz-popover nzTitle="title"></nz-popover>
      <nz-popconfirm nzTitle="title"></nz-popconfirm>
      `);

      await runMigration();

      expect(warnOutput).toContain( 'sub_dir/tmpl.html@2:7 - Found deprecated "<nz-tooltip>" ' +
        'component. Use "[nz-tooltip]" to instead please.');
      expect(warnOutput).toContain( 'sub_dir/tmpl.html@3:7 - Found deprecated "<nz-popover>" ' +
        'component. Use "[nz-popover]" to instead please.');
      expect(warnOutput).toContain(  'sub_dir/tmpl.html@4:7 - Found deprecated "<nz-popconfirm>" ' +
        'component. Use "[nz-popconfirm]" to instead please.'
      );
    });

  });

});
