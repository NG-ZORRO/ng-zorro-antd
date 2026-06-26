/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { existsSync, readFileSync, rmSync, writeFileSync } from 'fs';
import { createRequire } from 'module';
import { join } from 'path';

describe('schematics es module compatibility', () => {
  it('should ship a commonjs package.json in schematics', () => {
    const packageJsonPath = join(__dirname, '../package.json');

    expect(existsSync(packageJsonPath)).toBe(true);
    expect(JSON.parse(readFileSync(packageJsonPath, 'utf8'))).toEqual({ type: 'commonjs' });
  });

  it('should load migrations when the library root package uses type module', () => {
    const schematicsDir = join(__dirname, '..');
    const rootDir = join(schematicsDir, '..');
    const rootPackageJson = join(rootDir, 'package.json');
    const hadRootPackageJson = existsSync(rootPackageJson);
    const originalContent = hadRootPackageJson ? readFileSync(rootPackageJson, 'utf8') : undefined;

    try {
      writeFileSync(rootPackageJson, JSON.stringify({ name: 'ng-zorro-antd', type: 'module' }));

      const requireFromRoot = createRequire(rootPackageJson);
      const migration = requireFromRoot('./schematics/ng-update/index.js');

      expect(typeof migration.updateToV22).toBe('function');
      expect(typeof migration.postUpdate).toBe('function');
    } finally {
      if (hadRootPackageJson && originalContent !== undefined) {
        writeFileSync(rootPackageJson, originalContent);
      } else {
        rmSync(rootPackageJson, { force: true });
      }
    }
  });
});
