/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { InjectionToken } from '@angular/core';

import { MenuService } from './menu.service';

/**
 * A flag to mark if the menu is inside a dropdown.
 * @note Internally used only, please do not use it.
 */
export const NzIsMenuInsideDropdownToken = new InjectionToken<boolean>(
  typeof ngDevMode !== 'undefined' && ngDevMode ? 'nz-is-in-dropdown-menu' : ''
);

/**
 * A token to hold the local {@link MenuService} instance. This is used for nested menu.
 * @note Internally used only, please do not use it.
 */
export const NzMenuServiceLocalToken = new InjectionToken<MenuService>(
  typeof ngDevMode !== 'undefined' && ngDevMode ? 'nz-menu-service-local' : ''
);
