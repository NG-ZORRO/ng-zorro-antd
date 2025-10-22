import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';

type Gender = 'male' | 'female';

@Component({
  selector: 'nz-demo-form-coordinated',
  imports: [ReactiveFormsModule, NzButtonModule, NzFormModule, NzInputModule, NzSelectModule],
  template: `
    <form nz-form [formGroup]="validateForm" (ngSubmit)="submitForm()">
      <nz-form-item>
        <nz-form-label [nzSpan]="5" nzRequired nzFor="note">Note</nz-form-label>
        <nz-form-control [nzSpan]="12" nzErrorTip="Please input your username!">
          <input id="note" type="text" nz-input formControlName="note" />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label [nzSpan]="5" nzFor="gender" nzRequired>Gender</nz-form-label>
        <nz-form-control [nzSpan]="12" nzErrorTip="Please select your gender!">
          <nz-select id="gender" formControlName="gender" nzPlaceHolder="Select a option and change input text above">
            <nz-option nzValue="male" nzLabel="male"></nz-option>
            <nz-option nzValue="female" nzLabel="female"></nz-option>
          </nz-select>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-control [nzSpan]="12" [nzOffset]="5">
          <button nz-button nzType="primary">Submit</button>
        </nz-form-control>
      </nz-form-item>
    </form>
  `,
  styles: [
    `
      [nz-form] {
        max-width: 600px;
      }
    `
  ]
})
export class NzDemoFormCoordinatedComponent implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);
  private destroy$ = new Subject<void>();
  validateForm = this.fb.group({
    note: this.fb.control<string | null>(null, Validators.required),
    gender: this.fb.control<Gender | null>(null, Validators.required)
  });

  ngOnInit(): void {
    this.validateForm.controls.gender.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(value => {
      this.genderChange(value);
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

  genderChange(value: Gender | null): void {
    this.validateForm.controls.note.setValue(value === 'male' ? 'Hi, man!' : 'Hi, lady!');
  }
}
