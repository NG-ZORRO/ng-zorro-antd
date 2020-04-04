import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ɵComponentBed as ComponentBed, ɵcreateComponentBed as createComponentBed } from 'ng-zorro-antd/core/testing';
import { NzFormSplitComponent } from './form-split.component';

const testBedOptions = { imports: [NoopAnimationsModule], declarations: [NzFormSplitComponent] };

describe('nz-form-split', () => {
  describe('default', () => {
    let testBed: ComponentBed<NzTestFormSplitComponent>;
    let split: DebugElement;
    beforeEach(() => {
      testBed = createComponentBed(NzTestFormSplitComponent, testBedOptions);
      split = testBed.fixture.debugElement.query(By.directive(NzFormSplitComponent));
    });
    it('should className correct', () => {
      expect(split.nativeElement.classList).toContain('ant-form-split');
    });
  });
});

@Component({
  template: `
    <nz-form-split></nz-form-split>
  `
})
export class NzTestFormSplitComponent {}
