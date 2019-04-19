/*
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-tabs-card',
  template: `
    <nz-tabset [nzTabPosition]="'top'" [nzType]="'card'">
      <nz-tab *ngFor="let tab of tabs" [nzTitle]="'Tab' + tab"> Content of Tab Pane {{ tab }} </nz-tab>
    </nz-tabset>
  `,
  styles: []
})
export class NzDemoTabsCardComponent {
  tabs = [1, 2, 3];
}
