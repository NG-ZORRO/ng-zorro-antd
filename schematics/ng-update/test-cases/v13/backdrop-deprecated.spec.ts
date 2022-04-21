import { getSystemPath, normalize, virtualFs } from '@angular-devkit/core';
import { TempScopedNodeJsSyncHost } from '@angular-devkit/core/node/testing';
import { HostTree } from '@angular-devkit/schematics';
import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
import * as shx from 'shelljs';

import { SchematicsTestNGConfig, SchematicsTestTsConfig } from '../config';

describe('nzBackdrop migration', () => {
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
    await runner.runSchematicAsync('migration-v13', {}, tree).toPromise();
  }

  describe('nz-dropdown directive', () => {

    it('should be replace deprecated input', async () => {
      writeFile('/index.ts', `
      import {Component} from '@angular/core';
      @Component({
        template: \`
      <button nz-dropdown nzHasBackdrop> Test </button>
      <button nz-dropdown [nzHasBackdrop]="false"> Test </button>
        \`
      })
      export class MyComp {
      }`);

      await runMigration();

      expect(tree.readContent("/index.ts")).toEqual(`
      import {Component} from '@angular/core';
      @Component({
        template: \`
      <button nz-dropdown nzBackdrop> Test </button>
      <button nz-dropdown [nzBackdrop]="false"> Test </button>
        \`
      })
      export class MyComp {
      }`)
    });
  });

  describe('nz-filter-trigger component', () => {

    it('should be replace deprecated input', async () => {
      writeFile('/index.ts', `
      import {Component} from '@angular/core';
      @Component({
        template: \`
      <nz-filter-trigger nzHasBackdrop> Test </nz-filter-trigger>
      <nz-filter-trigger [nzHasBackdrop]="false"> Test </nz-filter-trigger>
        \`
      })
      export class MyComp {
      }`);

      await runMigration();

      expect(tree.readContent("/index.ts")).toEqual(`
      import {Component} from '@angular/core';
      @Component({
        template: \`
      <nz-filter-trigger nzBackdrop> Test </nz-filter-trigger>
      <nz-filter-trigger [nzBackdrop]="false"> Test </nz-filter-trigger>
        \`
      })
      export class MyComp {
      }`)
    });
  });

});
