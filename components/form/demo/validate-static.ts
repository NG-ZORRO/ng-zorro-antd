import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';

@Component({
  selector: 'nz-demo-form-validate-static',
  imports: [
    FormsModule,
    NzDatePickerModule,
    NzFormModule,
    NzInputModule,
    NzInputNumberModule,
    NzSelectModule,
    NzTimePickerModule
  ],
  template: `
    <form nz-form>
      <nz-form-item>
        <nz-form-label [nzSpan]="5">Fail</nz-form-label>
        <nz-form-control
          nzValidateStatus="error"
          [nzSpan]="12"
          nzErrorTip="Should be combination of numbers & alphabets"
        >
          <input nz-input ngModel="unavailable choice" name="errorValid" />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label [nzSpan]="5">Warning</nz-form-label>
        <nz-form-control nzValidateStatus="warning" [nzSpan]="12">
          <input nz-input ngModel="Warning" name="warningValid" />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label [nzSpan]="5">Validating</nz-form-label>
        <nz-form-control
          [nzSpan]="12"
          nzValidateStatus="validating"
          nzHasFeedback
          nzValidatingTip="I'm validating the content"
        >
          <input nz-input ngModel="The content is being validated" name="validating" />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label [nzSpan]="5">Success</nz-form-label>
        <nz-form-control [nzSpan]="12" nzValidateStatus="success" nzHasFeedback>
          <input nz-input ngModel="The content" name="successValid" />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label [nzSpan]="5">Warning</nz-form-label>
        <nz-form-control
          [nzSpan]="12"
          nzValidateStatus="warning"
          nzHasFeedback
          nzWarningTip="Should be combination of numbers & alphabets"
        >
          <input nz-input ngModel="Warning" name="warningHighValid" />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label [nzSpan]="5">Fail</nz-form-label>
        <nz-form-control
          [nzSpan]="12"
          nzValidateStatus="error"
          nzHasFeedback
          nzErrorTip="Should be combination of numbers & alphabets"
        >
          <input nz-input ngModel="unavailable choice" name="invalidValid" />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label [nzSpan]="5">Success</nz-form-label>
        <nz-form-control [nzSpan]="12" nzValidateStatus="success" nzHasFeedback>
          <nz-date-picker name="date-picker-success" />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label [nzSpan]="5">Warning</nz-form-label>
        <nz-form-control [nzSpan]="12" nzValidateStatus="warning" nzHasFeedback>
          <nz-time-picker name="time-picker-warning" />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label [nzSpan]="5">Error</nz-form-label>
        <nz-form-control [nzSpan]="12" nzValidateStatus="error" nzHasFeedback>
          <nz-select name="select-error" ngModel="Option 1">
            <nz-option nzValue="Option 1" nzLabel="Option 1" />
            <nz-option nzValue="Option 2" nzLabel="Option 2" />
          </nz-select>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label [nzSpan]="5">Validating</nz-form-label>
        <nz-form-control [nzSpan]="12" nzValidateStatus="validating" nzHasFeedback>
          <nz-select name="select-validate" ngModel="Option 2">
            <nz-option nzValue="Option 1" nzLabel="Option 1" />
            <nz-option nzValue="Option 2" nzLabel="Option 2" />
          </nz-select>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label [nzSpan]="5">Success</nz-form-label>
        <nz-form-control [nzSpan]="12" nzValidateStatus="success" nzHasFeedback>
          <nz-input-number name="inputnumber-success" style="width:100%" />
        </nz-form-control>
      </nz-form-item>
    </form>
  `,
  styles: `
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
})
export class NzDemoFormValidateStaticComponent {}
