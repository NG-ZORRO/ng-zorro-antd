import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-form-validate-template',
  template: `
    <form nz-form nzSimple nzLabelCol="5" nzControlCol="12">
      <nz-form-item nzLabel="Required" nzErrorTip="Input is required">
        <input nz-input [ngModel]="'Required Input'" name="required" required />
      </nz-form-item>
      <nz-form-item nzLabel="MaxLength" nzErrorTip="MaxLength is 6">
        <input nz-input [ngModel]="'MaxLength is 6'" name="maxlength" maxlength="6" />
      </nz-form-item>
      <nz-form-item nzLabel="MinLength" nzErrorTip="MinLength is 6">
        <input nz-input [ngModel]="'MinLength is 6'" name="minlength" minlength="6" />
      </nz-form-item>
      <nz-form-item nzLabel="Email" nzErrorTip="Email is not valid">
        <input nz-input [ngModel]="'Input Email'" name="email" email />
      </nz-form-item>
      <nz-form-item nzLabel="Pattern" nzErrorTip="Pattern not match">
        <input nz-input [ngModel]="'Match pattern'" name="pattern" pattern=".{3,}" />
      </nz-form-item>
      <nz-form-item nzLabel="Mix" nzHasFeedback [nzErrorTip]="combineTpl">
        <input
          nz-input
          [ngModel]="'MaxLength is 12 and MinLength is 6'"
          name="mix"
          minlength="6"
          maxlength="12"
          required
        />
        <ng-template #combineTpl let-control>
          <ng-container *ngIf="control.hasError('maxlength')">MaxLength is 12</ng-container>
          <ng-container *ngIf="control.hasError('minlength')">MinLength is 6</ng-container>
          <ng-container *ngIf="control.hasError('required')">Input is required</ng-container>
        </ng-template>
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
export class NzDemoFormValidateTemplateComponent {}
