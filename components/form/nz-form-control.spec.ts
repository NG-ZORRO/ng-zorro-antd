import { Component } from '@angular/core';
import { fakeAsync, flush, tick, TestBed } from '@angular/core/testing';
import { FormsModule, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NzFormControlComponent } from './nz-form-control.component';
import { NzFormModule } from './nz-form.module';

describe('nz-form-control', () => {
  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports     : [ NzFormModule, NoopAnimationsModule, ReactiveFormsModule, FormsModule ],
      declarations: [ NzTestStaticFormControlComponent, NzTestReactiveFormControlComponent, NzTestReactiveFormControlInitStatusComponent ]
    });
    TestBed.compileComponents();
  }));
  describe('static status', () => {
    let fixture;
    let testComponent;
    let formControl;
    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestStaticFormControlComponent);
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      formControl = fixture.debugElement.query(By.directive(NzFormControlComponent));
    });
    it('should className correct', () => {
      fixture.detectChanges();
      expect(formControl.nativeElement.classList).toContain('ant-form-item-control-wrapper');
    });
    it('should hasFeedback work', () => {
      fixture.detectChanges();
      expect(formControl.nativeElement.querySelector('.ant-form-item-control').classList).not.toContain('has-feedback');
      testComponent.hasFeedback = true;
      fixture.detectChanges();
      expect(formControl.nativeElement.querySelector('.ant-form-item-control').classList).toContain('has-feedback');
    });
    it('should status work', () => {
      fixture.detectChanges();
      const statusList = [ 'warning', 'validating', 'pending', 'error', 'success' ];
      const statusMap = {
        'warning'   : 'has-warning',
        'validating': 'is-validating',
        'pending'   : 'is-validating',
        'error'     : 'has-error',
        'success'   : 'has-success'
      };
      statusList.forEach(status => {
        testComponent.status = status;
        fixture.detectChanges();
        expect(formControl.nativeElement.querySelector('.ant-form-item-control').classList).toContain(statusMap[ status ]);
      });
    });
  });
  describe('reactive status', () => {
    let fixture;
    let testComponent;
    let formControls;
    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestReactiveFormControlComponent);
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      formControls = fixture.debugElement.queryAll(By.directive(NzFormControlComponent));
    });
    it('should init status correct', fakeAsync(() => {
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(formControls[ 0 ].nativeElement.querySelector('.ant-form-item-control').className).toBe('ant-form-item-control');
      expect(formControls[ 1 ].nativeElement.querySelector('.ant-form-item-control').className).toBe('ant-form-item-control');
    }));
    it('should valid work', fakeAsync(() => {
      testComponent.formGroup.get('input').markAsDirty();
      testComponent.formGroup.get('input2').markAsDirty();
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      testComponent.formGroup.get('input').setValue('123');
      testComponent.formGroup.get('input2').setValue('123');
      testComponent.formGroup.get('input').updateValueAndValidity();
      testComponent.formGroup.get('input2').updateValueAndValidity();
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      tick(1000);
      fixture.detectChanges();
      expect(formControls[ 0 ].nativeElement.querySelector('.ant-form-item-control').classList).toContain('has-success');
      expect(formControls[ 1 ].nativeElement.querySelector('.ant-form-item-control').classList).toContain('has-success');
    }));
    it('should invalid work', fakeAsync(() => {
      testComponent.formGroup.get('input').markAsDirty();
      testComponent.formGroup.get('input2').markAsDirty();
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      testComponent.formGroup.get('input').setValue('');
      testComponent.formGroup.get('input2').setValue('');
      testComponent.formGroup.get('input').updateValueAndValidity();
      testComponent.formGroup.get('input2').updateValueAndValidity();
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(formControls[ 0 ].nativeElement.querySelector('.ant-form-item-control').classList).toContain('has-error');
      expect(formControls[ 1 ].nativeElement.querySelector('.ant-form-item-control').classList).toContain('has-error');
    }));
    it('should dirty work', fakeAsync(() => {
      testComponent.formGroup.get('input').markAsDirty();
      testComponent.formGroup.get('input2').markAsDirty();
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      testComponent.formGroup.get('input').updateValueAndValidity();
      testComponent.formGroup.get('input2').updateValueAndValidity();
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(formControls[ 0 ].nativeElement.querySelector('.ant-form-item-control').classList).toContain('has-error');
      expect(formControls[ 1 ].nativeElement.querySelector('.ant-form-item-control').classList).toContain('has-error');
      testComponent.formGroup.get('input').markAsPristine();
      testComponent.formGroup.get('input2').markAsPristine();
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      testComponent.formGroup.get('input').updateValueAndValidity();
      testComponent.formGroup.get('input2').updateValueAndValidity();
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(formControls[ 0 ].nativeElement.querySelector('.ant-form-item-control').classList).not.toContain('has-error');
      expect(formControls[ 1 ].nativeElement.querySelector('.ant-form-item-control').classList).not.toContain('has-error');
    }));
    it('should pending work', fakeAsync(() => {
      testComponent.formGroup.get('input2').markAsDirty();
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      testComponent.formGroup.get('input2').updateValueAndValidity();
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(formControls[ 1 ].nativeElement.querySelector('.ant-form-item-control').classList).toContain('has-error');
    }));
  });
  describe('reactive init status', () => {
    let fixture;
    let testComponent;
    let formControl;
    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestReactiveFormControlInitStatusComponent);
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      formControl = fixture.debugElement.query(By.directive(NzFormControlComponent));
    });
    it('should init status correct', fakeAsync(() => {
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(formControl.nativeElement.querySelector('.ant-form-item-control').classList).toContain('has-error');
    }));
  });
});

@Component({
  template: `
    <nz-form-control [nzHasFeedback]="hasFeedback" [nzValidateStatus]="status"></nz-form-control>`
})
export class NzTestStaticFormControlComponent {
  hasFeedback = false;
  status = 'success';
}

@Component({
  template: `
    <form [formGroup]="formGroup">
      <nz-form-control>
        <input formControlName="input">
      </nz-form-control>
      <nz-form-control [nzValidateStatus]="validateStatus">
        <input formControlName="input3">
      </nz-form-control>
      <input formControlName="input2">
    </form>
  `
})
export class NzTestReactiveFormControlComponent {
  formGroup: FormGroup;
  validateStatus;

  constructor(private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      input : [ '', [ Validators.required ] ],
      input2: [ '', [ Validators.required ] ],
      input3: [ '', [ Validators.required ] ]
    });
    this.validateStatus = this.formGroup.get('input2');
  }
}

/** https://github.com/NG-ZORRO/ng-zorro-antd/issues/1170 **/
@Component({
  template: `
    <form [formGroup]="formGroup">
      <nz-form-control>
        <input formControlName="input">
      </nz-form-control>
    </form>
  `
})
export class NzTestReactiveFormControlInitStatusComponent {
  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      input : [ '', [ Validators.required ] ]
    });
    this.formGroup.controls.input.markAsDirty();
  }
}
