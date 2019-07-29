/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges, ViewEncapsulation } from '@angular/core';

import { InputBoolean, NgStyleInterface } from 'ng-zorro-antd/core';

import { isConfigAObject, DisplayedMark, ExtendedMark, Mark } from './nz-slider-definitions';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
  selector: 'nz-slider-marks',
  exportAs: 'nzSliderMarks',
  templateUrl: './nz-slider-marks.component.html'
})
export class NzSliderMarksComponent implements OnChanges {
  @Input() nzLowerBound: number | null = null;
  @Input() nzUpperBound: number | null = null;
  @Input() nzMarksArray: ExtendedMark[];
  @Input() nzMin: number;
  @Input() nzMax: number;
  @Input() @InputBoolean() nzVertical = false;
  @Input() @InputBoolean() nzIncluded = false;

  marks: DisplayedMark[];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.nzMarksArray) {
      this.buildMarks();
    }
    if (changes.nzMarksArray || changes.nzLowerBound || changes.nzUpperBound) {
      this.togglePointActive();
    }
  }

  trackById(_index: number, mark: DisplayedMark): number {
    return mark.value;
  }

  private buildMarks(): void {
    const range = this.nzMax - this.nzMin;

    this.marks = this.nzMarksArray.map(mark => {
      const { value, offset, config } = mark;
      const style = this.getMarkStyles(value, range, config);
      const label = isConfigAObject(config) ? config.label : config;

      return {
        label,
        offset,
        style,
        value,
        config,
        active: false
      };
    });
  }

  private getMarkStyles(value: number, range: number, config: Mark): NgStyleInterface {
    let style;

    if (this.nzVertical) {
      style = {
        marginBottom: '-50%',
        bottom: `${((value - this.nzMin) / range) * 100}%`
      };
    } else {
      style = {
        transform: `translate3d(-50%, 0, 0)`,
        left: `${((value - this.nzMin) / range) * 100}%`
      };
    }

    if (isConfigAObject(config) && config.style) {
      style = { ...style, ...config.style };
    }

    return style;
  }

  private togglePointActive(): void {
    if (this.marks && this.nzLowerBound !== null && this.nzUpperBound !== null) {
      this.marks.forEach(mark => {
        const value = mark.value;
        const isActive =
          (!this.nzIncluded && value === this.nzUpperBound) ||
          (this.nzIncluded && value <= this.nzUpperBound! && value >= this.nzLowerBound!);

        mark.active = isActive;
      });
    }
  }
}
