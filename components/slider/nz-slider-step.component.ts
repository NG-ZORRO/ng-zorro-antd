import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges, ViewEncapsulation } from '@angular/core';

import { InputBoolean } from '../core/util/convert';

import { DisplayedStep, ExtendedMark } from './nz-slider-definitions';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'nz-slider-step',
  preserveWhitespaces: false,
  templateUrl: './nz-slider-step.component.html'
})
export class NzSliderStepComponent implements OnChanges {
  @Input() nzLowerBound: number | null = null;
  @Input() nzUpperBound: number | null = null;
  @Input() nzMarksArray: ExtendedMark[];
  @Input() @InputBoolean() nzVertical = false;
  @Input() @InputBoolean() nzIncluded = false;

  steps: DisplayedStep[];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.nzMarksArray) {
      this.buildSteps();
    }
    if (changes.nzMarksArray || changes.nzLowerBound || changes.nzUpperBound) {
      this.togglePointActive();
    }
  }

  trackById(_index: number, step: DisplayedStep): number {
    return step.value;
  }

  private buildSteps(): void {
    const orient = this.nzVertical ? 'bottom' : 'left';

    this.steps = this.nzMarksArray.map(mark => {
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
    if (this.steps && this.nzLowerBound !== null && this.nzUpperBound !== null) {
      this.steps.forEach(step => {
        const value = step.value;
        const isActive =
          (!this.nzIncluded && value === this.nzUpperBound) ||
          (this.nzIncluded && value <= this.nzUpperBound! && value >= this.nzLowerBound!);
        step.active = isActive;
      });
    }
  }
}
