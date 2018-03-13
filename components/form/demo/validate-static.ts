import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-form-validate-static',
  template: `
    <form nz-form>
      <nz-form-item>
        <nz-form-label [nzSpan]="5">Fail</nz-form-label>
        <nz-form-control nzValidateStatus="error" [nzSpan]="12">
          <input nz-input [ngModel]="'unavailable choice'" name="errorValid">
          <nz-form-explain>Should be combination of numbers & alphabets</nz-form-explain>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label [nzSpan]="5">Warning</nz-form-label>
        <nz-form-control nzValidateStatus="warning" [nzSpan]="12">
          <input nz-input [ngModel]="'Warning'" name="warningValid">
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label [nzSpan]="5">Validating</nz-form-label>
        <nz-form-control [nzSpan]="12" nzValidateStatus="validating" nzHasFeedback>
          <input nz-input [ngModel]="'The content is being validating'" name="validating">
          <nz-form-explain>I'm the content is being validating</nz-form-explain>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label [nzSpan]="5">Success</nz-form-label>
        <nz-form-control [nzSpan]="12" nzValidateStatus="success" nzHasFeedback>
          <input nz-input [ngModel]="'The content'" name="successValid">
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label [nzSpan]="5">Warning</nz-form-label>
        <nz-form-control [nzSpan]="12" nzValidateStatus="warning" nzHasFeedback>
          <input nz-input [ngModel]="'Warning'" name="warningHighValid">
          <nz-form-explain>Should be combination of numbers & alphabets</nz-form-explain>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label [nzSpan]="5">Fail</nz-form-label>
        <nz-form-control [nzSpan]="12" nzValidateStatus="error" nzHasFeedback>
          <input nz-input [ngModel]="'unavailable choice'" name="invalidValid">
          <nz-form-explain>Should be combination of numbers & alphabets</nz-form-explain>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label [nzSpan]="5">Error</nz-form-label>
        <nz-form-control [nzSpan]="12" nzValidateStatus="error" nzHasFeedback>
          <nz-select name="select-error" [ngModel]="'Option 1'">
            <nz-option nzValue="Option 1" nzLabel="Option 1"></nz-option>
            <nz-option nzValue="Option 2" nzLabel="Option 2"></nz-option>
          </nz-select>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label [nzSpan]="5">Validating</nz-form-label>
        <nz-form-control [nzSpan]="12" nzValidateStatus="validating" nzHasFeedback>
          <nz-select name="select-validate" [ngModel]="'Option 2'">
            <nz-option nzValue="Option 1" nzLabel="Option 1"></nz-option>
            <nz-option nzValue="Option 2" nzLabel="Option 2"></nz-option>
          </nz-select>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label [nzSpan]="5">Success</nz-form-label>
        <nz-form-control [nzSpan]="12" nzValidateStatus="success" nzHasFeedback>
          <nz-input-number name="inputnumber-success" style="width:100%"></nz-input-number>
        </nz-form-control>
      </nz-form-item>
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
