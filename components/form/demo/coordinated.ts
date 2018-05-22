import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

@Component({
  selector: 'nz-demo-form-coordinated',
  template: `
    <form nz-form [formGroup]="validateForm" (ngSubmit)="submitForm()">
      <nz-form-item>
        <nz-form-label [nzSpan]="5" nzRequired nzFor="note">Note</nz-form-label>
        <nz-form-control [nzSpan]="12">
          <input id="note" type="text" nz-input formControlName="note">
          <nz-form-explain *ngIf="validateForm.get('note').dirty && validateForm.get('note').errors">Please input your username!</nz-form-explain>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label [nzSpan]="5" nzFor="gender" nzRequired>Gender</nz-form-label>
        <nz-form-control [nzSpan]="12">
          <nz-select id="gender" formControlName="gender" nzPlaceHolder="Select a option and change input text above" (ngModelChange)="genderChange($event)">
            <nz-option nzValue="male" nzLabel="male"></nz-option>
            <nz-option nzValue="female" nzLabel="female"></nz-option>
          </nz-select>
          <nz-form-explain *ngIf="validateForm.get('gender').dirty && validateForm.get('gender').errors">Please select your gender!</nz-form-explain>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-control [nzSpan]="12" [nzOffset]="5">
          <button nz-button nzType="primary">Submit</button>
        </nz-form-control>
      </nz-form-item>
    </form>
  `,
  styles  : [
      `[nz-form] {
      max-width: 600px;
    }`
  ]
})
export class NzDemoFormCoordinatedComponent implements OnInit {
  validateForm: FormGroup;

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[ i ].markAsDirty();
      this.validateForm.controls[ i ].updateValueAndValidity();
    }
  }

  genderChange(value: string): void {
    this.validateForm.get('note').setValue(value === 'male' ? 'Hi, man!' : 'Hi, lady!');
  }

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      note  : [ null, [ Validators.required ] ],
      gender: [ null, [ Validators.required ] ]
    });
  }
}
