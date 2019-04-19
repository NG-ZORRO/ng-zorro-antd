/*
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-tabs-basic',
  template: `
    <nz-tabset>
      <nz-tab nzTitle="Tab 1">
        Content of Tab Pane 1
      </nz-tab>
      <nz-tab nzTitle="Tab 2">
        Content of Tab Pane 2
      </nz-tab>
      <nz-tab nzTitle="Tab 3">
        Content of Tab Pane 3
      </nz-tab>
    </nz-tabset>
  `
})
export class NzDemoTabsBasicComponent {}
