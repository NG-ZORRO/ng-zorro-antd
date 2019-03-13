import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { Subscription } from 'rxjs';
import { NGStyleInterface } from '../core/types/ng-class';

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
export class NzSliderHandleComponent implements OnChanges, OnDestroy {
  @ViewChild(NzToolTipComponent) tooltip: NzToolTipComponent;

  @Input() nzVertical: string;
  @Input() nzOffset: number;
  @Input() nzValue: number;
  @Input() nzTooltipVisible: SliderShowTooltip = 'default';
  @Input() nzTipFormatter: (value: number) => string;
  @Input() @InputBoolean() nzActive = false;

  tooltipTitle: string;
  style: NGStyleInterface = {};

  private hovers_ = new Subscription();

  constructor(
    private sliderComponent: NzSliderComponent,
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
    if (nzTooltipVisible && nzTooltipVisible.currentValue === 'always') {
      Promise.resolve().then(() => this.toggleTooltip(true, true));
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

  private toggleTooltip(show: boolean, force: boolean = false): void {
    if (!force && (this.nzTooltipVisible !== 'default' || !this.tooltip)) {
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
