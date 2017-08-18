import { Component, OnInit } from '@angular/core';

@Component({
  selector   : 'nz-demo-back-top',
  templateUrl: './nz-demo-back-top.html'
})

export class NzDemoBackTopComponent implements OnInit {
  NzDemoBackTopBasicCode = require('!!raw-loader!./nz-demo-back-top-basic.component')
  NzDemoBackTopCustomCode = require('!!raw-loader!./nz-demo-back-top-custom.component')
  NzDemoBackTopTargetCode = require('!!raw-loader!./nz-demo-back-top-target.component')

  constructor() {
  }

  ngOnInit() {
  }
}
