/*
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-popover-basic',
  template: `
    <button nz-button nz-popover nzType="primary" nzTitle="Title" nzContent="Content">
      Hover me
    </button>
  `
})
export class NzDemoPopoverBasicComponent {}
