import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector     : 'nz-demo-badge',
  encapsulation: ViewEncapsulation.None,
  templateUrl  : './nz-demo-badge.html'
})

export class NzDemoBadgeComponent {
  NzDemoBadgeBasicCode = require('!!raw-loader!./nz-demo-badge-basic.component');
  NzDemoBadgeStandAlonesCode = require('!!raw-loader!./nz-demo-badge-standalones.component');
  NzDemoBadgeClickAbleCode = require('!!raw-loader!./nz-demo-badge-clickable.component');
  NzDemoBadgeDotCode = require('!!raw-loader!./nz-demo-badge-dot.component');
  NzDemoBadgeAnimateCode = require('!!raw-loader!./nz-demo-badge-animate.component');
  NzDemoBadgeMyCeilCode = require('!!raw-loader!./nz-demo-badge-myceil.component');
  NzDemoBadgeStatusCode = require('!!raw-loader!./nz-demo-badge-status.component');
}
