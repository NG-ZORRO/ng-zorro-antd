/*
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-popconfirm-custom-icon',
  template: `
    <a nz-popconfirm nzTitle="Are you sure?" [nzIcon]="iconTpl">Delete</a>
    <ng-template #iconTpl>
      <i nz-icon nzType="question-circle-o" style="color: red;"></i>
    </ng-template>
  `
})
export class NzDemoPopconfirmCustomIconComponent {}
