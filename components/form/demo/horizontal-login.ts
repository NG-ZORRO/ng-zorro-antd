import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

@Component({
  selector: 'nz-demo-form-horizontal-login',
  template: `
    <form nz-form [formGroup]="validateForm" class="login-form" (ngSubmit)="_submitForm()">
      <div nz-form-item>
        <div nz-form-control>
          <nz-input-group>
            <ng-template #prefix>
              <i class="anticon anticon-user"></i>
            </ng-template>
            <input type="text" nz-input formControlName="userName" placeholder="Username">
          </nz-input-group>
          <div nz-form-explain *ngIf="validateForm.controls.userName.dirty&&validateForm.controls.userName.hasError('required')">Please input your username!</div>
        </div>
      </div>
      <div nz-form-item>
        <div nz-form-control>
          <nz-input-group>
            <ng-template #prefix>
              <i class="anticon anticon-lock"></i>
            </ng-template>
            <input type="password" nz-input formControlName="password" placeholder="Password">
          </nz-input-group>
          <div nz-form-explain *ngIf="validateForm.controls.password.dirty&&validateForm.controls.password.hasError('required')">Please input your Password!</div>
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
export class NzDemoFormHorizontalLoginComponent implements OnInit {
  validateForm: FormGroup;

  _submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[ i ].markAsDirty();
    }
  }

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [ null, [ Validators.required ] ],
      password: [ null, [ Validators.required ] ],
      remember: [ true ],
    });
  }
}
