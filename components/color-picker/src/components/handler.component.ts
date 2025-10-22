/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component, Input } from '@angular/core';

type HandlerSize = 'default' | 'small';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'color-handler',
  template: `
    <div
      class="ant-color-picker-handler"
      [style.background-color]="color"
      [class.ant-color-picker-handler-sm]="size === 'small'"
    ></div>
  `
})
export class HandlerComponent {
  @Input() color: string | null = null;
  @Input() size: HandlerSize = 'default';
}
