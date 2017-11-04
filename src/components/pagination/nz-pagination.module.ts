import { NgModule } from '@angular/core';
import { NzSelectModule } from '../select/nz-select.module';
import { NzPaginationComponent } from './nz-pagination.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzLocaleModule } from '../locale/index';

@NgModule({
  declarations: [ NzPaginationComponent ],
  exports     : [ NzPaginationComponent ],
  imports     : [ CommonModule, FormsModule, NzSelectModule, NzLocaleModule ]
})

export class NzPaginationModule {
}
