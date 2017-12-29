import { Component } from '@angular/core';

@Component({
  selector   : 'nz-demo-affix',
  templateUrl: './nz-demo-affix.html'
})

export class NzDemoAffixComponent {
  NzDemoAffixBasicCode = require('!!raw-loader!./nz-demo-affix-basic.component')
  NzDemoAffixFixedCode = require('!!raw-loader!./nz-demo-affix-fixed.component')
  NzDemoAffixContainerCode = require('!!raw-loader!./nz-demo-affix-container.component')
}
