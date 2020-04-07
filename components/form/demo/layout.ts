import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'nz-demo-form-layout',
  template: `
    <form nz-form [nzLayout]="validateForm.get('formLayout')?.value" [formGroup]="validateForm" (ngSubmit)="submitForm()">
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
export class NzDemoFormLayoutComponent implements OnInit {
  validateForm: FormGroup;

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
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
