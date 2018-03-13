import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzI18nModule } from '../i18n';
import { NzSelectModule } from '../select';

import { NzPaginationComponent } from './nz-pagination.component';

@NgModule({
  declarations: [ NzPaginationComponent ],
  exports     : [ NzPaginationComponent ],
  imports     : [ CommonModule, FormsModule, NzSelectModule, NzI18nModule ]
})

export class NzPaginationModule {
}
