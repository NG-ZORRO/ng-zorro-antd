import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-form-validate-static',
  template: `
    <form nz-form nzSimple nzLabelCol="5" nzControlCol="12">
      <nz-form-item nzLabel="Fail" nzValidateStatus="error" nzErrorTip="Should be combination of numbers & alphabets">
        <input nz-input [ngModel]="'unavailable choice'" name="errorValid" />
      </nz-form-item>
      <nz-form-item nzLabel="Warning" nzValidateStatus="warning">
        <input nz-input [ngModel]="'Warning'" name="warningValid" />
      </nz-form-item>
      <nz-form-item
        nzLabel="Validating"
        nzValidateStatus="validating"
        nzHasFeedback
        nzValidatingTip="I'm validating the content"
      >
        <input nz-input [ngModel]="'The content is being validated'" name="validating" />
      </nz-form-item>
      <nz-form-item nzLabel="Success" nzValidateStatus="success" nzHasFeedback>
        <input nz-input [ngModel]="'The content'" name="successValid" />
      </nz-form-item>
      <nz-form-item
        nzLabel="Warning"
        nzValidateStatus="warning"
        nzHasFeedback
        nzWarningTip="Should be combination of numbers & alphabets"
      >
        <input nz-input [ngModel]="'Warning'" name="warningHighValid" />
      </nz-form-item>
      <nz-form-item
        nzLabel="Fail"
        nzValidateStatus="error"
        nzHasFeedback
        nzErrorTip="Should be combination of numbers & alphabets"
      >
        <input nz-input [ngModel]="'unavailable choice'" name="invalidValid" />
      </nz-form-item>
      <nz-form-item nzLabel="Success" nzValidateStatus="success" nzHasFeedback>
        <nz-date-picker name="date-picker-success"></nz-date-picker>
      </nz-form-item>
      <nz-form-item nzLabel="Warning" nzValidateStatus="warning" nzHasFeedback>
        <nz-time-picker name="time-picker-warning"></nz-time-picker>
      </nz-form-item>
      <nz-form-item nzLabel="Error" nzValidateStatus="error" nzHasFeedback>
        <nz-select name="select-error" [ngModel]="'Option 1'">
          <nz-option nzValue="Option 1" nzLabel="Option 1"></nz-option>
          <nz-option nzValue="Option 2" nzLabel="Option 2"></nz-option>
        </nz-select>
      </nz-form-item>
      <nz-form-item nzLabel="Validating" nzValidateStatus="validating" nzHasFeedback>
        <nz-select name="select-validate" [ngModel]="'Option 2'">
          <nz-option nzValue="Option 1" nzLabel="Option 1"></nz-option>
          <nz-option nzValue="Option 2" nzLabel="Option 2"></nz-option>
        </nz-select>
      </nz-form-item>
      <nz-form-item nzLabel="Success" nzValidateStatus="success" nzHasFeedback>
        <nz-input-number name="inputnumber-success" style="width:100%"></nz-input-number>
      </nz-form-item>
    </form>
  `,
  styles: [
    `
      [nz-form] {
        max-width: 600px;
      }

      nz-date-picker ::ng-deep .ant-calendar-picker {
        width: 100%;
      }

      nz-date-picker,
      nz-time-picker {
        width: 100%;
      }
    `
  ]
})
export class NzDemoFormValidateStaticComponent {}
