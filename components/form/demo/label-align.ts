import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'nz-demo-form-label-align',
  template: `
    <form nz-form [formGroup]="validateForm" (ngSubmit)="submitForm()">
      <nz-form-item>
        <nz-form-label nzRequired nzLabelAlign="left" nzSpan="4">Left-aligned text label</nz-form-label>
        <nz-form-control nzErrorTip="Please input your username!" nzSpan="8">
          <input formControlName="username" nz-input placeholder="username" />
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
  private fb = inject(NonNullableFormBuilder);
  validateForm: FormGroup<{
    username: FormControl<string>;
    password: FormControl<string>;
    remember: FormControl<boolean>;
  }> = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
    remember: [true]
  });

  submitForm(): void {
    console.log('submit', this.validateForm.value);
  }
}
