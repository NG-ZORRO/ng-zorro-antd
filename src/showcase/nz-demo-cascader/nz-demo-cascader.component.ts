import { Component, ViewEncapsulation } from '@angular/core';


@Component({
  selector     : 'nz-demo-cascader',
  encapsulation: ViewEncapsulation.None,
  templateUrl  : './nz-demo-cascader.html',
  styleUrls    : [
    './nz-demo-cascader.less',
  ]
})
export class NzDemoCascaderComponent {
  NzDemoCascaderBasicCode = require('!!raw-loader!./nz-demo-cascader-basic.component');
  NzDemoCascaderCustomTriggerCode = require('!!raw-loader!./nz-demo-cascader-custom-trigger.component');
  NzDemoCascaderDisabledCode = require('!!raw-loader!./nz-demo-cascader-disabled.component');
  NzDemoCascaderSizeCode = require('!!raw-loader!./nz-demo-cascader-size.component');
  NzDemoCascaderDefaultValueCode = require('!!raw-loader!./nz-demo-cascader-default-value.component');
  NzDemoCascaderHoverCode = require('!!raw-loader!./nz-demo-cascader-hover.component');
  NzDemoCascaderChangeOnSelectCode = require('!!raw-loader!./nz-demo-cascader-change-on-select.component');
  NzDemoCascaderCustomRenderCode = require('!!raw-loader!./nz-demo-cascader-custom-render.component');
  NzDemoCascaderLazyCode = require('!!raw-loader!./nz-demo-cascader-lazy.component');
  NzDemoCascaderReactiveFormCode = require('!!raw-loader!./nz-demo-cascader-reactive-form.component');
}
