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

  describe('Popconfirm', () => {

    it('should rename deprecated input names in ts', async() => {
      writeFile('/index.ts', `
        import {Component} from '@angular/core';
        @Component({template: \`
          <div nz-popconfirm [nzTitle]="title" nzTrigger="click" nzPlacement="top"></div>
        \`})
        export class MyComp {
          title = 'title'
        }
      `);

      await runMigration();
      const content = tree.readContent('/index.ts');
      expect(content).toContain(`[nzPopconfirmTitle]="title"`);
      expect(content).toContain(`nzPopconfirmTrigger="click"`);
      expect(content).toContain(`nzPopconfirmPlacement="top"`);
    });

    it('should rename deprecated input names in HTML', async() => {
      writeFile('/index.ts', `
      import {Component} from '@angular/core';
      @Component({
        templateUrl: './sub_dir/tmpl.html',
      })
      export class MyComp {}
     `);

      writeFile('/sub_dir/tmpl.html', `
        <div nz-popconfirm [nzTitle]="title" nzTrigger="click" nzPlacement="top"></div>
      `);
      await runMigration();
      const content = tree.readContent('/sub_dir/tmpl.html');
      expect(content).toContain(`[nzPopconfirmTitle]="title"`);
      expect(content).toContain(`nzPopconfirmTrigger="click"`);
      expect(content).toContain(`nzPopconfirmPlacement="top"`);
    });

  });

  describe('Tooltip', () => {

    it('should rename deprecated input names', async() => {
      writeFile('/index.ts', `
        import {Component} from '@angular/core';
        @Component({template: \`
          <div nz-tooltip [nzTitle]="title" nzTrigger="click" nzPlacement="top"></div>
        \`})
        export class MyComp {
          title = 'title'
        }
      `);

      await runMigration();
      const content = tree.readContent('/index.ts');
      expect(content).toContain(`[nzTooltipTitle]="title"`);
      expect(content).toContain(`nzTooltipTrigger="click"`);
      expect(content).toContain(`nzTooltipPlacement="top"`);
    });

    it('should rename deprecated input names in HTML', async() => {
      writeFile('/index.ts', `
      import {Component} from '@angular/core';
      @Component({
        templateUrl: './sub_dir/tmpl.html',
      })
      export class MyComp {}
     `);

      writeFile('/sub_dir/tmpl.html', `
        <div nz-tooltip [nzTitle]="title" nzTrigger="click" nzPlacement="top"></div>
      `);
      await runMigration();
      const content = tree.readContent('/sub_dir/tmpl.html');
      expect(content).toContain(`[nzTooltipTitle]="title"`);
      expect(content).toContain(`nzTooltipTrigger="click"`);
      expect(content).toContain(`nzTooltipPlacement="top"`);
    });

  });

  describe('Popover', () => {

    it('should rename deprecated input names', async() => {
      writeFile('/index.ts', `
        import {Component} from '@angular/core';
        @Component({template: \`
          <div nz-popover [nzTitle]="title" [nzContent]="content" nzTrigger="click" nzPlacement="top"></div>
          <ng-template #content>
          content
          </ng-template>
        \`})
        export class MyComp {
          title = 'title'
        }
      `);

      await runMigration();
      const content = tree.readContent('/index.ts');
      expect(content).toContain(`[nzPopoverTitle]="title"`);
      expect(content).toContain(`[nzPopoverContent]="content"`);
      expect(content).toContain(`nzPopoverTrigger="click"`);
      expect(content).toContain(`nzPopoverPlacement="top"`);
    });

    it('should rename deprecated input names in HTML', async() => {
      writeFile('/index.ts', `
      import {Component} from '@angular/core';
      @Component({
        templateUrl: './sub_dir/tmpl.html',
      })
      export class MyComp {}
     `);

      writeFile('/sub_dir/tmpl.html', `
      <div nz-popover [nzTitle]="title" [nzContent]="content" nzTrigger="click" nzPlacement="top"></div>
      <ng-template #content>
      content
      </ng-template>
      `);
      await runMigration();
      const content = tree.readContent('/sub_dir/tmpl.html');
      expect(content).toContain(`[nzPopoverTitle]="title"`);
      expect(content).toContain(`[nzPopoverContent]="content"`);
      expect(content).toContain(`nzPopoverTrigger="click"`);
      expect(content).toContain(`nzPopoverPlacement="top"`);
    });

  });

});
