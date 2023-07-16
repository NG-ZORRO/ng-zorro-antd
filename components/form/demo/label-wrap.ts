import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'nz-demo-form-label-wrap',
  template: `
    <form nz-form [formGroup]="validateForm" (ngSubmit)="submitForm()">
      <nz-form-item>
        <nz-form-label nzRequired nzFor="user" nzSpan="3"> Normal text label </nz-form-label>
        <nz-form-control nzErrorTip="Please input your username!" nzSpan="8">
          <input formControlName="userName" nz-input id="user" />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label nzRequired nzFor="password" nzSpan="3" nzLabelWrap>
          Long text label Long text label
        </nz-form-label>
        <nz-form-control nzErrorTip="Please input your Password!" nzSpan="8">
          <input formControlName="password" nz-input type="password" id="password" />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-control nzSpan="12" style="text-align: center">
          <button nz-button nzType="primary">Log in</button>
        </nz-form-control>
      </nz-form-item>
    </form>
  `
})
export class NzDemoFormLabelWrapComponent implements OnInit {
  validateForm!: UntypedFormGroup;

  submitForm(): void {
    console.log('submit', this.validateForm.value);
  }

  constructor(private fb: UntypedFormBuilder) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }
}
