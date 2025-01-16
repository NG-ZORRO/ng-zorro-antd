import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'nz-demo-form-dynamic-rule',
  imports: [ReactiveFormsModule, NzButtonModule, NzCheckboxModule, NzFormModule, NzInputModule],
  template: `
    <form nz-form [formGroup]="validateForm" (ngSubmit)="submitForm()">
      <nz-form-item>
        <nz-form-label [nzSpan]="4" nzRequired nzFor="name">Name</nz-form-label>
        <nz-form-control [nzSpan]="8" nzErrorTip="Please input your name">
          <input type="text" nz-input formControlName="name" placeholder="Please input your name" />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label [nzSpan]="4" nzFor="nickname" [nzRequired]="validateForm.controls.required.value">
          Nickname
        </nz-form-label>
        <nz-form-control [nzSpan]="8" nzErrorTip="Please input your nickname">
          <input type="text" nz-input formControlName="nickname" placeholder="Please input your nickname" />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-control [nzSpan]="8" [nzOffset]="4">
          <label nz-checkbox formControlName="required">Nickname is required</label>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-control [nzSpan]="8" [nzOffset]="4">
          <button nz-button nzType="primary">Check</button>
        </nz-form-control>
      </nz-form-item>
    </form>
  `
})
export class NzDemoFormDynamicRuleComponent implements OnInit, OnDestroy {
  private fb = inject(NonNullableFormBuilder);
  private destroy$ = new Subject<void>();
  validateForm = this.fb.group({
    name: this.fb.control('', [Validators.required]),
    nickname: this.fb.control(''),
    required: this.fb.control(false)
  });

  ngOnInit(): void {
    this.validateForm.controls.required.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(value => {
      this.requiredChange(value);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

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

  requiredChange(required: boolean): void {
    if (!required) {
      this.validateForm.controls.nickname.clearValidators();
      this.validateForm.controls.nickname.markAsPristine();
    } else {
      this.validateForm.controls.nickname.setValidators(Validators.required);
      this.validateForm.controls.nickname.markAsDirty();
    }
    this.validateForm.controls.nickname.updateValueAndValidity();
  }
}
