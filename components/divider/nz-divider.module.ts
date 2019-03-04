import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzAddOnModule } from '../core/addon/addon.module';
import { NzDividerComponent } from './nz-divider.component';

@NgModule({
  imports     : [ CommonModule, NzAddOnModule ],
  declarations: [ NzDividerComponent ],
  exports     : [ NzDividerComponent ]
})
export class NzDividerModule {
}
