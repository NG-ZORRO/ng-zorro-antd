import { Component, OnChanges, SimpleChanges, Input, ViewEncapsulation } from '@angular/core';
import { toBoolean } from '../util/convert';

@Component({
  selector     : 'nz-slider-track',
  encapsulation: ViewEncapsulation.None,
  template     : `
    <div [class]="nzClassName" [ngStyle]="style"></div>
  `
})
export class NzSliderTrackComponent implements OnChanges {
  private _vertical = false;
  private _included = false;

  // Dynamic properties
  @Input() nzOffset;
  @Input() nzLength;

  // Static properties
  @Input() nzClassName;

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

  style: any = {};

  ngOnChanges(changes: SimpleChanges) {
    const { nzOffset, nzLength, nzIncluded, nzVertical, style } = this;
    if (changes.nzIncluded) {
      style.visibility = nzIncluded ? 'visible' : 'hidden';
    }
    if (changes.nzVertical || changes.nzOffset || changes.nzLength) {
      if (nzVertical) {
        style.bottom = `${nzOffset}%`;
        style.height = `${nzLength}%`;
      } else {
        style.left = `${nzOffset}%`;
        style.width = `${nzLength}%`;
      }
    }
  }

}
