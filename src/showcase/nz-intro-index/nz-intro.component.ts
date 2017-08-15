import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector     : 'nz-intro',
  encapsulation: ViewEncapsulation.None,
  templateUrl  : './nz-intro.html',
  styleUrls    : [
    './nz-intro.less',
  ]
})
export class NzIntroComponent implements OnInit {
  _markdownCode = require('!!raw-loader!./README.md');

  constructor() {
  }

  ngOnInit() {
  }
}
