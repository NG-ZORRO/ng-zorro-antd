/*
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-page-header-basic',
  template: `
    <nz-page-header (nzBack)="onBack()" nzBackIcon nzTitle="Title" nzSubtitle="This is a subtitle"> </nz-page-header>
  `,
  styles: [
    `
      nz-page-header {
        border: 1px solid rgb(235, 237, 240);
      }
    `
  ]
})
export class NzDemoPageHeaderBasicComponent {
  onBack() {
    console.log('onBack');
  }
}
