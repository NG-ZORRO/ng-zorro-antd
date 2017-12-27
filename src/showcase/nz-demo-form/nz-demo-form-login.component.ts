import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

@Component({
  selector: 'nz-demo-form-login',
  template: `
    <form nz-form [formGroup]="validateForm" class="login-form" (ngSubmit)="_submitForm()">
      <div nz-form-item>
        <div nz-form-control>
          <nz-input formControlName="userName" [nzPlaceHolder]="'Username'" [nzSize]="'large'">
            <ng-template #prefix>
              <i class="anticon anticon-user"></i>
            </ng-template>
          </nz-input>
          <div nz-form-explain *ngIf="validateForm.controls.userName.dirty&&validateForm.controls.userName.hasError('required')">Please input your username!</div>
        </div>
      </div>
      <div nz-form-item>
        <div nz-form-control>
          <nz-input formControlName="password" [nzType]="'password'" [nzPlaceHolder]="'Password'" [nzSize]="'large'">
            <ng-template #prefix>
              <i class="anticon anticon-lock"></i>
            </ng-template>
          </nz-input>
          <div nz-form-explain *ngIf="validateForm.controls.password.dirty&&validateForm.controls.password.hasError('required')">Please input your Password!</div>
        </div>
      </div>
      <div nz-form-item>
        <div nz-form-control>
          <label nz-checkbox formControlName="remember">
            <span>Remember me</span>
          </label>
          <a class="login-form-forgot" class="login-form-forgot">Forgot password</a>
          <button nz-button class="login-form-button" [nzType]="'primary'" [nzSize]="'large'">Log in</button>
          Or
          <a href="">register now!</a>
        </div>
      </div>
    </form>`,

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
export class NzDemoFormLoginComponent implements OnInit {
  validateForm: FormGroup;

  _submitForm() {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[ i ].markAsDirty();
    }
  }

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      userName: [ null, [ Validators.required ] ],
      password: [ null, [ Validators.required ] ],
      remember: [ true ],
    });
  }
}

