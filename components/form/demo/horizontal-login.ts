import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

@Component({
  selector: 'nz-demo-form-horizontal-login',
  template: `
    <form nz-form [nzLayout]="'inline'" [formGroup]="validateForm" (ngSubmit)="submitForm()">
      <nz-form-item>
        <nz-form-control>
          <nz-input-group [nzPrefix]="prefixUser">
            <input formControlName="userName" nz-input placeholder="Username">
          </nz-input-group>
          <nz-form-explain *ngIf="validateForm.get('userName').dirty && validateForm.get('userName').errors">Please input your username!</nz-form-explain>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-control>
          <nz-input-group [nzPrefix]="prefixLock">
            <input formControlName="password" nz-input type="password" placeholder="Password">
          </nz-input-group>
          <nz-form-explain *ngIf="validateForm.get('password').dirty && validateForm.get('password').errors">Please input your Password!</nz-form-explain>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-control>
          <button nz-button nzType="primary" [disabled]="!validateForm.valid">Log in</button>
        </nz-form-control>
      </nz-form-item>
    </form>
    <ng-template #prefixUser><i nz-icon type="user"></i></ng-template>
    <ng-template #prefixLock><i nz-icon type="lock"></i></ng-template>
`
})
export class NzDemoFormHorizontalLoginComponent implements OnInit {
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
