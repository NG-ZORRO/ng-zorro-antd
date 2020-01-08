/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, ViewEncapsulation } from '@angular/core';

export type NzButtonGroupSize = 'large' | 'default' | 'small';

@Component({
  selector: 'nz-button-group',
  exportAs: 'nzButtonGroup',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { '[class]': 'hostClassMap' },
  preserveWhitespaces: false,
  template: `
    <ng-content></ng-content>
  `
})
export class NzButtonGroupComponent implements OnInit, OnChanges {
  @Input() nzSize: NzButtonGroupSize = 'default';
  hostClassMap = {};
  updateHostClassMap(): void {
    const prefixCls = 'ant-btn-group';
    this.hostClassMap = {
      [`${prefixCls}`]: true,
      [`${prefixCls}-lg`]: this.nzSize === 'large',
      [`${prefixCls}-sm`]: this.nzSize === 'small'
    };
  }

  ngOnInit(): void {
    this.updateHostClassMap();
  }
  ngOnChanges(): void {
    this.updateHostClassMap();
  }
}
