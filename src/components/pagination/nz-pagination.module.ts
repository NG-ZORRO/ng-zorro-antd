import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzLocaleModule } from '../locale/index';
import { NzSelectModule } from '../select/nz-select.module';
import { NzPaginationComponent } from './nz-pagination.component';

@NgModule({
  declarations: [ NzPaginationComponent ],
  exports     : [ NzPaginationComponent ],
  imports     : [ CommonModule, FormsModule, NzSelectModule, NzLocaleModule ]
})

export class NzPaginationModule {
}
