/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { defaultColor, NgAntdColorPickerModule } from 'ng-antd-color-picker';

import { NzSizeLDSType } from 'ng-zorro-antd/core/types';

@Component({
  selector: 'nz-color-block',
  exportAs: 'NzColorBlock',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgAntdColorPickerModule],
  template: ` <ng-antd-color-block [color]="nzColor" (nzOnClick)="nzOnClick.emit($event)"></ng-antd-color-block> `,
  host: {
    class: 'ant-color-picker-inline',
    '[class.ant-color-picker-inline-sm]': `nzSize === 'small'`,
    '[class.ant-color-picker-inline-lg]': `nzSize === 'large'`
  }
})
export class NzColorBlockComponent {
  @Input() nzColor: string = defaultColor.toHexString();
  @Input() nzSize: NzSizeLDSType = 'default';
  @Output() readonly nzOnClick = new EventEmitter<boolean>();

  constructor() {}
}
