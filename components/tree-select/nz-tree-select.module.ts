import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzEmptyModule } from '../empty/nz-empty.module';
import { NzIconModule } from '../icon/nz-icon.module';
import { NzTreeModule } from '../tree/nz-tree.module';
import { NzTreeSelectComponent } from './nz-tree-select.component';

@NgModule({
  imports     : [ CommonModule, OverlayModule, FormsModule, NzTreeModule, NzIconModule, NzEmptyModule ],
  declarations: [ NzTreeSelectComponent ],
  exports     : [ NzTreeSelectComponent ]
})
export class NzTreeSelectModule {
}
