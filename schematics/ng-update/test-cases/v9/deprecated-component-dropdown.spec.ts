import { getSystemPath, normalize, virtualFs } from '@angular-devkit/core';
import { TempScopedNodeJsSyncHost } from '@angular-devkit/core/node/testing';
import { HostTree } from '@angular-devkit/schematics';
import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
import * as shx from 'shelljs';
import { SchematicsTestNGConfig, SchematicsTestTsConfig } from '../config';

describe('dropdown components migration', () => {
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

  describe('dropdown components', () => {

    it('should properly report invalid deprecated component', async() => {
      writeFile('/index.ts', `;
      import {Component} from '@angular/core'
      @Component({
        template: \`
        <nz-dropdown>
          <a nz-dropdown> Hover me <i nz-icon type="down"></i> </a>
          <ul nz-menu nzSelectable>
            <li nz-menu-item>
              <a>1st menu item</a>
            </li>
          </ul>
        </nz-dropdown>
        <nz-dropdown-button (nzClick)="log()">
          DropDown
          <ul nz-menu>
            <li nz-menu-item>2nd menu item</li>
            <li nz-submenu>
              <span title>sub menu</span>
              <ul>
                <li nz-menu-item>3rd menu item</li>
              </ul>
            </li>
          </ul>
        </nz-dropdown-button>
        \`
      })
      export class MyComp {
        log() {}
      }`);
      await runMigration();

      expect(warnOutput).toContain( 'index.ts@5:9 - Found deprecated "<nz-dropdown>" component. ' +
        'Use "[nz-dropdown]" to instead please.');
      expect(warnOutput).toContain( 'index.ts@13:9 - Found deprecated "<nz-dropdown-button>" component. ' +
        'Use "[nz-dropdown]" to instead please.');
    });

  });

});
