import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

@Component({
  selector: 'nz-demo-form-register',
  template: `
    <form nz-form [formGroup]="validateForm" (ngSubmit)="submitForm()">
      <nz-form-item>
        <nz-form-label [nzSm]="6" [nzXs]="24" nzRequired nzFor="email">E-mail</nz-form-label>
        <nz-form-control [nzSm]="14" [nzXs]="24">
          <input nz-input formControlName="email" id="email">
          <nz-form-explain *ngIf="validateForm.get('email').dirty && validateForm.get('email').errors">The input is not valid E-mail!</nz-form-explain>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label [nzSm]="6" [nzXs]="24" nzFor="password" nzRequired>Password</nz-form-label>
        <nz-form-control [nzSm]="14" [nzXs]="24">
          <input nz-input type="password" id="password" formControlName="password" (ngModelChange)="updateConfirmValidator()">
          <nz-form-explain *ngIf="validateForm.get('password').dirty && validateForm.get('password').errors">Please input your password!</nz-form-explain>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label [nzSm]="6" [nzXs]="24" nzFor="checkPassword" nzRequired>Confirm Password</nz-form-label>
        <nz-form-control [nzSm]="14" [nzXs]="24">
          <input nz-input type="password" formControlName="checkPassword" id="checkPassword">
          <nz-form-explain *ngIf="validateForm.get('checkPassword').dirty && validateForm.get('checkPassword').errors">
            <ng-container *ngIf="validateForm.get('checkPassword').hasError('required')">
              Please confirm your password!
            </ng-container>
            <ng-container *ngIf="validateForm.get('checkPassword').hasError('confirm')">
              Two passwords that you enter is inconsistent!
            </ng-container>
          </nz-form-explain>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label [nzSm]="6" [nzXs]="24" nzFor="nickname" nzRequired>
          <span>
            Nickname
            <i nz-icon nz-tooltip nzTitle="What do you want other to call you" type="question-circle" theme="outline"></i>
          </span>
        </nz-form-label>
        <nz-form-control [nzSm]="14" [nzXs]="24">
          <input nz-input id="nickname" formControlName="nickname">
          <nz-form-explain *ngIf="validateForm.get('nickname').dirty && validateForm.get('nickname').errors">Please input your nickname!</nz-form-explain>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label [nzSm]="6" [nzXs]="24" nzFor="phoneNumber" nzRequired>Phone Number</nz-form-label>
        <nz-form-control [nzSm]="14" [nzXs]="24" [nzValidateStatus]="validateForm.controls['phoneNumber']">
          <nz-input-group [nzAddOnBefore]="addOnBeforeTemplate">
            <ng-template #addOnBeforeTemplate>
              <nz-select formControlName="phoneNumberPrefix" style="width: 70px;">
                <nz-option nzLabel="+86" nzValue="+86"></nz-option>
                <nz-option nzLabel="+87" nzValue="+87"></nz-option>
              </nz-select>
            </ng-template>
            <input formControlName="phoneNumber" id="'phoneNumber'" nz-input>
          </nz-input-group>
          <nz-form-explain *ngIf="validateForm.get('phoneNumber').dirty && validateForm.get('phoneNumber').errors">Please input your phone number!</nz-form-explain>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label [nzSm]="6" [nzXs]="24" nzFor="website" nzRequired>Website</nz-form-label>
        <nz-form-control [nzSm]="14" [nzXs]="24">
          <input nz-input id="website" formControlName="website" placeholder="website">
          <nz-form-explain *ngIf="validateForm.get('website').dirty && validateForm.get('website').errors">Please input website!</nz-form-explain>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label [nzSm]="6" [nzXs]="24" nzFor="captcha" nzRequired>Captcha</nz-form-label>
        <nz-form-control [nzSm]="14" [nzXs]="24">
          <div nz-row [nzGutter]="8">
            <div nz-col [nzSpan]="12">
              <input nz-input formControlName="captcha" id="captcha">
            </div>
            <div nz-col [nzSpan]="12">
              <button nz-button (click)="getCaptcha($event)">Get captcha</button>
            </div>
          </div>
          <nz-form-explain *ngIf="validateForm.get('captcha').dirty && validateForm.get('captcha').errors">Please input the captcha you got!</nz-form-explain>
          <nz-form-extra>We must make sure that your are a human.</nz-form-extra>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item nz-row style="margin-bottom:8px;">
        <nz-form-control [nzSpan]="14" [nzOffset]="6">
          <label nz-checkbox formControlName="agree">
            <span>I have read the <a>agreement</a></span>
          </label>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item nz-row style="margin-bottom:8px;">
        <nz-form-control [nzSpan]="14" [nzOffset]="6">
          <button nz-button nzType="primary">Register</button>
        </nz-form-control>
      </nz-form-item>
    </form>`,

  styles: [
    `[nz-form] {
      max-width: 600px;
    }`
  ]
})
export class NzDemoFormRegisterComponent implements OnInit {
  validateForm: FormGroup;

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[ i ].markAsDirty();
      this.validateForm.controls[ i ].updateValueAndValidity();
    }
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.validateForm.controls.checkPassword.updateValueAndValidity());
  }

  confirmationValidator = (control: FormControl): { [ s: string ]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
  };

  getCaptcha(e: MouseEvent): void {
    e.preventDefault();
  }

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email            : [ null, [ Validators.email ] ],
      password         : [ null, [ Validators.required ] ],
      checkPassword    : [ null, [ Validators.required, this.confirmationValidator ] ],
      nickname         : [ null, [ Validators.required ] ],
      phoneNumberPrefix: [ '+86' ],
      phoneNumber      : [ null, [ Validators.required ] ],
      website          : [ null, [ Validators.required ] ],
      captcha          : [ null, [ Validators.required ] ],
      agree            : [ false ]
    });
  }
}
