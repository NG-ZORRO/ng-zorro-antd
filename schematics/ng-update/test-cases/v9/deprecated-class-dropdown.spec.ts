import { getSystemPath, normalize, virtualFs } from '@angular-devkit/core';
import { TempScopedNodeJsSyncHost } from '@angular-devkit/core/node/testing';
import { HostTree } from '@angular-devkit/schematics';
import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
import * as shx from 'shelljs';

import { SchematicsTestNGConfig, SchematicsTestTsConfig } from '../config';

describe('dropdown class migration', () => {
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

  describe('dropdown class', () => {

    it('should properly report invalid deprecated class', async() => {
      writeFile('/index.ts', `
      import { Component, TemplateRef } from '@angular/core';
      import { NzDropdownContextComponent, NzDropdownService, NzMenuItemDirective } from 'ng-zorro-antd';

      @Component({
        selector: 'nz-demo-dropdown-context-menu',
        template: \`
          <div
            style="background: rgb(190, 200, 200); padding: 32px;text-align: center"
            (contextmenu)="contextMenu($event, template)"
          >
            <ng-template #template>
              <ul nz-menu nzInDropDown (nzClick)="close($event)">
                <li nz-menu-item>1st menu item</li>
                <li nz-submenu>
                  <span title>sub menu</span>
                  <ul>
                    <li nz-menu-item>4th menu item</li>
                  </ul>
                </li>
              </ul>
            </ng-template>
            <span style="color:#fff;font-size: 14px;">Context Menu</span>
          </div>
        \`,
        styles: []
      })
      export class NzDemoDropdownContextMenuComponent {
        private dropdown: NzDropdownContextComponent;

        contextMenu($event: MouseEvent, template: TemplateRef<void>): void {
          this.dropdown = this.nzDropdownService.create($event, template);
        }

        close(e: NzMenuItemDirective): void {
          console.log(e);
          this.dropdown.close();
        }

        constructor(private nzDropdownService: NzDropdownService) {}
      }`);
      await runMigration();

      const messages = [
        'index.ts@3:16 - Found "NzDropdownContextComponent" which has been removed. Your code need to be updated.',
        'index.ts@3:44 - Found usage of "NzDropdownService" which has been removed. Please use "NzContextMenuService" ' +
        'instead.',
        'index.ts@29:27 - Found "NzDropdownContextComponent" which has been removed. Your code need to be updated.',
        'index.ts@40:48 - Found usage of "NzDropdownService" which has been removed. Please use "NzContextMenuService" ' +
        'instead.'
      ];

      messages.forEach(message => {
        expect(warnOutput).toContain( message);
      })
    });

  });

});
