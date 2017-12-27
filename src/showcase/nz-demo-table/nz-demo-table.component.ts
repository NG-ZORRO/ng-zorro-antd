import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector     : 'nz-demo-table',
  encapsulation: ViewEncapsulation.None,
  templateUrl  : './nz-demo-table.html',
  styleUrls    : [
    './nz-demo-table.less',
  ]
})
export class NzDemoTableComponent {
  NzDemoTableBasicCode = require('!!raw-loader!./nz-demo-table-basic.component');
  NzDemoTableExpandCode = require('!!raw-loader!./nz-demo-table-expand.component');
  NzDemoTableExpandTreeCode = require('!!raw-loader!./nz-demo-table-expand-tree.component');
  NzDemoTableEditCode = require('!!raw-loader!./nz-demo-table-edit.component');
  NzDemoTableFixedHeaderCode = require('!!raw-loader!./nz-demo-table-fixed-header.component');
  NzDemoTableColspanRowspanCode = require('!!raw-loader!./nz-demo-table-colspan-rowspan.component');
  NzDemoTableResetFilterCode = require('!!raw-loader!./nz-demo-table-reset-filter.component');
  NzDemoTableCustomFilterCode = require('!!raw-loader!./nz-demo-table-custom-filter.component');
  NzDemoTableSelectionCode = require('!!raw-loader!./nz-demo-table-selection.component');
  NzDemoTableSelectionAndOperationCode = require('!!raw-loader!./nz-demo-table-selection-and-operation.component');
  NzDemoTableSelectionPropsCode = require('!!raw-loader!./nz-demo-table-selection-props.component');
  NzDemoTablePagingCode = require('!!raw-loader!./nz-demo-table-paging.component');
  NzDemoTableAjaxCode = require('!!raw-loader!./nz-demo-table-ajax.component');
  NzDemoTableNoPaginationCode = require('!!raw-loader!./nz-demo-table-nopagination.component');
  NzDemoTableSizeCode = require('!!raw-loader!./nz-demo-table-size.component');
}
