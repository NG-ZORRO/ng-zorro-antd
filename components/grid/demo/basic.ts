/*
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-grid-basic',
  template: `
    <div nz-row>
      <div nz-col nzSpan="12">col-12</div>
      <div nz-col nzSpan="12">col-12</div>
    </div>
    <div nz-row>
      <div nz-col nzSpan="8">col-8</div>
      <div nz-col nzSpan="8">col-8</div>
      <div nz-col nzSpan="8">col-8</div>
    </div>
    <div nz-row>
      <div nz-col nzSpan="6">col-6</div>
      <div nz-col nzSpan="6">col-6</div>
      <div nz-col nzSpan="6">col-6</div>
      <div nz-col nzSpan="6">col-6</div>
    </div>
  `
})
export class NzDemoGridBasicComponent {}
