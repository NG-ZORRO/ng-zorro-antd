import { getSystemPath, normalize, virtualFs } from '@angular-devkit/core';
import { TempScopedNodeJsSyncHost } from '@angular-devkit/core/node/testing';
import { HostTree } from '@angular-devkit/schematics';
import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
import * as shx from 'shelljs';
import { SchematicsTestNGConfig, SchematicsTestTsConfig } from '../config';

describe('v9 form components migration', () => {
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

  describe('form components', () => {

    it('should properly report invalid deprecated component', async() => {
      writeFile('/index.ts', `;
      import {Component} from '@angular/core'
      @Component({
        template: \`
        <form nz-form>
          <nz-form-item>
            <nz-form-control>
              <input type="text" placeholder="Username"/>
              <nz-form-explain>Please input your username!
              </nz-form-explain>
              <nz-form-extra>We must make sure that your are a human.</nz-form-extra>
            </nz-form-control>
          </nz-form-item>
        </form>
        \`
      })
      export class MyComp {
        log() {}
      }`);
      await runMigration();

      expect(warnOutput).toContain( 'index.ts@11:15 - Found deprecated "<nz-form-extra>" component. ' +
        'Use "nz-form-control[nzExtra]" to instead please.');
      expect(warnOutput).toContain( 'index.ts@9:15 - Found deprecated "<nz-form-explain>" component. ' +
        'Use "nz-form-control[nzSuccessTip][nzWarningTip][nzErrorTip]..." to instead please.');
    });

  });

});
