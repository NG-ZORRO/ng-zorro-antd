import { Component, Input, OnChanges, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { toBoolean } from '../util/convert';

@Component({
  selector     : 'nz-slider-marks',
  encapsulation: ViewEncapsulation.None,
  template     : `
    <div [class]="nzClassName">
      <span *ngFor="let attr of attrs; trackBy: trackById" [ngClass]="attr.classes" [ngStyle]="attr.style" [innerHTML]="attr.label"></span>
    </div>
  `
})
export class NzSliderMarksComponent implements OnChanges {
  private _vertical = false;
  private _included = false;

  // Dynamic properties
  @Input() nzLowerBound: number = null;
  @Input() nzUpperBound: number = null;
  @Input() nzMarksArray: MarksArray;

  // Static properties
  @Input() nzClassName: string;
  @Input() nzMin: number; // Required
  @Input() nzMax: number; // Required

  @Input()
  set nzVertical(value: boolean) { // Required
    this._vertical = toBoolean(value);
  }

  get nzVertical(): boolean {
    return this._vertical;
  }

  @Input()
  set nzIncluded(value: boolean) {
    this._included = toBoolean(value);
  }

  get nzIncluded(): boolean {
    return this._included;
  }

  // TODO: using named interface
  attrs: Array<{ id: number, value: number, offset: number, classes: { [key: string]: boolean }, style: object, label: Mark }>; // points for inner use

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.nzMarksArray) {
      this.buildAttrs();
    }
    if (changes.nzMarksArray || changes.nzLowerBound || changes.nzUpperBound) {
      this.togglePointActive();
    }
  }

  trackById(index: number, attr: { id: number, value: number, offset: number, classes: { [key: string]: boolean }, style: object, label: Mark }): number {
    return attr.id;
  }

  buildAttrs(): void {
    const range = this.nzMax - this.nzMin;
    this.attrs = this.nzMarksArray.map(mark => {
      const { value, offset, config } = mark;
      // calc styles
      let label = config;
      let style: object;
      if (this.nzVertical) {
        style = {
          marginBottom: '-50%',
          bottom      : `${(value - this.nzMin) / range * 100}%`
        };
      } else {
        const marksCount = this.nzMarksArray.length;
        const unit       = 100 / (marksCount - 1);
        const markWidth  = unit * 0.9;
        style = {
          width     : `${markWidth}%`,
          marginLeft: `${-markWidth / 2}%`,
          left      : `${(value - this.nzMin) / range * 100}%`
        };
      }
      // custom configuration
      if (typeof config === 'object') {
        label = config.label;
        if (config.style) {
          style = { ...style, ...config.style };
        }
      }
      return {
        id     : value,
        value,
        offset,
        classes: {
          [`${this.nzClassName}-text`]: true
        },
        style,
        label
      };
    }); // END - map
  }

  togglePointActive(): void {
    if (this.attrs && this.nzLowerBound !== null && this.nzUpperBound !== null) {
      this.attrs.forEach(attr => {
        const value    = attr.value;
        const isActive = (!this.nzIncluded && value === this.nzUpperBound) ||
            (this.nzIncluded && value <= this.nzUpperBound && value >= this.nzLowerBound);
        attr.classes[ `${this.nzClassName}-text-active` ] = isActive;
      });
    }
  }

}

// DEFINITIONS

export type Mark = string | {
  style: object;
  label: string;
};

export class Marks {
  number: Mark;
}

// TODO: extends Array could cause unexpected behavior when targeting es5 or below
export class MarksArray extends Array<{ value: number, offset: number, config: Mark }> {
  [index: number]: {
    value: number;
    offset: number;
    config: Mark;
  }
}
