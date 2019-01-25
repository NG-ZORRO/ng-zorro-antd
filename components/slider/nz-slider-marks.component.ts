import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges, ViewEncapsulation } from '@angular/core';

import { StyleMap } from '../core/interface/interface';
import { InputBoolean } from '../core/util/convert';
import { DisplayedMark, ParsedMark } from './nz-slider-definition';

@Component({
  changeDetection    : ChangeDetectionStrategy.OnPush,
  encapsulation      : ViewEncapsulation.None,
  selector           : 'nz-slider-marks',
  preserveWhitespaces: false,
  templateUrl        : './nz-slider-marks.component.html'
})
export class NzSliderMarksComponent implements OnChanges {
  @Input() @InputBoolean() nzVertical = false;
  @Input() @InputBoolean() nzIncluded = false;
  @Input() nzLowerBound: number = null;
  @Input() nzUpperBound: number = null;
  @Input() nzMarksArray: ParsedMark[];
  @Input() nzMin: number;
  @Input() nzMax: number;

  marks: DisplayedMark[];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.nzMarksArray) {
      this.buildAttrs();
    }
    if (changes.nzMarksArray || changes.nzLowerBound || changes.nzUpperBound) {
      this.togglePointActive();
    }
  }

  trackById(index: number, attr: DisplayedMark): number {
    return attr.value;
  }

  private buildAttrs(): void {
    this.marks = this.nzMarksArray.map(mark => {
      const { value, offset, config } = mark;
      const style = this.prepareStyles(value, this.nzMax - this.nzMin);
      const label = typeof config === 'object' ? config.label : config;
      const passedStyle = typeof config === 'object' ? { ...style, ...config.style } : style;

      return {
        value,
        offset,
        label,
        style : passedStyle,
        active: false
      };
    });
  }

  private prepareStyles(value: number, range: number): StyleMap {
    let style: StyleMap;

    if (this.nzVertical) {
      style = {
        marginBottom: '-50%',
        bottom      : `${(value - this.nzMin) / range * 100}%`
      };
    } else {
      const marksCount = this.nzMarksArray.length;
      const unit = 100 / (marksCount - 1);
      const markWidth = unit * 0.9;
      style = {
        width     : `${markWidth}%`,
        marginLeft: `${-markWidth / 2}%`,
        left      : `${(value - this.nzMin) / range * 100}%`
      };
    }

    return style;
  }

  private togglePointActive(): void {
    if (this.marks && this.nzLowerBound !== null && this.nzUpperBound !== null) {
      this.marks.forEach(attr => {
        const value = attr.value;
        attr.active = (!this.nzIncluded && value === this.nzUpperBound) ||
          (this.nzIncluded && value <= this.nzUpperBound && value >= this.nzLowerBound);
      });
    }
  }
}
