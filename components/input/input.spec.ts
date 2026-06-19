/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component, DebugElement, signal, viewChild, WritableSignal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { NZ_FORM_SIZE, NZ_FORM_VARIANT } from 'ng-zorro-antd/core/form';
import { testDirectionality } from 'ng-zorro-antd/core/testing';
import { NzSizeLDSType, NzStatus, NzVariant } from 'ng-zorro-antd/core/types';
import { provideNzIconsTesting } from 'ng-zorro-antd/icon/testing';
import { NZ_SPACE_COMPACT_SIZE } from 'ng-zorro-antd/space';

import { NzFormControlStatusType, NzFormModule } from '../form';
import { NzInputDirective } from './input.directive';
import { NzInputModule } from './input.module';

describe('input', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideNzIconsTesting()]
    });
  });

  describe('single input', () => {
    describe('input with input element', () => {
      let fixture: ComponentFixture<NzTestInputWithInputComponent>;
      let testComponent: NzTestInputWithInputComponent;
      let inputElement: DebugElement;

      beforeEach(() => {
        fixture = TestBed.createComponent(NzTestInputWithInputComponent);
        testComponent = fixture.debugElement.componentInstance;
        fixture.detectChanges();
        inputElement = fixture.debugElement.query(By.directive(NzInputDirective));
      });

      it('should className correct', () => {
        fixture.detectChanges();
        expect(inputElement.nativeElement.classList).toContain('ant-input');
      });

      it('should disabled work', () => {
        fixture.detectChanges();
        expect(inputElement.nativeElement.classList).not.toContain('ant-input-disabled');
        testComponent.disabled.set(true);
        fixture.detectChanges();
        expect(inputElement.nativeElement.classList).toContain('ant-input-disabled');
      });

      it('should nzSize work', () => {
        testComponent.size.set('small');
        fixture.detectChanges();
        expect(inputElement.nativeElement.classList).toContain('ant-input');
        expect(inputElement.nativeElement.classList).toContain('ant-input-sm');
        testComponent.size.set('large');
        fixture.detectChanges();
        expect(inputElement.nativeElement.classList).toContain('ant-input');
        expect(inputElement.nativeElement.classList).toContain('ant-input-lg');
      });

      it('should be focus / blur work', async () => {
        const input = inputElement.nativeElement;
        testComponent.inputDirective().focus();
        expect(document.activeElement).toBe(input);
        testComponent.inputDirective().blur();
        expect(document.activeElement).not.toBe(input);

        testComponent.value.set('NG-ZORRO');
        fixture.detectChanges();
        await fixture.whenStable();

        testComponent.inputDirective().focus({ cursor: 'start' });
        expect(input.selectionStart).toBe(0);
        expect(input.selectionEnd).toBe(0);
        testComponent.inputDirective().focus({ cursor: 'end' });
        expect(input.selectionStart).toBe(testComponent.value().length);
        expect(input.selectionEnd).toBe(testComponent.value().length);
        testComponent.inputDirective().focus({ cursor: 'all' });
        expect(input.selectionStart).toBe(0);
        expect(input.selectionEnd).toBe(testComponent.value().length);
      });

      describe('should variant work', () => {
        it('outlined', () => {
          testComponent.variant.set('outlined');
          fixture.detectChanges();
          expect(inputElement.nativeElement.classList).toContain('ant-input-outlined');
        });

        it('filled', () => {
          fixture.detectChanges();
          expect(inputElement.nativeElement.classList).not.toContain('ant-input-filled');
          testComponent.variant.set('filled');
          fixture.detectChanges();
          expect(inputElement.nativeElement.classList).toContain('ant-input-filled');
        });

        it('borderless', () => {
          fixture.detectChanges();
          expect(inputElement.nativeElement.classList).not.toContain('ant-input-borderless');
          testComponent.variant.set('borderless');
          fixture.detectChanges();
          expect(inputElement.nativeElement.classList).toContain('ant-input-borderless');
        });

        it('underlined', () => {
          fixture.detectChanges();
          expect(inputElement.nativeElement.classList).not.toContain('ant-input-borderless');
          testComponent.variant.set('underlined');
          fixture.detectChanges();
          expect(inputElement.nativeElement.classList).toContain('ant-input-underlined');
        });
      });
    });

    describe('input with textarea element', () => {
      let fixture: ComponentFixture<NzTestInputWithInputComponent>;
      let inputElement: DebugElement;

      beforeEach(() => {
        fixture = TestBed.createComponent(NzTestInputWithInputComponent);
        fixture.detectChanges();
        inputElement = fixture.debugElement.query(By.directive(NzInputDirective));
      });

      it('should className correct', () => {
        fixture.detectChanges();
        expect(inputElement.nativeElement.classList).toContain('ant-input');
      });
    });
  });

  describe('input form', () => {
    describe('input with form', () => {
      let fixture: ComponentFixture<NzTestInputFormComponent>;
      let testComponent: NzTestInputFormComponent;
      let inputElement: DebugElement;

      beforeEach(() => {
        fixture = TestBed.createComponent(NzTestInputFormComponent);
        testComponent = fixture.debugElement.componentInstance;
        fixture.detectChanges();
        inputElement = fixture.debugElement.query(By.directive(NzInputDirective));
      });

      it('should set disabled work', () => {
        expect(inputElement.nativeElement.classList).not.toContain('ant-input-disabled');
        expect(inputElement.nativeElement.getAttribute('disabled')).toBeNull();
        testComponent.disable();
        fixture.detectChanges();
        expect(inputElement.nativeElement.classList).toContain('ant-input-disabled');
        expect(inputElement.nativeElement.getAttribute('disabled')).toBe('true');
      });
    });
  });

  testDirectionality(() => NzTestInputWithInputComponent, By.directive(NzInputDirective), 'ant-input');

  describe('input with status', () => {
    let fixture: ComponentFixture<NzTestInputWithStatusComponent>;
    let inputElement: DebugElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestInputWithStatusComponent);
      fixture.detectChanges();
      inputElement = fixture.debugElement.query(By.directive(NzInputDirective));
    });

    it('should className correct', () => {
      fixture.detectChanges();
      expect(inputElement.nativeElement.classList).toContain('ant-input-status-error');

      fixture.componentInstance.status.set('warning');
      fixture.detectChanges();
      expect(inputElement.nativeElement.className).toContain('ant-input-status-warning');

      fixture.componentInstance.status.set('');
      fixture.detectChanges();
      expect(inputElement.nativeElement.className).not.toContain('ant-input-status-warning');
    });
  });

  describe('input in form', () => {
    let fixture: ComponentFixture<NzTestInputInFormComponent>;
    let inputElement: DebugElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestInputInFormComponent);
      fixture.detectChanges();
      inputElement = fixture.debugElement.query(By.directive(NzInputDirective));
    });

    it('should className correct', () => {
      fixture.detectChanges();
      expect(inputElement.nativeElement.classList).toContain('ant-input-status-error');
      expect(inputElement.nativeElement.nextSibling.classList).toContain('ant-form-item-feedback-icon-error');

      fixture.componentInstance.status.set('success');
      fixture.detectChanges();
      expect(inputElement.nativeElement.classList).toContain('ant-input-status-success');
      expect(inputElement.nativeElement.nextSibling.classList).toContain('ant-form-item-feedback-icon-success');

      fixture.componentInstance.status.set('warning');
      fixture.detectChanges();
      expect(inputElement.nativeElement.classList).toContain('ant-input-status-warning');
      expect(inputElement.nativeElement.nextSibling.classList).toContain('ant-form-item-feedback-icon-warning');

      fixture.componentInstance.status.set('validating');
      fixture.detectChanges();
      expect(inputElement.nativeElement.classList).toContain('ant-input-status-validating');
      expect(inputElement.nativeElement.nextSibling.classList).toContain('ant-form-item-feedback-icon-validating');

      fixture.componentInstance.feedback.set(false);
      fixture.detectChanges();
      expect(inputElement.nativeElement.classList).toContain('ant-input-status-validating');
      expect(
        inputElement.nativeElement.nextSibling?.classList?.contains('ant-form-item-feedback-icon') ?? false
      ).toBeFalse();
    });
  });

  describe('input with type', () => {
    let fixture: ComponentFixture<NzTestInputWithTypeComponent>;
    let inputElement: DebugElement;
    let component: NzTestInputWithTypeComponent;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestInputWithTypeComponent);
      fixture.detectChanges();
      inputElement = fixture.debugElement.query(By.directive(NzInputDirective));
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should type correct', () => {
      expect(inputElement.nativeElement.type).toEqual('text');

      component.type.set('password');
      fixture.detectChanges();
      expect(inputElement.nativeElement.type).toEqual('password');

      component.type.set('number');
      fixture.detectChanges();
      expect(inputElement.nativeElement.type).toEqual('number');

      component.type.set('');
      fixture.detectChanges();
      expect(inputElement.nativeElement.type).toEqual('text');
    });
  });

  describe('finalSize', () => {
    let fixture: ComponentFixture<TestInputFinalSizeComponent>;
    let inputElement: HTMLButtonElement;
    let component: TestInputFinalSizeComponent;
    let formSizeSignal: WritableSignal<NzSizeLDSType | undefined>;
    let compactSizeSignal: WritableSignal<NzSizeLDSType>;

    beforeEach(() => {
      compactSizeSignal = signal<NzSizeLDSType>('large');
      formSizeSignal = signal<NzSizeLDSType | undefined>('default');
    });

    afterEach(() => {
      TestBed.resetTestingModule();
    });

    it('should set correctly the size from the formSize signal', () => {
      TestBed.configureTestingModule({
        providers: [
          { provide: NZ_FORM_SIZE, useValue: formSizeSignal },
          { provide: NZ_SPACE_COMPACT_SIZE, useValue: compactSizeSignal }
        ]
      });
      fixture = TestBed.createComponent(TestInputFinalSizeComponent);
      component = fixture.componentInstance;
      inputElement = fixture.debugElement.query(By.directive(NzInputDirective)).nativeElement;
      fixture.detectChanges();
      formSizeSignal.set('large');
      fixture.detectChanges();
      expect(inputElement.classList).toContain('ant-input-lg');
    });

    it('should set correctly the size from the compactSize signal', () => {
      TestBed.configureTestingModule({
        providers: [{ provide: NZ_SPACE_COMPACT_SIZE, useValue: compactSizeSignal }]
      });
      fixture = TestBed.createComponent(TestInputFinalSizeComponent);
      component = fixture.componentInstance;
      inputElement = fixture.debugElement.query(By.directive(NzInputDirective)).nativeElement;
      fixture.detectChanges();
      compactSizeSignal.set('large');
      fixture.detectChanges();
      expect(inputElement.classList).toContain('ant-input-lg');
    });

    it('should set correctly the size from the nzSize input', () => {
      fixture = TestBed.createComponent(TestInputFinalSizeComponent);
      component = fixture.componentInstance;
      inputElement = fixture.debugElement.query(By.directive(NzInputDirective)).nativeElement;
      fixture.detectChanges();
      component.size.set('large');
      fixture.detectChanges();
      expect(inputElement.classList).toContain('ant-input-lg');
    });
  });

  describe('finalVariant', () => {
    let fixture: ComponentFixture<TestInputFinalVariantComponent>;
    let inputElement: HTMLElement;
    let component: TestInputFinalVariantComponent;
    let formVariantSignal: WritableSignal<NzVariant>;

    beforeEach(() => {
      formVariantSignal = signal<NzVariant>('outlined');
    });

    afterEach(() => {
      TestBed.resetTestingModule();
    });

    it('should set correctly the variant from the formVariant signal', () => {
      TestBed.configureTestingModule({
        providers: [{ provide: NZ_FORM_VARIANT, useValue: formVariantSignal }]
      });
      fixture = TestBed.createComponent(TestInputFinalVariantComponent);
      component = fixture.componentInstance;
      inputElement = fixture.debugElement.query(By.directive(NzInputDirective)).nativeElement;
      fixture.detectChanges();
      formVariantSignal.set('filled');
      fixture.detectChanges();
      expect(inputElement.classList).toContain('ant-input-filled');
    });

    it('should prioritize any explicit nzVariant over formVariant', () => {
      TestBed.configureTestingModule({
        providers: [{ provide: NZ_FORM_VARIANT, useValue: formVariantSignal }]
      });
      fixture = TestBed.createComponent(TestInputFinalVariantComponent);
      component = fixture.componentInstance;
      inputElement = fixture.debugElement.query(By.directive(NzInputDirective)).nativeElement;
      fixture.detectChanges();
      formVariantSignal.set('filled');
      component.variant.set('borderless');
      fixture.detectChanges();
      expect(inputElement.classList).toContain('ant-input-borderless');
      expect(inputElement.classList).not.toContain('ant-input-filled');
    });

    it('should prioritize nzVariant over formVariant when nzVariant is explicitly set', () => {
      TestBed.configureTestingModule({
        providers: [{ provide: NZ_FORM_VARIANT, useValue: formVariantSignal }]
      });
      fixture = TestBed.createComponent(TestInputFinalVariantComponent);
      component = fixture.componentInstance;
      inputElement = fixture.debugElement.query(By.directive(NzInputDirective)).nativeElement;
      fixture.detectChanges();
      formVariantSignal.set('filled');
      component.variant.set('outlined');
      fixture.detectChanges();
      expect(inputElement.classList).not.toContain('ant-input-filled');
      expect(inputElement.classList).not.toContain('ant-input-borderless');
      expect(inputElement.classList).not.toContain('ant-input-underlined');
    });

    it('should use nzVariant when no formVariant is provided', () => {
      fixture = TestBed.createComponent(TestInputFinalVariantComponent);
      component = fixture.componentInstance;
      inputElement = fixture.debugElement.query(By.directive(NzInputDirective)).nativeElement;
      fixture.detectChanges();
      component.variant.set('underlined');
      fixture.detectChanges();
      expect(inputElement.classList).toContain('ant-input-underlined');
    });

    it('should fallback to outlined when neither nzVariant nor formVariant is set', () => {
      fixture = TestBed.createComponent(TestInputFinalVariantComponent);
      component = fixture.componentInstance;
      inputElement = fixture.debugElement.query(By.directive(NzInputDirective)).nativeElement;
      fixture.detectChanges();
      expect(inputElement.classList).not.toContain('ant-input-filled');
      expect(inputElement.classList).not.toContain('ant-input-borderless');
      expect(inputElement.classList).not.toContain('ant-input-underlined');
    });
  });
});

@Component({
  imports: [NzInputModule],
  template: `<input nz-input [nzSize]="size()" [disabled]="disabled()" [nzVariant]="variant()" [value]="value()" />`
})
export class NzTestInputWithInputComponent {
  readonly size = signal<NzSizeLDSType>('default');
  readonly disabled = signal(false);
  readonly variant = signal<NzVariant>('outlined');
  readonly value = signal('NzTestInput');
  inputDirective = viewChild.required(NzInputDirective);
}

@Component({
  imports: [NzInputModule],
  template: `<textarea nz-input></textarea>`
})
export class NzTestInputWithTextAreaComponent {}

@Component({
  imports: [ReactiveFormsModule, NzInputModule],
  template: `
    <form>
      <input nz-input [formControl]="formControl" />
    </form>
  `
})
export class NzTestInputFormComponent {
  formControl = new FormControl('abc');

  disable(): void {
    this.formControl.disable();
  }
}

// status
@Component({
  imports: [NzInputModule],
  template: `<input nz-input [nzStatus]="status()" />`
})
export class NzTestInputWithStatusComponent {
  readonly status = signal<NzStatus>('error');
}

@Component({
  imports: [NzFormModule, NzInputModule],
  template: `
    <form nz-form>
      <nz-form-item>
        <nz-form-control [nzHasFeedback]="feedback()" [nzValidateStatus]="status()">
          <input nz-input />
        </nz-form-control>
      </nz-form-item>
    </form>
  `
})
export class NzTestInputInFormComponent {
  readonly status = signal<NzFormControlStatusType>('error');
  readonly feedback = signal(true);
}

@Component({
  imports: [NzInputModule],
  template: `<input nz-input [type]="type()" />`
})
export class NzTestInputWithTypeComponent {
  readonly type = signal<string | null>(null);
}

@Component({
  imports: [NzInputModule],
  template: `<input nz-input [nzSize]="size()" />`
})
export class TestInputFinalSizeComponent {
  readonly size = signal<NzSizeLDSType>('default');
}

@Component({
  imports: [NzInputModule],
  template: `<input nz-input [nzVariant]="variant()" />`
})
export class TestInputFinalVariantComponent {
  readonly variant = signal<NzVariant | undefined>(undefined);
}
