import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormLayoutType, NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzRadioModule } from 'ng-zorro-antd/radio';

@Component({
  selector: 'nz-demo-form-layout',
  imports: [ReactiveFormsModule, NzButtonModule, NzFormModule, NzInputModule, NzRadioModule],
  template: `
    <form
      nz-form
      [nzLayout]="validateForm.controls.formLayout.value"
      [formGroup]="validateForm"
      (ngSubmit)="submitForm()"
    >
      <nz-form-item>
        <nz-form-label [nzSpan]="isHorizontal ? 4 : null">Form Layout</nz-form-label>
        <nz-form-control [nzSpan]="isHorizontal ? 14 : null">
          <nz-radio-group formControlName="formLayout">
            <label nz-radio-button [nzValue]="'horizontal'">Horizontal</label>
            <label nz-radio-button [nzValue]="'vertical'">Vertical</label>
            <label nz-radio-button [nzValue]="'inline'">Inline</label>
          </nz-radio-group>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label [nzSpan]="isHorizontal ? 4 : null">Field A</nz-form-label>
        <nz-form-control [nzSpan]="isHorizontal ? 14 : null" nzErrorTip="Please input your username!">
          <input nz-input formControlName="fieldA" placeholder="input placeholder" />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label [nzSpan]="isHorizontal ? 4 : null">Field B</nz-form-label>
        <nz-form-control [nzSpan]="isHorizontal ? 14 : null" nzErrorTip="Please input your Password!">
          <input nz-input formControlName="filedB" placeholder="input placeholder" />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-control [nzSpan]="isHorizontal ? 14 : null" [nzOffset]="isHorizontal ? 4 : null">
          <button nz-button nzType="primary">Submit</button>
        </nz-form-control>
      </nz-form-item>
    </form>
  `,
  styles: [
    `
      [nz-form]:not(.ant-form-inline):not(.ant-form-vertical) {
        max-width: 600px;
      }
    `
  ]
})
export class NzDemoFormLayoutComponent {
  private fb = inject(NonNullableFormBuilder);
  validateForm = this.fb.group({
    formLayout: this.fb.control<NzFormLayoutType>('horizontal'),
    fieldA: this.fb.control('', [Validators.required]),
    filedB: this.fb.control('', [Validators.required])
  });

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  get isHorizontal(): boolean {
    return this.validateForm.controls.formLayout.value === 'horizontal';
  }
}
