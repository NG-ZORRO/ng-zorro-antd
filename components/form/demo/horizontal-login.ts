import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

@Component({
  selector: 'nz-demo-form-horizontal-login',
  template: `
    <form nz-form [nzLayout]="'inline'" [formGroup]="validateForm" (ngSubmit)="submitForm()">
      <div nz-form-item>
        <div nz-form-control>
          <nz-input-group nzPrefixIcon="anticon anticon-user">
            <input formControlName="userName" nz-input placeholder="Username">
          </nz-input-group>
          <div nz-form-explain *ngIf="getControl('userName').dirty && getControl('userName').hasError('required')">Please input your username!</div>
        </div>
      </div>
      <div nz-form-item>
        <div nz-form-control>
          <nz-input-group nzPrefixIcon="anticon anticon-lock">
            <input formControlName="password" nz-input type="password" placeholder="Password">
          </nz-input-group>
          <div nz-form-explain *ngIf="getControl('password').dirty && getControl('password').hasError('required')">Please input your Password!</div>
        </div>
      </div>
      <div nz-form-item>
        <div nz-form-control>
          <button nz-button nzType="primary" [disabled]="!validateForm.valid">Log in</button>
        </div>
      </div>
    </form>`
})
export class NzDemoFormHorizontalLoginComponent implements OnInit {
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
