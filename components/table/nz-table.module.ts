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
import { NzTableComponent } from './nz-table.component';
import { NzTbodyTrDirective } from './nz-tbody-tr.directive';
import { NzTbodyDirective } from './nz-tbody.directive';
import { NzTdComponent } from './nz-td.component';
import { NzThComponent } from './nz-th.component';
import { NzTheadDirective } from './nz-thead.directive';

@NgModule({
  declarations: [ NzColumnDirective, NzTableComponent, NzThComponent, NzTdComponent, NzTheadDirective, NzTbodyDirective, NzTbodyTrDirective ],
  exports     : [ NzColumnDirective, NzTableComponent, NzThComponent, NzTdComponent, NzTheadDirective, NzTbodyDirective, NzTbodyTrDirective ],
  imports     : [ NzMenuModule, FormsModule, NzRadioModule, NzCheckboxModule, NzDropDownModule, CommonModule, NzPaginationModule, NzSpinModule, NzI18nModule ]
})
export class NzTableModule {
}
