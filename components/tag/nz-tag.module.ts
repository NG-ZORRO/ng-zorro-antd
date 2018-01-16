import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzCheckableTagComponent } from './nz-checkable-tag.component';
import { NzTagComponent } from './nz-tag.component';

@NgModule({
  imports     : [ CommonModule, FormsModule ],
  declarations: [
    NzTagComponent, NzCheckableTagComponent
  ],
  exports     : [
    NzTagComponent, NzCheckableTagComponent
  ]
})
export class NzTagModule {
}
