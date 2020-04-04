import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ɵComponentBed as ComponentBed, ɵcreateComponentBed as createComponentBed } from 'ng-zorro-antd/core/testing';
import { NzFormTextComponent } from './form-text.component';

const testBedOptions = { imports: [NoopAnimationsModule], declarations: [NzFormTextComponent] };

describe('nz-form-text', () => {
  describe('default', () => {
    let testBed: ComponentBed<NzTestFormTextComponent>;
    let text: DebugElement;
    beforeEach(() => {
      testBed = createComponentBed(NzTestFormTextComponent, testBedOptions);
      text = testBed.fixture.debugElement.query(By.directive(NzFormTextComponent));
    });
    it('should className correct', () => {
      expect(text.nativeElement.classList).toContain('ant-form-text');
    });
  });
});

@Component({
  template: `
    <nz-form-text></nz-form-text>
  `
})
export class NzTestFormTextComponent {}
