import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'nz-demo-form-time-related-controls',
  template: `
    <form
      nz-form
      [formGroup]="validateForm"
      nzSimple
      [nzLabelCol]="{ sm: 8, xs: 24 }"
      [nzControlCol]="{ sm: 16, xs: 24 }"
      (ngSubmit)="submitForm()"
    >
      <nz-form-item nzRequired nzLabel="DatePicker">
        <nz-date-picker formControlName="datePicker"></nz-date-picker>
      </nz-form-item>
      <nz-form-item nzRequired nzLabel="DatePicker[ShowTime]">
        <nz-date-picker nzShowTime formControlName="datePickerTime"></nz-date-picker>
      </nz-form-item>
      <nz-form-item nzRequired nzLabel="MonthPicker">
        <nz-date-picker nzMode="month" formControlName="monthPicker"></nz-date-picker>
      </nz-form-item>
      <nz-form-item nzRequired nzLabel="RangePicker">
        <nz-range-picker formControlName="rangePicker"></nz-range-picker>
      </nz-form-item>
      <nz-form-item nzRequired nzLabel="RangePicker[showTime]">
        <nz-range-picker nzShowTime formControlName="rangePickerTime"></nz-range-picker>
      </nz-form-item>
      <nz-form-item nzRequired nzLabel="TimePicker">
        <nz-time-picker formControlName="timePicker"></nz-time-picker>
      </nz-form-item>
      <nz-form-item>
        <nz-form-control [nzXs]="{ span: 24, offset: 0 }" [nzSm]="{ span: 16, offset: 8 }">
          <button nz-button nzType="primary">Submit</button>
        </nz-form-control>
      </nz-form-item>
    </form>
  `,
  styles: [
    `
      form {
        max-width: 600px;
      }
    `
  ]
})
export class NzDemoFormTimeRelatedControlsComponent implements OnInit {
  validateForm!: FormGroup;

  submitForm(): void {
    console.log(this.validateForm.value);
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      datePicker: [null],
      datePickerTime: [null],
      monthPicker: [null],
      rangePicker: [[]],
      rangePickerTime: [[]],
      timePicker: [null]
    });
  }
}
