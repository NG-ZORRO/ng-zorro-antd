import { Component, Input, OnInit, ViewEncapsulation, OnChanges, SimpleChanges, ViewChild, HostListener } from '@angular/core';
import { NzToolTipComponent } from '../tooltip/nz-tooltip.component';
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
export class NzSliderHandleComponent implements OnInit, OnChanges {

  // Static properties
  @Input() nzClassName: string;
  @Input() nzVertical: string;
  @Input() nzOffset: number;
  @Input() nzValue: number; // [For tooltip]
  @Input() nzTipFormatter: Function; // [For tooltip]
  @Input() set nzActive(show: boolean) { // [For tooltip]
    if (this.tooltip) {
      if (show) {
        this.tooltip.show()
      } else {
        this.tooltip.hide();
      }
    }
  }

  // Locals
  @ViewChild('tooltip') tooltip: NzToolTipComponent; // [For tooltip]
  tooltipTitle: string; // [For tooltip]
  style: any = {};

  constructor(private _slider: NzSliderComponent) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.nzOffset) {
      this._updateStyle();
    }
    if (changes.nzValue) {
      this._updateTooltipTitle(); // [For tooltip]
      this._updateTooltipPosition(); // [For tooltip]
    }
  }

  // Hover to toggle tooltip when not dragging
  @HostListener('mouseenter', [ '$event' ]) onMouseEnter($event) {
    if (!this._slider.isDragging) {
      this.nzActive = true;
    }
  }
  @HostListener('mouseleave', [ '$event' ]) onMouseLeave($event) {
    if (!this._slider.isDragging) {
      this.nzActive = false;
    }
  }

  private _updateTooltipTitle() { // [For tooltip]
    this.tooltipTitle = this.nzTipFormatter ? this.nzTipFormatter(this.nzValue) : this.nzValue;
  }

  private _updateTooltipPosition() { // [For tooltip]
    if (this.tooltip) {
      window.setTimeout(() => this.tooltip.updatePosition(), 0); // MAY use ngAfterViewChecked? but this will be called so many times.
    }
  }

  private _updateStyle() {
    this.style[ this.nzVertical ? 'bottom' : 'left' ] = `${this.nzOffset}%`;
  }
}
