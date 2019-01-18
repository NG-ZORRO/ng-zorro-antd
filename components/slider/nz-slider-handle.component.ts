import {
  AfterViewInit,
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';

import { InputBoolean } from '../core/util/convert';
import { NzToolTipComponent } from '../tooltip/nz-tooltip.component';

import { SliderShowTooltip } from './nz-slider-definitions';
import { NzSliderComponent } from './nz-slider.component';

@Component({
  changeDetection    : ChangeDetectionStrategy.OnPush,
  encapsulation      : ViewEncapsulation.None,
  selector           : 'nz-slider-handle',
  preserveWhitespaces: false,
  templateUrl        : './nz-slider-handle.component.html',
  host               : {
    '(mouseenter)': 'enterHandle()',
    '(mouseleave)': 'leaveHandle()'
  }
})
export class NzSliderHandleComponent implements OnChanges, AfterViewInit, OnDestroy {
  @ViewChild(NzToolTipComponent) tooltip: NzToolTipComponent;

  @Input() nzVertical: string;
  @Input() nzOffset: number;
  @Input() nzValue: number;
  @Input() nzTooltipVisible: SliderShowTooltip = 'default';
  @Input() nzTipFormatter: (value: number) => string;
  @Input() @InputBoolean() nzActive = false;

  tooltipTitle: string;
  style: object = {};

  private hovers_ = new Subscription();

  constructor(
    private sliderComponent: NzSliderComponent,
    private ngZone: NgZone,
    private el: ElementRef,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { nzOffset, nzValue, nzActive, nzTooltipVisible } = changes;

    if (nzOffset) {
      this.updateStyle();
    }
    if (nzValue) {
      this.updateTooltipTitle();
      this.updateTooltipPosition();
    }
    if (nzActive) {
      if (nzActive.currentValue) {
        this.toggleTooltip(true);
      } else {
        this.toggleTooltip(false);
      }
    }
    if (nzTooltipVisible && !nzTooltipVisible.isFirstChange() && this.tooltip) {
      this.tooltip.show();
    }
  }

  ngAfterViewInit(): void {
    if (this.nzTooltipVisible === 'always' && this.tooltip) {
      Promise.resolve().then(() => this.tooltip.show());
    }
  }

  ngOnDestroy(): void {
    this.hovers_.unsubscribe();
  }

  enterHandle = () => {
    if (!this.sliderComponent.isDragging) {
      this.toggleTooltip(true);
      this.updateTooltipPosition();
      this.cdr.detectChanges();
    }
  }

  leaveHandle = () => {
    if (!this.sliderComponent.isDragging) {
      this.toggleTooltip(false);
      this.cdr.detectChanges();
    }
  }

  private toggleTooltip(show: boolean): void {
    if (this.nzTooltipVisible !== 'default' || !this.tooltip) {
      return;
    }

    if (show) {
      this.tooltip.show();
    } else {
      this.tooltip.hide();
    }
  }

  private updateTooltipTitle(): void {
    this.tooltipTitle = this.nzTipFormatter ? this.nzTipFormatter(this.nzValue) : `${this.nzValue}`;
  }

  private updateTooltipPosition(): void {
    if (this.tooltip) {
      Promise.resolve().then(() => this.tooltip.updatePosition());
    }
  }

  private updateStyle(): void {
    this.style[ this.nzVertical ? 'bottom' : 'left' ] = `${this.nzOffset}%`;
  }
}
