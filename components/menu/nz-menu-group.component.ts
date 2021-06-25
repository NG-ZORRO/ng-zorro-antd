/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component } from '@angular/core';

@Component({
  selector: 'nz-menu-group',
  template: `
    <div class="ant-menu-item-group-title">
      <ng-content select="[nz-menu-group-title]"></ng-content>
    </div>
    <ul class="ant-menu-item-group-list">
      <ng-content></ng-content>
    </ul>
  `,
  host: {
    class: 'ant-menu-item-group'
  }
})
export class NzMenuGroupComponent {
  constructor() {}
}
