/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { BooleanInput, NumberInput } from 'ng-zorro-antd/core/types';

import { InputBoolean, InputNumber } from 'ng-zorro-antd/core/util';

export interface NzSliderTrackStyle {
  bottom?: string | null;
  height?: string | null;
  left?: string | null;
  width?: string | null;
  visibility?: string;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'nz-slider-track',
  exportAs: 'nzSliderTrack',
  preserveWhitespaces: false,
  template: ` <div class="ant-slider-track" [ngStyle]="style"></div> `
})
export class NzSliderTrackComponent implements OnChanges {
  static ngAcceptInputType_offset: NumberInput;
  static ngAcceptInputType_length: NumberInput;
  static ngAcceptInputType_vertical: BooleanInput;
  static ngAcceptInputType_included: BooleanInput;

  @Input() @InputNumber() offset: number = 0;
  @Input() @InputNumber() length: number = 0;
  @Input() @InputBoolean() vertical = false;
  @Input() @InputBoolean() included = false;

  style: NzSliderTrackStyle = {};

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.included) {
      this.style.visibility = this.included ? 'visible' : 'hidden';
    }
    if (changes.vertical || changes.offset || changes.length) {
      if (this.vertical) {
        this.style.bottom = `${this.offset}%`;
        this.style.height = `${this.length}%`;
        this.style.left = null;
        this.style.width = null;
      } else {
        this.style.left = `${this.offset}%`;
        this.style.width = `${this.length}%`;
        this.style.bottom = null;
        this.style.height = null;
      }
    }
  }
}
