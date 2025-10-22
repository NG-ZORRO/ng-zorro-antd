/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  Input,
  numberAttribute,
  OnChanges,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';

import { NzDisplayedStep, NzExtendedMark } from './typings';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'nz-slider-step',
  exportAs: 'nzSliderStep',
  template: `
    @for (step of steps; track step.value) {
      <span class="ant-slider-dot" [class.ant-slider-dot-active]="step.active" [style]="step.style!"></span>
    }
  `,
  host: {
    class: 'ant-slider-step'
  }
})
export class NzSliderStepComponent implements OnChanges {
  @Input() lowerBound: number | null = null;
  @Input() upperBound: number | null = null;
  @Input() marksArray: NzExtendedMark[] = [];
  @Input({ transform: numberAttribute }) min!: number;
  @Input({ transform: numberAttribute }) max!: number;
  @Input({ transform: booleanAttribute }) vertical = false;
  @Input({ transform: booleanAttribute }) included = false;
  @Input({ transform: booleanAttribute }) reverse!: boolean;

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
          [orient]: `${offset}%`,
          transform: this.vertical ? 'translateY(50%)' : 'translateX(-50%)'
        }
      };
    });
  }

  private togglePointActive(): void {
    if (this.steps && this.lowerBound !== null && this.upperBound !== null) {
      this.steps.forEach(step => {
        const value = step.value;
        step.active = this.included
          ? value <= this.upperBound! && value >= this.lowerBound!
          : value === this.upperBound;
      });
    }
  }
}
