/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NgTemplateOutlet } from '@angular/common';
import { AfterViewInit, Component, DebugElement, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { NzLabelAlignType } from 'ng-zorro-antd/form/form.directive';
import { NzFormModule } from 'ng-zorro-antd/form/form.module';
import { en_US, NzI18nService } from 'ng-zorro-antd/i18n';

import { NzFormLabelComponent, NzFormTooltipIcon } from './form-label.component';
import { NzRequiredMark } from './types';

const testBedOptions = { imports: [NoopAnimationsModule] };

describe('nz-form-label', () => {
  describe('default', () => {
    let fixture: ComponentFixture<NzTestFormLabelComponent>;
    let testComponent: NzTestFormLabelComponent;
    let label: DebugElement;
    beforeEach(() => {
      TestBed.configureTestingModule(testBedOptions);
      fixture = TestBed.createComponent(NzTestFormLabelComponent);
      testComponent = fixture.componentInstance;
      fixture.detectChanges();
      label = fixture.debugElement.query(By.directive(NzFormLabelComponent));
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

      fixture.detectChanges();

      expect(label.nativeElement.querySelector('label').classList).toContain('ant-form-item-required');
    });

    it('should no colon work', () => {
      expect(label.nativeElement.querySelector('label').classList).not.toContain('ant-form-item-no-colon');

      testComponent.noColon = true;

      fixture.detectChanges();

      expect(label.nativeElement.querySelector('label').classList).toContain('ant-form-item-no-colon');
    });

    it('should tooltip work', () => {
      expect(label.nativeElement.querySelector('.ant-form-item-tooltip')).toBeNull();

      testComponent.tooltipTitle = 'tooltip';
      fixture.detectChanges();

      expect(label.nativeElement.querySelector('.ant-form-item-tooltip')).toBeDefined();
      expect(label.nativeElement.querySelector('.anticon-question-circle')).toBeDefined();

      testComponent.tooltipIcon = 'info-circle';
      fixture.detectChanges();

      expect(label.nativeElement.querySelector('.ant-form-item-tooltip')).toBeDefined();
      expect(label.nativeElement.querySelector('.anticon-info-circle')).toBeDefined();
    });
    it('should label align work', () => {
      expect(label.nativeElement.classList).not.toContain('ant-form-item-label-left');

      testComponent.align = 'left';

      fixture.detectChanges();

      expect(label.nativeElement.classList).toContain('ant-form-item-label-left');
    });

    it('should label wrap work', () => {
      expect(label.nativeElement.classList).not.toContain('ant-form-item-label-wrap');

      testComponent.labelWrap = true;
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
      TestBed.configureTestingModule(testBedOptions);
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
      testComponent.requiredMark = false;
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
      testComponent.requiredMark = 'optional';
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
      testComponent.requiredMark = 'optional';
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
      testComponent.requiredMark = false;
      fixture.detectChanges();

      const requiredLabel = labels.find(l => l.nativeElement.classList.contains('required-label'));
      const optionalLabel = labels.find(l => l.nativeElement.classList.contains('optional-label'));

      expect(requiredLabel?.nativeElement.querySelector('.ant-form-item-optional')).toBeNull();
      expect(optionalLabel?.nativeElement.querySelector('.ant-form-item-optional')).toBeNull();
    });

    it('should NOT show optional text when nzRequiredMark is true', () => {
      testComponent.requiredMark = true;
      fixture.detectChanges();

      const requiredLabel = labels.find(l => l.nativeElement.classList.contains('required-label'));
      const optionalLabel = labels.find(l => l.nativeElement.classList.contains('optional-label'));

      expect(requiredLabel?.nativeElement.querySelector('.ant-form-item-optional')).toBeNull();
      expect(optionalLabel?.nativeElement.querySelector('.ant-form-item-optional')).toBeNull();
    });

    it('should use custom template when provided', () => {
      testComponent.useCustomTemplate = true;
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

    it('should handle template context correctly with required and optional labels', () => {
      testComponent.useCustomTemplate = true;
      fixture.detectChanges();

      const requiredLabelElement = fixture.debugElement.query(By.css('.required-label'));
      const optionalLabelElement = fixture.debugElement.query(By.css('.optional-label'));

      const requiredCustom = requiredLabelElement.nativeElement.querySelector('.custom-required');
      const optionalCustom = optionalLabelElement.nativeElement.querySelector('.custom-optional');

      expect(requiredCustom).toBeTruthy();
      expect(optionalCustom).toBeTruthy();
      expect(requiredCustom.textContent?.trim()).toBe('REQUIRED');
      expect(optionalCustom.textContent?.trim()).toBe('OPTIONAL');
    });
  });
});

@Component({
  imports: [NzFormModule],
  template: `
    <nz-form-label
      [nzFor]="forValue"
      [nzNoColon]="noColon"
      [nzRequired]="required"
      [nzTooltipTitle]="tooltipTitle"
      [nzTooltipIcon]="tooltipIcon"
      [nzLabelAlign]="align"
      [nzLabelWrap]="labelWrap"
    ></nz-form-label>
  `
})
export class NzTestFormLabelComponent {
  forValue = 'test';
  required = false;
  noColon = false;
  tooltipTitle?: string;
  tooltipIcon!: string | NzFormTooltipIcon;
  align: NzLabelAlignType = 'right';
  labelWrap = false;
}

@Component({
  imports: [NzFormModule, NgTemplateOutlet],
  template: `
    <form nz-form [nzRequiredMark]="useCustomTemplate ? customRequiredMarkTemplate : requiredMark">
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
export class NzTestFormLabelRequiredMarkComponent implements AfterViewInit {
  requiredMark: NzRequiredMark = true;
  useCustomTemplate = false;

  @ViewChild('customRequiredMarkTemplate', { static: true })
  customRequiredMarkTemplate!: TemplateRef<{ $implicit: TemplateRef<void>; required: boolean }>;

  ngAfterViewInit(): void {
    if (this.useCustomTemplate) {
      this.requiredMark = this.customRequiredMarkTemplate;
    }
  }
}
