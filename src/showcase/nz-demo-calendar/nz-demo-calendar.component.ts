import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector     : 'nz-demo-calendar',
  encapsulation: ViewEncapsulation.None,
  templateUrl  : './nz-demo-calendar.html',
  styleUrls    : [
    './nz-demo-calendar.less',
  ]
})
export class NzDemoCalendarComponent {
  NzDemoCalendarBasicCode = require('!!raw-loader!./nz-demo-calendar-basic.component');
  NzDemoCalendarLocaleCode = require('!!raw-loader!./nz-demo-calendar-locale.component');
  NzDemoCalendarCardCode = require('!!raw-loader!./nz-demo-calendar-card.component');
  NzDemoCalendarContentCode = require('!!raw-loader!./nz-demo-calendar-content.component');
}
