/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Rule, noop } from '@angular-devkit/schematics';
import { addRootProvider } from '@schematics/angular/utility';

import { Schema } from '../schema';

export function addDateAdapterProvider(options: Schema): Rule {
  const dateAdapter = options.dateAdapter || 'date-fns';

  if (dateAdapter === 'none') {
    return noop();
  }

  return addRootProvider(options.project, ({ code, external }) => {
    if (dateAdapter === 'native') {
      return code`${external('provideNzNativeDateAdapter', 'ng-zorro-antd/core/time')}()`;
    } else {
      // date-fns
      return code`${external('provideNzDateFnsAdapter', 'ng-zorro-antd/core/time')}()`;
    }
  });
}
