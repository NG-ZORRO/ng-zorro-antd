/*
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-time-picker-interval-options',
  template: `
    <nz-time-picker [nzMinuteStep]="15" [nzSecondStep]="10"></nz-time-picker>
  `
})
export class NzDemoTimePickerIntervalOptionsComponent {}
