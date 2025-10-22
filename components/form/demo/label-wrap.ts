import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'nz-demo-form-label-wrap',
  imports: [ReactiveFormsModule, NzButtonModule, NzFormModule, NzInputModule],
  template: `
    <form nz-form [formGroup]="validateForm" nzNoColon nzLabelAlign="left" (ngSubmit)="submitForm()">
      <nz-form-item>
        <nz-form-label nzRequired nzFor="user" nzSpan="3"> Normal text label </nz-form-label>
        <nz-form-control nzErrorTip="Please input your username!" nzSpan="8">
          <input formControlName="username" nz-input id="user" />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label nzRequired nzFor="label-wrap-password" nzSpan="3" nzLabelWrap>
          Long text label Long text label
        </nz-form-label>
        <nz-form-control nzErrorTip="Please input your Password!" nzSpan="8">
          <input formControlName="password" nz-input type="password" id="label-wrap-password" />
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
export class NzDemoFormLabelWrapComponent {
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
