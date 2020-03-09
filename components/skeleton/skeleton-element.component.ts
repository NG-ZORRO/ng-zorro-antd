/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ElementShape, ElementSize } from './skeleton.type';

@Component({
  selector: 'nz-skeleton-element',
  template: `
    <div class="ant-skeleton ant-skeleton-element" [class.ant-skeleton-active]="nzActive">
      <span [ngClass]="classMap"></span>
    </div>
  `
})
export class NzSkeletonElementComponent implements OnInit, OnChanges {
  classMap = {};

  @Input() nzActive: boolean = false;
  @Input() nzType: 'button' | 'input' | 'avatar';
  @Input() nzSize: ElementSize;
  @Input() nzShape: ElementShape;

  updateClass(): void {
    this.classMap = {
      [`ant-skeleton-${this.nzType}`]: true,
      [`ant-skeleton-${this.nzType}-lg`]: this.nzSize === 'large',
      [`ant-skeleton-${this.nzType}-sm`]: this.nzSize === 'small',
      [`ant-skeleton-${this.nzType}-circle`]: this.nzShape === 'circle',
      [`ant-skeleton-${this.nzType}-square`]: this.nzShape === 'square'
    };
  }

  ngOnInit(): void {
    this.updateClass();
  }

  ngOnChanges(): void {
    this.updateClass();
  }
}
