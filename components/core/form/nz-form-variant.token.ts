/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { InjectionToken, type Signal } from '@angular/core';

import type { NzVariant } from 'ng-zorro-antd/core/types';

export const NZ_FORM_VARIANT = new InjectionToken<Signal<NzVariant>>(
  typeof ngDevMode !== 'undefined' && ngDevMode ? 'nz-form-variant' : ''
);
