import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-form-validate-template',
  template: `
    <form nz-form>
      <nz-form-item>
        <nz-form-label [nzSpan]="5">Required</nz-form-label>
        <nz-form-control nzHasFeedback [nzSpan]="12" nzErrorTip="Input is required">
          <input nz-input [ngModel]="'Required Input'" name="required" required />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label [nzSpan]="5">MaxLength</nz-form-label>
        <nz-form-control nzHasFeedback [nzSpan]="12" nzErrorTip="MaxLength is 6">
          <input nz-input [ngModel]="'MaxLength is 6'" name="maxlength" maxlength="6" />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label [nzSpan]="5">MinLength</nz-form-label>
        <nz-form-control nzHasFeedback [nzSpan]="12" nzErrorTip="MinLength is 6">
          <input nz-input [ngModel]="'MinLength is 6'" name="minlength" minlength="6" />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label [nzSpan]="5">Email</nz-form-label>
        <nz-form-control nzHasFeedback [nzSpan]="12" nzErrorTip="Email is not valid">
          <input nz-input [ngModel]="'Input Email'" name="email" email />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label [nzSpan]="5">Pattern</nz-form-label>
        <nz-form-control nzHasFeedback [nzSpan]="12" nzErrorTip="Pattern not match">
          <input nz-input [ngModel]="'Match pattern'" name="pattern" pattern=".{3,}" />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label [nzSpan]="5">Mix</nz-form-label>
        <nz-form-control nzHasFeedback [nzSpan]="12" [nzErrorTip]="combineTpl">
          <input nz-input [ngModel]="'MaxLength is 12 and MinLength is 6'" name="mix" minlength="6" maxlength="12" required />
          <ng-template #combineTpl let-control>
            <ng-container *ngIf="control.hasError('maxlength')">MaxLength is 12</ng-container>
            <ng-container *ngIf="control.hasError('minlength')">MinLength is 6</ng-container>
            <ng-container *ngIf="control.hasError('required')">Input is required</ng-container>
          </ng-template>
        </nz-form-control>
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
