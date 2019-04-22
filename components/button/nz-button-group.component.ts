/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, ViewEncapsulation } from '@angular/core';

import { NzSizeLDSType, NzUpdateHostClassService } from 'ng-zorro-antd/core';

@Component({
  selector: 'nz-button-group',
  exportAs: 'nzButtonGroup',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
  providers: [NzUpdateHostClassService],
  templateUrl: './nz-button-group.component.html'
})
export class NzButtonGroupComponent implements OnInit {
  @Input()
  get nzSize(): NzSizeLDSType {
    return this._size;
  }

  set nzSize(value: NzSizeLDSType) {
    this._size = value;
    this.setClassMap();
  }

  constructor(private nzUpdateHostClassService: NzUpdateHostClassService, private elementRef: ElementRef) {}

  private _size: NzSizeLDSType;
  private prefixCls = 'ant-btn-group';

  setClassMap(): void {
    const classMap = {
      [this.prefixCls]: true,
      [`${this.prefixCls}-lg`]: this.nzSize === 'large',
      [`${this.prefixCls}-sm`]: this.nzSize === 'small'
    };
    this.nzUpdateHostClassService.updateHostClass(this.elementRef.nativeElement, classMap);
  }

  ngOnInit(): void {
    this.setClassMap();
  }
}
