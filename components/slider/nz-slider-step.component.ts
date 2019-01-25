import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges, ViewEncapsulation } from '@angular/core';

import { InputBoolean } from '../core/util/convert';

import { DisplayedStep, ParsedMark } from './nz-slider-definition';

@Component({
  changeDetection    : ChangeDetectionStrategy.OnPush,
  encapsulation      : ViewEncapsulation.None,
  selector           : 'nz-slider-step',
  preserveWhitespaces: false,
  templateUrl        : './nz-slider-step.component.html'
})
export class NzSliderStepComponent implements OnChanges {
  @Input() @InputBoolean() nzVertical = false;
  @Input() @InputBoolean() nzIncluded = false;
  @Input() nzLowerBound: number = null;
  @Input() nzUpperBound: number = null;
  @Input() nzMarksArray: ParsedMark[];

  steps: DisplayedStep[];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.nzMarksArray) {
      this.buildSteps();
    }
    if (changes.nzMarksArray || changes.nzLowerBound || changes.nzUpperBound) {
      this.togglePointActive();
    }
  }

  trackById(index: number, step: DisplayedStep): number {
    return step.value;
  }

  private buildSteps(): void {
    const orient = this.nzVertical ? 'bottom' : 'left';
    this.steps = this.nzMarksArray.map(mark => {
      const { value, offset } = mark;
      return {
        value,
        offset,
        active: false,
        style  : {
          [ orient ]: `${offset}%`
        }
      };
    });
  }

  private togglePointActive(): void {
    if (this.steps && this.nzLowerBound !== null && this.nzUpperBound !== null) {
      this.steps.forEach(step => {
        const value = step.value;
        step.active = (!this.nzIncluded && value === this.nzUpperBound) ||
          (this.nzIncluded && value <= this.nzUpperBound && value >= this.nzLowerBound);
      });
    }
  }
}
