import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'nz-demo-cron-expression-use',
  template: `
    <form nz-form [nzLayout]="'vertical'" [formGroup]="validateForm" (ngSubmit)="submitForm()">
      <nz-form-item>
        <nz-form-label [nzSpan]="6">name</nz-form-label>
        <nz-form-control [nzSpan]="14">
          <input nz-input formControlName="username" />
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
export class NzDemoCronExpressionUseComponent {
  private fb = inject(FormBuilder);
  validateForm: FormGroup<{
    username: FormControl<string | null>;
    cronLinux: FormControl<string | null>;
    cronSpring: FormControl<string | null>;
  }> = this.fb.group({
    username: ['cron-expression', [Validators.required]],
    cronLinux: ['* 1 * * *', [Validators.required]],
    cronSpring: ['0 * 1 * * *', [Validators.required]]
  });

  submitForm(): void {
    console.log(this.validateForm.value);
  }
}
