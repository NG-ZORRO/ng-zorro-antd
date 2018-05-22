import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzTagComponent } from './nz-tag.component';

@NgModule({
  imports     : [ CommonModule, FormsModule ],
  declarations: [
    NzTagComponent
  ],
  exports     : [
    NzTagComponent
  ]
})
export class NzTagModule {
}
