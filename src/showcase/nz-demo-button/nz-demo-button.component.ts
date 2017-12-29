import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector     : 'nz-demo-button',
  templateUrl  : './nz-demo-button.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls    : [
    './nz-demo-button.less'
  ]
})
export class NzDemoButtonComponent {
  NzDemoButtonTypeCode = require('!!raw-loader!./nz-demo-button-type.component');
  NzDemoButtonSizeCode = require('!!raw-loader!./nz-demo-button-size.component');
  NzDemoButtonLoadingCode = require('!!raw-loader!./nz-demo-button-loading.component');
  NzDemoButtonIconCode = require('!!raw-loader!./nz-demo-button-icon.component');
  NzDemoButtonGroupCode = require('!!raw-loader!./nz-demo-button-group.component');
  NzDemoButtonDisabledCode = require('!!raw-loader!./nz-demo-button-disabled.component');
  NzDemoButtonGhostCode = require('!!raw-loader!./nz-demo-button-ghost.component');
  NzDemoButtonMultipleCode = require('!!raw-loader!./nz-demo-button-multiple.component');
}
