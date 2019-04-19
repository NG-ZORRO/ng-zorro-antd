/*
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-back-top-basic',
  template: `
    <nz-back-top></nz-back-top>
    Scroll down to see the bottom-right
    <strong> gray </strong>
    button.
  `,
  styles: [
    `
      strong {
        color: rgba(64, 64, 64, 0.6);
      }
    `
  ]
})
export class NzDemoBackTopBasicComponent {}
