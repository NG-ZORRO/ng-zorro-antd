import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzCheckboxModule } from '../checkbox';
import { NzDropDownModule } from '../dropdown';
import { NzI18nModule } from '../i18n';
import { NzMenuModule } from '../menu';
import { NzPaginationModule } from '../pagination';
import { NzRadioModule } from '../radio';
import { NzSpinModule } from '../spin';

import { NzColumnDirective } from './nz-column.directive';
import { NzRowExpandIconComponent } from './nz-row-expand-icon.component';
import { NzRowIndentComponent } from './nz-row-indent.component';
import { NzTableFilterComponent } from './nz-table-filter.component';
import { NzTableSortComponent } from './nz-table-sort.component';
import { NzTableComponent } from './nz-table.component';
import { NzTbodyTrDirective } from './nz-tbody-tr.directive';
import { NzTbodyDirective } from './nz-tbody.directive';
import { NzTdDirective } from './nz-td.directive';
import { NzThComponent } from './nz-th.component';
import { NzTheadDirective } from './nz-thead.directive';

@NgModule({
  declarations: [ NzColumnDirective, NzRowIndentComponent, NzRowExpandIconComponent, NzTableFilterComponent, NzTableComponent, NzThComponent, NzTdDirective, NzTheadDirective, NzTbodyDirective, NzTbodyTrDirective, NzTableSortComponent ],
  exports     : [ NzColumnDirective, NzRowIndentComponent, NzRowExpandIconComponent, NzTableFilterComponent, NzTableComponent, NzThComponent, NzTdDirective, NzTheadDirective, NzTbodyDirective, NzTbodyTrDirective, NzTableSortComponent ],
  imports     : [ NzMenuModule, FormsModule, NzRadioModule, NzCheckboxModule, NzDropDownModule, CommonModule, NzPaginationModule, NzSpinModule, NzI18nModule ]
})
export class NzTableModule {
}
