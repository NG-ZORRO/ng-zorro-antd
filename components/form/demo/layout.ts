import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'nz-demo-form-layout',
  template: `
    <form
      nz-form
      [nzLayout]="validateForm.get('formLayout')?.value"
      [formGroup]="validateForm"
      nzSimple
      [nzLabelCol]="isHorizontal ? 4 : undefined"
      [nzControlCol]="isHorizontal ? 14 : undefined"
      (ngSubmit)="submitForm()"
    >
      <nz-form-item nzLabel="Form Layout">
        <nz-radio-group formControlName="formLayout">
          <label nz-radio-button [nzValue]="'horizontal'">Horizontal</label>
          <label nz-radio-button [nzValue]="'vertical'">Vertical</label>
          <label nz-radio-button [nzValue]="'inline'">Inline</label>
        </nz-radio-group>
      </nz-form-item>
      <nz-form-item nzLabel="Field A" nzErrorTip="Please input your username!">
        <input nz-input formControlName="fieldA" placeholder="input placeholder" />
      </nz-form-item>
      <nz-form-item nzLabel="Field B" nzErrorTip="Please input your Password!">
        <input nz-input formControlName="filedB" placeholder="input placeholder" />
      </nz-form-item>
      <nz-form-item [nzControlCol]="{ span: isHorizontal ? 14 : undefined, offset: isHorizontal ? 4 : undefined }">
        <button nz-button nzType="primary">Submit</button>
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
export class NzDemoFormLayoutComponent implements OnInit {
  validateForm!: FormGroup;

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
    return this.validateForm.controls.formLayout?.value === 'horizontal';
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      formLayout: ['horizontal'],
      fieldA: [null, [Validators.required]],
      filedB: [null, [Validators.required]]
    });
  }
}
