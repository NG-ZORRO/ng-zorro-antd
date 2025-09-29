/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { InjectionToken, Signal, WritableSignal } from '@angular/core';

import { NzSizeLDSType } from 'ng-zorro-antd/core/types';

import type { NzSpaceCompactItemDirective } from './space-compact-item.directive';

export const NZ_SPACE_COMPACT_SIZE = new InjectionToken<Signal<NzSizeLDSType>>(
  typeof ngDevMode !== 'undefined' && ngDevMode ? 'nz-space-compact-size' : ''
);
export const NZ_SPACE_COMPACT_ITEMS = new InjectionToken<WritableSignal<NzSpaceCompactItemDirective[]>>(
  typeof ngDevMode !== 'undefined' && ngDevMode ? 'nz-space-compact-items' : ''
);
export const NZ_SPACE_COMPACT_ITEM_TYPE = new InjectionToken<string>(
  typeof ngDevMode !== 'undefined' && ngDevMode ? 'nz-space-compact-item-type' : ''
);
