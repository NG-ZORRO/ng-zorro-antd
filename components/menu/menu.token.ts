/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { InjectionToken } from '@angular/core';

import { MenuService } from './menu.service';

export const NzIsMenuInsideDropDownToken = new InjectionToken<boolean>('NzIsInDropDownMenuToken');
export const NzMenuServiceLocalToken = new InjectionToken<MenuService>('NzMenuServiceLocalToken');
