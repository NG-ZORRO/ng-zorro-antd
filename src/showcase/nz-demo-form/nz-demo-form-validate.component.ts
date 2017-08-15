import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nz-demo-form-validate',
  template: `
    <form nz-form [nzType]="'horizontal'">
      <div nz-form-item nz-row>
        <div nz-form-label nz-col [nzSpan]="5">
          <label>Fail</label>
        </div>
        <div nz-form-control [nzValidateStatus]="'error'" nz-col [nzSpan]="12">
          <nz-input [ngModel]="'unavailable choice'" [nzSize]="'large'" name="errorValid">
          </nz-input>
          <div nz-form-explain>Should be combination of numbers & alphabets</div>
        </div>
      </div>
      <div nz-form-item nz-row>
        <div nz-form-label nz-col [nzSpan]="5">
          <label>Warning</label>
        </div>
        <div nz-form-control [nzValidateStatus]="'warning'" nz-col [nzSpan]="12">
          <nz-input [ngModel]="'Warning'" [nzSize]="'large'" name="warningValid">
          </nz-input>
        </div>
      </div>
      <div nz-form-item nz-row>
        <div nz-form-label nz-col [nzSpan]="5">
          <label>Validating</label>
        </div>
        <div nz-col [nzSpan]="12" nz-form-control [nzValidateStatus]="'validating'" nzHasFeedback>
          <nz-input [ngModel]="'The content is being validating'" [nzSize]="'large'" name="validating">
          </nz-input>
          <div nz-form-explain>I'm the content is being validating</div>
        </div>
      </div>
      <div nz-form-item nz-row>
        <div nz-form-label nz-col [nzSpan]="5">
          <label>Success</label>
        </div>
        <div nz-form-control nz-col [nzSpan]="12" [nzValidateStatus]="'success'" nzHasFeedback>
          <nz-input [ngModel]="'The content'" [nzSize]="'large'" name="successValid">
          </nz-input>
        </div>
      </div>
      <div nz-form-item nz-row>
        <div nz-form-label nz-col [nzSpan]="5">
          <label>Warning</label>
        </div>
        <div nz-col [nzSpan]="12" nz-form-control [nzValidateStatus]="'warning'" nzHasFeedback>
          <nz-input [ngModel]="'Warning'" [nzSize]="'large'" name="warningHighValid">
          </nz-input>
          <div nz-form-explain>Should be combination of numbers & alphabets</div>
        </div>
      </div>
      <div nz-form-item nz-row>
        <div nz-form-label nz-col [nzSpan]="5">
          <label>Fail</label>
        </div>
        <div nz-col [nzSpan]="12" nz-form-control [nzValidateStatus]="'error'" nzHasFeedback>
          <nz-input [ngModel]="'unavailable choice'" [nzSize]="'large'" name="invalidValid">
          </nz-input>
          <div nz-form-explain>Should be combination of numbers & alphabets</div>
        </div>
      </div>
      <div nz-form-item nz-row>
        <div nz-form-label nz-col [nzSpan]="5">
          <label nz-form-item-required>inline</label>
        </div>
        <div>
          <div nz-form-control>
            <div nz-col [nzSpan]="6">
              <div nz-form-item nz-row>
                <div>
                  <div nz-form-control [nzValidateStatus]="'error'">
                    <nz-datepicker [nzSize]="'large'" [nzPlaceHolder]="'Select date'"></nz-datepicker>
                    <div nz-form-explain>Select date</div>
                    <div nz-form-explain>Please select the correct date</div>
                  </div>
                </div>
              </div>
            </div>
            <div nz-col [nzSpan]="1">
              <p nz-form-split>-</p>
            </div>
            <div nz-col [nzSpan]="6">
              <div nz-form-item nz-row>
                <div>
                  <div nz-form-control>
                    <nz-datepicker [nzSize]="'large'" [nzPlaceHolder]="'Select date'"></nz-datepicker>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>`,

  styles: []
})
export class NzDemoFormValidateComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }
}

