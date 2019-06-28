/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { NgClassInterface } from 'ng-zorro-antd';

export type NzResultIcon = 'success' | 'error' | 'info' | 'warning';

export const IconMap = {
  success: 'check-circle',
  error: 'close-circle',
  info: 'exclamation-circle',
  warning: 'warning'
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'nz-result',
  templateUrl: './nz-result.component.html',
  host: {
    class: 'ant-result'
  },
  styles: [
    `
      nz-result,
      nz-result-title,
      nz-result-subtitle,
      nz-result-extra,
      nz-result-content {
        display: block;
      }
    `
  ]
})
export class NzResultComponent implements OnChanges {
  @Input() nzIcon: NzResultIcon | TemplateRef<void>;
  @Input() nzTitle: string | TemplateRef<void>;
  @Input() nzSubTitle: string | TemplateRef<void>;
  @Input() nzExtra: string | TemplateRef<void>;

  iconName?: string = '';
  iconCls: NgClassInterface = {};

  ngOnChanges(changes: SimpleChanges): void {
    const { nzIcon } = changes;

    if (nzIcon) {
      this.setResultIcon(nzIcon.currentValue);
    }
  }

  private setResultIcon(icon: NzResultIcon | TemplateRef<void>): void {
    if (typeof icon === 'string') {
      this.iconName = IconMap[icon];
      this.iconCls = { [icon]: true };
    } else {
      this.iconName = '';
      this.iconCls = {};
    }
  }
}
