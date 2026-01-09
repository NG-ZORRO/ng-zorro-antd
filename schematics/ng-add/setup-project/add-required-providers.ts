/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Rule, chain, noop } from '@angular-devkit/schematics';
import { addRootProvider } from '@schematics/angular/utility';

import { Schema } from '../schema';

export function addRequiredProviders(options: Schema): Rule {
  return chain([
    addAnimations(options)
  ]);
}

function addAnimations(options: Schema): Rule {
  if (options.animations) {
    return noop();
  }

  return addRootProvider(options.project, ({ code, external }) => {
    return code`${external(
      'provideNzNoAnimation',
      'ng-zorro-antd/core/animation'
    )}()`;
  });
}
