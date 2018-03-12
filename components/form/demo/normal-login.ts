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
      <div nz-form-item>
        <div nz-form-control>
          <nz-input-group nzPrefixIcon="anticon anticon-user">
            <input type="text" nz-input formControlName="userName" placeholder="Username">
          </nz-input-group>
          <div nz-form-explain *ngIf="getControl('userName').dirty && getControl('userName').hasError('required')">Please input your username!</div>
        </div>
      </div>
      <div nz-form-item>
        <div nz-form-control>
          <nz-input-group nzPrefixIcon="anticon anticon-lock">
            <input type="password" nz-input formControlName="password" placeholder="Password">
          </nz-input-group>
          <div nz-form-explain *ngIf="getControl('password').dirty && getControl('password').hasError('required')">Please input your Password!</div>
        </div>
      </div>
      <div nz-form-item>
        <div nz-form-control>
          <label nz-checkbox formControlName="remember">
            <span>Remember me</span>
          </label>
          <a class="login-form-forgot" class="login-form-forgot">Forgot password</a>
          <button nz-button class="login-form-button" [nzType]="'primary'">Log in</button>
          Or
          <a href="">register now!</a>
        </div>
      </div>
    </form>
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
    }
  }

  getControl(name: string): AbstractControl {
    return this.validateForm.controls[ name ];
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
