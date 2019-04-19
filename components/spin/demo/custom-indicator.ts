/*
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-spin-custom-indicator',
  template: `
    <ng-template #indicatorTemplate><i nz-icon type="loading" style="font-size: 24px;"></i> </ng-template>
    <nz-spin nzSimple [nzIndicator]="indicatorTemplate"> </nz-spin>
  `
})
export class NzDemoSpinCustomIndicatorComponent {}
