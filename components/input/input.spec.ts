/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { BidiModule, Direction } from '@angular/cdk/bidi';
import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, flush, waitForAsync } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { NzSizeLDSType, NzStatus, NzVariant } from 'ng-zorro-antd/core/types';
import { provideNzIconsTesting } from 'ng-zorro-antd/icon/testing';
import { NzInputGroupComponent } from 'ng-zorro-antd/input/input-group.component';

import { NzFormControlStatusType, NzFormModule } from '../form';
import { NzInputDirective } from './input.directive';
import { NzInputModule } from './input.module';

describe('input', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [provideNzIconsTesting()]
    });
  }));
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
        testComponent.disabled = true;
        fixture.detectChanges();
        expect(inputElement.nativeElement.classList).toContain('ant-input-disabled');
      });
      it('should nzSize work', () => {
        testComponent.size = 'small';
        fixture.detectChanges();
        expect(inputElement.nativeElement.classList).toContain('ant-input');
        expect(inputElement.nativeElement.classList).toContain('ant-input-sm');
        testComponent.size = 'large';
        fixture.detectChanges();
        expect(inputElement.nativeElement.classList).toContain('ant-input');
        expect(inputElement.nativeElement.classList).toContain('ant-input-lg');
      });
      it('should nzStepperLess work', () => {
        fixture.detectChanges();
        expect(inputElement.nativeElement.classList).toContain('ant-input-stepperless');
        testComponent.stepperless = false;
        fixture.detectChanges();
        expect(inputElement.nativeElement.classList).not.toContain('ant-input-stepperless');
      });
      it('should nzBorderless work', () => {
        testComponent.borderless = true;
        fixture.detectChanges();
        expect(inputElement.nativeElement.classList).toContain('ant-input-borderless');
      });
      describe('should nzVariant work', () => {
        it('filled', () => {
          fixture.detectChanges();
          expect(inputElement.nativeElement.classList).not.toContain('ant-input-filled');
          testComponent.variant = 'filled';
          fixture.detectChanges();
          expect(inputElement.nativeElement.classList).toContain('ant-input-filled');
        });
        it('borderless', () => {
          fixture.detectChanges();
          expect(inputElement.nativeElement.classList).not.toContain('ant-input-borderless');
          testComponent.variant = 'borderless';
          fixture.detectChanges();
          expect(inputElement.nativeElement.classList).toContain('ant-input-borderless');
        });
        it('underlined', () => {
          fixture.detectChanges();
          expect(inputElement.nativeElement.classList).not.toContain('ant-input-borderless');
          testComponent.variant = 'underlined';
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
      it('should set disabled work', fakeAsync(() => {
        flush();
        expect(inputElement.nativeElement.classList).not.toContain('ant-input-disabled');
        expect(inputElement.nativeElement.getAttribute('disabled')).toBeNull();
        testComponent.disable();
        flush();
        fixture.detectChanges();
        expect(inputElement.nativeElement.classList).toContain('ant-input-disabled');
        expect(inputElement.nativeElement.getAttribute('disabled')).toBe('true');
      }));
    });
  });

  describe('input RTL', () => {
    let fixture: ComponentFixture<NzTestInputWithDirComponent>;
    let inputElement: DebugElement;
    let inputGroupElement: DebugElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestInputWithDirComponent);
      fixture.detectChanges();
      inputElement = fixture.debugElement.query(By.directive(NzInputDirective));
      inputGroupElement = fixture.debugElement.query(By.directive(NzInputGroupComponent));
    });

    it('should className correct on dir change', () => {
      expect(inputElement.nativeElement.classList).not.toContain('ant-input-rtl');
      expect(inputGroupElement.nativeElement.classList).not.toContain('ant-input-group-rtl');

      fixture.componentInstance.dir = 'rtl';
      fixture.detectChanges();
      expect(inputElement.nativeElement.classList).toContain('ant-input-rtl');
      expect(inputGroupElement.nativeElement.classList).toContain('ant-input-group-rtl');
    });
  });

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

      fixture.componentInstance.status = 'warning';
      fixture.detectChanges();
      expect(inputElement.nativeElement.className).toContain('ant-input-status-warning');

      fixture.componentInstance.status = '';
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

      fixture.componentInstance.status = 'success';
      fixture.detectChanges();
      expect(inputElement.nativeElement.classList).toContain('ant-input-status-success');
      expect(inputElement.nativeElement.nextSibling.classList).toContain('ant-form-item-feedback-icon-success');

      fixture.componentInstance.status = 'warning';
      fixture.detectChanges();
      expect(inputElement.nativeElement.classList).toContain('ant-input-status-warning');
      expect(inputElement.nativeElement.nextSibling.classList).toContain('ant-form-item-feedback-icon-warning');

      fixture.componentInstance.status = 'validating';
      fixture.detectChanges();
      expect(inputElement.nativeElement.classList).toContain('ant-input-status-validating');
      expect(inputElement.nativeElement.nextSibling.classList).toContain('ant-form-item-feedback-icon-validating');

      fixture.componentInstance.feedback = false;
      fixture.detectChanges();
      expect(inputElement.nativeElement.classList).toContain('ant-input-status-validating');
      expect(inputElement.nativeElement.nextSibling?.classList).not.toContain('ant-form-item-feedback-icon');
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

      component.type = 'password';
      fixture.detectChanges();
      expect(inputElement.nativeElement.type).toEqual('password');

      component.type = 'number';
      fixture.detectChanges();
      expect(inputElement.nativeElement.type).toEqual('number');

      component.type = '';
      fixture.detectChanges();
      expect(inputElement.nativeElement.type).toEqual('text');
    });
  });
});

@Component({
  imports: [BidiModule, NzInputModule],
  template: `
    <div [dir]="dir">
      <input nz-input />
      <nz-input-wrapper>
        <input type="text" nz-input />
        <nz-icon nzInputAddonAfter nzType="setting" />
      </nz-input-wrapper>
    </div>
  `
})
export class NzTestInputWithDirComponent {
  dir: Direction = 'ltr';
}

@Component({
  imports: [NzInputModule],
  template: `<input
    nz-input
    [nzSize]="size"
    [disabled]="disabled"
    [nzBorderless]="borderless"
    [nzVariant]="variant"
    [nzStepperless]="stepperless"
  />`
})
export class NzTestInputWithInputComponent {
  size: NzSizeLDSType = 'default';
  disabled = false;
  stepperless = true;
  borderless = false;
  variant: NzVariant = 'outlined';
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
  template: `<input nz-input [nzStatus]="status" />`
})
export class NzTestInputWithStatusComponent {
  status: NzStatus = 'error';
}

@Component({
  imports: [NzFormModule, NzInputModule],
  template: `
    <form nz-form>
      <nz-form-item>
        <nz-form-control [nzHasFeedback]="feedback" [nzValidateStatus]="status">
          <input nz-input />
        </nz-form-control>
      </nz-form-item>
    </form>
  `
})
export class NzTestInputInFormComponent {
  status: NzFormControlStatusType = 'error';
  feedback = true;
}

@Component({
  imports: [NzInputModule],
  template: `<input nz-input [type]="type" />`
})
export class NzTestInputWithTypeComponent {
  type: string | null = null;
}
