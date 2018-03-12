import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

@Component({
  selector: 'nz-demo-form-layout',
  template: `
    <form nz-form [nzLayout]="getControl('formLayout')?.value" [formGroup]="validateForm" (ngSubmit)="submitForm()">
      <div nz-form-item nz-row>
        <div nz-form-label nz-col [nzSpan]="isHorizontal? 4:null">
          <label>Form Layout</label>
        </div>
        <div nz-form-control nz-col [nzSpan]="isHorizontal? 14:null">
          <nz-radio-group formControlName="formLayout">
            <label nz-radio-button [nzValue]="'horizontal'">Horizontal</label>
            <label nz-radio-button [nzValue]="'vertical'">Vertical</label>
            <label nz-radio-button [nzValue]="'inline'">Inline</label>
          </nz-radio-group>
        </div>
      </div>
      <div nz-form-item nz-row>
        <div nz-form-label nz-col [nzSpan]="isHorizontal? 4:null">
          <label>Field A</label>
        </div>
        <div nz-form-control nz-col [nzSpan]="isHorizontal? 14:null">
          <input nz-input formControlName="fieldA" placeholder="input placeholder">
          <div nz-form-explain *ngIf="getControl('fieldA').dirty && getControl('fieldA').hasError('required')">Please input your username!</div>
        </div>
      </div>
      <div nz-form-item nz-row>
        <div nz-form-label nz-col [nzSpan]="isHorizontal? 4:null">
          <label>Field B</label>
        </div>
        <div nz-form-control nz-col [nzSpan]="isHorizontal? 14:null">
          <input nz-input formControlName="filedB" placeholder="input placeholder">
          <div nz-form-explain *ngIf="getControl('filedB').dirty && getControl('filedB').hasError('required')">Please input your Password!</div>
        </div>
      </div>
      <div nz-form-item nz-row>
        <div nz-form-control nz-col [nzSpan]="isHorizontal? 14:null" [nzOffset]="isHorizontal? 4:null">
          <button nz-button nzType="primary">Submit</button>
        </div>
      </div>
    </form>`,
  styles  : [
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
      this.validateForm.controls[ i ].markAsDirty();
    }
  }

  get isHorizontal(): boolean {
    return this.validateForm.controls.formLayout && this.validateForm.controls.formLayout.value === 'horizontal';
  }

  getControl(name: string): AbstractControl {
    return this.validateForm.controls[ name ];
  }

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      formLayout: [ 'horizontal' ],
      fieldA    : [ null, [ Validators.required ] ],
      filedB    : [ null, [ Validators.required ] ]
    });
  }
}
