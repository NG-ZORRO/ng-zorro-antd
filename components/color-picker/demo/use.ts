import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'nz-demo-color-picker-use',
  template: `
    <form nz-form [formGroup]="validateForm" (ngSubmit)="submitForm()">
      <nz-form-item>
        <nz-form-label [nzSpan]="4">name</nz-form-label>
        <nz-form-control [nzSpan]="16">
          <input nz-input formControlName="username" />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label [nzSpan]="4">color</nz-form-label>
        <nz-form-control [nzSpan]="16">
          <nz-color-picker formControlName="colorPicker" nzShowText></nz-color-picker>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-control>
          <button nz-button nzType="primary">submit</button>
        </nz-form-control>
      </nz-form-item>
    </form>
  `
})
export class NzDemoColorPickerUseComponent {
  private fb = inject(FormBuilder);
  validateForm: FormGroup<{
    username: FormControl<string | null>;
    colorPicker: FormControl<string | null>;
  }> = this.fb.group({
    username: ['color-picker', [Validators.required]],
    colorPicker: ['#1677ff']
  });

  submitForm(): void {
    console.log(this.validateForm.value);
  }
}
