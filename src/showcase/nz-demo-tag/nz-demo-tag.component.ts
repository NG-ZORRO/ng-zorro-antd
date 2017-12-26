import { Component, ViewEncapsulation } from '@angular/core';


@Component({
  selector     : 'nz-demo-tag',
  encapsulation: ViewEncapsulation.None,
  templateUrl  : './nz-demo-tag.html',
  styleUrls    : [
    './nz-demo-tag.less',
  ]
})
export class NzDemoTagComponent {
  NzDemoTagBasicCode = require('!!raw-loader!./nz-demo-tag-basic.component');
  NzDemoTagControlCode = require('!!raw-loader!./nz-demo-tag-control.component');
  NzDemoTagHotTagsCode  = require('!!raw-loader!./nz-demo-tag-hot-tags.component');
  NzDemoTagColorfulCode = require('!!raw-loader!./nz-demo-tag-colorful.component');
  NzDemoTagCheckableCode = require('!!raw-loader!./nz-demo-tag-checkable.component');
}
