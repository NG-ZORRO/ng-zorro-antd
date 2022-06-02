import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'nz-demo-form-dynamic-rule',
  template: `
    <form nz-form [formGroup]="validateForm" nzSimple nzLabelCol="4" nzControlCol="8" (ngSubmit)="submitForm()">
      <nz-form-item nzRequired nzFor="name" nzLabel="Name" nzErrorTip="Please input your name">
        <input type="text" nz-input formControlName="name" placeholder="Please input your name" />
      </nz-form-item>
      <nz-form-item
        [nzRequired]="validateForm.get('required')?.value"
        nzFor="nickname"
        nzLabel="Nickname"
        nzErrorTip="Please input your nickname"
      >
        <input type="text" nz-input formControlName="nickname" placeholder="Please input your nickname" />
      </nz-form-item>
      <nz-form-item [nzControlCol]="{ span: 8, offset: 4 }">
        <label nz-checkbox formControlName="required" (ngModelChange)="requiredChange($event)">
          Nickname is required
        </label>
      </nz-form-item>
      <nz-form-item [nzControlCol]="{ span: 8, offset: 4 }">
        <button nz-button nzType="primary">Check</button>
      </nz-form-item>
    </form>
  `
})
export class NzDemoFormDynamicRuleComponent implements OnInit {
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

  requiredChange(required: boolean): void {
    if (!required) {
      this.validateForm.get('nickname')!.clearValidators();
      this.validateForm.get('nickname')!.markAsPristine();
    } else {
      this.validateForm.get('nickname')!.setValidators(Validators.required);
      this.validateForm.get('nickname')!.markAsDirty();
    }
    this.validateForm.get('nickname')!.updateValueAndValidity();
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      nickname: [null],
      required: [false]
    });
  }
}
