import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzTreeModule } from '../tree/nz-tree.module';
import { NzTreeSelectComponent } from './nz-tree-select.component';

@NgModule({
  imports     : [ CommonModule, OverlayModule, FormsModule, NzTreeModule ],
  declarations: [ NzTreeSelectComponent ],
  exports     : [ NzTreeSelectComponent ]
})
export class NzTreeSelectModule {
}
