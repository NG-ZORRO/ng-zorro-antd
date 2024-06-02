import { Component } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';

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
export class NzDemoFormLabelAlignComponent {
  validateForm: FormGroup<{
    userName: FormControl<string>;
    password: FormControl<string>;
    remember: FormControl<boolean>;
  }> = this.fb.group({
    userName: ['', [Validators.required]],
    password: ['', [Validators.required]],
    remember: [true]
  });

  submitForm(): void {
    console.log('submit', this.validateForm.value);
  }

  constructor(private fb: NonNullableFormBuilder) {}
}
