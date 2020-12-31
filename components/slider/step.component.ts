/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { BooleanInput } from 'ng-zorro-antd/core/types';

import { InputBoolean } from 'ng-zorro-antd/core/util';

import { NzDisplayedStep, NzExtendedMark } from './typings';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'nz-slider-step',
  exportAs: 'nzSliderStep',
  preserveWhitespaces: false,
  template: `
    <div class="ant-slider-step">
      <span
        class="ant-slider-dot"
        *ngFor="let mark of steps; trackBy: trackById"
        [class.ant-slider-dot-active]="mark.active"
        [ngStyle]="mark.style!"
      ></span>
    </div>
  `
})
export class NzSliderStepComponent implements OnChanges {
  static ngAcceptInputType_vertical: BooleanInput;
  static ngAcceptInputType_included: BooleanInput;

  @Input() lowerBound: number | null = null;
  @Input() upperBound: number | null = null;
  @Input() marksArray: NzExtendedMark[] = [];
  @Input() min!: number;
  @Input() max!: number;
  @Input() @InputBoolean() vertical = false;
  @Input() @InputBoolean() included = false;
  @Input() reverse!: boolean;

  steps: NzDisplayedStep[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    const { marksArray, lowerBound, upperBound, reverse } = changes;

    if (marksArray || reverse) {
      this.buildSteps();
    }
    if (marksArray || lowerBound || upperBound || reverse) {
      this.togglePointActive();
    }
  }

  trackById(_index: number, step: NzDisplayedStep): number {
    return step.value;
  }

  private buildSteps(): void {
    const orient = this.vertical ? 'bottom' : 'left';

    this.steps = this.marksArray.map(mark => {
      const { value, config } = mark;
      let offset = mark.offset;
      const range = this.max - this.min;

      if (this.reverse) {
        offset = ((this.max - value) / range) * 100;
      }

      return {
        value,
        offset,
        config,
        active: false,
        style: {
          [orient]: `${offset}%`
        }
      };
    });
  }

  private togglePointActive(): void {
    if (this.steps && this.lowerBound !== null && this.upperBound !== null) {
      this.steps.forEach(step => {
        const value = step.value;
        const isActive =
          (!this.included && value === this.upperBound) || (this.included && value <= this.upperBound! && value >= this.lowerBound!);
        step.active = isActive;
      });
    }
  }
}
