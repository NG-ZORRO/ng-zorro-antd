/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Rule, chain } from '@angular-devkit/schematics';
import { addRootImport } from '@schematics/angular/utility';

import { Schema } from '../schema';

const modulesMap = {
  FormsModule: '@angular/forms'
};

export function addRequiredModules(options: Schema): Rule {
  const rules = Object.entries(modulesMap).map(([symbolName, moduleName]) => {
    return addRootImport(options.project, ({ code, external }) => {
      return code`${external(symbolName, moduleName)}`;
    });
  });

  return chain(rules);
}
