import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector     : 'nz-demo-form',
  encapsulation: ViewEncapsulation.None,
  templateUrl  : './nz-demo-form.html',
  styleUrls    : [
    './nz-demo-form.less',
  ]
})
export class NzDemoFormComponent {
  NzDemoFormInlineCode = require('!!raw-loader!./nz-demo-form-inline.component');
  NzDemoFormLayoutCode = require('!!raw-loader!./nz-demo-form-layout.component');
  NzDemoFormHorizontalCode = require('!!raw-loader!./nz-demo-form-horizontal.component');
  NzDemoFormMixCode = require('!!raw-loader!./nz-demo-form-mix.component');
  NzDemoFormValidateCode = require('!!raw-loader!./nz-demo-form-validate.component');
  NzDemoFormValidateDynamicCode = require('!!raw-loader!./nz-demo-form-validate-dynamic.component');
  NzDemoFormAdvancedCode = require('!!raw-loader!./nz-demo-form-advanced.component');
  NzDemoFormDynamicCode = require('!!raw-loader!./nz-demo-form-dynamic.component');
  NzDemoFormLoginCode = require('!!raw-loader!./nz-demo-form-login.component');
}
