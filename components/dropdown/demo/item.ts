/*
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-dropdown-item',
  template: `
    <nz-dropdown>
      <a nz-dropdown> Hover me <i nz-icon type="down"></i> </a>
      <ul nz-menu>
        <li nz-menu-item>
          <a>1st menu item</a>
        </li>
        <li nz-menu-item>
          <a>2nd menu item</a>
        </li>
        <li nz-menu-divider></li>
        <li nz-menu-item nzDisabled>3rd menu item（disabled）</li>
      </ul>
    </nz-dropdown>
  `,
  styles: []
})
export class NzDemoDropdownItemComponent {}
