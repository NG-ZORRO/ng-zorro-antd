import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

@Component({
  selector: 'nz-demo-form-normal-login',
  template: `
    <form nz-form [formGroup]="validateForm" class="login-form" (ngSubmit)="submitForm()">
      <nz-form-item>
        <nz-form-control>
          <nz-input-group [nzPrefix]="prefixUser">
            <input type="text" nz-input formControlName="userName" placeholder="Username">
          </nz-input-group>
          <nz-form-explain *ngIf="validateForm.get('userName').dirty && validateForm.get('userName').errors">Please input your username!</nz-form-explain>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-control>
          <nz-input-group [nzPrefix]="prefixLock">
            <input type="password" nz-input formControlName="password" placeholder="Password">
          </nz-input-group>
          <nz-form-explain *ngIf="validateForm.get('password').dirty && validateForm.get('password').errors">Please input your Password!</nz-form-explain>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-control>
          <label nz-checkbox formControlName="remember">
            <span>Remember me</span>
          </label>
          <a class="login-form-forgot" class="login-form-forgot">Forgot password</a>
          <button nz-button class="login-form-button" [nzType]="'primary'">Log in</button>
          Or
          <a href="">register now!</a>
        </nz-form-control>
      </nz-form-item>
    </form>
    <ng-template #prefixUser><i nz-icon type="user"></i></ng-template>
    <ng-template #prefixLock><i nz-icon type="lock"></i></ng-template>
  `,
  styles: [ `
    .login-form {
      max-width: 300px;
    }

    .login-form-forgot {
      float: right;
    }

    .login-form-button {
      width: 100%;
    }
  `
  ]
})
export class NzDemoFormNormalLoginComponent implements OnInit {
  validateForm: FormGroup;

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[ i ].markAsDirty();
      this.validateForm.controls[ i ].updateValueAndValidity();
    }
  }

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [ null, [ Validators.required ] ],
      password: [ null, [ Validators.required ] ],
      remember: [ true ]
    });
  }
}
