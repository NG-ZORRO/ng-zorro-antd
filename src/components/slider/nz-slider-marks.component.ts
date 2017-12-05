import { Component, Input, OnInit, OnChanges, SimpleChanges, ViewEncapsulation } from '@angular/core';
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
export class NzSliderMarksComponent implements OnInit, OnChanges {
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

  attrs; // points for inner use

  ngOnChanges(changes: SimpleChanges) {
    if (changes.nzMarksArray) {
      this.buildAttrs();
    }
    if (changes.nzMarksArray || changes.nzLowerBound || changes.nzUpperBound) {
      this.togglePointActive();
    }
  }

  ngOnInit() {}

  trackById(index: number, attr) {
    return attr.id;
  }

  buildAttrs() {
    const { nzVertical, nzClassName, nzMarksArray, nzMin, nzMax } = this;
    const range = nzMax - nzMin;
    this.attrs = nzMarksArray.map(mark => {
      const { value, offset, config } = mark;
      // calc styles
      let label = config, style;
      if (nzVertical) {
        style = {
          marginBottom: '-50%',
          bottom      : `${(value - nzMin) / range * 100}%`
        };
      } else {
        const
          marksCount = nzMarksArray.length,
          unit       = 100 / (marksCount - 1),
          markWidth  = unit * 0.9;
        style = {
          width     : `${markWidth}%`,
          marginLeft: `${-markWidth / 2}%`,
          left      : `${(value - nzMin) / range * 100}%`
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
        value  : value,
        offset : offset,
        classes: {
          [`${nzClassName}-text`]: true
        },
        style  : style,
        label  : label
      };
    }); // END - map
  }

  togglePointActive() {
    const { nzClassName, attrs, nzLowerBound, nzUpperBound, nzIncluded } = this;
    if (attrs && nzLowerBound !== null && nzUpperBound !== null) {
      attrs.forEach(attr => {
        const
          value    = attr.value,
          isActive = (!nzIncluded && value === nzUpperBound) ||
            (nzIncluded && value <= nzUpperBound && value >= nzLowerBound);
        attr.classes[ `${nzClassName}-text-active` ] = isActive;
      });
    }
  }

}

// DEFINITIONS

export type Mark = string | {
  style: Object;
  label: string;
};

export class Marks {
  number: Mark;
}

export class MarksArray extends Array<any> {
  [index: number]: {
    value: number;
    offset: number;
    config: Mark;
  }
}
