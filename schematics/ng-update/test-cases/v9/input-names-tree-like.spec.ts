import { getSystemPath, normalize, virtualFs } from '@angular-devkit/core';
import { TempScopedNodeJsSyncHost } from '@angular-devkit/core/node/testing';
import { HostTree } from '@angular-devkit/schematics';
import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
import * as shx from 'shelljs';
import { SchematicsTestNGConfig, SchematicsTestTsConfig } from '../config';

describe('tree-like migration', () => {
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

  function writeFakeAngular(): void { writeFile('/node_modules/@angular/core/index.d.ts', ``); }

  function writeFile(filePath: string, contents: string): void {
    host.sync.write(normalize(filePath), virtualFs.stringToFileBuffer(contents));
  }

  // tslint:disable-next-line:no-any
  async function runMigration(): Promise<any> {
    await runner.runSchematicAsync('migration-v9', {}, tree).toPromise();
  }

  describe('Tree', () => {

    function expectTreeContent(content: string): void {
      expect(content).not.toContain(`[nzDefaultExpandedKeys]="expandKeys"`);
      expect(content).not.toContain(`[nzDefaultCheckedKeys]="checkedKeys"`);
      expect(content).not.toContain(`[nzDefaultSelectedKeys]="selectedKeys"`);
      expect(content).not.toContain(`[nzDefaultExpandAll]="expandDefault"`);
      expect(content).not.toContain(`(nzOnSearchNode)="onSearch($event)"`);
      expect(content).toContain(`[nzExpandedKeys]="expandKeys"`);
      expect(content).toContain(`[nzCheckedKeys]="checkedKeys"`);
      expect(content).toContain(`[nzSelectedKeys]="selectedKeys"`);
      expect(content).toContain(`[nzExpandAll]="expandDefault"`);
      expect(content).toContain(`(nzSearchValueChange)="onSearch($event)"`);
    }

    it('should rename deprecated input names', async() => {
      writeFile('/index.ts', `
        import {Component} from '@angular/core';
        @Component({template: \`
          <nz-tree
            [nzDefaultExpandedKeys]="expandKeys"
            [nzDefaultCheckedKeys]="checkedKeys"
            [nzDefaultSelectedKeys]="selectedKeys"
            [nzDefaultExpandAll]="expandDefault"
            (nzOnSearchNode)="onSearch($event)">
          </nz-tree>
        \`})
        export class MyComp {
          expandKeys = [];
          checkedKeys = [];
          selectedKeys = [];
          expandDefault = [];

          onSearch(e) {
            // noop
          }
        }
      `);

      await runMigration();
      const content = tree.readContent('/index.ts');
      expectTreeContent(content);

    });

    it('should rename deprecated input names in HTML', async() => {
      writeFile('/index.ts', `
      import {Component} from '@angular/core';
      @Component({
        templateUrl: './sub_dir/tmpl.html',
      })
      export class MyComp {
        expandKeys = [];
        checkedKeys = [];
        selectedKeys = [];
        expandDefault = [];

        onSearch(e) {
          // noop
        }
       }
     `);

      writeFile('/sub_dir/tmpl.html', `
        <nz-tree
          [nzDefaultExpandedKeys]="expandKeys"
          [nzDefaultCheckedKeys]="checkedKeys"
          [nzDefaultSelectedKeys]="selectedKeys"
          [nzDefaultExpandAll]="expandDefault"
          (nzOnSearchNode)="onSearch($event)">
        </nz-tree>
      `);
      await runMigration();
      const content = tree.readContent('/sub_dir/tmpl.html');
      expectTreeContent(content);
    });

  });

  describe('Tree Select', () => {

    function expectTreeSelectContent(content: string): void {
      expect(content).not.toContain(`[nzDefaultExpandedKeys]="expandKeys"`);
      expect(content).toContain(`[nzExpandedKeys]="expandKeys"`);
    }

    it('should rename deprecated input names', async() => {
      writeFile('/index.ts', `
        import {Component} from '@angular/core';
        @Component({template: \`
          <nz-tree-select [nzDefaultExpandedKeys]="expandKeys"></nz-tree-select>
        \`})
        export class MyComp {
          expandKeys = [];
        }
      `);

      await runMigration();
      const content = tree.readContent('/index.ts');
      expectTreeSelectContent(content);
    });

    it('should rename deprecated input names in HTML', async() => {
      writeFile('/index.ts', `
      import {Component} from '@angular/core';
      @Component({
        templateUrl: './sub_dir/tmpl.html',
      })
      export class MyComp {
        expandKeys = [];
      }
     `);

      writeFile('/sub_dir/tmpl.html', `
        <nz-tree-select [nzDefaultExpandedKeys]="expandKeys"></nz-tree-select>
      `);
      await runMigration();
      const content = tree.readContent('/sub_dir/tmpl.html');
      expectTreeSelectContent(content);
    });

  });

});
