/*
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-dropdown-event',
  template: `
    <nz-dropdown>
      <a nz-dropdown> Hover me, Click menu item <i nz-icon type="down"></i> </a>
      <ul nz-menu>
        <li nz-menu-item (click)="log('1st menu item')">1st menu item</li>
        <li nz-menu-item (click)="log('2nd menu item')">2nd menu item</li>
        <li nz-menu-item (click)="log('3rd menu item')">3rd menu item</li>
      </ul>
    </nz-dropdown>
  `,
  styles: []
})
export class NzDemoDropdownEventComponent {
  log(data: string): void {
    console.log(data);
  }
}
