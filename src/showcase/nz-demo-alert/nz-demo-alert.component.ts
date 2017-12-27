import { Component } from '@angular/core';

@Component({
  selector   : 'nz-demo-alert',
  templateUrl: './nz-demo-alert.html',
  styles     : [
      `
      :host ::ng-deep nz-alert {
        margin-bottom: 16px;
      }
    `
  ]
})
export class NzDemoAlertComponent {
  NzDemoAlertBasicCode = require('!!raw-loader!./nz-demo-alert-basic.component')
  NzDemoAlert4TypeCode = require('!!raw-loader!./nz-demo-4-style.component')
  NzDemoAlertCloseableCode = require('!!raw-loader!./nz-demo-alert-closeable.component')
  NzDemoAlert4TypeMessageCode = require('!!raw-loader!./nz-demo-alert-4-type-message.component')
  NzDemoAlertIconCode = require('!!raw-loader!./nz-demo-alert-icon.component')
  NzDemoAlertIconSelfCode = require('!!raw-loader!./nz-demo-alert-self-close.component')
}
