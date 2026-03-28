import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCronExpressionModule } from 'ng-zorro-antd/cron-expression';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'nz-demo-cron-expression-form',
  imports: [ReactiveFormsModule, NzButtonModule, NzCronExpressionModule, NzFormModule, NzInputModule],
  template: `
    <form nz-form nzLayout="vertical" [formGroup]="form" (ngSubmit)="submit()">
      <nz-form-item>
        <nz-form-label [nzSpan]="6">name</nz-form-label>
        <nz-form-control [nzSpan]="14">
          <input nz-input formControlName="username" />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label [nzSpan]="6">nz-cron-linux</nz-form-label>
        <nz-form-control [nzSpan]="14">
          <nz-cron-expression formControlName="cronLinux" />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label [nzSpan]="6">nz-cron-spring</nz-form-label>
        <nz-form-control [nzSpan]="14">
          <nz-cron-expression formControlName="cronSpring" nzType="spring" />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-control>
          <button nz-button nzType="primary" [disabled]="!form.valid">submit</button>
        </nz-form-control>
      </nz-form-item>
    </form>
  `
})
export class NzDemoCronExpressionFormComponent {
  private fb = inject(FormBuilder);
  form: FormGroup<{
    username: FormControl<string | null>;
    cronLinux: FormControl<string | null>;
    cronSpring: FormControl<string | null>;
  }> = this.fb.group({
    username: ['cron-expression', [Validators.required]],
    cronLinux: ['* 1 * * *', [Validators.required]],
    cronSpring: ['0 * 1 * * *', [Validators.required]]
  });

  submit(): void {
    console.log(this.form.value);
  }
}
