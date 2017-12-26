import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NzDemoTableBasicComponent } from './nz-demo-table-basic.component';
import { NzDemoTableExpandComponent } from './nz-demo-table-expand.component';
import { NzDemoTableExpandTreeComponent } from './nz-demo-table-expand-tree.component';
import { NzDemoTableEditComponent } from './nz-demo-table-edit.component';
import { NzDemoTableFixedHeaderComponent } from './nz-demo-table-fixed-header.component';
import { NzDemoTableColspanRowspanComponent } from './nz-demo-table-colspan-rowspan.component';
import { NzDemoTableResetFilterComponent } from './nz-demo-table-reset-filter.component';
import { NzDemoTableCustomFilterComponent } from './nz-demo-table-custom-filter.component';
import { NzDemoTableSelectionComponent } from './nz-demo-table-selection.component';
import { NzDemoTableSelectionAndOperationComponent } from './nz-demo-table-selection-and-operation.component';
import { NzDemoTableSelectionPropsComponent } from './nz-demo-table-selection-props.component';
import { NzDemoTablePagingComponent } from './nz-demo-table-paging.component';
import { NzDemoTableAjaxComponent } from './nz-demo-table-ajax.component';
import { NzDemoTableNoPaginationComponent } from './nz-demo-table-nopagination.component';
import { NzDemoTableSizeComponent } from './nz-demo-table-size.component';
import { NzDemoTableComponent } from './nz-demo-table.component';
import { NzCodeBoxModule } from '../share/nz-codebox/nz-codebox.module';

import { NgZorroAntdModule } from '../../../index.showcase';

import { NzDemoTableRoutingModule } from './nz-demo-table.routing.module';

@NgModule({
  imports     : [ NzDemoTableRoutingModule, FormsModule, CommonModule, NzCodeBoxModule, NgZorroAntdModule ],
  declarations: [ NzDemoTableExpandTreeComponent, NzDemoTableExpandComponent, NzDemoTableCustomFilterComponent, NzDemoTableEditComponent, NzDemoTableComponent, NzDemoTableFixedHeaderComponent, NzDemoTableColspanRowspanComponent, NzDemoTableBasicComponent, NzDemoTableResetFilterComponent, NzDemoTableSelectionComponent, NzDemoTableSelectionAndOperationComponent, NzDemoTableSelectionPropsComponent, NzDemoTablePagingComponent, NzDemoTableAjaxComponent, NzDemoTableNoPaginationComponent, NzDemoTableSizeComponent ]
})
export class NzDemoTableModule {

}
