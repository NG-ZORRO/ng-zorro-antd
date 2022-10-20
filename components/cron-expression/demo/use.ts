import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'nz-demo-cron-expression-use',
  template: `
    <form nz-form [nzLayout]="'vertical'" [formGroup]="validateForm" (ngSubmit)="submitForm()">
      <nz-form-item>
        <nz-form-label [nzSpan]="6">name</nz-form-label>
        <nz-form-control [nzSpan]="14">
          <input nz-input formControlName="userName" />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label [nzSpan]="6">nz-cron-linux</nz-form-label>
        <nz-form-control [nzSpan]="14">
          <nz-cron-expression formControlName="cronLinux"></nz-cron-expression>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label [nzSpan]="6">nz-cron-spring</nz-form-label>
        <nz-form-control [nzSpan]="14">
          <nz-cron-expression formControlName="cronSpring" nzType="spring"></nz-cron-expression>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-control>
          <button nz-button nzType="primary" [disabled]="!validateForm.valid">submit</button>
        </nz-form-control>
      </nz-form-item>
    </form>
  `
})
export class NzDemoCronExpressionUseComponent implements OnInit {
  validateForm!: UntypedFormGroup;

  constructor(private fb: UntypedFormBuilder) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: ['cron-expression', [Validators.required]],
      cronLinux: ['* 1 * * *', [Validators.required]],
      cronSpring: ['0 * 1 * * *', [Validators.required]]
    });
  }

  submitForm(): void {
    console.log(this.validateForm.value);
  }
}
