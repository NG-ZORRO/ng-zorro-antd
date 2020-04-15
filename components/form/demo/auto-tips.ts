import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'nz-demo-form-auto-tips',
  template: `
    <form nz-form [nzAutoTips]="autoTips" [formGroup]="validateForm" (ngSubmit)="submitForm(validateForm.value)">
      <nz-form-item>
        <nz-form-label [nzSpan]="7" nzRequired>Username</nz-form-label>
        <nz-form-control [nzSpan]="12" nzValidatingTip="Validating...">
          <input nz-input formControlName="userName" placeholder="async validate try to write JasonWood" />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label [nzSpan]="7" nzRequired>Mobile</nz-form-label>
        <nz-form-control [nzSpan]="12">
          <input nz-input formControlName="mobile" placeholder="mobile" />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label [nzSpan]="7" nzRequired>E-mail</nz-form-label>
        <nz-form-control [nzSpan]="12">
          <input nz-input formControlName="email" placeholder="email" type="email" />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label [nzSpan]="7" nzRequired>Password</nz-form-label>
        <nz-form-control [nzSpan]="12" [nzDisableAutoTips]="true" nzErrorTip="Please input your password!">
          <input nz-input type="password" formControlName="password" (ngModelChange)="validateConfirmPassword()" />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label [nzSpan]="7" nzRequired>Confirm Password</nz-form-label>
        <nz-form-control [nzSpan]="12" [nzDisableAutoTips]="true" [nzErrorTip]="passwordErrorTpl">
          <input nz-input type="password" formControlName="confirm" placeholder="confirm your password" />
          <ng-template #passwordErrorTpl let-control>
            <ng-container *ngIf="control.hasError('required')">
              Please confirm your password!
            </ng-container>
            <ng-container *ngIf="control.hasError('confirm')">
              Password is inconsistent!
            </ng-container>
          </ng-template>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-control [nzOffset]="7" [nzSpan]="12">
          <button nz-button nzType="primary">Submit</button>
        </nz-form-control>
      </nz-form-item>
    </form>
  `,
  styles: [
    `
      [nz-form] {
        max-width: 600px;
      }
    `
  ]
})
export class NzDemoFormAutoTipsComponent {
  validateForm: FormGroup;

  // current locale is key of the nzAutoTips
  autoTips: Record<string, Record<string, string>> = {
    'zh-cn': {
      required: '必填项',
      email: '邮箱格式不正确'
    },
    en: {
      required: 'Input is required',
      email: 'The input is not valid email'
    }
  };

  submitForm(value: { userName: string; email: string; password: string; confirm: string; comment: string }): void {
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    }
    console.log(value);
  }

  validateConfirmPassword(): void {
    setTimeout(() => this.validateForm.controls.confirm.updateValueAndValidity());
  }

  userNameAsyncValidator = (control: FormControl) =>
    new Observable((observer: Observer<MyValidationErrors | null>) => {
      setTimeout(() => {
        if (control.value === 'JasonWood') {
          observer.next({
            duplicated: { 'zh-cn': `用户名已存在`, en: `The username is redundant!` }
          });
        } else {
          observer.next(null);
        }
        observer.complete();
      }, 1000);
    });

  confirmValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  constructor(private fb: FormBuilder) {
    // use `MyValidators`
    const { required, maxLength, minLength, email, mobile } = MyValidators;
    this.validateForm = this.fb.group({
      userName: ['', [required, maxLength(12), minLength(6)], [this.userNameAsyncValidator]],
      mobile: ['', [required, mobile]],
      email: ['', [required, email]],
      password: ['', [required]],
      confirm: ['', [this.confirmValidator]]
    });
  }
}

// current locale is key of the MyErrorsOptions
export type MyErrorsOptions = { 'zh-cn': string; en: string } & Record<string, NzSafeAny>;
export type MyValidationErrors = Record<string, MyErrorsOptions>;

export class MyValidators extends Validators {
  static minLength(minLength: number): ValidatorFn {
    return (control: AbstractControl): MyValidationErrors | null => {
      if (Validators.minLength(minLength)(control) === null) {
        return null;
      }
      return { minlength: { 'zh-cn': `最小长度为 ${minLength}`, en: `MinLength is ${minLength}` } };
    };
  }

  static maxLength(maxLength: number): ValidatorFn {
    return (control: AbstractControl): MyValidationErrors | null => {
      if (Validators.maxLength(maxLength)(control) === null) {
        return null;
      }
      return { maxlength: { 'zh-cn': `最大长度为 ${maxLength}`, en: `MaxLength is ${maxLength}` } };
    };
  }

  static mobile(control: AbstractControl): MyValidationErrors | null {
    const value = control.value;

    if (isEmptyInputValue(value)) {
      return null;
    }

    return isMobile(value) ? null : { mobile: { 'zh-cn': `手机号码格式不正确`, en: `Mobile phone number is not valid` } };
  }
}

function isEmptyInputValue(value: NzSafeAny): boolean {
  return value == null || value.length === 0;
}

function isMobile(value: string): boolean {
  return typeof value === 'string' && /(^1\d{10}$)/.test(value);
}
