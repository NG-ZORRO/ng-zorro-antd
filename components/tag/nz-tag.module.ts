import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzIconModule } from '../icon/nz-icon.module';

import { NzTagComponent } from './nz-tag.component';

@NgModule({
  imports     : [ CommonModule, FormsModule, NzIconModule ],
  declarations: [
    NzTagComponent
  ],
  exports     : [
    NzTagComponent
  ]
})
export class NzTagModule {
}
