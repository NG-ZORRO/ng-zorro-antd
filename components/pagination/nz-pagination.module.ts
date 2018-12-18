import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzI18nModule } from '../i18n/nz-i18n.module';
import { NzIconModule } from '../icon/nz-icon.module';
import { NzSelectModule } from '../select/nz-select.module';

import { NzPaginationComponent } from './nz-pagination.component';

@NgModule({
  declarations: [ NzPaginationComponent ],
  exports     : [ NzPaginationComponent ],
  imports     : [ CommonModule, FormsModule, NzSelectModule, NzI18nModule, NzIconModule ]
})

export class NzPaginationModule {
}
