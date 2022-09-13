import { Component, DebugElement } from '@angular/core';
import { fakeAsync, tick } from '@angular/core/testing';
import {
  AbstractControl,
  UntypedFormBuilder,
  UntypedFormControl,
  FormControlName,
  UntypedFormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { ɵComponentBed as ComponentBed, ɵcreateComponentBed as createComponentBed } from 'ng-zorro-antd/core/testing';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { en_US, NzI18nService } from 'ng-zorro-antd/i18n';

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
    let formGroup: UntypedFormGroup;
    let formItems: DebugElement[];
    let formControls: DebugElement[];
    beforeEach(() => {
      testBed = createComponentBed(NzTestReactiveFormControlComponent, testBedOptions);
      formGroup = testBed.component.formGroup;
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
      formGroup.get('input')!.markAsDirty();
      formGroup.get('input2')!.markAsDirty();
      formGroup.get('input')!.setValue('123');
      formGroup.get('input2')!.setValue('123');
      formGroup.get('input')!.updateValueAndValidity();
      formGroup.get('input2')!.updateValueAndValidity();

      testBed.fixture.detectChanges();

      expect(formItems[0].nativeElement.classList).toContain(statusMap.success);
      expect(formItems[1].nativeElement.classList).toContain(statusMap.success);
    });
    it('should invalid work', () => {
      formGroup.get('input')!.markAsDirty();
      formGroup.get('input2')!.markAsDirty();
      formGroup.get('input')!.setValue('');
      formGroup.get('input2')!.setValue('');
      formGroup.get('input')!.updateValueAndValidity();
      formGroup.get('input2')!.updateValueAndValidity();

      testBed.fixture.detectChanges();

      expect(formItems[0].nativeElement.classList).toContain(statusMap.error);
      expect(formItems[1].nativeElement.classList).toContain(statusMap.error);
    });
    it('should dirty work', () => {
      formGroup.get('input')!.markAsDirty();
      formGroup.get('input2')!.markAsDirty();
      formGroup.get('input')!.updateValueAndValidity();
      formGroup.get('input2')!.updateValueAndValidity();

      testBed.fixture.detectChanges();

      expect(formItems[0].nativeElement.classList).toContain(statusMap.error);
      expect(formItems[1].nativeElement.classList).toContain(statusMap.error);

      formGroup.get('input')!.markAsPristine();
      formGroup.get('input2')!.markAsPristine();
      formGroup.get('input')!.updateValueAndValidity();
      formGroup.get('input2')!.updateValueAndValidity();

      testBed.fixture.detectChanges();

      expect(formItems[0].nativeElement.classList).not.toContain(statusMap.error);
      expect(formItems[1].nativeElement.classList).not.toContain(statusMap.error);
    });
    it('should pending work', () => {
      formGroup.get('input')!.markAsPending();
      formGroup.get('input2')!.markAsPending();
      formGroup.get('input')!.updateValueAndValidity();
      formGroup.get('input2')!.updateValueAndValidity();

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

  describe('auto tips', () => {
    let testBed: ComponentBed<NzTestReactiveFormAutoTipsComponent>;
    let testComponent: NzTestReactiveFormAutoTipsComponent;
    let formGroup: UntypedFormGroup;
    let formControls: DebugElement[];

    beforeEach(() => {
      testBed = createComponentBed(NzTestReactiveFormAutoTipsComponent, testBedOptions);
      testComponent = testBed.component;
      formGroup = testComponent.formGroup;
      formControls = testBed.fixture.debugElement.queryAll(By.directive(NzFormControlComponent));
    });
    it('should default work ', () => {
      formGroup.get('userName')!.markAsDirty();
      formGroup.get('mobile')!.markAsDirty();
      formGroup.get('email')!.markAsDirty();
      formGroup.get('password')!.markAsDirty();
      formGroup.get('confirmPassword')!.markAsDirty();
      formGroup.get('userName')!.updateValueAndValidity();
      formGroup.get('mobile')!.updateValueAndValidity();
      formGroup.get('email')!.updateValueAndValidity();
      formGroup.get('password')!.updateValueAndValidity();
      formGroup.get('confirmPassword')!.updateValueAndValidity();

      testBed.fixture.detectChanges();

      expect(formControls[0].nativeElement.querySelector('.ant-form-item-explain').textContent).toEqual('必填项');
      expect(formControls[1].nativeElement.querySelector('.ant-form-item-explain').textContent).toEqual('必填项');
      expect(formControls[2].nativeElement.querySelector('.ant-form-item-explain').textContent).toEqual(
        '请输入邮箱/Input is required'
      );
      expect(formControls[3].nativeElement.querySelector('.ant-form-item-explain').textContent).toEqual('必填项');

      testBed.fixture.detectChanges();

      formGroup.get('userName')!.setValue('12345');
      formGroup.get('mobile')!.setValue('12345');
      formGroup.get('email')!.setValue('12345');

      testBed.fixture.detectChanges();

      expect(formControls[0].nativeElement.querySelector('.ant-form-item-explain').textContent).toEqual(`最小长度为 6`);
      expect(formControls[1].nativeElement.querySelector('.ant-form-item-explain').textContent).toEqual(
        '手机号码格式不正确'
      );
      expect(formControls[2].nativeElement.querySelector('.ant-form-item-explain').textContent).toEqual(
        '请输入正确的邮箱'
      );

      testBed.fixture.detectChanges();

      testComponent.formAutoTips = {
        'zh-cn': {
          required: '请输入',
          email: '邮箱格式不正确'
        },
        en: {
          required: 'Input is required',
          email: 'The input is not valid email'
        }
      };
      testBed.fixture.detectChanges();

      formGroup.get('userName')!.setValue('');
      formGroup.get('mobile')!.setValue('');
      formGroup.get('email')!.setValue('');

      testBed.fixture.detectChanges();

      expect(formControls[0].nativeElement.querySelector('.ant-form-item-explain').textContent).toEqual('请输入');
      expect(formControls[1].nativeElement.querySelector('.ant-form-item-explain').textContent).toEqual('请输入');
      expect(formControls[2].nativeElement.querySelector('.ant-form-item-explain').textContent).toEqual(
        '请输入邮箱/Input is required'
      );
      expect(formControls[3].nativeElement.querySelector('.ant-form-item-explain').textContent).toEqual('请输入');

      testBed.fixture.detectChanges();

      testComponent.showConfirmPassword = true;
      testBed.fixture.detectChanges();

      formGroup.get('userName')!.setValue('');
      formGroup.get('mobile')!.setValue('');
      formGroup.get('email')!.setValue('');
      testBed.fixture.detectChanges();

      formControls = testBed.fixture.debugElement.queryAll(By.directive(NzFormControlComponent));

      expect(formControls[0].nativeElement.querySelector('.ant-form-item-explain').textContent).toEqual('请输入');
      expect(formControls[1].nativeElement.querySelector('.ant-form-item-explain').textContent).toEqual('请输入');
      expect(formControls[2].nativeElement.querySelector('.ant-form-item-explain').textContent).toEqual(
        '请输入邮箱/Input is required'
      );
      expect(formControls[3].nativeElement.querySelector('.ant-form-item-explain').textContent).toEqual('请输入');
      expect(formControls[4].nativeElement.querySelector('.ant-form-item-explain').textContent).toEqual('请输入');
    });
    it('should i18n work ', () => {
      formGroup.get('userName')!.markAsDirty();
      formGroup.get('mobile')!.markAsDirty();
      formGroup.get('email')!.markAsDirty();
      formGroup.get('userName')!.updateValueAndValidity();
      formGroup.get('mobile')!.updateValueAndValidity();
      formGroup.get('email')!.updateValueAndValidity();

      testBed.fixture.detectChanges();

      testComponent.i18n.setLocale(en_US);
      testBed.fixture.detectChanges();

      formGroup.get('userName')!.setValue('');
      formGroup.get('mobile')!.setValue('');
      formGroup.get('email')!.setValue('');
      testBed.fixture.detectChanges();

      expect(formControls[0].nativeElement.querySelector('.ant-form-item-explain').textContent).toEqual(
        'Input is required'
      );
      expect(formControls[1].nativeElement.querySelector('.ant-form-item-explain').textContent).toEqual(
        'Input is required'
      );
      expect(formControls[2].nativeElement.querySelector('.ant-form-item-explain').textContent).toEqual(
        '请输入邮箱/Input is required'
      );

      formGroup.get('userName')!.setValue('12345');
      formGroup.get('mobile')!.setValue('12345');
      formGroup.get('email')!.setValue('12345');

      testBed.fixture.detectChanges();

      expect(formControls[0].nativeElement.querySelector('.ant-form-item-explain').textContent).toEqual(
        `MinLength is 6`
      );
      expect(formControls[1].nativeElement.querySelector('.ant-form-item-explain').textContent).toEqual(
        'Mobile phone number is not valid'
      );
      expect(formControls[2].nativeElement.querySelector('.ant-form-item-explain').textContent).toEqual(
        'Please input valid email'
      );
    });
    it('should nzDisableAutoTips work ', fakeAsync(() => {
      formGroup.get('userName')!.markAsDirty();
      formGroup.get('mobile')!.markAsDirty();
      formGroup.get('email')!.markAsDirty();
      formGroup.get('password')!.markAsDirty();
      formGroup.get('userName')!.updateValueAndValidity();
      formGroup.get('mobile')!.updateValueAndValidity();
      formGroup.get('email')!.updateValueAndValidity();
      formGroup.get('password')!.updateValueAndValidity();

      testBed.fixture.detectChanges();

      testComponent.passwordDisableAutoTips = true;
      testBed.fixture.detectChanges();

      formGroup.get('password')!.updateValueAndValidity();
      testBed.fixture.detectChanges();

      expect(formControls[3].nativeElement.querySelector('.ant-form-item-explain').textContent).toEqual(
        'Please input your password!'
      );

      testComponent.formDisableAutoTips = true;
      testBed.fixture.detectChanges();

      formGroup.get('userName')!.setValue('12345');
      formGroup.get('mobile')!.setValue('12345');
      formGroup.get('email')!.setValue('12345');

      testBed.fixture.detectChanges();
      tick(300 + 50);
      testBed.fixture.detectChanges();

      expect(formControls[0].nativeElement.querySelector('.ant-form-item-explain')).toBeNull();
      expect(formControls[1].nativeElement.querySelector('.ant-form-item-explain')).toBeNull();
      expect(formControls[2].nativeElement.querySelector('.ant-form-item-explain')).toBeNull();
    }));
    it('should nzErrorTip change work', () => {
      testComponent.passwordDisableAutoTips = true;

      formGroup.get('password')!.markAsDirty();
      formGroup.get('password')!.updateValueAndValidity();

      testBed.fixture.detectChanges();

      expect(formControls[3].nativeElement.querySelector('.ant-form-item-explain').textContent).toEqual(
        'Please input your password!'
      );

      const passwordErrorTip = '请输入密码';
      testComponent.passwordErrorTip = passwordErrorTip;

      testBed.fixture.detectChanges();

      expect(formControls[3].nativeElement.querySelector('.ant-form-item-explain').textContent).toEqual(
        passwordErrorTip
      );
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
      <nz-form-control>
        <input formControlName="input2" />
      </nz-form-control>
    </form>
  `
})
export class NzTestReactiveFormControlComponent {
  formGroup: UntypedFormGroup;
  validateStatus: string | FormControlName | UntypedFormControl;

  constructor(private formBuilder: UntypedFormBuilder) {
    this.formGroup = this.formBuilder.group({
      input: ['', [Validators.required]],
      input2: ['', [Validators.required]],
      input3: ['', [Validators.required]]
    });
    this.validateStatus = this.formGroup.get('input2') as UntypedFormControl;
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
  formGroup: UntypedFormGroup;

  constructor(private formBuilder: UntypedFormBuilder) {
    this.formGroup = this.formBuilder.group({
      input: ['', [Validators.required]]
    });
    this.formGroup.controls.input.markAsDirty();
  }
}

@Component({
  template: `
    <form [formGroup]="formGroup" nz-form [nzAutoTips]="formAutoTips" [nzDisableAutoTips]="formDisableAutoTips">
      <nz-form-item>
        <nz-form-control #control>
          <input nz-input formControlName="userName" />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-control>
          <input nz-input formControlName="mobile" />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-control [nzAutoTips]="emailAutoTips">
          <input nz-input formControlName="email" type="email" />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-control [nzDisableAutoTips]="passwordDisableAutoTips" [nzErrorTip]="passwordErrorTip">
          <input nz-input type="password" formControlName="password" />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item *ngIf="showConfirmPassword">
        <nz-form-control>
          <input nz-input type="password" formControlName="confirmPassword" />
        </nz-form-control>
      </nz-form-item>
    </form>
  `
})
export class NzTestReactiveFormAutoTipsComponent {
  formGroup: UntypedFormGroup;

  showConfirmPassword = false;

  formDisableAutoTips = false;
  passwordDisableAutoTips = false;
  passwordErrorTip = 'Please input your password!';

  formAutoTips = {
    'zh-cn': {
      required: '必填项',
      email: '邮箱格式不正确'
    },
    en: {
      required: 'Input is required',
      email: 'The input is not valid email'
    }
  };
  emailAutoTips = {
    'zh-cn': {
      email: '请输入正确的邮箱'
    },
    en: {
      email: 'Please input valid email'
    },
    default: {
      required: '请输入邮箱/Input is required'
    }
  };

  constructor(private formBuilder: UntypedFormBuilder, public i18n: NzI18nService) {
    const { required, minLength, email, mobile } = MyValidators;
    this.formGroup = this.formBuilder.group({
      userName: ['', [required, minLength(6)]],
      mobile: ['', [required, mobile]],
      email: ['', [required, email]],
      password: ['', [required]],
      confirmPassword: ['', [required]]
    });
  }
}

export type MyErrorsOptions = { 'zh-cn': string; en: string } & Record<string, NzSafeAny>;
export type MyValidationErrors = Record<string, MyErrorsOptions>;

export class MyValidators extends Validators {
  static override minLength(minLength: number): ValidatorFn {
    return (control: AbstractControl): MyValidationErrors | null => {
      if (Validators.minLength(minLength)(control) === null) {
        return null;
      }
      return { minlength: { 'zh-cn': `最小长度为 ${minLength}`, en: `MinLength is ${minLength}` } };
    };
  }

  static mobile(control: AbstractControl): MyValidationErrors | null {
    const value = control.value;

    if (isEmptyInputValue(value)) {
      return null;
    }

    return isMobile(value)
      ? null
      : { mobile: { 'zh-cn': `手机号码格式不正确`, en: `Mobile phone number is not valid` } };
  }
}

function isEmptyInputValue(value: NzSafeAny): boolean {
  return value == null || value.length === 0;
}

function isMobile(value: string): boolean {
  return typeof value === 'string' && /(^1\d{10}$)/.test(value);
}
