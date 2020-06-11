/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, Component, Input, OnChanges, ViewEncapsulation } from '@angular/core';
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
  static ngAcceptInputType_reverse: BooleanInput;

  @Input() @InputNumber() offset: number = 0;
  @Input() @InputBoolean() reverse: boolean = false;
  @Input() @InputNumber() length: number = 0;
  @Input() @InputBoolean() vertical = false;
  @Input() @InputBoolean() included = false;

  style: NzSliderTrackStyle = {};

  ngOnChanges(): void {
    const vertical = this.vertical;
    const reverse = this.reverse;
    const visibility = this.included ? 'visible' : 'hidden';
    const offset = this.offset;
    const length = this.length;

    const positonStyle: NzSliderTrackStyle = vertical
      ? {
          [reverse ? 'top' : 'bottom']: `${offset}%`,
          [reverse ? 'bottom' : 'top']: 'auto',
          height: `${length}%`,
          visibility
        }
      : {
          [reverse ? 'right' : 'left']: `${offset}%`,
          [reverse ? 'left' : 'right']: 'auto',
          width: `${length}%`,
          visibility
        };

    this.style = positonStyle;
  }
}
