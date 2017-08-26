import { Component, OnInit } from '@angular/core';

@Component({
  selector   : 'nz-demo-anchor',
  templateUrl: './nz-demo-anchor.html'
})

export class NzDemoAnchorComponent implements OnInit {
  NzDemoAnchorFixedCode = require('!!raw-loader!./nz-demo-anchor-fixed.component')
  NzDemoAnchorBasicCode = require('!!raw-loader!./nz-demo-anchor-basic.component')

  constructor() {
  }

  ngOnInit() {
  }
}
