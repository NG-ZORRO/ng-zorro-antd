import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';

@Component({
  selector: 'nz-demo-form-time-related-controls',
  imports: [ReactiveFormsModule, NzButtonModule, NzDatePickerModule, NzFormModule, NzTimePickerModule],
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
          <nz-date-picker nzMode="month" formControlName="monthPicker"></nz-date-picker>
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
export class NzDemoFormTimeRelatedControlsComponent {
  private fb = inject(FormBuilder);
  validateForm = this.fb.group({
    datePicker: this.fb.control<Date | null>(null),
    datePickerTime: this.fb.control<Date | null>(null),
    monthPicker: this.fb.control<Date | null>(null),
    rangePicker: this.fb.control<[Date, Date] | null>(null),
    rangePickerTime: this.fb.control<[Date, Date] | null>(null),
    timePicker: this.fb.control<Date | null>(null)
  });

  submitForm(): void {
    console.log(this.validateForm.value);
  }
}
