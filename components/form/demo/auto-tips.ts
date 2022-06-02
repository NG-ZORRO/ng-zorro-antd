import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Observable, Observer } from 'rxjs';

import { NzSafeAny } from 'ng-zorro-antd/core/types';

@Component({
  selector: 'nz-demo-form-auto-tips',
  template: `
    <form
      nz-form
      [formGroup]="validateForm"
      [nzAutoTips]="autoTips"
      nzSimple
      [nzLabelCol]="7"
      [nzControlCol]="12"
      (ngSubmit)="submitForm()"
    >
      <nz-form-item nzRequired nzLabel="Username" nzValidatingTip="Validating...">
        <input nz-input formControlName="userName" placeholder="async validate try to write JasonWood" />
      </nz-form-item>
      <nz-form-item nzRequired nzLabel="Mobile">
        <input nz-input formControlName="mobile" placeholder="mobile" />
      </nz-form-item>
      <nz-form-item nzRequired nzLabel="E-mail">
        <input nz-input formControlName="email" placeholder="email" type="email" />
      </nz-form-item>
      <nz-form-item nzRequired nzLabel="Password" nzDisableAutoTips nzErrorTip="Please input your password!">
        <input nz-input type="password" formControlName="password" (ngModelChange)="validateConfirmPassword()" />
      </nz-form-item>
      <nz-form-item nzRequired nzLabel="Confirm Password" nzDisableAutoTips [nzErrorTip]="passwordErrorTpl">
        <input nz-input type="password" formControlName="confirm" placeholder="confirm your password" />
        <ng-template #passwordErrorTpl let-control>
          <ng-container *ngIf="control.hasError('required')">Please confirm your password!</ng-container>
          <ng-container *ngIf="control.hasError('confirm')">Password is inconsistent!</ng-container>
        </ng-template>
      </nz-form-item>
      <nz-form-item [nzControlCol]="{ span: 12, offset: 7 }">
        <button nz-button nzType="primary">Submit</button>
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
  // if it is not found, it will be searched again with `default`
  autoTips: Record<string, Record<string, string>> = {
    'zh-cn': {
      required: '必填项'
    },
    en: {
      required: 'Input is required'
    },
    default: {
      email: '邮箱格式不正确/The input is not valid email'
    }
  };

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  validateConfirmPassword(): void {
    setTimeout(() => this.validateForm.controls.confirm.updateValueAndValidity());
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
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
  static override minLength(minLength: number): ValidatorFn {
    return (control: AbstractControl): MyValidationErrors | null => {
      if (Validators.minLength(minLength)(control) === null) {
        return null;
      }
      return { minlength: { 'zh-cn': `最小长度为 ${minLength}`, en: `MinLength is ${minLength}` } };
    };
  }

  static override maxLength(maxLength: number): ValidatorFn {
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
