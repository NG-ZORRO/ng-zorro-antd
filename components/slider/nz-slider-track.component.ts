import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { toBoolean } from '../core/util/convert';

@Component({
  selector     : 'nz-slider-track',
  preserveWhitespaces: false,
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

  style: { bottom?: string, height?: string, left?: string, width?: string, visibility?: string } = {};

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.nzIncluded) {
      this.style.visibility = this.nzIncluded ? 'visible' : 'hidden';
    }
    if (changes.nzVertical || changes.nzOffset || changes.nzLength) {
      if (this.nzVertical) {
        this.style.bottom = `${this.nzOffset}%`;
        this.style.height = `${this.nzLength}%`;
      } else {
        this.style.left = `${this.nzOffset}%`;
        this.style.width = `${this.nzLength}%`;
      }
    }
  }

}
