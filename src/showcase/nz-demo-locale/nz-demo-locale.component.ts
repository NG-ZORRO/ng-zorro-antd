import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nz-demo-locale',
  templateUrl: 'nz-demo-locale.component.html'
})

export class NzDemoLocaleComponent implements OnInit {
  markdownContent = require('!!raw-loader!./README.md');

  NzDemoLocaleAllCode = require('!!raw-loader!./nz-demo-locale-all.component');

  constructor() { }

  ngOnInit() { }

}
