import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup
} from '@angular/forms';

@Component({
  selector: 'nz-demo-form-mix',
  template: `
    <form nz-form [nzType]="'horizontal'" [formGroup]="validateForm">
      <div nz-form-item nz-row>
        <div nz-form-label nz-col [nzSpan]="6">
          <label>Plain Text</label>
        </div>
        <div nz-form-control nz-col [nzSpan]="14">
          <span nz-form-text>China</span>
        </div>
      </div>
      <div nz-form-item nz-row>
        <div nz-form-label nz-col [nzSpan]="6">
          <label nz-form-item-required>Select</label>
        </div>
        <div nz-form-control nz-col [nzSpan]="14">
          <nz-select formControlName="select" [nzSize]="'large'">
            <nz-option [nzLabel]="'China'" [nzValue]="'China'"></nz-option>
            <nz-option [nzLabel]="'U.S.A'" [nzValue]="'U.S.A'"></nz-option>
          </nz-select>
        </div>
      </div>
      <div nz-form-item nz-row>
        <div nz-form-label nz-col [nzSpan]="6">
          <label nz-form-item-required>Select[multiple]</label>
        </div>
        <div nz-form-control nz-col [nzSpan]="14">
          <nz-select formControlName="select_multiple" [nzSize]="'large'" [nzMode]="'multiple'">
            <nz-option [nzLabel]="'Red'" [nzValue]="'Red'"></nz-option>
            <nz-option [nzLabel]="'Green'" [nzValue]="'Green'"></nz-option>
            <nz-option [nzLabel]="'Blue'" [nzValue]="'Blue'"></nz-option>
          </nz-select>
        </div>
      </div>
      <div nz-form-item nz-row>
        <div nz-form-label nz-col [nzSpan]="6">
          <label nz-form-item-required>DatePicker</label>
        </div>
        <div nz-form-control nz-col [nzSpan]="14">
          <nz-datepicker formControlName="datepicker" [nzSize]="'large'">
          </nz-datepicker>
        </div>
      </div>
      <div nz-form-item nz-row>
        <div nz-form-label nz-col [nzSpan]="6">
          <label nz-form-item-required>TimePicker</label>
        </div>
        <div nz-form-control nz-col [nzSpan]="14">
          <nz-timepicker formControlName="timepicker" [nzSize]="'large'">
          </nz-timepicker>
        </div>
      </div>
      <div nz-form-item nz-row>
        <div nz-form-label nz-col [nzSpan]="6">
          <label>InputNumber</label>
        </div>
        <div nz-form-control nz-col [nzSpan]="14">
          <nz-input-number formControlName="input_number" [nzSize]="'large'" [nzStep]="1" [nzMax]="4" [nzMin]="1"></nz-input-number>
          <span nz-form-text> machines</span>
        </div>
      </div>
      <div nz-form-item nz-row>
        <div nz-form-label nz-col [nzSpan]="6">
          <label>Switch</label>
        </div>
        <div nz-form-control nz-col [nzSpan]="14">
          <nz-switch formControlName="switch"></nz-switch>
        </div>
      </div>
      <div nz-form-item nz-row>
        <div nz-form-label nz-col [nzSpan]="6">
          <label>Slider</label>
        </div>
        <div nz-form-control nz-col [nzSpan]="14">
          <nz-slider formControlName="slider" [nzMarks]="marks"></nz-slider>
        </div>
      </div>
      <div nz-form-item nz-row>
        <div nz-form-label nz-col [nzSpan]="6">
          <label>Radio.Group</label>
        </div>
        <div nz-form-control nz-col [nzSpan]="14">
          <nz-radio-group formControlName="radio_group">
            <label nz-radio [nzValue]="1">
              <span>item 1</span>
            </label>
            <label nz-radio [nzValue]="2">
              <span>item 2</span>
            </label>
            <label nz-radio [nzValue]="3">
              <span>item 3</span>
            </label>
          </nz-radio-group>
        </div>
      </div>
      <div nz-form-item nz-row>
        <div nz-form-label nz-col [nzSpan]="6">
          <label>Radio.Button</label>
        </div>
        <div nz-form-control nz-col [nzSpan]="14">
          <nz-radio-group formControlName="radio_button">
            <label nz-radio-button [nzValue]="1">
              <span>item 1</span>
            </label>
            <label nz-radio-button [nzValue]="2">
              <span>item 2</span>
            </label>
            <label nz-radio-button [nzValue]="3">
              <span>item 3</span>
            </label>
          </nz-radio-group>
        </div>
      </div>
      <div nz-form-item nz-row>
        <div nz-form-control nz-col [nzSpan]="12" [nzOffset]="6">
          <button nz-button [nzType]="'primary'" [nzSize]="'large'">Submit</button>
        </div>
      </div>
    </form>`,

  styles: []
})
export class NzDemoFormMixComponent implements OnInit {
  validateForm: FormGroup;

  marks = {
    0  : 'A',
    25 : 'B',
    50 : 'C',
    75 : 'D',
    100: 'E'
  }
  now = new Date();

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      select         : [ 'China' ],
      select_multiple: [ [ 'Red' ] ],
      datepicker     : [ new Date() ],
      timepicker     : [ new Date() ],
      input_number   : [ 4 ],
      switch         : [ false ],
      slider         : [ 0 ],
      radio_group    : [ 1 ],
      radio_button   : [ 1 ]
    });
  }
}

