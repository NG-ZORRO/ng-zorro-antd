import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';

@Component({
  selector: 'nz-demo-form-horizontal',
  template: `
    <form nz-form [formGroup]="validateForm" (ngSubmit)="_submitForm()">
      <div nz-form-item nz-row>
        <div nz-form-label nz-col [nzSm]="6" [nzXs]="24">
          <label for="email" nz-form-item-required>E-mail</label>
        </div>
        <div nz-form-control nz-col [nzSm]="14" [nzXs]="24" nzHasFeedback>
          <nz-input [nzSize]="'large'" formControlName="email" [nzId]="'email'"></nz-input>
          <div nz-form-explain *ngIf="getFormControl('email').dirty&&getFormControl('email').hasError('email')">The input is not valid E-mail!</div>
        </div>
      </div>
      <div nz-form-item nz-row>
        <div nz-form-label nz-col [nzSm]="6" [nzXs]="24">
          <label for="password" nz-form-item-required>Password</label>
        </div>
        <div nz-form-control nz-col [nzSm]="14" [nzXs]="24" nzHasFeedback>
          <nz-input [nzSize]="'large'" formControlName="password" [nzType]="'password'" [nzId]="'password'" (ngModelChange)="updateConfirmValidator()"></nz-input>
          <div nz-form-explain *ngIf="getFormControl('password').dirty&&getFormControl('password').hasError('required')">Please input your password!</div>
        </div>
      </div>
      <div nz-form-item nz-row>
        <div nz-form-label nz-col [nzSm]="6" [nzXs]="24">
          <label for="checkPassword" nz-form-item-required>Confirm Password</label>
        </div>
        <div nz-form-control nz-col [nzSm]="14" [nzXs]="24" nzHasFeedback>
          <nz-input [nzSize]="'large'" formControlName="checkPassword" [nzType]="'password'" [nzId]="'checkPassword'"></nz-input>
          <div nz-form-explain *ngIf="getFormControl('checkPassword').dirty&&getFormControl('checkPassword').hasError('required')">Please confirm your password!</div>
          <div nz-form-explain *ngIf="getFormControl('checkPassword').dirty&&getFormControl('checkPassword').hasError('confirm')">Two passwords that you enter is inconsistent!</div>
        </div>
      </div>
      <div nz-form-item nz-row>
        <div nz-form-label nz-col [nzSm]="6" [nzXs]="24">
          <label for="nickname" nz-form-item-required>
            <span>
              Nickname
              <nz-tooltip [nzTitle]="'What do you want other to call you'">
                <i nz-tooltip class="anticon anticon-question-circle-o"></i>
              </nz-tooltip>
            </span>
          </label>
        </div>
        <div nz-form-control nz-col [nzSm]="14" [nzXs]="24" nzHasFeedback>
          <nz-input [nzSize]="'large'" formControlName="nickname" [nzId]="'nickname'"></nz-input>
          <div nz-form-explain *ngIf="getFormControl('nickname').dirty&&getFormControl('nickname').hasError('required')">Please input your nickname!</div>
        </div>
      </div>
      <div nz-form-item nz-row>
        <div nz-form-label nz-col [nzSm]="6" [nzXs]="24">
          <label for="phoneNumber" nz-form-item-required>Phone Number</label>
        </div>
        <div nz-form-control nz-col [nzSm]="14" [nzXs]="24" nzHasFeedback [nzValidateStatus]="validateForm.controls['phoneNumber']">
          <nz-input-group [nzSize]="'large'" nzCompact>
            <nz-select formControlName="phoneNumberPrefix" style="width: 25%;">
              <nz-option [nzLabel]="'+86'" [nzValue]="'+86'"></nz-option>
              <nz-option [nzLabel]="'+87'" [nzValue]="'+87'"></nz-option>
            </nz-select>
            <input formControlName="phoneNumber" id="'phoneNumber'" nz-input style="width: 75%;">
          </nz-input-group>
          <div nz-form-explain *ngIf="getFormControl('phoneNumber').dirty&&getFormControl('phoneNumber').hasError('required')">Please input your phone number!</div>
        </div>
      </div>
      <div nz-form-item nz-row>
        <div nz-form-label nz-col [nzSm]="6" [nzXs]="24">
          <label for="website" nz-form-item-required>Website</label>
        </div>
        <div nz-form-control nz-col [nzSm]="14" [nzXs]="24" nzHasFeedback>
          <nz-input [nzSize]="'large'" formControlName="website" [nzId]="'website'"></nz-input>
          <div nz-form-explain *ngIf="getFormControl('website').dirty&&getFormControl('website').hasError('required')">Please input website!</div>
        </div>
      </div>
      <div nz-form-item nz-row>
        <div nz-form-label nz-col [nzSm]="6" [nzXs]="24">
          <label for="captcha" nz-form-item-required>Captcha</label>
        </div>
        <div nz-form-control nz-col [nzSm]="14" [nzXs]="24">
          <div nz-row [nzGutter]="8">
            <div nz-col [nzSpan]="12">
              <nz-input [nzSize]="'large'" formControlName="captcha" [nzId]="'captcha'"></nz-input>
            </div>
            <div nz-col [nzSpan]="12">
              <button nz-button [nzSize]="'large'" (click)="getCaptcha($event)">Get captcha</button>
            </div>
          </div>
          <div nz-form-extra>We must make sure that your are a human.</div>
          <div nz-form-explain *ngIf="getFormControl('captcha').dirty&&getFormControl('captcha').hasError('required')">Please input the captcha you got!</div>
        </div>
      </div>
      <div nz-form-item nz-row style="margin-bottom:8px;">
        <div nz-form-control nz-col [nzSpan]="14" [nzOffset]="6">
          <label nz-checkbox formControlName="agree">
            <span>I have read the <a>agreement</a></span>
          </label>
        </div>
      </div>
      <div nz-form-item nz-row style="margin-bottom:8px;">
        <div nz-form-control nz-col [nzSpan]="14" [nzOffset]="6">
          <button nz-button [nzSize]="'large'" [nzType]="'primary'">Register</button>
        </div>
      </div>
    </form>`,

  styles: []
})
export class NzDemoFormHorizontalComponent implements OnInit {
  validateForm: FormGroup;

  _submitForm() {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[ i ].markAsDirty();
    }
  }

  constructor(private fb: FormBuilder) {
  }

  updateConfirmValidator() {
    /** wait for refresh value */
    setTimeout(_ => {
      this.validateForm.controls[ 'checkPassword' ].updateValueAndValidity();
    });
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls[ 'password' ].value) {
      return { confirm: true, error: true };
    }
  };

  getCaptcha(e: MouseEvent) {
    e.preventDefault();
  }

  ngOnInit() {
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

  getFormControl(name) {
    return this.validateForm.controls[ name ];
  }
}

