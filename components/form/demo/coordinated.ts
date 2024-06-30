import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'nz-demo-form-coordinated',
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
          <nz-select
            id="gender"
            formControlName="gender"
            nzPlaceHolder="Select a option and change input text above"
            (ngModelChange)="genderChange($event)"
          >
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
export class NzDemoFormCoordinatedComponent {
  validateForm: FormGroup<{
    note: FormControl<string | null>;
    gender: FormControl<'male' | 'male' | null>;
  }> = this.fb.group({
    note: this.fb.control<string | null>(null, Validators.required),
    gender: this.fb.control<'male' | 'male' | null>(null, Validators.required)
  });

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

  genderChange(value: string): void {
    this.validateForm.controls.note.setValue(value === 'male' ? 'Hi, man!' : 'Hi, lady!');
  }

  constructor(private fb: FormBuilder) {}
}
