import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-form-validate-static',
  template: `
    <form nz-form [nzLayout]="'horizontal'">
      <div nz-form-item nz-row>
        <div nz-form-label nz-col [nzSpan]="5">
          <label>Fail</label>
        </div>
        <div nz-form-control nzValidateStatus="error" nz-col [nzSpan]="12">
          <input nz-input [ngModel]="'unavailable choice'" name="errorValid">
          <div nz-form-explain>Should be combination of numbers & alphabets</div>
        </div>
      </div>
      <div nz-form-item nz-row>
        <div nz-form-label nz-col [nzSpan]="5">
          <label>Warning</label>
        </div>
        <div nz-form-control nzValidateStatus="warning" nz-col [nzSpan]="12">
          <input nz-input [ngModel]="'Warning'" name="warningValid">
        </div>
      </div>
      <div nz-form-item nz-row>
        <div nz-form-label nz-col [nzSpan]="5">
          <label>Validating</label>
        </div>
        <div nz-col [nzSpan]="12" nz-form-control nzValidateStatus="validating" nzHasFeedback>
          <input nz-input [ngModel]="'The content is being validating'" name="validating">
          <div nz-form-explain>I'm the content is being validating</div>
        </div>
      </div>
      <div nz-form-item nz-row>
        <div nz-form-label nz-col [nzSpan]="5">
          <label>Success</label>
        </div>
        <div nz-form-control nz-col [nzSpan]="12" nzValidateStatus="success" nzHasFeedback>
          <input nz-input [ngModel]="'The content'" name="successValid">
        </div>
      </div>
      <div nz-form-item nz-row>
        <div nz-form-label nz-col [nzSpan]="5">
          <label>Warning</label>
        </div>
        <div nz-col [nzSpan]="12" nz-form-control nzValidateStatus="warning" nzHasFeedback>
          <input nz-input [ngModel]="'Warning'" name="warningHighValid">
          <div nz-form-explain>Should be combination of numbers & alphabets</div>
        </div>
      </div>
      <div nz-form-item nz-row>
        <div nz-form-label nz-col [nzSpan]="5">
          <label>Fail</label>
        </div>
        <div nz-col [nzSpan]="12" nz-form-control nzValidateStatus="error" nzHasFeedback>
          <input nz-input [ngModel]="'unavailable choice'" name="invalidValid">
          <div nz-form-explain>Should be combination of numbers & alphabets</div>
        </div>
      </div>
    </form>`,
  styles  : [
      `
      [nz-form] {
        max-width: 600px;
      }
    `
  ]
})
export class NzDemoFormValidateStaticComponent {
}
