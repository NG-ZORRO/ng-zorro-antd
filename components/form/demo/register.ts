import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { NzFormTooltipIcon } from 'ng-zorro-antd/form';

@Component({
  selector: 'nz-demo-form-register',
  template: `
    <form
      nz-form
      [formGroup]="validateForm"
      nzSimple
      [nzLabelCol]="{ sm: 6, xs: 24 }"
      [nzControlCol]="{ sm: 14, xs: 24 }"
      (ngSubmit)="submitForm()"
    >
      <nz-form-item nzRequired nzFor="email" nzLabel="E-mail" nzErrorTip="The input is not valid E-mail!">
        <input nz-input formControlName="email" id="email" />
      </nz-form-item>
      <nz-form-item nzRequired nzFor="password" nzLabel="Password" nzErrorTip="Please input your password!">
        <input
          nz-input
          type="password"
          id="password"
          formControlName="password"
          (ngModelChange)="updateConfirmValidator()"
        />
      </nz-form-item>
      <nz-form-item nzRequired nzFor="checkPassword" nzLabel="Confirm Password" [nzErrorTip]="errorTpl">
        <input nz-input type="password" formControlName="checkPassword" id="checkPassword" />
        <ng-template #errorTpl let-control>
          <ng-container *ngIf="control.hasError('required')">Please confirm your password!</ng-container>
          <ng-container *ngIf="control.hasError('confirm')">
            Two passwords that you enter is inconsistent!
          </ng-container>
        </ng-template>
      </nz-form-item>
      <nz-form-item
        nzRequired
        nzFor="nickname"
        nzLabel="Nickname"
        nzTooltipTitle="What do you want other to call you"
        nzErrorTip="Please input your nickname!"
      >
        <input nz-input id="nickname" formControlName="nickname" />
      </nz-form-item>
      <nz-form-item
        nzRequired
        nzFor="phoneNumber"
        nzLabel="Phone Number"
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
      </nz-form-item>
      <nz-form-item nzRequired nzFor="website" nzLabel="Website" nzErrorTip="Please input website!">
        <input nz-input id="website" formControlName="website" placeholder="website" />
      </nz-form-item>
      <nz-form-item
        nzRequired
        nzFor="captcha"
        nzLabel="Captcha"
        nzTooltipTitle="Please click 'Get captcha'"
        [nzTooltipIcon]="captchaTooltipIcon"
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
      </nz-form-item>
      <nz-form-item class="register-area" [nzControlCol]="{ span: 14, offset: 6 }">
        <label nz-checkbox formControlName="agree">
          <span>
            I have read the
            <a>agreement</a>
          </span>
        </label>
      </nz-form-item>
      <nz-form-item class="register-area" [nzControlCol]="{ span: 14, offset: 6 }">
        <button nz-button nzType="primary">Register</button>
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
export class NzDemoFormRegisterComponent implements OnInit {
  validateForm!: FormGroup;
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

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
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

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
      nickname: [null, [Validators.required]],
      phoneNumberPrefix: ['+86'],
      phoneNumber: [null, [Validators.required]],
      website: [null, [Validators.required]],
      captcha: [null, [Validators.required]],
      agree: [false]
    });
  }
}
