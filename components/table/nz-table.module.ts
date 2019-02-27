import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzCheckboxModule } from '../checkbox/nz-checkbox.module';
import { NzAddOnModule } from '../core/addon/addon.module';
import { NzDropDownModule } from '../dropdown/nz-dropdown.module';
import { NzEmptyModule } from '../empty/nz-empty.module';
import { NzI18nModule } from '../i18n/nz-i18n.module';
import { NzIconModule } from '../icon/nz-icon.module';
import { NzMenuModule } from '../menu/nz-menu.module';
import { NzPaginationModule } from '../pagination/nz-pagination.module';
import { NzRadioModule } from '../radio/nz-radio.module';
import { NzSpinModule } from '../spin/nz-spin.module';

import { NzTableComponent } from './nz-table.component';
import { NzTbodyDirective } from './nz-tbody.directive';
import { NzTdComponent } from './nz-td.component';
import { NzThComponent } from './nz-th.component';
import { NzTheadComponent } from './nz-thead.component';
import { NzTrDirective } from './nz-tr.directive';
import { NzVirtualScrollDirective } from './nz-virtual-scroll.directive';

@NgModule({
  declarations: [ NzTableComponent, NzThComponent, NzTdComponent, NzTheadComponent, NzTbodyDirective, NzTrDirective, NzVirtualScrollDirective ],
  exports     : [ NzTableComponent, NzThComponent, NzTdComponent, NzTheadComponent, NzTbodyDirective, NzTrDirective, NzVirtualScrollDirective ],
  imports     : [
    NzMenuModule,
    FormsModule,
    NzAddOnModule,
    NzRadioModule,
    NzCheckboxModule,
    NzDropDownModule,
    CommonModule,
    NzPaginationModule,
    NzSpinModule,
    NzI18nModule,
    NzIconModule,
    NzEmptyModule,
    ScrollingModule
  ]
})
export class NzTableModule {
}
