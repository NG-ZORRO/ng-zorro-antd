/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Rule, chain } from '@angular-devkit/schematics';
import { addRootProvider } from '@schematics/angular/utility';

import { Schema } from '../schema';

export function addRequiredProviders(options: Schema): Rule {
  return chain([
    addAnimations(options),
    addHttpClient(options)
  ]);
}

function addAnimations(options: Schema): Rule {
  return addRootProvider(options.project, ({ code, external }) => {
    return code`${external(
      'provideAnimationsAsync',
      '@angular/platform-browser/animations/async'
    )}(${options.animations ? '' : `'noop'`})`;
  });
}

function addHttpClient(options: Schema): Rule {
  return addRootProvider(options.project, ({ code, external }) => {
    return code`${external(
      'provideHttpClient',
      '@angular/common/http'
    )}()`;
  });
}
