/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { InjectionToken, TemplateRef, Type } from '@angular/core';

export type NzEmptySize = 'normal' | 'small' | '';

// tslint:disable-next-line:no-any
export type NzEmptyCustomContent = Type<any> | TemplateRef<any> | string;

export const NZ_EMPTY_COMPONENT_NAME = new InjectionToken<string>('nz-empty-component-name');
