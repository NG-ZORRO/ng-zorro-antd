import {Component, ViewEncapsulation} from '@angular/core';
@Component({
  selector     : 'nz-demo-notification',
  encapsulation: ViewEncapsulation.None,
  templateUrl     : './nz-demo-notification.html',
  styleUrls       : [
    './nz-demo-notification.less'
  ]
})
export class NzDemoNotificationComponent {
  NzDemoNotificationBasicCode = require('!!raw-loader!./nz-demo-notification-basic.component');
  NzDemoNotificationDurationCode = require('!!raw-loader!./nz-demo-notification-duration.component');
  NzDemoNotificationIconCode = require('!!raw-loader!./nz-demo-notification-icon.component');
  NzDemoNotificationHtmlCode = require('!!raw-loader!./nz-demo-notification-html.component');
}
