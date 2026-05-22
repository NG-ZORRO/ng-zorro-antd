/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideNzIconsTesting } from 'ng-zorro-antd/icon/testing';

import { NzFormItemFeedbackIconComponent } from './nz-form-item-feedback-icon.component';
import { provideNzNoAnimation } from '../animation';

const CLASS_NAME = 'ant-form-item-feedback-icon';

describe('nz-form-item-feedback-icon', () => {
  let fixture: ComponentFixture<NzFormItemFeedbackIconComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideNzNoAnimation(), provideNzIconsTesting()]
    });
    fixture = TestBed.createComponent(NzFormItemFeedbackIconComponent);
    fixture.detectChanges();
  });

  it('should className correct', () => {
    expect(fixture.nativeElement.classList).toContain(CLASS_NAME);

    fixture.componentRef.setInput('status', 'success');
    fixture.detectChanges();
    expect(fixture.nativeElement.classList).toContain(`${CLASS_NAME}-success`);
    expect(fixture.nativeElement.querySelector('.anticon-check-circle-fill')).toBeTruthy();

    fixture.componentRef.setInput('status', 'error');
    fixture.detectChanges();
    expect(fixture.nativeElement.classList).toContain(`${CLASS_NAME}-error`);
    expect(fixture.nativeElement.querySelector('.anticon-close-circle-fill')).toBeTruthy();

    fixture.componentRef.setInput('status', 'warning');
    fixture.detectChanges();
    expect(fixture.nativeElement.classList).toContain(`${CLASS_NAME}-warning`);
    expect(fixture.nativeElement.querySelector('.anticon-exclamation-circle-fill')).toBeTruthy();

    fixture.componentRef.setInput('status', 'validating');
    fixture.detectChanges();
    expect(fixture.nativeElement.classList).toContain(`${CLASS_NAME}-validating`);
    expect(fixture.nativeElement.querySelector('.anticon-loading')).toBeTruthy();
  });
});
