import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

@Component({
  selector: 'nz-demo-form-register',
  template: `
    <form nz-form [formGroup]="validateForm" (ngSubmit)="submitForm()">
      <div nz-form-item nz-row>
        <div nz-form-label nz-col [nzSm]="6" [nzXs]="24">
          <label for="email" nz-form-item-required>E-mail</label>
        </div>
        <div nz-form-control nz-col [nzSm]="14" [nzXs]="24" nzHasFeedback>
          <input nz-input formControlName="email" id="email">
          <div nz-form-explain *ngIf="getFormControl('email').dirty && getFormControl('email').hasError('email')">The input is not valid E-mail!</div>
        </div>
      </div>
      <div nz-form-item nz-row>
        <div nz-form-label nz-col [nzSm]="6" [nzXs]="24">
          <label for="password" nz-form-item-required>Password</label>
        </div>
        <div nz-form-control nz-col [nzSm]="14" [nzXs]="24" nzHasFeedback>
          <input nz-input type="password" id="password" formControlName="password" (ngModelChange)="updateConfirmValidator()">
          <div nz-form-explain *ngIf="getFormControl('password').dirty && getFormControl('password').hasError('required')">Please input your password!</div>
        </div>
      </div>
      <div nz-form-item nz-row>
        <div nz-form-label nz-col [nzSm]="6" [nzXs]="24">
          <label for="checkPassword" nz-form-item-required>Confirm Password</label>
        </div>
        <div nz-form-control nz-col [nzSm]="14" [nzXs]="24" nzHasFeedback>
          <input nz-input type="password" formControlName="checkPassword" id="checkPassword">
          <div nz-form-explain *ngIf="getFormControl('checkPassword').dirty && (getFormControl('checkPassword').hasError('required') || getFormControl('checkPassword').hasError('confirm'))">
            <ng-container *ngIf="getFormControl('checkPassword').hasError('required')">
              Please confirm your password!
            </ng-container>
            <ng-container *ngIf="getFormControl('checkPassword').hasError('confirm')">
              Two passwords that you enter is inconsistent!
            </ng-container>
          </div>
        </div>
      </div>
      <div nz-form-item nz-row>
        <div nz-form-label nz-col [nzSm]="6" [nzXs]="24">
          <label for="nickname" nz-form-item-required>
            <span>
              Nickname
              <nz-tooltip nzTitle="What do you want other to call you">
                <i nz-tooltip class="anticon anticon-question-circle-o"></i>
              </nz-tooltip>
            </span>
          </label>
        </div>
        <div nz-form-control nz-col [nzSm]="14" [nzXs]="24" nzHasFeedback>
          <input nz-input id="nickname" formControlName="nickname">
          <div nz-form-explain *ngIf="getFormControl('nickname').dirty && getFormControl('nickname').hasError('required')">Please input your nickname!</div>
        </div>
      </div>
      <div nz-form-item nz-row>
        <div nz-form-label nz-col [nzSm]="6" [nzXs]="24">
          <label for="phoneNumber" nz-form-item-required>Phone Number</label>
        </div>
        <div nz-form-control nz-col [nzSm]="14" [nzXs]="24" nzHasFeedback [nzValidateStatus]="validateForm.controls['phoneNumber']">
          <nz-input-group [nzAddOnBefore]="addOnBeforeTemplate">
            <ng-template #addOnBeforeTemplate>
              <nz-select formControlName="phoneNumberPrefix" style="width: 70px;">
                <nz-option nzLabel="+86" nzValue="+86"></nz-option>
                <nz-option nzLabel="+87" nzValue="+87"></nz-option>
              </nz-select>
            </ng-template>
            <input formControlName="phoneNumber" id="'phoneNumber'" nz-input>
          </nz-input-group>
          <div nz-form-explain *ngIf="getFormControl('phoneNumber').dirty && getFormControl('phoneNumber').hasError('required')">Please input your phone number!</div>
        </div>
      </div>
      <div nz-form-item nz-row>
        <div nz-form-label nz-col [nzSm]="6" [nzXs]="24">
          <label for="website" nz-form-item-required>Website</label>
        </div>
        <div nz-form-control nz-col [nzSm]="14" [nzXs]="24" nzHasFeedback>
          <input nz-input id="website" formControlName="website" placeholder="website">
          <div nz-form-explain *ngIf="getFormControl('website').dirty && getFormControl('website').hasError('required')">Please input website!</div>
        </div>
      </div>
      <div nz-form-item nz-row>
        <div nz-form-label nz-col [nzSm]="6" [nzXs]="24">
          <label for="captcha" nz-form-item-required>Captcha</label>
        </div>
        <div nz-form-control nz-col [nzSm]="14" [nzXs]="24">
          <div nz-row [nzGutter]="8">
            <div nz-col [nzSpan]="12">
              <input nz-input formControlName="captcha" id="captcha">
            </div>
            <div nz-col [nzSpan]="12">
              <button nz-button (click)="getCaptcha($event)">Get captcha</button>
            </div>
          </div>
          <div nz-form-explain *ngIf="getFormControl('captcha').dirty && getFormControl('captcha').hasError('required')">Please input the captcha you got!</div>
          <div nz-form-extra>We must make sure that your are a human.</div>
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
          <button nz-button nzType="primary">Register</button>
        </div>
      </div>
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
  }

  getCaptcha(e: MouseEvent): void {
    e.preventDefault();
  }

  getFormControl(name: string): AbstractControl {
    return this.validateForm.controls[ name ];
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
