import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { NzFormPatchModule } from 'ng-zorro-antd/core/form/nz-form-patch.module';
import { ɵComponentBed as ComponentBed, ɵcreateComponentBed as createComponentBed } from 'ng-zorro-antd/core/testing';
import { NzValidateStatus } from 'ng-zorro-antd/core/types';

import { NzFormItemFeedbackIconComponent } from './nz-form-item-feedback-icon.component';

const testBedOptions = { imports: [NzFormPatchModule, NoopAnimationsModule] };

describe('nz-form-item-feedback-icon', () => {
  describe('default', () => {
    let testBed: ComponentBed<NzTestFormItemFeedbackIconComponent>;
    let fixtureInstance: NzTestFormItemFeedbackIconComponent;
    let feedback: DebugElement;
    beforeEach(() => {
      testBed = createComponentBed(NzTestFormItemFeedbackIconComponent, testBedOptions);
      fixtureInstance = testBed.fixture.componentInstance;
      feedback = testBed.fixture.debugElement.query(By.directive(NzFormItemFeedbackIconComponent));
      testBed.fixture.detectChanges();
    });
    it('should className correct', () => {
      expect(feedback.nativeElement.classList).toContain('ant-form-item-feedback-icon');
      fixtureInstance.status = 'success';
      testBed.fixture.detectChanges();
      expect(feedback.nativeElement.classList).toContain('ant-form-item-feedback-icon-success');
      expect(feedback.nativeElement.querySelector('.anticon-check-circle-fill')).toBeTruthy();

      fixtureInstance.status = 'error';
      testBed.fixture.detectChanges();
      expect(feedback.nativeElement.classList).toContain('ant-form-item-feedback-icon-error');
      expect(feedback.nativeElement.querySelector('.anticon-close-circle-fill')).toBeTruthy();

      fixtureInstance.status = 'warning';
      testBed.fixture.detectChanges();
      expect(feedback.nativeElement.classList).toContain('ant-form-item-feedback-icon-warning');
      expect(feedback.nativeElement.querySelector('.anticon-exclamation-circle-fill')).toBeTruthy();

      fixtureInstance.status = 'validating';
      testBed.fixture.detectChanges();
      expect(feedback.nativeElement.classList).toContain('ant-form-item-feedback-icon-validating');
      expect(feedback.nativeElement.querySelector('.anticon-loading')).toBeTruthy();
    });
  });
});

@Component({
  template: ` <nz-form-item-feedback-icon [status]="status"></nz-form-item-feedback-icon> `
})
export class NzTestFormItemFeedbackIconComponent {
  status: NzValidateStatus = '';
}
