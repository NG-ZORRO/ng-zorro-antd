import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector     : 'nz-demo-input',
  encapsulation: ViewEncapsulation.None,
  templateUrl  : './nz-demo-input.html',
  styleUrls    : [
    './nz-demo-input.less',
  ]
})
export class NzDemoInputComponent implements OnInit {
  test;
  NzDemoInputBasicCode = require('!!raw-loader!./nz-demo-input-basic.component');
  NzDemoInputSizeCode = require('!!raw-loader!./nz-demo-input-size.component');
  NzDemoInputAddOnCode = require('!!raw-loader!./nz-demo-input-add-on.component');
  NzDemoInputGroupCode = require('!!raw-loader!./nz-demo-input-group.component');
  NzDemoInputSearchCode = require('!!raw-loader!./nz-demo-input-search.component');
  NzDemoInputTextareaCode = require('!!raw-loader!./nz-demo-input-textarea.component');
  NzDemoInputTextareaAutoSizeCode = require('!!raw-loader!./nz-demo-input-textarea-auot-size.component');
  NzDemoInputAffixCode = require('!!raw-loader!./nz-demo-input-affix.component');

  constructor() {
  }

  ngOnInit() {
  }
}
