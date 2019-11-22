import { getSystemPath, normalize, virtualFs } from '@angular-devkit/core';
import { TempScopedNodeJsSyncHost } from '@angular-devkit/core/node/testing';
import { HostTree } from '@angular-devkit/schematics';
import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
import * as shx from 'shelljs';

describe('icon migration', () => {
  let runner: SchematicTestRunner;
  let host: TempScopedNodeJsSyncHost;
  let tree: UnitTestTree;
  let tmpDirPath: string;
  let previousWorkingDir: string;
  let warnOutput: string[];
  let errorOutput: string[];

  beforeEach(() => {
    runner = new SchematicTestRunner('test', require.resolve('../../../migration.json'));
    host = new TempScopedNodeJsSyncHost();
    tree = new UnitTestTree(new HostTree(host));

    writeFile('/tsconfig.json', JSON.stringify({
      compilerOptions: {
        experimentalDecorators: true,
        lib: ['es2015']
      }
    }));
    writeFile('/angular.json', JSON.stringify({
      projects: {t: {architect: {build: {options: {tsConfig: './tsconfig.json'}}}}}
    }));

    warnOutput = [];
    errorOutput = [];
    runner.logger.subscribe(logEntry => {
      if (logEntry.level === 'warn') {
        warnOutput.push(logEntry.message);
      } else if (logEntry.level === 'error') {
        errorOutput.push(logEntry.message);
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

  describe('Icon', () => {

    it('should rename deprecated input names', async() => {
      writeFile('/index.ts', `
        import {Component} from '@angular/core';
        @Component({template: \`
          <i nz-icon [iconfont]="'value'" [spin]="true" [type]="'play'" theme="o"></i>
        \`})
        export class MyComp {
        }
      `);

      await runMigration();
      const content = tree.readContent('/index.ts');
      expect(content).toContain(`[nzIconfont]="'value'"`);
      expect(content).toContain(`[nzSpin]="true"`);
      expect(content).toContain(`[nzType]="'play'"`);
      expect(content).toContain(`nzTheme="o"`);
    });

    it('should properly report invalid deprecated css selector', async() => {
      writeFile('/index.ts', `;
      import {Component} from '@angular/core'
      @Component({
        template: \`
          <i class="anticon play"></i>
        \`
      })
      export class MyComp {
      }`);
      await runMigration();

      expect(warnOutput).toContain( 'index.ts@5:14 - Found deprecated css selector "i.anticon" component. ' +
        'Use "i[nz-icon]" to instead please.');
    });

  });

});
