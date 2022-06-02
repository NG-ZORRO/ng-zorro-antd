import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'nz-demo-form-coordinated',
  template: `
    <form nz-form [formGroup]="validateForm" nzSimple nzLabelCol="5" nzControlCol="12" (ngSubmit)="submitForm()">
      <nz-form-item nzFor="note" nzLabel="Note" nzErrorTip="Please input your username!">
        <input id="note" type="text" nz-input formControlName="note" />
      </nz-form-item>
      <nz-form-item nzFor="gender" nzLabel="Gender" nzErrorTip="Please select your gender!">
        <nz-select
          id="gender"
          formControlName="gender"
          nzPlaceHolder="Select a option and change input text above"
          (ngModelChange)="genderChange($event)"
        >
          <nz-option nzValue="male" nzLabel="male"></nz-option>
          <nz-option nzValue="female" nzLabel="female"></nz-option>
        </nz-select>
      </nz-form-item>
      <nz-form-item [nzControlCol]="{ span: 12, offset: 5 }">
        <button nz-button nzType="primary">Submit</button>
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
export class NzDemoFormCoordinatedComponent implements OnInit {
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

  genderChange(value: string): void {
    this.validateForm.get('note')!.setValue(value === 'male' ? 'Hi, man!' : 'Hi, lady!');
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      note: [null, [Validators.required]],
      gender: [null, [Validators.required]]
    });
  }
}
