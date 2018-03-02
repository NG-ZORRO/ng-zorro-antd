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

import { NzTableComponent } from './nz-table.component';
import { NzTbodyDirective } from './nz-tbody.directive';
import { NzTdComponent } from './nz-td.component';
import { NzThComponent } from './nz-th.component';
import { NzTheadComponent } from './nz-thead.component';
import { NzTrDirective } from './nz-tr.directive';

@NgModule({
  declarations: [ NzTableComponent, NzThComponent, NzTdComponent, NzTheadComponent, NzTbodyDirective, NzTrDirective ],
  exports     : [ NzTableComponent, NzThComponent, NzTdComponent, NzTheadComponent, NzTbodyDirective, NzTrDirective ],
  imports     : [ NzMenuModule, FormsModule, NzRadioModule, NzCheckboxModule, NzDropDownModule, CommonModule, NzPaginationModule, NzSpinModule, NzI18nModule ]
})
export class NzTableModule {
}
