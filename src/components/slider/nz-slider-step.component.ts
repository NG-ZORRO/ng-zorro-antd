import { Component, Input, OnInit, OnChanges, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { NzSliderMarksComponent, Marks } from './nz-slider-marks.component';
import { toBoolean } from '../util/convert';

@Component({
  selector     : 'nz-slider-step',
  encapsulation: ViewEncapsulation.None,
  template     : `
    <div class="{{nzPrefixCls}}-step">
      <span *ngFor="let attr of attrs; trackBy: trackById" [ngClass]="attr.classes" [ngStyle]="attr.style"></span>
    </div>
  `
})
export class NzSliderStepComponent implements OnInit, OnChanges {
  private _vertical = false;
  private _included = false;

  // Dynamic properties
  @Input() nzLowerBound: number = null;
  @Input() nzUpperBound: number = null;
  @Input() nzMarksArray: any[];

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

  attrs;

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
    const orient = this.nzVertical ? 'bottom' : 'left', prefixCls = this.nzPrefixCls;
    this.attrs = this.nzMarksArray.map(mark => {
      const { value, offset } = mark;
      return {
        id     : value,
        value  : value,
        offset : offset,
        style  : {
          [orient]: `${offset}%`
        },
        classes: {
          [`${prefixCls}-dot`]       : true,
          [`${prefixCls}-dot-active`]: false
        }
      };
    });
  }

  togglePointActive() {
    const { nzPrefixCls, attrs, nzLowerBound, nzUpperBound, nzIncluded } = this;
    if (attrs && nzLowerBound !== null && nzUpperBound !== null) {
      attrs.forEach(attr => {
        const
          value    = attr.value,
          isActive = (!nzIncluded && value === nzUpperBound) ||
            (nzIncluded && value <= nzUpperBound && value >= nzLowerBound);
        attr.classes[ `${nzPrefixCls}-dot-active` ] = isActive;
      });
    }
  }

}
