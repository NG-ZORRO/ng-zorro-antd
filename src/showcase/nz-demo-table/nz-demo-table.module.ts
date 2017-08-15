import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NzDemoTableBasicComponent } from './nz-demo-table-basic.component';
import { NzDemoTableSortComponent } from './nz-demo-table-sort.component';
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
  declarations: [ NzDemoTableComponent, NzDemoTableBasicComponent, NzDemoTableSortComponent, NzDemoTableSelectionComponent, NzDemoTableSelectionAndOperationComponent, NzDemoTableSelectionPropsComponent, NzDemoTablePagingComponent, NzDemoTableAjaxComponent, NzDemoTableNoPaginationComponent, NzDemoTableSizeComponent ]
})

export class NzDemoTableModule {

}
