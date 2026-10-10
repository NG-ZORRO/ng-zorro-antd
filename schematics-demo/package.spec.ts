/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import { beforeAll, describe, expect, it } from 'vitest';

import { execFileSync } from 'child_process';
import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';

interface Collection {
  schematics: Record<string, { factory: string; schema: string }>;
}

const packageDir = resolve('dist/antd-schematics');
const mainDir = resolve('dist/schematics');
const readJson = (path: string): unknown => JSON.parse(readFileSync(path, 'utf8'));

describe('optional demo schematic package', () => {
  let runner: SchematicTestRunner;
  let workspace: Tree;

  beforeAll(async () => {
    runner = new SchematicTestRunner('@ng-zorro/schematics', resolve(packageDir, 'collection.json'));
    const tree = await runner.runExternalSchematic('@schematics/angular', 'workspace', {
      name: 'workspace',
      version: '22.0.0',
      newProjectRoot: 'projects'
    });
    workspace = await runner.runExternalSchematic(
      '@schematics/angular',
      'application',
      { name: 'app', standalone: true, skipInstall: true },
      tree
    );
  });

  it('keeps demo registrations and dependencies out of the main package', () => {
    const main = readJson(resolve(mainDir, 'collection.json')) as Collection;
    const demos = readJson(resolve(packageDir, 'collection.json')) as Collection;
    expect(Object.keys(demos.schematics).length).toBeGreaterThan(0);
    expect(Object.keys(demos.schematics).filter(name => name in main.schematics)).toEqual([]);
    expect(existsSync(resolve(mainDir, 'demo'))).toBe(false);
    expect(main.schematics).toHaveProperty('ng-add');
    expect(main.schematics).toHaveProperty('component');
    expect(existsSync(resolve(mainDir, 'migration.json'))).toBe(true);
    const library = readJson(resolve('components/package.json'));
    expect(JSON.stringify(library)).not.toContain('@ng-zorro/schematics');
  });

  it('packs every registered factory, schema and template with its own runtime helper', () => {
    const [packed] = JSON.parse(
      execFileSync('npm', ['pack', packageDir, '--dry-run', '--json', '--ignore-scripts'], { encoding: 'utf8' })
    ) as Array<{ files: Array<{ path: string }> }>;
    const files = new Set(packed.files.map(file => file.path));
    const collection = readJson(resolve(packageDir, 'collection.json')) as Collection;
    for (const entry of Object.values(collection.schematics)) {
      expect(files.has(`${entry.factory.replace('./', '')}/index.js`)).toBe(true);
      expect(files.has(entry.schema.replace('./', ''))).toBe(true);
      expect(
        files.has(
          `${entry.factory.replace('./', '')}/files/__path__/__name@dasherize@if-flat__/__name@dasherize__.component.ts.template`
        )
      ).toBe(true);
    }
    expect(files.has('utils/build-component.js')).toBe(true);
    expect(files.has('README.md')).toBe(true);
    expect(files.has('LICENSE')).toBe(true);
    expect([...files].some(file => file.endsWith('.spec.js') || file.endsWith('.map'))).toBe(false);
    const pkg = readJson(resolve(packageDir, 'package.json')) as {
      version: string;
      type: string;
      dependencies: Record<string, string>;
    };
    const sourcePackage = readJson(resolve('schematics-demo/package.json')) as { version: string };
    expect(pkg.version).toBe(sourcePackage.version);
    expect(pkg.type).toBe('commonjs');
    expect(pkg.dependencies).toHaveProperty('@angular-devkit/schematics');
    expect(pkg.dependencies).toHaveProperty('@schematics/angular');
  });

  it('generates the documented login example with external styles and a standalone test', async () => {
    const tree = await runner.runSchematic('form-normal-login', { name: 'login', project: 'app' }, workspace);
    const prefix = '/projects/app/src/app/login/login.component';
    expect(tree.readContent(`${prefix}.ts`)).toContain('export class LoginComponent');
    expect(tree.readContent(`${prefix}.ts`)).toContain("styleUrls: ['./login.component.css']");
    expect(tree.readContent(`${prefix}.css`)).toContain('.login-form');
    expect(tree.readContent(`${prefix}.html`)).toContain('formGroup');
    expect(tree.readContent(`${prefix}.spec.ts`)).toContain('imports: [ LoginComponent ]');
    expect(tree.readContent(`${prefix}.spec.ts`)).not.toContain('declarations:');
  });

  it('supports inline templates/styles, custom prefix, nested names and skipping tests', async () => {
    const tree = await runner.runSchematic(
      'button-size',
      {
        name: 'controls/size',
        project: 'app',
        prefix: 'app',
        flat: true,
        inlineTemplate: true,
        inlineStyle: true,
        skipTests: true
      },
      workspace
    );
    const prefix = '/projects/app/src/app/controls/size.component';
    const content = tree.readContent(`${prefix}.ts`);
    expect(content).toContain("selector: 'app-size'");
    expect(content).toContain('nz-radio-group');
    expect(content).toContain('margin-inline-end: 8px');
    expect(tree.exists(`${prefix}.html`)).toBe(false);
    expect(tree.exists(`${prefix}.css`)).toBe(false);
    expect(tree.exists(`${prefix}.spec.ts`)).toBe(false);
  });

  it('supports an explicit stylesheet extension', async () => {
    const tree = await runner.runSchematic('button-size', { name: 'size', project: 'app', style: 'less' }, workspace);
    const prefix = '/projects/app/src/app/size/size.component';
    expect(tree.readContent(`${prefix}.ts`)).toContain("styleUrls: ['./size.component.less']");
    expect(tree.readContent(`${prefix}.less`)).toContain('margin-inline-end');
  });

  it('rejects non-standalone generation instead of emitting an invalid NgModule declaration', async () => {
    await expect(
      runner.runSchematic('button-size', { name: 'size', project: 'app', standalone: false }, workspace)
    ).rejects.toThrow();
  });
});
