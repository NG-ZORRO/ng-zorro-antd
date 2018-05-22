import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzInputNumberComponent } from './nz-input-number.component';

@NgModule({
  imports     : [ CommonModule, FormsModule ],
  declarations: [ NzInputNumberComponent ],
  exports     : [ NzInputNumberComponent ]
})
export class NzInputNumberModule {
}
