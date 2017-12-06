import {Component, ViewEncapsulation} from '@angular/core';
@Component({
  selector     : 'nz-demo-select',
  encapsulation: ViewEncapsulation.None,
  templateUrl  : './nz-demo-select.html',
  styleUrls    : [
    './nz-demo-select.less',
  ]
})
export class NzDemoSelectComponent {
  NzDemoSelectBasicCode = require('!!raw-loader!./nz-demo-select-basic.component');
  NzDemoSelectTemplateCode = require('!!raw-loader!./nz-demo-select-template.component');
  NzDemoSelectPaginationCode = require('!!raw-loader!./nz-demo-select-pagination.component');
  NzDemoSelectSizeCode = require('!!raw-loader!./nz-demo-select-size.component');
  NzDemoSelectSearchCode = require('!!raw-loader!./nz-demo-select-search.component');
  NzDemoSelectMultipleCode = require('!!raw-loader!./nz-demo-select-multiple.component');
  NzDemoSelectMultipleChangeCode = require('!!raw-loader!./nz-demo-select-multiple-change.component');
  NzDemoSelectTagCode = require('!!raw-loader!./nz-demo-select-tag.component');
  NzDemoSelectSearchChangeCode = require('!!raw-loader!./nz-demo-select-search-change.component');
}
