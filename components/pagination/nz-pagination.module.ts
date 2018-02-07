import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzI18nModule } from '../i18n';
import { NzLocaleModule } from '../locale/index';
import { NzSelectModule } from '../select/nz-select.module';
import { NzPaginationComponent } from './nz-pagination.component';

@NgModule({
  declarations: [ NzPaginationComponent ],
  exports     : [ NzPaginationComponent ],
  imports     : [ CommonModule, FormsModule, NzSelectModule, NzLocaleModule, NzI18nModule ]
})

export class NzPaginationModule {
}
