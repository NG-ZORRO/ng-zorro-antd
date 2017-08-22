import { Component, OnChanges, SimpleChanges, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector     : 'nz-slider-track',
  encapsulation: ViewEncapsulation.None,
  template     : `
    <div [class]="nzClassName" [ngStyle]="style"></div>
  `
})
export class NzSliderTrackComponent implements OnChanges {

  // Dynamic properties
  @Input() nzOffset;
  @Input() nzLength;

  // Static properties
  @Input() nzClassName;
  @Input() nzVertical;
  @Input() nzIncluded;

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
