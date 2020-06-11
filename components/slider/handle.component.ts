/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { BooleanInput, NgStyleInterface } from 'ng-zorro-antd/core/types';
import { InputBoolean } from 'ng-zorro-antd/core/util';

import { NzTooltipDirective } from 'ng-zorro-antd/tooltip';
import { NzSliderService } from './slider.service';
import { NzSliderShowTooltip } from './typings';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'nz-slider-handle',
  exportAs: 'nzSliderHandle',
  preserveWhitespaces: false,
  template: `
    <div
      #handle
      class="ant-slider-handle"
      tabindex="0"
      nz-tooltip
      [ngStyle]="style"
      [nzTooltipTitle]="tooltipFormatter === null || tooltipVisible === 'never' ? null : tooltipTitle"
      [nzTooltipTrigger]="null"
      [nzTooltipPlacement]="tooltipPlacement"
    ></div>
  `,
  host: {
    '(mouseenter)': 'enterHandle()',
    '(mouseleave)': 'leaveHandle()'
  }
})
export class NzSliderHandleComponent implements OnChanges {
  static ngAcceptInputType_active: BooleanInput;

  @ViewChild('handle', { static: false }) handleEl?: ElementRef;
  @ViewChild(NzTooltipDirective, { static: false }) tooltip?: NzTooltipDirective;

  @Input() vertical?: boolean;
  @Input() reverse?: boolean;
  @Input() offset?: number;
  @Input() value?: number;
  @Input() tooltipVisible: NzSliderShowTooltip = 'default';
  @Input() tooltipPlacement?: string;
  @Input() tooltipFormatter?: null | ((value: number) => string);
  @Input() @InputBoolean() active = false;

  tooltipTitle?: string;
  style: NgStyleInterface = {};

  constructor(private sliderService: NzSliderService, private cdr: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    const { offset, value, active, tooltipVisible, reverse } = changes;

    if (offset || reverse) {
      this.updateStyle();
    }

    if (value) {
      this.updateTooltipTitle();
      this.updateTooltipPosition();
    }

    if (active) {
      if (active.currentValue) {
        this.toggleTooltip(true);
      } else {
        this.toggleTooltip(false);
      }
    }

    if (tooltipVisible?.currentValue === 'always') {
      Promise.resolve().then(() => this.toggleTooltip(true, true));
    }
  }

  enterHandle = () => {
    if (!this.sliderService.isDragging) {
      this.toggleTooltip(true);
      this.updateTooltipPosition();
      this.cdr.detectChanges();
    }
  };

  leaveHandle = () => {
    if (!this.sliderService.isDragging) {
      this.toggleTooltip(false);
      this.cdr.detectChanges();
    }
  };

  focus(): void {
    this.handleEl?.nativeElement.focus();
  }

  private toggleTooltip(show: boolean, force: boolean = false): void {
    if (!force && (this.tooltipVisible !== 'default' || !this.tooltip)) {
      return;
    }

    if (show) {
      this.tooltip?.show();
    } else {
      this.tooltip?.hide();
    }
  }

  private updateTooltipTitle(): void {
    this.tooltipTitle = this.tooltipFormatter ? this.tooltipFormatter(this.value!) : `${this.value}`;
  }

  private updateTooltipPosition(): void {
    if (this.tooltip) {
      Promise.resolve().then(() => this.tooltip?.updatePosition());
    }
  }

  private updateStyle(): void {
    const vertical = this.vertical;
    const reverse = this.reverse;
    const offset = this.offset;

    const positionStyle = vertical
      ? {
          [reverse ? 'top' : 'bottom']: `${offset}%`,
          [reverse ? 'bottom' : 'top']: 'auto',
          transform: reverse ? null : `translateY(+50%)`
        }
      : {
          [reverse ? 'right' : 'left']: `${offset}%`,
          [reverse ? 'left' : 'right']: 'auto',
          transform: `translateX(${reverse ? '+' : '-'}50%)`
        };

    this.style = positionStyle;
    this.cdr.markForCheck();
  }
}
