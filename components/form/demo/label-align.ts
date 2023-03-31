import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'nz-demo-form-label-align',
  template: `
    <form nz-form [formGroup]="validateForm">
      <nz-form-item>
        <nz-form-label nzRequired nzLabelAlign="left" nzSpan="4">Left-aligned text label</nz-form-label>
        <nz-form-control nzErrorTip="Please input your username!" nzSpan="8">
          <input formControlName="userName" nz-input placeholder="Username" />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label nzRequired nzLabelAlign="right" nzSpan="4">Right-aligned text label</nz-form-label>
        <nz-form-control nzErrorTip="Please input your Password!" nzSpan="8">
          <input formControlName="password" nz-input type="password" placeholder="Password" />
        </nz-form-control>
      </nz-form-item>
    </form>
  `
})
export class NzDemoFormLabelAlignComponent implements OnInit {
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
