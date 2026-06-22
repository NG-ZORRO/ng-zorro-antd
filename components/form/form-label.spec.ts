/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NgTemplateOutlet } from '@angular/common';
import { Component, DebugElement, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { provideNzNoAnimation } from 'ng-zorro-antd/core/animation';
import { NzFormModule } from 'ng-zorro-antd/form/form.module';
import { en_US, NzI18nService } from 'ng-zorro-antd/i18n';

import { NzFormLabelComponent } from './form-label.component';
import { NzRequiredMark } from './types';

describe('form-label', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideNzNoAnimation()]
    });
  });

  describe('default', () => {
    let fixture: ComponentFixture<NzFormLabelComponent>;
    let label: DebugElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzFormLabelComponent);
      label = fixture.debugElement;
      fixture.detectChanges();
    });

    it('should className correct', () => {
      expect(label.nativeElement.classList).toContain('ant-form-item-label');
    });

    it('should label for work', () => {
      fixture.componentRef.setInput('nzFor', 'test');
      fixture.detectChanges();
      expect(label.nativeElement.querySelector('label').attributes.getNamedItem('for').value).toBe('test');
    });

    it('should required work', () => {
      expect(label.nativeElement.querySelector('label').classList).not.toContain('ant-form-item-required');

      fixture.componentRef.setInput('nzRequired', true);
      fixture.detectChanges();

      expect(label.nativeElement.querySelector('label').classList).toContain('ant-form-item-required');
    });

    it('should no colon work', () => {
      expect(label.nativeElement.querySelector('label').classList).not.toContain('ant-form-item-no-colon');

      fixture.componentRef.setInput('nzNoColon', true);
      fixture.detectChanges();

      expect(label.nativeElement.querySelector('label').classList).toContain('ant-form-item-no-colon');
    });

    it('should tooltip work', () => {
      expect(label.nativeElement.querySelector('.ant-form-item-tooltip')).toBeNull();

      fixture.componentRef.setInput('nzTooltipTitle', 'tooltip');
      fixture.detectChanges();

      expect(label.nativeElement.querySelector('.ant-form-item-tooltip')).toBeDefined();
      expect(label.nativeElement.querySelector('.anticon-question-circle')).toBeDefined();

      fixture.componentRef.setInput('nzTooltipIcon', 'info-circle');
      fixture.detectChanges();

      expect(label.nativeElement.querySelector('.ant-form-item-tooltip')).toBeDefined();
      expect(label.nativeElement.querySelector('.anticon-info-circle')).toBeDefined();
    });

    it('should label align work', () => {
      expect(label.nativeElement.classList).not.toContain('ant-form-item-label-left');

      fixture.componentRef.setInput('nzLabelAlign', 'left');
      fixture.detectChanges();

      expect(label.nativeElement.classList).toContain('ant-form-item-label-left');
    });

    it('should label wrap work', () => {
      expect(label.nativeElement.classList).not.toContain('ant-form-item-label-wrap');

      fixture.componentRef.setInput('nzLabelWrap', true);
      fixture.detectChanges();

      expect(label.nativeElement.classList).toContain('ant-form-item-label-wrap');
    });
  });

  describe('with form required mark integration', () => {
    let fixture: ComponentFixture<NzTestFormLabelRequiredMarkComponent>;
    let testComponent: NzTestFormLabelRequiredMarkComponent;
    let labels: DebugElement[];
    let i18nService: NzI18nService;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestFormLabelRequiredMarkComponent);
      testComponent = fixture.componentInstance;
      i18nService = TestBed.inject(NzI18nService);
      i18nService.setLocale(en_US);
      fixture.detectChanges();
      labels = fixture.debugElement.queryAll(By.directive(NzFormLabelComponent));
    });

    it('should inherit required mark from form directive when using boolean true', () => {
      const requiredLabel = labels.find(l => l.nativeElement.classList.contains('required-label'));
      const optionalLabel = labels.find(l => l.nativeElement.classList.contains('optional-label'));

      expect(requiredLabel?.nativeElement.querySelector('label').classList).toContain('ant-form-item-required');
      expect(requiredLabel?.nativeElement.querySelector('label').classList).not.toContain(
        'ant-form-item-required-mark-optional'
      );
      expect(optionalLabel?.nativeElement.querySelector('label').classList).not.toContain('ant-form-item-required');
    });

    it('should show optional styling when form nzRequiredMark is false', () => {
      testComponent.requiredMark.set(false);
      fixture.detectChanges();

      const requiredLabel = labels.find(l => l.nativeElement.classList.contains('required-label'));
      const optionalLabel = labels.find(l => l.nativeElement.classList.contains('optional-label'));

      expect(requiredLabel?.nativeElement.querySelector('label').classList).toContain('ant-form-item-required');
      expect(requiredLabel?.nativeElement.querySelector('label').classList).toContain(
        'ant-form-item-required-mark-hidden'
      );
      expect(optionalLabel?.nativeElement.querySelector('label').classList).not.toContain('ant-form-item-required');
      expect(optionalLabel?.nativeElement.querySelector('label').classList).toContain(
        'ant-form-item-required-mark-hidden'
      );
    });

    it('should show optional styling when form nzRequiredMark is "optional"', () => {
      testComponent.requiredMark.set('optional');
      fixture.detectChanges();

      const requiredLabel = labels.find(l => l.nativeElement.classList.contains('required-label'));
      const optionalLabel = labels.find(l => l.nativeElement.classList.contains('optional-label'));

      expect(requiredLabel?.nativeElement.querySelector('label').classList).toContain('ant-form-item-required');
      expect(requiredLabel?.nativeElement.querySelector('label').classList).toContain(
        'ant-form-item-required-mark-optional'
      );
      expect(optionalLabel?.nativeElement.querySelector('label').classList).not.toContain('ant-form-item-required');
    });

    it('should show optional text when nzRequiredMark is "optional" and field is not required', () => {
      testComponent.requiredMark.set('optional');
      fixture.detectChanges();

      const requiredLabel = labels.find(l => l.nativeElement.classList.contains('required-label'));
      const optionalLabel = labels.find(l => l.nativeElement.classList.contains('optional-label'));

      // Required label should NOT show (optional) text
      expect(requiredLabel?.nativeElement.querySelector('.ant-form-item-optional')).toBeNull();

      // Optional label should show (optional) text
      expect(optionalLabel?.nativeElement.querySelector('.ant-form-item-optional')).toBeTruthy();
      expect(optionalLabel?.nativeElement.querySelector('.ant-form-item-optional').textContent?.trim()).toBe(
        '(optional)'
      );
    });

    it('should NOT show optional text when nzRequiredMark is false', () => {
      testComponent.requiredMark.set(false);
      fixture.detectChanges();

      const requiredLabel = labels.find(l => l.nativeElement.classList.contains('required-label'));
      const optionalLabel = labels.find(l => l.nativeElement.classList.contains('optional-label'));

      expect(requiredLabel?.nativeElement.querySelector('.ant-form-item-optional')).toBeNull();
      expect(optionalLabel?.nativeElement.querySelector('.ant-form-item-optional')).toBeNull();
    });

    it('should NOT show optional text when nzRequiredMark is true', () => {
      testComponent.requiredMark.set(true);
      fixture.detectChanges();

      const requiredLabel = labels.find(l => l.nativeElement.classList.contains('required-label'));
      const optionalLabel = labels.find(l => l.nativeElement.classList.contains('optional-label'));

      expect(requiredLabel?.nativeElement.querySelector('.ant-form-item-optional')).toBeNull();
      expect(optionalLabel?.nativeElement.querySelector('.ant-form-item-optional')).toBeNull();
    });

    it('should use custom template when provided and handle template context correctly', () => {
      testComponent.useCustomTemplate.set(true);
      fixture.detectChanges();

      const requiredLabel = labels.find(l => l.nativeElement.classList.contains('required-label'));
      const optionalLabel = labels.find(l => l.nativeElement.classList.contains('optional-label'));

      expect(requiredLabel?.nativeElement.querySelector('.custom-required')).toBeTruthy();
      expect(requiredLabel?.nativeElement.querySelector('.custom-required').textContent?.trim()).toBe('REQUIRED');
      expect(optionalLabel?.nativeElement.querySelector('.custom-optional')).toBeTruthy();
      expect(optionalLabel?.nativeElement.querySelector('.custom-optional').textContent?.trim()).toBe('OPTIONAL');

      expect(requiredLabel?.nativeElement.querySelector('.label-content')).toBeTruthy();
      expect(optionalLabel?.nativeElement.querySelector('.label-content')).toBeTruthy();
    });
  });
});

@Component({
  imports: [NzFormModule, NgTemplateOutlet],
  template: `
    <form nz-form [nzRequiredMark]="useCustomTemplate() ? customRequiredMarkTemplate : requiredMark()">
      <nz-form-item>
        <nz-form-label class="required-label" nzRequired>
          <span class="label-content">Required Field</span>
        </nz-form-label>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label class="optional-label">
          <span class="label-content">Optional Field</span>
        </nz-form-label>
      </nz-form-item>
    </form>

    <ng-template #customRequiredMarkTemplate let-label let-required="required">
      @if (required) {
        <span class="custom-required">REQUIRED</span>
      } @else {
        <span class="custom-optional">OPTIONAL</span>
      }
      <ng-container *ngTemplateOutlet="label" />
    </ng-template>
  `
})
export class NzTestFormLabelRequiredMarkComponent {
  readonly requiredMark = signal<NzRequiredMark>(true);
  readonly useCustomTemplate = signal(false);
}
