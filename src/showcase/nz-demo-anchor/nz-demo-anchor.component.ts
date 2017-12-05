import { Component } from '@angular/core';

@Component({
  selector   : 'nz-demo-anchor',
  templateUrl: './nz-demo-anchor.html'
})
export class NzDemoAnchorComponent {
  NzDemoAnchorFixedCode = require('!!raw-loader!./nz-demo-anchor-fixed.component')
  NzDemoAnchorBasicCode = require('!!raw-loader!./nz-demo-anchor-basic.component')
}
