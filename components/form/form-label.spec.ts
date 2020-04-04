import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ɵComponentBed as ComponentBed, ɵcreateComponentBed as createComponentBed } from 'ng-zorro-antd/core/testing';
import { NzFormLabelComponent } from './form-label.component';

const testBedOptions = { imports: [NoopAnimationsModule], declarations: [NzFormLabelComponent] };

describe('nz-form-label', () => {
  describe('default', () => {
    let testBed: ComponentBed<NzTestFormLabelComponent>;
    let testComponent: NzTestFormLabelComponent;
    let label: DebugElement;
    beforeEach(() => {
      testBed = createComponentBed(NzTestFormLabelComponent, testBedOptions);
      testComponent = testBed.component;
      label = testBed.fixture.debugElement.query(By.directive(NzFormLabelComponent));
    });
    it('should className correct', () => {
      expect(label.nativeElement.classList).toContain('ant-form-item-label');
    });
    it('should label for work', () => {
      expect(label.nativeElement.querySelector('label').attributes.getNamedItem('for').value).toBe('test');
    });
    it('should required work', () => {
      expect(label.nativeElement.querySelector('label').classList).not.toContain('ant-form-item-required');

      testComponent.required = true;

      testBed.fixture.detectChanges();

      expect(label.nativeElement.querySelector('label').classList).toContain('ant-form-item-required');
    });

    it('should no colon work', () => {
      expect(label.nativeElement.querySelector('label').classList).not.toContain('ant-form-item-no-colon');

      testComponent.noColon = true;

      testBed.fixture.detectChanges();

      expect(label.nativeElement.querySelector('label').classList).toContain('ant-form-item-no-colon');
    });
  });
});

@Component({
  template: `
    <nz-form-label [nzFor]="forValue" [nzNoColon]="noColon" [nzRequired]="required"></nz-form-label>
  `
})
export class NzTestFormLabelComponent {
  forValue = 'test';
  required = false;
  noColon = false;
}
