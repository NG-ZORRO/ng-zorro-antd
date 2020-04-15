import { getSystemPath, normalize, virtualFs } from '@angular-devkit/core';
import { TempScopedNodeJsSyncHost } from '@angular-devkit/core/node/testing';
import { HostTree } from '@angular-devkit/schematics';
import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
import * as shx from 'shelljs';
import { SchematicsTestNGConfig, SchematicsTestTsConfig } from '../config';

describe('injection tokens migration', () => {
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

  describe('Injection Tokens', () => {

    it('should properly report invalid deprecated injection tokens', async() => {
      writeFile('/index.ts', `
      import { NZ_NOTIFICATION_CONFIG, NZ_MESSAGE_CONFIG, NZ_DEFAULT_EMPTY_CONTENT } from 'ng-zorro-antd';

      `);
      await runMigration();

      const tokensWarn = [
        'index.ts@2:16 - Found deprecated symbol "NZ_NOTIFICATION_CONFIG" which has been removed. Use global config to ' +
        'instead please.',
        'index.ts@2:40 - Found deprecated symbol "NZ_MESSAGE_CONFIG" which has been removed. Use global config to ' +
        'instead please.',
        'index.ts@2:59 - Found deprecated symbol "NZ_DEFAULT_EMPTY_CONTENT" which has been removed. Use global config ' +
        'to instead please.'
      ];

      tokensWarn.forEach(warn => {
        expect(warnOutput).toContain(warn);
      });
    });

    it('should properly report invalid deprecated injection tokens whit secondary entry', async() => {
      writeFile('/index.ts', `
      import { NZ_NOTIFICATION_CONFIG} from 'ng-zorro-antd/notification';
      import { NZ_DEFAULT_EMPTY_CONTENT } from 'ng-zorro-antd/empty';
      import { NZ_MESSAGE_CONFIG } from 'ng-zorro-antd/message';
      import { NZ_ICON_DEFAULT_TWOTONE_COLOR } from 'ng-zorro-antd';

      `);
      await runMigration();

      const tokensWarn = [
        'index.ts@2:16 - Found deprecated symbol "NZ_NOTIFICATION_CONFIG" which has been removed. Use global config ' +
        'to instead please.',
        'index.ts@3:16 - Found deprecated symbol "NZ_DEFAULT_EMPTY_CONTENT" which has been removed. Use global config ' +
        'to instead please.',
        'index.ts@4:16 - Found deprecated symbol "NZ_MESSAGE_CONFIG" which has been removed. Use global config to ' +
        'instead please.',
        'index.ts@5:16 - Found deprecated symbol "NZ_ICON_DEFAULT_TWOTONE_COLOR" which has been removed. Use global config to ' +
        'instead please.'
      ];

      tokensWarn.forEach(warn => {
        expect(warnOutput).toContain(warn);
      });
    });

    it('should not report invalid deprecated injection tokens in other package', async() => {
      writeFile('/index.ts', `
      import { NZ_NOTIFICATION_CONFIG} from 'other/notification';
      import { NZ_DEFAULT_EMPTY_CONTENT } from 'other/empty';
      import { NZ_MESSAGE_CONFIG } from 'other/message';
      import { NZ_NOTIFICATION_CONFIG, NZ_MESSAGE_CONFIG, NZ_DEFAULT_EMPTY_CONTENT } from 'other';

      `);
      await runMigration();

      expect(warnOutput.length).toBe(0);
    });

  });

});
