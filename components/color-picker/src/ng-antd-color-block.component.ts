/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';

import { defaultColor, generateColor } from './util/util';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'ng-antd-color-block',
  template: `
    <div
      class="ant-color-picker-color-block ant-color-picker-presets-color"
      [class.ant-color-picker-presets-color-checked]="isChecked"
      [class.ant-color-picker-presets-color-bright]="isBright"
      (click)="nzOnClick.emit(true)"
    >
      <div class="ant-color-picker-color-block-inner" [style.background-color]="color"></div>
    </div>
  `
})
export class NgAntdColorBlockComponent {
  @Input() color: string = defaultColor.toHsbString();
  @Input() value: string = '';
  @Output() readonly nzOnClick = new EventEmitter<boolean>();

  get isChecked(): boolean {
    if (!this.value) {
      return false;
    }
    const current = generateColor(this.value).toHexString();
    const colorPreset = generateColor(this.color).toHexString();
    return current === colorPreset;
  }

  get isBright(): boolean {
    const { r, g, b, a } = generateColor(this.color).toRgb();
    if (a !== undefined && a <= 0.5) return true;
    const brightness = r * 0.299 + g * 0.587 + b * 0.114;
    return brightness > 192;
  }
}
