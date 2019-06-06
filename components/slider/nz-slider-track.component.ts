/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges, ViewEncapsulation } from '@angular/core';

import { InputBoolean, InputNumber } from 'ng-zorro-antd/core';

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
  templateUrl: './nz-slider-track.component.html'
})
export class NzSliderTrackComponent implements OnChanges {
  @Input() @InputNumber() nzOffset: number;
  @Input() @InputNumber() nzLength: number;
  @Input() @InputBoolean() nzVertical = false;
  @Input() @InputBoolean() nzIncluded = false;

  style: NzSliderTrackStyle = {};

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.nzIncluded) {
      this.style.visibility = this.nzIncluded ? 'visible' : 'hidden';
    }
    if (changes.nzVertical || changes.nzOffset || changes.nzLength) {
      if (this.nzVertical) {
        this.style.bottom = `${this.nzOffset}%`;
        this.style.height = `${this.nzLength}%`;
        this.style.left = null;
        this.style.width = null;
      } else {
        this.style.left = `${this.nzOffset}%`;
        this.style.width = `${this.nzLength}%`;
        this.style.bottom = null;
        this.style.height = null;
      }
    }
  }
}
