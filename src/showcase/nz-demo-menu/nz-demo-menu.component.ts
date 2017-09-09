import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector     : 'nz-demo-menu',
  templateUrl  : './nz-demo-menu.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls    : [
    './nz-demo-menu.less'
  ]
})
export class NzDemoMenuComponent implements OnInit {
  NzDemoMenuBasicCode = require('!!raw-loader!./nz-demo-menu-basic.component');
  NzDemoMenuInlineCode = require('!!raw-loader!./nz-demo-menu-inline.component');
  NzDemoMenuCollapsedCode = require('!!raw-loader!./nz-demo-menu-collapsed.component');
  NzDemoMenuExpandCode = require('!!raw-loader!./nz-demo-menu-expand.component');
  NzDemoMenuThemeCode = require('!!raw-loader!./nz-demo-menu-theme.component');
  NzDemoMenuVerticalCode = require('!!raw-loader!./nz-demo-menu-vertical.component');
  NzDemoMenuDynamicCode = require('!!raw-loader!./nz-demo-menu-dynamic.component');

  constructor() {
  }

  ngOnInit() {
  }
}

