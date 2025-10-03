/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { InjectionToken } from '@angular/core';

import type { NzInputWrapperComponent } from './input-wrapper.component';

export const NZ_INPUT_WRAPPER = new InjectionToken<NzInputWrapperComponent>(
  typeof ngDevMode !== 'undefined' && ngDevMode ? 'nz-input-wrapper' : ''
);
