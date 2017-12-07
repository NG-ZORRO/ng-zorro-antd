import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

@Component({
  selector: 'nz-demo-form-layout',
  template: `
    <form nz-form [nzLayout]="validateForm.controls?.formLayout?.value" [formGroup]="validateForm" (ngSubmit)="submitForm()">
      <div nz-form-item nz-row>
        <div nz-form-label nz-col [nzSpan]="isHorizontal?4:false">
          <label>Form Layout</label>
        </div>
        <div nz-form-control nz-col [nzSpan]="isHorizontal?14:false">
          <nz-radio-group formControlName="formLayout">
            <label nz-radio-button [nzValue]="'horizontal'">
              <span>Horizontal</span>
            </label>
            <label nz-radio-button [nzValue]="'vertical'">
              <span>Vertical</span>
            </label>
            <label nz-radio-button [nzValue]="'inline'">
              <span>Inline</span>
            </label>
          </nz-radio-group>
        </div>
      </div>
      <div nz-form-item nz-row>
        <div nz-form-label nz-col [nzSpan]="isHorizontal?4:false">
          <label>Username</label>
        </div>
        <div nz-form-control nz-col [nzSpan]="isHorizontal?14:false">
          <nz-input formControlName="userName" [nzPlaceHolder]="'Username'" [nzSize]="'large'">
          </nz-input>
          <div nz-form-explain *ngIf="validateForm.controls.userName.dirty&&validateForm.controls.userName.hasError('required')">Please input your username!</div>
        </div>
      </div>
      <div nz-form-item nz-row>
        <div nz-form-label nz-col [nzSpan]="isHorizontal?4:false">
          <label>Password</label>
        </div>
        <div nz-form-control nz-col [nzSpan]="isHorizontal?14:false">
          <nz-input formControlName="password" [nzType]="'password'" [nzPlaceHolder]="'Password'" [nzSize]="'large'">
          </nz-input>
          <div nz-form-explain *ngIf="validateForm.controls.password.dirty&&validateForm.controls.password.hasError('required')">Please input your Password!</div>
        </div>
      </div>
    </form>`,

  styles: []
})
export class NzDemoFormLayoutComponent implements OnInit {
  validateForm: FormGroup;

  submitForm() {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[ i ].markAsDirty();
    }
  }

  get isHorizontal() {
    return this.validateForm.controls[ 'formLayout' ] && this.validateForm.controls[ 'formLayout' ].value === 'horizontal';
  }

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      formLayout: [ 'horizontal' ],
      userName  : [ null, [ Validators.required ] ],
      password  : [ null, [ Validators.required ] ]
    });
  }
}

