import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  HostListener,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { StyleMap } from '../core/interface/interface';

import { NzToolTipComponent } from '../tooltip/nz-tooltip.component';
import { NzSliderShowTooltip } from './nz-slider-definition';

import { NzSliderComponent } from './nz-slider.component';

@Component({
  changeDetection    : ChangeDetectionStrategy.OnPush,
  encapsulation      : ViewEncapsulation.None,
  selector           : 'nz-slider-handle',
  preserveWhitespaces: false,
  templateUrl        : './nz-slider-handle.component.html'
})
export class NzSliderHandleComponent implements OnChanges, AfterViewInit {
  @ViewChild('tooltip') tooltip: NzToolTipComponent;

  @Input() nzActive: boolean = false;
  @Input() nzVertical: string;
  @Input() nzOffset: number;
  @Input() nzValue: number;
  @Input() nzShowTooltip: NzSliderShowTooltip = 'default';
  @Input() nzTipFormatter: (value: number) => string;

  tooltipTitle: string;
  style: StyleMap = {};

  constructor(private _slider: NzSliderComponent) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { nzOffset, nzValue, nzActive, nzShowTooltip } = changes;

    if (nzOffset) {
      this._updateStyle();
    }
    if (nzValue) {
      this._updateTooltipTitle();
      this._updateTooltipPosition();
    }
    if (nzActive && this.nzShowTooltip === 'default') {
      this.toggleTooltipVisible(nzActive.currentValue);
    }
    if (nzShowTooltip && !nzShowTooltip.isFirstChange()) {
      this.toggleTooltipVisible(nzShowTooltip.currentValue === 'always', true);
    }
  }

  ngAfterViewInit(): void {
    if (this.nzShowTooltip === 'always') {
      Promise.resolve().then(() => {
        this.toggleTooltipVisible(true, true);
      });
    }
  }

  @HostListener('mouseenter', [ '$event' ])
  onMouseEnter($event: MouseEvent): void {
    if (!this._slider.isDragging) {
      this.toggleTooltipVisible(true);
    }
  }

  @HostListener('mouseleave', [ '$event' ])
  onMouseLeave($event: MouseEvent): void {
    if (!this._slider.isDragging) {
      this.toggleTooltipVisible(false);
    }
  }

  private toggleTooltipVisible(visible: boolean = false, force: boolean = false): void {
    if (!force && this.nzShowTooltip !== 'default' || !this.tooltip) {
      return;
    }

    if (visible) {
      this.tooltip.show();
    } else {
      this.tooltip.hide();
    }
  }

  private _updateTooltipTitle(): void {
    this.tooltipTitle = this.nzTipFormatter ? this.nzTipFormatter(this.nzValue) : `${this.nzValue}`;
  }

  private _updateTooltipPosition(): void {
    if (this.tooltip) {
      window.setTimeout(() => this.tooltip.updatePosition(), 0);
    }
  }

  private _updateStyle(): void {
    this.style[ this.nzVertical ? 'bottom' : 'left' ] = `${this.nzOffset}%`;
  }
}
