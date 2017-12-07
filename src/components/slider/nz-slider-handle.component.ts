import { Component, HostListener, Input, OnChanges, OnInit, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { NzToolTipComponent } from '../tooltip/nz-tooltip.component';
import { toBoolean } from '../util/convert';
import { NzSliderComponent } from './nz-slider.component';

@Component({
  selector     : 'nz-slider-handle',
  encapsulation: ViewEncapsulation.None,
  template     : `
    <nz-tooltip *ngIf="nzTipFormatter !== null" #tooltip [nzTitle]="tooltipTitle" [nzTrigger]="null">
      <div nz-tooltip [class]="nzClassName" [ngStyle]="style"></div>
    </nz-tooltip>
    <div *ngIf="nzTipFormatter === null" [class]="nzClassName" [ngStyle]="style"></div>
  `
})
export class NzSliderHandleComponent implements OnChanges {

  // Static properties
  @Input() nzClassName: string;
  @Input() nzVertical: string;
  @Input() nzOffset: number;
  @Input() nzValue: number; // [For tooltip]
  @Input() nzTipFormatter: (value: number) => string; // [For tooltip]
  @Input() set nzActive(value: boolean) { // [For tooltip]
    const show = toBoolean(value);
    if (this.tooltip) {
      if (show) {
        this.tooltip.show();
      } else {
        this.tooltip.hide();
      }
    }
  }

  // Locals
  @ViewChild('tooltip') tooltip: NzToolTipComponent; // [For tooltip]
  tooltipTitle: string; // [For tooltip]
  style: object = {};

  constructor(private _slider: NzSliderComponent) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.nzOffset) {
      this._updateStyle();
    }
    if (changes.nzValue) {
      this._updateTooltipTitle(); // [For tooltip]
      this._updateTooltipPosition(); // [For tooltip]
    }
  }

  // Hover to toggle tooltip when not dragging
  @HostListener('mouseenter', [ '$event' ])
  onMouseEnter($event: MouseEvent): void {
    if (!this._slider.isDragging) {
      this.nzActive = true;
    }
  }
  @HostListener('mouseleave', [ '$event' ])
  onMouseLeave($event: MouseEvent): void {
    if (!this._slider.isDragging) {
      this.nzActive = false;
    }
  }

  private _updateTooltipTitle(): void { // [For tooltip]
    this.tooltipTitle = this.nzTipFormatter ? this.nzTipFormatter(this.nzValue) : `${this.nzValue}`;
  }

  private _updateTooltipPosition(): void { // [For tooltip]
    if (this.tooltip) {
      window.setTimeout(() => this.tooltip.updatePosition(), 0); // MAY use ngAfterViewChecked? but this will be called so many times.
    }
  }

  private _updateStyle(): void {
    this.style[ this.nzVertical ? 'bottom' : 'left' ] = `${this.nzOffset}%`;
  }
}
