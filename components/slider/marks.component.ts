/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewEncapsulation,
  booleanAttribute,
  numberAttribute
} from '@angular/core';

import { NgStyleInterface } from 'ng-zorro-antd/core/types';

import { NzDisplayedMark, NzExtendedMark, NzMark, NzMarkObj } from './typings';

@Component({
  selector: 'nz-slider-marks',
  exportAs: 'nzSliderMarks',
  template: `
    @for (attr of marks; track attr.value) {
      <span
        class="ant-slider-mark-text"
        [class.ant-slider-mark-active]="attr.active"
        [style]="attr.style"
        [innerHTML]="attr.label"
      ></span>
    }
  `,
  host: {
    class: 'ant-slider-mark'
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class NzSliderMarksComponent implements OnChanges {
  @Input() lowerBound: number | null = null;
  @Input() upperBound: number | null = null;
  @Input() marksArray: NzExtendedMark[] = [];
  @Input({ transform: numberAttribute }) min!: number;
  @Input({ transform: numberAttribute }) max!: number;
  @Input({ transform: booleanAttribute }) vertical = false;
  @Input({ transform: booleanAttribute }) included = false;
  @Input({ transform: booleanAttribute }) reverse!: boolean;

  marks: NzDisplayedMark[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    const { marksArray, lowerBound, upperBound, reverse } = changes;

    if (marksArray || reverse) {
      this.buildMarks();
    }

    if (marksArray || lowerBound || upperBound || reverse) {
      this.togglePointActive();
    }
  }

  private buildMarks(): void {
    const range = this.max - this.min;

    this.marks = this.marksArray.map(mark => {
      const { value, offset, config } = mark;
      const style = this.getMarkStyles(value, range, config);
      const label = isConfigObject(config) ? config.label : config;

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

  private getMarkStyles(value: number, range: number, config: NzMark): NgStyleInterface {
    let style;
    const markValue = this.reverse ? this.max + this.min - value : value;

    if (this.vertical) {
      style = {
        marginBottom: '-50%',
        bottom: `${((markValue - this.min) / range) * 100}%`
      };
    } else {
      style = {
        transform: `translate3d(-50%, 0, 0)`,
        left: `${((markValue - this.min) / range) * 100}%`
      };
    }

    if (isConfigObject(config) && config.style) {
      style = { ...style, ...config.style };
    }

    return style;
  }

  private togglePointActive(): void {
    if (this.marks && this.lowerBound !== null && this.upperBound !== null) {
      this.marks.forEach(mark => {
        const value = mark.value;
        mark.active = this.included
          ? value <= this.upperBound! && value >= this.lowerBound!
          : value === this.upperBound;
      });
    }
  }
}

function isConfigObject(config: NzMark): config is NzMarkObj {
  return typeof config !== 'string';
}
