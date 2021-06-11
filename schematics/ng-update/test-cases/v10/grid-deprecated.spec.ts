import { HostTree } from '@angular-devkit/schematics';
import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';

import { createTestApp } from '../../../testing/test-app';
import { SchematicsTestNGConfig, SchematicsTestTsConfig } from '../config';

describe('v10 form components migration', () => {
  let runner: SchematicTestRunner;
  let host: HostTree;
  let tree: UnitTestTree;
  let warnOutput: string[];

  beforeEach(async () => {
    runner = new SchematicTestRunner('test', require.resolve('../../../migration.json'));
    host = new HostTree();
    tree = await createTestApp(runner, {name: 'testing'}, host);
    tree.files.forEach(f => writeFile(f, tree.readContent(f)));
    writeFile('/tsconfig.json', JSON.stringify(SchematicsTestTsConfig));
    writeFile('/angular.json', JSON.stringify(SchematicsTestNGConfig));

    warnOutput = [];
    runner.logger.subscribe(logEntry => {
      if (logEntry.level === 'warn') {
        warnOutput.push(logEntry.message);
      }
    });

  });

  function writeFile(filePath: string, content: string): void {
    if (host.exists(filePath)) {
      host.overwrite(filePath, content);
    } else {
      host.create(filePath, content);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function runMigration(): Promise<any> {
    await runner.runSchematicAsync('migration-v10', {}, tree).toPromise();
  }

  describe('grid/form components', () => {

    it('should properly report deprecated input', async() => {
      writeFile('/index.ts', `;
      import {Component} from '@angular/core'
      @Component({
        template: \`
        <nz-form-item nzFlex></nz-form-item>
        <nz-row nzType="flex"></nz-row>
        <nz-form-item nzType="flex"></nz-form-item>
        \`
      })
      export class MyComp {
      }`);
      await runMigration();
      const output = warnOutput.toString();
      expect(output).toContain( '/index.ts@5:23 - Found deprecated input \'[nzFlex]\'.');
      expect(output).toContain( '/index.ts@6:17 - Found deprecated input \'[nzType]\'.');
      expect(output).toContain( '/index.ts@7:23 - Found deprecated input \'[nzType]\'.');
    });

  });

});
