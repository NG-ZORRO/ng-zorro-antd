import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector     : 'nz-demo-table',
  encapsulation: ViewEncapsulation.None,
  templateUrl  : './nz-demo-table.html',
  styleUrls    : [
    './nz-demo-table.less',
  ]
})
export class NzDemoTableComponent implements OnInit {
  NzDemoTableBasicCode = require('!!raw-loader!./nz-demo-table-basic.component');
  NzDemoTableSortCode = require('!!raw-loader!./nz-demo-table-sort.component');
  NzDemoTableSelectionCode = require('!!raw-loader!./nz-demo-table-selection.component');
  NzDemoTableSelectionAndOperationCode = require('!!raw-loader!./nz-demo-table-selection-and-operation.component');
  NzDemoTableSelectionPropsCode = require('!!raw-loader!./nz-demo-table-selection-props.component');
  NzDemoTablePagingCode = require('!!raw-loader!./nz-demo-table-paging.component');
  NzDemoTableAjaxCode = require('!!raw-loader!./nz-demo-table-ajax.component');
  NzDemoTableNoPaginationCode = require('!!raw-loader!./nz-demo-table-nopagination.component');
  NzDemoTableSizeCode = require('!!raw-loader!./nz-demo-table-size.component');

  constructor() {
  }

  ngOnInit() {
  }
}
