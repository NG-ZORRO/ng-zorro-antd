import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector     : 'nz-demo-radio',
  encapsulation: ViewEncapsulation.None,
  templateUrl  : './nz-demo-radio.html',
  styleUrls    : [
    './nz-demo-radio.less',
  ]
})
export class NzDemoRadioComponent implements OnInit {
  NzDemoRadioGroupCode = require('!!raw-loader!./nz-demo-radio-group.component');
  NzDemoRadioGroupDisabledCode = require('!!raw-loader!./nz-demo-radio-group-disabled.component');
  NzDemoRadioButtonGroupCode = require('!!raw-loader!./nz-demo-radio-button-group.component');
  NzDemoRadioButtonGroupSizeCode = require('!!raw-loader!./nz-demo-radio-button-group-size.component');

  constructor() {
  }

  ngOnInit() {
  }
}

