/*
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-tabs-extra',
  template: `
    <nz-tabset [nzTabBarExtraContent]="extraTemplate">
      <nz-tab *ngFor="let tab of tabs" [nzTitle]="'Tab ' + tab"> Content of tab {{ tab }} </nz-tab>
    </nz-tabset>
    <ng-template #extraTemplate>
      <button nz-button>Extra Action</button>
    </ng-template>
  `
})
export class NzDemoTabsExtraComponent {
  tabs = [1, 2, 3];
}
