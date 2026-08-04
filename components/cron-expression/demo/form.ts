import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';

import { CronExpressionParser } from 'cron-parser';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCronExpressionModule } from 'ng-zorro-antd/cron-expression';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';

const ONE_DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000;

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
        <nz-form-label [nzSpan]="6">minimum interval: 1 day</nz-form-label>
        <nz-form-control [nzSpan]="14">
          <nz-cron-expression
            formControlName="cronMinInterval"
            [nzSemantic]="form.controls.cronMinInterval.hasError('minInterval') ? minIntervalError : null"
          />
          <ng-template #minIntervalError>
            <span class="ant-cron-expression-error">The interval cannot be less than 1 day.</span>
          </ng-template>
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
  private readonly fb = inject(FormBuilder);
  private readonly minIntervalValidator: ValidatorFn = control => {
    if (typeof control.value !== 'string' || !control.value) {
      return null;
    }

    try {
      const interval = CronExpressionParser.parse(control.value);
      const firstExecution = interval.next().toDate();
      const secondExecution = interval.next().toDate();
      return secondExecution.getTime() - firstExecution.getTime() < ONE_DAY_IN_MILLISECONDS
        ? { minInterval: true }
        : null;
    } catch {
      return null;
    }
  };

  readonly form: FormGroup<{
    username: FormControl<string | null>;
    cronLinux: FormControl<string | null>;
    cronMinInterval: FormControl<string | null>;
    cronSpring: FormControl<string | null>;
  }> = this.fb.group({
    username: ['cron-expression', [Validators.required]],
    cronLinux: ['* 1 * * *', [Validators.required]],
    cronSpring: ['0 * 1 * * *', [Validators.required]],
    cronMinInterval: ['0 */12 * * *', [Validators.required, this.minIntervalValidator]]
  });

  constructor() {
    this.form.controls.cronMinInterval.markAsTouched();
  }

  submit(): void {
    console.log(this.form.value);
  }
}
