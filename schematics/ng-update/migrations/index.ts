/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NullableDevkitMigration } from '@angular/cdk/schematics';

import { ClassNamesMigration } from './class-names';
import { ImportSpecifiersMigration } from './import-specifiers';
import { OutputNamesMigration } from './output-names';

export const nzMigrations: NullableDevkitMigration[] = [
  ClassNamesMigration,
  ImportSpecifiersMigration,
  OutputNamesMigration
];
