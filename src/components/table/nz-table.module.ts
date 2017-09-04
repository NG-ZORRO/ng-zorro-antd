import { NgModule } from '@angular/core';
import { NzTableComponent } from './nz-table.component';
import { NzThDirective } from './nz-th.directive';
import { NzTdDirective } from './nz-td.directive';
import { NzTableFilterComponent } from './nz-table-filter.component';
import { NzTheadDirective } from './nz-thead.directive';
import { NzTbodyDirective } from './nz-tbody.directive';
import { NzTbodyTrDirective } from './nz-tbody-tr.directive';
import { NzTableDividerDirective } from './nz-table-divider.directive';
import { NzTableSortComponent } from './nz-table-sort.component';
import { NzSpinModule } from '../spin/nz-spin.module';

import { NzPaginationModule } from '../pagination/nz-pagination.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [ NzTableFilterComponent, NzTableComponent, NzThDirective, NzTdDirective, NzTheadDirective, NzTbodyDirective, NzTbodyTrDirective, NzTableDividerDirective, NzTableSortComponent ],
  exports     : [ NzTableFilterComponent, NzTableComponent, NzThDirective, NzTdDirective, NzTheadDirective, NzTbodyDirective, NzTbodyTrDirective, NzTableDividerDirective, NzTableSortComponent ],
  imports     : [ CommonModule, NzPaginationModule, NzSpinModule ]
})

export class NzTableModule {
}

