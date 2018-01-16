import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzLocaleModule } from '../locale/index';
import { NzPaginationModule } from '../pagination/nz-pagination.module';
import { NzSpinModule } from '../spin/nz-spin.module';
import { NzColDirective } from './nz-col.directive';
import { NzRowExpandIconComponent } from './nz-row-expand-icon.component';
import { NzRowIndentComponent } from './nz-row-indent.component';
import { NzTableFilterComponent } from './nz-table-filter.component';
import { NzTableSortComponent } from './nz-table-sort.component';
import { NzTableComponent } from './nz-table.component';
import { NzTbodyTrDirective } from './nz-tbody-tr.directive';
import { NzTbodyDirective } from './nz-tbody.directive';
import { NzTdDirective } from './nz-td.directive';
import { NzThDirective } from './nz-th.directive';
import { NzTheadDirective } from './nz-thead.directive';

@NgModule({
  declarations: [ NzColDirective, NzRowIndentComponent, NzRowExpandIconComponent, NzTableFilterComponent, NzTableComponent, NzThDirective, NzTdDirective, NzTheadDirective, NzTbodyDirective, NzTbodyTrDirective, NzTableSortComponent ],
  exports     : [ NzColDirective, NzRowIndentComponent, NzRowExpandIconComponent, NzTableFilterComponent, NzTableComponent, NzThDirective, NzTdDirective, NzTheadDirective, NzTbodyDirective, NzTbodyTrDirective, NzTableSortComponent ],
  imports     : [ CommonModule, NzPaginationModule, NzSpinModule, NzLocaleModule ]
})
export class NzTableModule {
}
