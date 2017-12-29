import { Component, ViewEncapsulation } from '@angular/core';


@Component({
  selector     : 'nz-demo-steps',
  encapsulation: ViewEncapsulation.None,
  templateUrl  : './index.html'
})
export class NzDemoStepsComponent {
  NzDemoStepsBasicCode = require('!!raw-loader!./nz-demo-steps-basic.component');
  NzDemoStepsDottedCode = require('!!raw-loader!./nz-demo-steps-dotted.component');
  NzDemoStepsChangeCode = require('!!raw-loader!./nz-demo-steps-change.component');
  NzDemoStepsErrorCode = require('!!raw-loader!./nz-demo-steps-error.component');
  NzDemoStepsIconCode = require('!!raw-loader!./nz-demo-steps-icon.component');
  NzDemoStepsMiniCode = require('!!raw-loader!./nz-demo-steps-mini.component');
  NzDemoStepsVerticalCode = require('!!raw-loader!./nz-demo-steps-vertical.component');
  NzDemoStepsVerticalMiniCode = require('!!raw-loader!./nz-demo-steps-vertical-mini.component');
}
