import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { toBoolean } from '../core/util/convert';

import { MarksArray } from './nz-slider-marks.component';

@Component({
  selector           : 'nz-slider-step',
  preserveWhitespaces: false,
  templateUrl        : './nz-slider-step.component.html'
})
export class NzSliderStepComponent implements OnChanges {
  private _vertical = false;
  private _included = false;

  // Dynamic properties
  @Input() nzLowerBound: number = null;
  @Input() nzUpperBound: number = null;
  @Input() nzMarksArray: MarksArray;

  // Static properties
  @Input() nzPrefixCls: string;

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
  attrs: Array<{ id: number, value: number, offset: number, classes: { [ key: string ]: boolean }, style: object }>;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.nzMarksArray) {
      this.buildAttrs();
    }
    if (changes.nzMarksArray || changes.nzLowerBound || changes.nzUpperBound) {
      this.togglePointActive();
    }
  }

  trackById(index: number, attr: { id: number, value: number, offset: number, classes: { [ key: string ]: boolean }, style: object }): number {
    return attr.id;
  }

  buildAttrs(): void {
    const orient = this.nzVertical ? 'bottom' : 'left';
    const prefixCls = this.nzPrefixCls;
    this.attrs = this.nzMarksArray.map(mark => {
      const { value, offset } = mark;
      return {
        id     : value,
        value,
        offset,
        style  : {
          [ orient ]: `${offset}%`
        },
        classes: {
          [ `${prefixCls}-dot` ]       : true,
          [ `${prefixCls}-dot-active` ]: false
        }
      };
    });
  }

  togglePointActive(): void {
    if (this.attrs && this.nzLowerBound !== null && this.nzUpperBound !== null) {
      this.attrs.forEach(attr => {
        const value = attr.value;
        const isActive = (!this.nzIncluded && value === this.nzUpperBound) ||
          (this.nzIncluded && value <= this.nzUpperBound && value >= this.nzLowerBound);
        attr.classes[ `${this.nzPrefixCls}-dot-active` ] = isActive;
      });
    }
  }

}
