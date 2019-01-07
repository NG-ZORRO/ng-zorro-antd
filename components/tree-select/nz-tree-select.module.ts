import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzI18nModule } from '../i18n/nz-i18n.module';
import { NzIconModule } from '../icon/nz-icon.module';
import { NzTreeModule } from '../tree/nz-tree.module';
import { NzTreeSelectComponent } from './nz-tree-select.component';

@NgModule({
  imports     : [ CommonModule, OverlayModule, FormsModule, NzTreeModule, NzIconModule, NzI18nModule ],
  declarations: [ NzTreeSelectComponent ],
  exports     : [ NzTreeSelectComponent ]
})
export class NzTreeSelectModule {
}
