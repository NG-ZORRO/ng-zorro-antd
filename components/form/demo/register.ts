import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ValidatorFn,
  Validators
} from '@angular/forms';

import { NzFormTooltipIcon } from 'ng-zorro-antd/form';

@Component({
  selector: 'nz-demo-form-register',
  template: `
    <form nz-form [formGroup]="validateForm" (ngSubmit)="submitForm()">
      <nz-form-item>
        <nz-form-label [nzSm]="6" [nzXs]="24" nzRequired nzFor="email">E-mail</nz-form-label>
        <nz-form-control [nzSm]="14" [nzXs]="24" nzErrorTip="The input is not valid E-mail!">
          <input nz-input formControlName="email" id="email" />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label [nzSm]="6" [nzXs]="24" nzFor="password" nzRequired>Password</nz-form-label>
        <nz-form-control [nzSm]="14" [nzXs]="24" nzErrorTip="Please input your password!">
          <input
            nz-input
            type="password"
            id="password"
            formControlName="password"
            (ngModelChange)="updateConfirmValidator()"
          />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label [nzSm]="6" [nzXs]="24" nzFor="checkPassword" nzRequired>Confirm Password</nz-form-label>
        <nz-form-control [nzSm]="14" [nzXs]="24" [nzErrorTip]="errorTpl">
          <input nz-input type="password" formControlName="checkPassword" id="checkPassword" />
          <ng-template #errorTpl let-control>
            @if (control.errors?.['required']) {
              Please confirm your password!
            }
            @if (control.errors?.['confirm']) {
              Two passwords that you enter is inconsistent!
            }
          </ng-template>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label
          [nzSm]="6"
          [nzXs]="24"
          nzFor="nickname"
          nzRequired
          nzTooltipTitle="What do you want other to call you"
        >
          <span>Nickname</span>
        </nz-form-label>
        <nz-form-control [nzSm]="14" [nzXs]="24" nzErrorTip="Please input your nickname!">
          <input nz-input id="nickname" formControlName="nickname" />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label [nzSm]="6" [nzXs]="24" nzFor="phoneNumber" nzRequired>Phone Number</nz-form-label>
        <nz-form-control
          [nzSm]="14"
          [nzXs]="24"
          [nzValidateStatus]="validateForm.controls['phoneNumber']"
          nzErrorTip="Please input your phone number!"
        >
          <nz-input-group [nzAddOnBefore]="addOnBeforeTemplate">
            <ng-template #addOnBeforeTemplate>
              <nz-select formControlName="phoneNumberPrefix" class="phone-select">
                <nz-option nzLabel="+86" nzValue="+86"></nz-option>
                <nz-option nzLabel="+87" nzValue="+87"></nz-option>
              </nz-select>
            </ng-template>
            <input formControlName="phoneNumber" id="'phoneNumber'" nz-input />
          </nz-input-group>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label [nzSm]="6" [nzXs]="24" nzFor="website" nzRequired>Website</nz-form-label>
        <nz-form-control [nzSm]="14" [nzXs]="24" nzErrorTip="Please input website!">
          <input nz-input id="website" formControlName="website" placeholder="website" />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label
          [nzSm]="6"
          [nzXs]="24"
          nzFor="captcha"
          nzRequired
          nzTooltipTitle="Please click 'Get captcha'"
          [nzTooltipIcon]="captchaTooltipIcon"
        >
          Captcha
        </nz-form-label>
        <nz-form-control
          [nzSm]="14"
          [nzXs]="24"
          nzErrorTip="Please input the captcha you got!"
          nzExtra="We must make sure that your are a human."
        >
          <div nz-row [nzGutter]="8">
            <div nz-col [nzSpan]="12">
              <input nz-input formControlName="captcha" id="captcha" />
            </div>
            <div nz-col [nzSpan]="12">
              <button nz-button (click)="getCaptcha($event)">Get captcha</button>
            </div>
          </div>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item nz-row class="register-area">
        <nz-form-control [nzSpan]="14" [nzOffset]="6">
          <label nz-checkbox formControlName="agree">
            <span>
              I have read the
              <a>agreement</a>
            </span>
          </label>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item nz-row class="register-area">
        <nz-form-control [nzSpan]="14" [nzOffset]="6">
          <button nz-button nzType="primary">Register</button>
        </nz-form-control>
      </nz-form-item>
    </form>
  `,

  styles: [
    `
      [nz-form] {
        max-width: 600px;
      }

      .phone-select {
        width: 70px;
      }

      .register-are {
        margin-bottom: 8px;
      }
    `
  ]
})
export class NzDemoFormRegisterComponent {
  validateForm: FormGroup<{
    email: FormControl<string>;
    password: FormControl<string>;
    checkPassword: FormControl<string>;
    nickname: FormControl<string>;
    phoneNumberPrefix: FormControl<'+86' | '+87'>;
    phoneNumber: FormControl<string>;
    website: FormControl<string>;
    captcha: FormControl<string>;
    agree: FormControl<boolean>;
  }>;
  captchaTooltipIcon: NzFormTooltipIcon = {
    type: 'info-circle',
    theme: 'twotone'
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

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.validateForm.controls.checkPassword.updateValueAndValidity());
  }

  confirmationValidator: ValidatorFn = (control: AbstractControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  getCaptcha(e: MouseEvent): void {
    e.preventDefault();
  }

  constructor(private fb: NonNullableFormBuilder) {
    this.validateForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]],
      checkPassword: ['', [Validators.required, this.confirmationValidator]],
      nickname: ['', [Validators.required]],
      phoneNumberPrefix: '+86' as '+86' | '+87',
      phoneNumber: ['', [Validators.required]],
      website: ['', [Validators.required]],
      captcha: ['', [Validators.required]],
      agree: [false]
    });
  }
}
