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
      >
      </span>
    </div>
  `
})
export class NzSliderStepComponent implements OnChanges {
  static ngAcceptInputType_vertical: BooleanInput;
  static ngAcceptInputType_included: BooleanInput;

  @Input() lowerBound: number | null = null;
  @Input() upperBound: number | null = null;
  @Input() marksArray: NzExtendedMark[] = [];
  @Input() @InputBoolean() vertical = false;
  @Input() @InputBoolean() included = false;

  steps: NzDisplayedStep[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.marksArray) {
      this.buildSteps();
    }
    if (changes.marksArray || changes.lowerBound || changes.upperBound) {
      this.togglePointActive();
    }
  }

  trackById(_index: number, step: NzDisplayedStep): number {
    return step.value;
  }

  private buildSteps(): void {
    const orient = this.vertical ? 'bottom' : 'left';

    this.steps = this.marksArray.map(mark => {
      const { value, offset, config } = mark;

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
