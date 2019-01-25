import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges, ViewEncapsulation } from '@angular/core';

import { InputBoolean } from '../core/util/convert';

interface NzSliderTrackStyle {
  bottom?: string;
  height?: string;
  left?: string;
  width?: string;
  visibility?: string;
}

@Component({
  changeDetection    : ChangeDetectionStrategy.OnPush,
  encapsulation      : ViewEncapsulation.None,
  selector           : 'nz-slider-track',
  preserveWhitespaces: false,
  templateUrl        : './nz-slider-track.component.html'
})
export class NzSliderTrackComponent implements OnChanges {
  @Input() @InputBoolean() nzIncluded = false;
  @Input() @InputBoolean() nzVertical = false;
  @Input() nzLength: number;
  @Input() nzOffset: number;

  style: NzSliderTrackStyle = {};

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
