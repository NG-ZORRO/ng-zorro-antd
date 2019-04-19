/*
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-select-custom-dropdown-menu',
  template: `
    <nz-select style="width: 120px;" nzShowSearch nzAllowClear [ngModel]="'lucy'" [nzDropdownRender]="render">
      <nz-option nzValue="jack" nzLabel="Jack"></nz-option>
      <nz-option nzValue="lucy" nzLabel="Lucy"></nz-option>
    </nz-select>
    <ng-template #render>
      <nz-divider style="margin: 4px 0;"></nz-divider>
      <div style="padding: 8px; cursor: pointer"><i nz-icon type="plus"></i> Add item</div>
    </ng-template>
  `
})
export class NzDemoSelectCustomDropdownMenuComponent {}
