import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'nz-demo-form-time-related-controls',
  template: `
    <form nz-form [formGroup]="validateForm" (ngSubmit)="submitForm()">
      <nz-form-item>
        <nz-form-label [nzSm]="8" [nzXs]="24" nzRequired>DatePicker</nz-form-label>
        <nz-form-control [nzSm]="16" [nzXs]="24">
          <nz-date-picker formControlName="datePicker"></nz-date-picker>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label [nzSm]="8" [nzXs]="24" nzRequired>DatePicker[ShowTime]</nz-form-label>
        <nz-form-control [nzSm]="16" [nzXs]="24">
          <nz-date-picker nzShowTime formControlName="datePickerTime"></nz-date-picker>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label [nzSm]="8" [nzXs]="24" nzRequired>MonthPicker</nz-form-label>
        <nz-form-control [nzSm]="16" [nzXs]="24">
          <nz-month-picker formControlName="monthPicker"></nz-month-picker>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label [nzSm]="8" [nzXs]="24" nzRequired>RangePicker</nz-form-label>
        <nz-form-control [nzSm]="16" [nzXs]="24">
          <nz-range-picker formControlName="rangePicker"></nz-range-picker>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label [nzSm]="8" [nzXs]="24" nzRequired>RangePicker[showTime]</nz-form-label>
        <nz-form-control [nzSm]="16" [nzXs]="24">
          <nz-range-picker nzShowTime formControlName="rangePickerTime"></nz-range-picker>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label [nzSm]="8" [nzXs]="24" nzRequired>TimePicker</nz-form-label>
        <nz-form-control [nzSm]="16" [nzXs]="24">
          <nz-time-picker formControlName="timePicker"></nz-time-picker>
        </nz-form-control>
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
  validateForm: FormGroup;

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
