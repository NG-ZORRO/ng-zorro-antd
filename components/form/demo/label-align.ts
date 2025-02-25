import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'nz-demo-form-label-align',
  imports: [ReactiveFormsModule, NzFormModule, NzInputModule],
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
  validateForm = this.fb.group({
    username: this.fb.control('', [Validators.required]),
    password: this.fb.control('', [Validators.required]),
    remember: this.fb.control(true)
  });

  submitForm(): void {
    console.log('submit', this.validateForm.value);
  }
}
