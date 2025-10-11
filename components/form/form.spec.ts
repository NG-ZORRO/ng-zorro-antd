/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NgTemplateOutlet } from '@angular/common';
import { AfterViewInit, Component, DebugElement, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { NzFormModule } from 'ng-zorro-antd/form/form.module';

import { NzFormDirective, NzFormLayoutType } from './form.directive';
import { NzRequiredMark } from './types';

const testBedOptions = {
  imports: [NoopAnimationsModule]
};

describe('nz-form', () => {
  describe('default', () => {
    let fixture: ComponentFixture<NzTestFormDirectiveComponent>;
    let testComponent: NzTestFormDirectiveComponent;
    let form: DebugElement;
    beforeEach(() => {
      TestBed.configureTestingModule(testBedOptions);
      fixture = TestBed.createComponent(NzTestFormDirectiveComponent);
      testComponent = fixture.componentInstance;
      form = fixture.debugElement.query(By.directive(NzFormDirective));
    });
    it('should className correct', () => {
      fixture.detectChanges();
      expect(form.nativeElement.classList).toContain('ant-form');
      expect(form.nativeElement.classList).toContain('ant-form-horizontal');
    });
    it('should layout work', () => {
      testComponent.layout = 'vertical';

      fixture.detectChanges();

      expect(form.nativeElement.classList).toContain('ant-form-vertical');
      expect(form.nativeElement.classList).not.toContain('ant-form-horizontal');

      testComponent.layout = 'inline';

      fixture.detectChanges();

      expect(form.nativeElement.classList).not.toContain('ant-form-vertical');
      expect(form.nativeElement.classList).not.toContain('ant-form-horizontal');
      expect(form.nativeElement.classList).toContain('ant-form-inline');
    });
  });

  describe('label integrate', () => {
    let fixture: ComponentFixture<NzTestFormLabelIntegrateComponent>;
    let testComponent: NzTestFormLabelIntegrateComponent;
    let form: DebugElement;
    beforeEach(() => {
      TestBed.configureTestingModule(testBedOptions);
      fixture = TestBed.createComponent(NzTestFormLabelIntegrateComponent);
      testComponent = fixture.componentInstance;
      form = fixture.debugElement.query(By.directive(NzFormDirective));
    });

    afterEach(() => {
      testComponent.defaultNoColon = false;
      testComponent.noColon = false;
      testComponent.testPriority = false;
    });

    it('should set default `NoColon` value', () => {
      const labels = (form.nativeElement as HTMLElement).querySelectorAll<HTMLLabelElement>(
        '.ant-form-item-label label'
      );
      labels.forEach(label => expect(label.classList).not.toContain('ant-form-item-no-colon'));

      testComponent.defaultNoColon = true;

      fixture.detectChanges();

      labels.forEach(label => expect(label.classList).toContain('ant-form-item-no-colon'));
    });

    it('should label have high priority', () => {
      const labels = (form.nativeElement as HTMLElement).querySelectorAll<HTMLLabelElement>(
        '.ant-form-item-label label'
      );
      labels.forEach(label => expect(label.classList).not.toContain('ant-form-item-no-colon'));

      testComponent.defaultNoColon = true;

      fixture.detectChanges();

      labels.forEach(label => expect(label.classList).toContain('ant-form-item-no-colon'));
      testComponent.testPriority = true;

      fixture.detectChanges();

      labels.forEach(label => expect(label.classList).toContain('ant-form-item-no-colon'));
      labels.forEach(label => {
        if (label.innerText === 'TEST_PRIORITY') {
          expect(label.classList).not.toContain('ant-form-item-no-colon');
        } else {
          expect(label.classList).toContain('ant-form-item-no-colon');
        }
      });

      testComponent.defaultNoColon = false;
      testComponent.noColon = true;

      fixture.detectChanges();

      labels.forEach(label => {
        if (label.innerText === 'TEST_PRIORITY') {
          expect(label.classList).toContain('ant-form-item-no-colon');
        } else {
          expect(label.classList).not.toContain('ant-form-item-no-colon');
        }
      });
    });
  });

  describe('required mark', () => {
    let fixture: ComponentFixture<NzTestFormRequiredMarkComponent>;
    let testComponent: NzTestFormRequiredMarkComponent;
    let form: DebugElement;

    beforeEach(() => {
      TestBed.configureTestingModule(testBedOptions);
      fixture = TestBed.createComponent(NzTestFormRequiredMarkComponent);
      testComponent = fixture.componentInstance;
      form = fixture.debugElement.query(By.directive(NzFormDirective));
      fixture.detectChanges();
    });

    it('should handle boolean required mark (default: true)', () => {
      const requiredLabel = form.nativeElement.querySelector('.required-label label');
      const optionalLabel = form.nativeElement.querySelector('.optional-label label');

      expect(requiredLabel.classList).toContain('ant-form-item-required');
      expect(requiredLabel.classList).not.toContain('ant-form-item-required-mark-optional');
      expect(optionalLabel.classList).not.toContain('ant-form-item-required');
    });

    it('should handle boolean required mark (false)', () => {
      testComponent.requiredMark = false;
      fixture.detectChanges();

      const requiredLabel = form.nativeElement.querySelector('.required-label label');
      const optionalLabel = form.nativeElement.querySelector('.optional-label label');

      expect(requiredLabel.classList).toContain('ant-form-item-required');
      expect(requiredLabel.classList).toContain('ant-form-item-required-mark-hidden');
      expect(optionalLabel.classList).not.toContain('ant-form-item-required');
      expect(optionalLabel.classList).toContain('ant-form-item-required-mark-hidden');
    });

    it('should handle optional required mark', () => {
      testComponent.requiredMark = 'optional';
      fixture.detectChanges();

      const requiredLabel = form.nativeElement.querySelector('.required-label label');
      const optionalLabel = form.nativeElement.querySelector('.optional-label label');

      expect(requiredLabel.classList).toContain('ant-form-item-required');
      expect(requiredLabel.classList).toContain('ant-form-item-required-mark-optional');
      expect(optionalLabel.classList).not.toContain('ant-form-item-required');
    });

    it('should handle custom template required mark', () => {
      testComponent.useCustomTemplate = true;
      fixture.detectChanges();

      const requiredLabel = form.nativeElement.querySelector('.required-label');
      const optionalLabel = form.nativeElement.querySelector('.optional-label');

      expect(requiredLabel.querySelector('.custom-required')).toBeTruthy();
      expect(requiredLabel.querySelector('.custom-required').textContent?.trim()).toBe('REQUIRED');
      expect(optionalLabel.querySelector('.custom-optional')).toBeTruthy();
      expect(optionalLabel.querySelector('.custom-optional').textContent?.trim()).toBe('OPTIONAL');
    });

    it('should propagate required mark from form directive to labels', () => {
      const formDirective = form.injector.get(NzFormDirective);
      expect(formDirective.nzRequiredMark()).toBe(true);

      testComponent.requiredMark = 'optional';
      fixture.detectChanges();

      expect(formDirective.nzRequiredMark()).toBe('optional');
    });

    it('should handle template context correctly', () => {
      testComponent.useCustomTemplate = true;
      fixture.detectChanges();

      const customTemplateElement = form.nativeElement.querySelector('.custom-required');
      expect(customTemplateElement).toBeTruthy();

      const labelContent = form.nativeElement.querySelector('.required-label .label-content');
      expect(labelContent).toBeTruthy();
      expect(labelContent.textContent?.trim()).toBe('Required Field');
    });
  });
});

@Component({
  imports: [NzFormModule],
  template: `<form nz-form [nzLayout]="layout"></form>`
})
export class NzTestFormDirectiveComponent {
  layout: NzFormLayoutType = 'horizontal';
}

@Component({
  imports: [NzFormModule],
  template: `
    <form nz-form [nzNoColon]="defaultNoColon">
      <nz-form-item>
        <nz-form-label>Label</nz-form-label>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label>Label</nz-form-label>
      </nz-form-item>
      @if (testPriority) {
        <nz-form-item>
          <nz-form-label [nzNoColon]="noColon">TEST_PRIORITY</nz-form-label>
        </nz-form-item>
      }
    </form>
  `
})
export class NzTestFormLabelIntegrateComponent {
  defaultNoColon = false;
  testPriority = false;
  noColon = false;
}

@Component({
  imports: [NzFormModule, NgTemplateOutlet],
  template: `
    <form nz-form [nzRequiredMark]="useCustomTemplate ? customRequiredMarkTemplate : requiredMark">
      <nz-form-item class="required-label">
        <nz-form-label nzRequired>
          <span class="label-content">Required Field</span>
        </nz-form-label>
      </nz-form-item>
      <nz-form-item class="optional-label">
        <nz-form-label>
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
export class NzTestFormRequiredMarkComponent implements AfterViewInit {
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
