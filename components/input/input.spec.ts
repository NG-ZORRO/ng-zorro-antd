import { BidiModule, Direction } from '@angular/cdk/bidi';
import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed, waitForAsync } from '@angular/core/testing';
import { UntypedFormBuilder, UntypedFormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { NzStatus } from 'ng-zorro-antd/core/types';
import { NzIconTestModule } from 'ng-zorro-antd/icon/testing';
import { NzInputGroupComponent } from 'ng-zorro-antd/input/input-group.component';

import { NzFormControlStatusType, NzFormModule } from '../form';
import { NzInputDirective } from './input.directive';
import { NzInputModule } from './input.module';

describe('input', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [BidiModule, NzInputModule, FormsModule, ReactiveFormsModule, NzIconTestModule, NzFormModule],
        declarations: [
          NzTestInputWithInputComponent,
          NzTestInputWithTextAreaComponent,
          NzTestInputFormComponent,
          NzTestInputWithStatusComponent,
          NzTestInputWithDirComponent,
          NzTestInputInFormComponent
        ],
        providers: []
      }).compileComponents();
    })
  );
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
        expect(inputElement.nativeElement.attributes.getNamedItem('disabled')).toBeNull();
        testComponent.disable();
        flush();
        fixture.detectChanges();
        expect(inputElement.nativeElement.attributes.getNamedItem('disabled')).toBeDefined();
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
});

@Component({
  template: `
    <div [dir]="dir">
      <input nz-input />
      <nz-input-group nzAddOnAfterIcon="setting">
        <input type="text" nz-input />
      </nz-input-group>
    </div>
  `
})
export class NzTestInputWithDirComponent {
  dir: Direction = 'ltr';
}

@Component({
  template: ` <input nz-input [nzSize]="size" [disabled]="disabled" /> `
})
export class NzTestInputWithInputComponent {
  size = 'default';
  disabled = false;
}

@Component({
  template: ` <textarea nz-input></textarea> `
})
export class NzTestInputWithTextAreaComponent {}

@Component({
  template: `
    <form [formGroup]="formGroup">
      <input nz-input formControlName="input" />
    </form>
  `
})
export class NzTestInputFormComponent {
  formGroup: UntypedFormGroup;

  constructor(private formBuilder: UntypedFormBuilder) {
    this.formGroup = this.formBuilder.group({
      input: ['abc']
    });
  }

  disable(): void {
    this.formGroup.disable();
  }
}

// status
@Component({
  template: ` <input nz-input [nzStatus]="status" /> `
})
export class NzTestInputWithStatusComponent {
  status: NzStatus = 'error';
}

@Component({
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
