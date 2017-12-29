import {Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector     : 'nz-demo-message',
  encapsulation: ViewEncapsulation.None,
  templateUrl  : './nz-demo-message.html',
  styleUrls    : [
    './nz-demo-message.less',
  ]
})
export class NzDemoMessageComponent {
  NzDemoMessageBasicCode = require('!!raw-loader!./nz-demo-message-basic.component');
  NzDemoMessageDurationCode = require('!!raw-loader!./nz-demo-message-duration.component');
  NzDemoMessageIconCode = require('!!raw-loader!./nz-demo-message-icon.component');
  NzDemoMessageLoadingCode = require('!!raw-loader!./nz-demo-message-loading.component');
}
