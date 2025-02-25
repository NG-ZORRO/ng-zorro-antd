/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Direction } from '@angular/cdk/bidi';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  ViewEncapsulation,
  booleanAttribute,
  numberAttribute
} from '@angular/core';

export interface NzSliderTrackStyle {
  bottom?: string | null;
  height?: string | null;
  left?: string | null;
  right?: string | null;
  width?: string | null;
  visibility?: string;
}

@Component({
  selector: 'nz-slider-track',
  exportAs: 'nzSliderTrack',
  template: `<div class="ant-slider-track" [style]="style"></div>`,
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NzSliderTrackComponent implements OnChanges {
  @Input({ transform: numberAttribute }) offset: number = 0;
  @Input({ transform: booleanAttribute }) reverse: boolean = false;
  @Input() dir: Direction = 'ltr';
  @Input({ transform: numberAttribute }) length: number = 0;
  @Input({ transform: booleanAttribute }) vertical = false;
  @Input({ transform: booleanAttribute }) included = false;

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
          ...this.getHorizontalStylePosition(),
          width: `${length}%`,
          visibility
        };

    this.style = positonStyle;
  }

  private getHorizontalStylePosition(): { left: string; right: string } {
    let left = this.reverse ? 'auto' : `${this.offset}%`;
    let right = this.reverse ? `${this.offset}%` : 'auto';
    if (this.dir === 'rtl') {
      const tmp = left;
      left = right;
      right = tmp;
    }
    return { left, right };
  }
}
