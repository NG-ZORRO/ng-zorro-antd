/*
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-spin-tip',
  template: `
    <nz-spin nzTip="Loading...">
      <nz-alert
        nzType="info"
        nzMessage="Alert message title"
        nzDescription="Further details about the context of this alert."
      >
      </nz-alert>
    </nz-spin>
  `
})
export class NzDemoSpinTipComponent {}
