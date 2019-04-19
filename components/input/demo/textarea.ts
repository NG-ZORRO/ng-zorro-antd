/*
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-input-textarea',
  template: `
    <textarea rows="4" nz-input [(ngModel)]="inputValue"></textarea>
  `,

  styles: []
})
export class NzDemoInputTextareaComponent {
  inputValue: string;
}
