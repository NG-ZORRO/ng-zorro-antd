/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';

import { defaultColor } from './util/util';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'ng-antd-color-block',
  standalone: true,
  template: `
    <div class="ant-color-picker-color-block" (click)="nzOnClick.emit(true)">
      <div class="ant-color-picker-color-block-inner" [style.background-color]="color"></div>
    </div>
  `
})
export class NgAntdColorBlockComponent {
  @Input() color: string = defaultColor.toHsbString();
  @Output() readonly nzOnClick = new EventEmitter<boolean>();
}
