import { Component, DebugElement } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ɵComponentBed as ComponentBed, ɵcreateComponentBed as createComponentBed } from 'ng-zorro-antd/core/testing';
import { NzFormControlComponent } from './form-control.component';
import { NzFormItemComponent } from './form-item.component';
import { NzFormModule } from './form.module';

const testBedOptions = { imports: [NzFormModule, NoopAnimationsModule, ReactiveFormsModule, FormsModule] };
const statusMap = {
  warning: 'ant-form-item-has-warning',
  validating: 'ant-form-item-is-validating',
  pending: 'ant-form-item-is-validating',
  error: 'ant-form-item-has-error',
  success: 'ant-form-item-has-success'
};

describe('nz-form-control', () => {
  describe('static status', () => {
    let testBed: ComponentBed<NzTestStaticFormControlComponent>;
    let testComponent: NzTestStaticFormControlComponent;
    let formItem: DebugElement;
    let formControl: DebugElement;
    beforeEach(() => {
      testBed = createComponentBed(NzTestStaticFormControlComponent, testBedOptions);
      testComponent = testBed.component;
      formItem = testBed.fixture.debugElement.query(By.directive(NzFormItemComponent));
      formControl = testBed.fixture.debugElement.query(By.directive(NzFormControlComponent));
    });
    it('should className correct', () => {
      expect(formControl.nativeElement.classList).toContain('ant-form-item-control');
    });
    it('should hasFeedback work', () => {
      expect(formItem.nativeElement.classList).not.toContain('ant-form-item-has-feedback');
      expect(formControl.nativeElement.querySelector('.ant-form-item-children-icon .anticon')).toBeNull();
      testComponent.hasFeedback = true;
      testBed.fixture.detectChanges();
      expect(formItem.nativeElement.classList).toContain('ant-form-item-has-feedback');
      expect(formControl.nativeElement.querySelector('.ant-form-item-children-icon .anticon')).not.toBeNull();
    });
    it('should status work', () => {
      const statusList: Array<keyof typeof statusMap> = ['warning', 'validating', 'pending', 'error', 'success'];
      statusList.forEach(status => {
        testComponent.status = status;
        testBed.fixture.detectChanges();
        expect(formItem.nativeElement.classList).toContain(statusMap[status]);
      });
    });
  });
  describe('reactive status', () => {
    let testBed: ComponentBed<NzTestReactiveFormControlComponent>;
    let testComponent: NzTestReactiveFormControlComponent;
    let formItems: DebugElement[];
    let formControls: DebugElement[];
    beforeEach(() => {
      testBed = createComponentBed(NzTestReactiveFormControlComponent, testBedOptions);
      testComponent = testBed.component;
      formItems = testBed.fixture.debugElement.queryAll(By.directive(NzFormItemComponent));
      formControls = testBed.fixture.debugElement.queryAll(By.directive(NzFormControlComponent));
    });
    it('should init status correct', () => {
      expect(formItems[0].nativeElement.classList).toContain('ant-form-item');
      expect(formItems[1].nativeElement.classList).toContain('ant-form-item');
      expect(formControls[0].nativeElement.classList).toContain('ant-form-item-control');
      expect(formControls[1].nativeElement.classList).toContain('ant-form-item-control');
    });
    it('should valid work', () => {
      testComponent.formGroup.get('input')!.markAsDirty();
      testComponent.formGroup.get('input2')!.markAsDirty();
      testComponent.formGroup.get('input')!.setValue('123');
      testComponent.formGroup.get('input2')!.setValue('123');
      testComponent.formGroup.get('input')!.updateValueAndValidity();
      testComponent.formGroup.get('input2')!.updateValueAndValidity();

      testBed.fixture.detectChanges();

      expect(formItems[0].nativeElement.classList).toContain(statusMap.success);
      expect(formItems[1].nativeElement.classList).toContain(statusMap.success);
    });
    it('should invalid work', () => {
      testComponent.formGroup.get('input')!.markAsDirty();
      testComponent.formGroup.get('input2')!.markAsDirty();
      testComponent.formGroup.get('input')!.setValue('');
      testComponent.formGroup.get('input2')!.setValue('');
      testComponent.formGroup.get('input')!.updateValueAndValidity();
      testComponent.formGroup.get('input2')!.updateValueAndValidity();

      testBed.fixture.detectChanges();

      expect(formItems[0].nativeElement.classList).toContain(statusMap.error);
      expect(formItems[1].nativeElement.classList).toContain(statusMap.error);
    });
    it('should dirty work', () => {
      testComponent.formGroup.get('input')!.markAsDirty();
      testComponent.formGroup.get('input2')!.markAsDirty();
      testComponent.formGroup.get('input')!.updateValueAndValidity();
      testComponent.formGroup.get('input2')!.updateValueAndValidity();

      testBed.fixture.detectChanges();

      expect(formItems[0].nativeElement.classList).toContain(statusMap.error);
      expect(formItems[1].nativeElement.classList).toContain(statusMap.error);

      testComponent.formGroup.get('input')!.markAsPristine();
      testComponent.formGroup.get('input2')!.markAsPristine();
      testComponent.formGroup.get('input')!.updateValueAndValidity();
      testComponent.formGroup.get('input2')!.updateValueAndValidity();

      testBed.fixture.detectChanges();

      expect(formItems[0].nativeElement.classList).not.toContain(statusMap.error);
      expect(formItems[1].nativeElement.classList).not.toContain(statusMap.error);
    });
    it('should pending work', () => {
      testComponent.formGroup.get('input')!.markAsPending();
      testComponent.formGroup.get('input2')!.markAsPending();
      testComponent.formGroup.get('input')!.updateValueAndValidity();
      testComponent.formGroup.get('input2')!.updateValueAndValidity();

      testBed.fixture.detectChanges();

      expect(formItems[0].nativeElement.classList).not.toContain(statusMap.error);
      expect(formItems[1].nativeElement.classList).not.toContain(statusMap.error);
    });
  });
  describe('reactive init status', () => {
    let testBed: ComponentBed<NzTestReactiveFormControlInitStatusComponent>;
    let testComponent: NzTestReactiveFormControlInitStatusComponent;
    let formItem: DebugElement;
    beforeEach(() => {
      testBed = createComponentBed(NzTestReactiveFormControlInitStatusComponent, testBedOptions);
      testComponent = testBed.component;
      formItem = testBed.fixture.debugElement.query(By.directive(NzFormItemComponent));
    });
    it('should init status correct', () => {
      expect(formItem.nativeElement.classList).toContain(statusMap.error);
    });
    it('should warning status work', () => {
      testComponent.formGroup.get('input')!.setErrors({ warning: true });

      testBed.fixture.detectChanges();

      expect(formItem.nativeElement.classList).toContain(statusMap.warning);
    });
  });
});

@Component({
  template: `
    <nz-form-item>
      <nz-form-control [nzHasFeedback]="hasFeedback" [nzValidateStatus]="status"></nz-form-control>
    </nz-form-item>
  `
})
export class NzTestStaticFormControlComponent {
  hasFeedback = false;
  status = 'success';
}

@Component({
  template: `
    <form [formGroup]="formGroup">
      <nz-form-item>
        <nz-form-control>
          <input formControlName="input" />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-control [nzValidateStatus]="validateStatus">
          <input formControlName="input3" />
        </nz-form-control>
      </nz-form-item>
      <input formControlName="input2" />
    </form>
  `
})
export class NzTestReactiveFormControlComponent {
  formGroup: FormGroup;
  validateStatus: string | FormControlName | FormControl;

  constructor(private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      input: ['', [Validators.required]],
      input2: ['', [Validators.required]],
      input3: ['', [Validators.required]]
    });
    this.validateStatus = this.formGroup.get('input2') as FormControl;
  }
}

/** https://github.com/NG-ZORRO/ng-zorro-antd/issues/1170 **/
@Component({
  template: `
    <form [formGroup]="formGroup">
      <nz-form-item>
        <nz-form-control>
          <input formControlName="input" />
        </nz-form-control>
      </nz-form-item>
    </form>
  `
})
export class NzTestReactiveFormControlInitStatusComponent {
  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      input: ['', [Validators.required]]
    });
    this.formGroup.controls.input.markAsDirty();
  }
}
