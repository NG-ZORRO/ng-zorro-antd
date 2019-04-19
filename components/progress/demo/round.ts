/*
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-progress-round',
  template: `
    <nz-progress nzStrokeLinecap="square" nzPercent="75"></nz-progress>
    <nz-progress nzStrokeLinecap="square" nzType="circle" nzPercent="75"></nz-progress>
    <nz-progress nzStrokeLinecap="square" nzType="dashboard" nzPercent="75"></nz-progress>
  `
})
export class NzDemoProgressRoundComponent {}
