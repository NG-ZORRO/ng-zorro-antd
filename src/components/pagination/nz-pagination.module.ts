import { NgModule } from '@angular/core';
import { NzSelectModule } from '../select/nz-select.module';
import { NzPaginationComponent } from './nz-pagination.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ NzPaginationComponent ],
  exports     : [ NzPaginationComponent ],
  imports     : [ CommonModule, FormsModule, NzSelectModule ]
})

export class NzPaginationModule {
}
