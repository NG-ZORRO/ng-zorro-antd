/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { InjectionToken, TemplateRef, Type } from '@angular/core';

import { NzSafeAny } from 'ng-zorro-antd/core/types';

export type NzEmptySize = 'normal' | 'small' | '';

export type NzEmptyCustomContent = Type<NzSafeAny> | TemplateRef<NzSafeAny> | string | null;

export const NZ_EMPTY_COMPONENT_NAME = new InjectionToken<string>('nz-empty-component-name');
