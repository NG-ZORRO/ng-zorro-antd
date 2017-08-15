import { NgModule } from '@angular/core';
import { NzTagComponent } from './nz-tag.component';
import { NzCheckableTagComponent } from './nz-checkable-tag.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


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
