/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, DebugElement, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { provideNzNoAnimation } from 'ng-zorro-antd/core/animation';
import { NzFormModule } from 'ng-zorro-antd/form/form.module';

import { NzFormLabelComponent } from './form-label.component';
import { NzFormDirective, NzFormLayoutType, NzLabelAlignType } from './form.directive';
import { NzRequiredMark } from './types';

describe('form', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideNzNoAnimation()]
    });
  });

  describe('default', () => {
    let fixture: ComponentFixture<NzTestFormDirectiveComponent>;
    let testComponent: NzTestFormDirectiveComponent;
    let form: DebugElement;

    beforeEach(() => {
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
      testComponent.layout.set('vertical');

      fixture.detectChanges();

      expect(form.nativeElement.classList).toContain('ant-form-vertical');
      expect(form.nativeElement.classList).not.toContain('ant-form-horizontal');

      testComponent.layout.set('inline');

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
      fixture = TestBed.createComponent(NzTestFormLabelIntegrateComponent);
      testComponent = fixture.componentInstance;
      form = fixture.debugElement.query(By.directive(NzFormDirective));
    });

    afterEach(() => {
      testComponent.defaultNoColon.set(false);
      testComponent.noColon.set(false);
      testComponent.testPriority.set(false);
    });

    it('should set default `NoColon` value', () => {
      const labels = (form.nativeElement as HTMLElement).querySelectorAll<HTMLLabelElement>(
        '.ant-form-item-label label'
      );
      labels.forEach(label => expect(label.classList).not.toContain('ant-form-item-no-colon'));

      testComponent.defaultNoColon.set(true);

      fixture.detectChanges();

      labels.forEach(label => expect(label.classList).toContain('ant-form-item-no-colon'));
    });

    it('should label have high priority', () => {
      const labels = (form.nativeElement as HTMLElement).querySelectorAll<HTMLLabelElement>(
        '.ant-form-item-label label'
      );
      labels.forEach(label => expect(label.classList).not.toContain('ant-form-item-no-colon'));

      testComponent.defaultNoColon.set(true);

      fixture.detectChanges();

      labels.forEach(label => expect(label.classList).toContain('ant-form-item-no-colon'));
      testComponent.testPriority.set(true);

      fixture.detectChanges();

      labels.forEach(label => expect(label.classList).toContain('ant-form-item-no-colon'));
      labels.forEach(label => {
        if (label.innerText === 'TEST_PRIORITY') {
          expect(label.classList).not.toContain('ant-form-item-no-colon');
        } else {
          expect(label.classList).toContain('ant-form-item-no-colon');
        }
      });

      testComponent.defaultNoColon.set(false);
      testComponent.noColon.set(true);

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

  describe('label overrides', () => {
    it('should update inherited values while preserving explicit local overrides', async () => {
      const fixture = TestBed.createComponent(NzTestFormLabelOverridesComponent);
      const host = fixture.componentInstance;
      await fixture.whenStable();
      const labels = fixture.debugElement.queryAll(By.directive(NzFormLabelComponent));
      const inherited = labels[0].injector.get(NzFormLabelComponent);
      const local = labels[1].injector.get(NzFormLabelComponent);

      host.defaults.set({ noColon: true, align: 'left', wrap: true, icon: 'info-circle' });
      await fixture.whenStable();
      expect(inherited.nzNoColon).toBe(true);
      expect(inherited.nzLabelAlign).toBe('left');
      expect(inherited.nzLabelWrap).toBe(true);
      expect(inherited.tooltipIcon).toEqual({ type: 'info-circle', theme: 'outline' });
      expect(labels[0].nativeElement.classList).toContain('ant-form-item-label-left');
      expect(labels[0].nativeElement.classList).toContain('ant-form-item-label-wrap');
      expect(labels[0].nativeElement.querySelector('label').classList).toContain('ant-form-item-no-colon');

      expect(local.nzNoColon).toBe(false);
      expect(local.nzLabelAlign).toBe('right');
      expect(local.nzLabelWrap).toBe(false);
      expect(local.tooltipIcon).toEqual({ type: 'question-circle', theme: 'outline' });
      expect(labels[1].nativeElement.classList).not.toContain('ant-form-item-label-left');
      expect(labels[1].nativeElement.classList).not.toContain('ant-form-item-label-wrap');
      expect(labels[1].nativeElement.querySelector('label').classList).not.toContain('ant-form-item-no-colon');

      host.overrides.set({ noColon: true, align: 'left', wrap: true, icon: 'check-circle' });
      host.defaults.set({ noColon: false, align: 'right', wrap: false, icon: 'close-circle' });
      await fixture.whenStable();
      expect(inherited.nzNoColon).toBe(false);
      expect(inherited.nzLabelAlign).toBe('right');
      expect(inherited.nzLabelWrap).toBe(false);
      expect(inherited.tooltipIcon).toEqual({ type: 'close-circle', theme: 'outline' });
      expect(local.nzNoColon).toBe(true);
      expect(local.nzLabelAlign).toBe('left');
      expect(local.nzLabelWrap).toBe(true);
      expect(local.tooltipIcon).toEqual({ type: 'check-circle', theme: 'outline' });
      expect(labels[1].nativeElement.classList).toContain('ant-form-item-label-left');
      expect(labels[1].nativeElement.classList).toContain('ant-form-item-label-wrap');
      expect(labels[1].nativeElement.querySelector('label').classList).toContain('ant-form-item-no-colon');
    });
  });

  describe('required mark', () => {
    let fixture: ComponentFixture<NzTestFormRequiredMarkComponent>;
    let testComponent: NzTestFormRequiredMarkComponent;
    let form: DebugElement;

    beforeEach(() => {
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
      testComponent.requiredMark.set(false);
      fixture.detectChanges();

      const requiredLabel = form.nativeElement.querySelector('.required-label label');
      const optionalLabel = form.nativeElement.querySelector('.optional-label label');

      expect(requiredLabel.classList).toContain('ant-form-item-required');
      expect(requiredLabel.classList).toContain('ant-form-item-required-mark-hidden');
      expect(optionalLabel.classList).not.toContain('ant-form-item-required');
      expect(optionalLabel.classList).toContain('ant-form-item-required-mark-hidden');
    });

    it('should handle optional required mark', () => {
      testComponent.requiredMark.set('optional');
      fixture.detectChanges();

      const requiredLabel = form.nativeElement.querySelector('.required-label label');
      const optionalLabel = form.nativeElement.querySelector('.optional-label label');

      expect(requiredLabel.classList).toContain('ant-form-item-required');
      expect(requiredLabel.classList).toContain('ant-form-item-required-mark-optional');
      expect(optionalLabel.classList).not.toContain('ant-form-item-required');
    });

    it('should handle custom template required mark', () => {
      testComponent.useCustomTemplate.set(true);
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

      testComponent.requiredMark.set('optional');
      fixture.detectChanges();

      expect(formDirective.nzRequiredMark()).toBe('optional');
    });

    it('should handle template context correctly', () => {
      testComponent.useCustomTemplate.set(true);
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
  template: `<form nz-form [nzLayout]="layout()"></form>`
})
export class NzTestFormDirectiveComponent {
  readonly layout = signal<NzFormLayoutType>('horizontal');
}

@Component({
  imports: [NzFormModule],
  template: `
    <form nz-form [nzNoColon]="defaultNoColon()">
      <nz-form-item>
        <nz-form-label>Label</nz-form-label>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label>Label</nz-form-label>
      </nz-form-item>
      @if (testPriority()) {
        <nz-form-item>
          <nz-form-label [nzNoColon]="noColon()">TEST_PRIORITY</nz-form-label>
        </nz-form-item>
      }
    </form>
  `
})
export class NzTestFormLabelIntegrateComponent {
  readonly defaultNoColon = signal(false);
  readonly testPriority = signal(false);
  readonly noColon = signal(false);
}

@Component({
  imports: [NzFormModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <form
      nz-form
      [nzNoColon]="defaults().noColon"
      [nzLabelAlign]="defaults().align"
      [nzLabelWrap]="defaults().wrap"
      [nzTooltipIcon]="defaults().icon"
    >
      <nz-form-item>
        <nz-form-label>Inherited</nz-form-label>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label
          [nzNoColon]="overrides().noColon"
          [nzLabelAlign]="overrides().align"
          [nzLabelWrap]="overrides().wrap"
          [nzTooltipIcon]="overrides().icon"
          >Local</nz-form-label
        >
      </nz-form-item>
    </form>
  `
})
export class NzTestFormLabelOverridesComponent {
  readonly defaults = signal<{ noColon: boolean; align: NzLabelAlignType; wrap: boolean; icon: string }>({
    noColon: false,
    align: 'right',
    wrap: false,
    icon: 'question-circle'
  });
  readonly overrides = signal<{ noColon: boolean; align: NzLabelAlignType; wrap: boolean; icon: string }>({
    noColon: false,
    align: 'right',
    wrap: false,
    icon: 'question-circle'
  });
}

@Component({
  imports: [NzFormModule, NgTemplateOutlet],
  template: `
    <form nz-form [nzRequiredMark]="useCustomTemplate() ? customRequiredMarkTemplate : requiredMark()">
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
export class NzTestFormRequiredMarkComponent {
  readonly requiredMark = signal<NzRequiredMark>(true);
  readonly useCustomTemplate = signal(false);
}
