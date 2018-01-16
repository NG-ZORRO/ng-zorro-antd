import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzColComponent } from './nz-col.component';
import { NzColDirective } from './nz-col.directive';
import { NzRowComponent } from './nz-row.component';

@NgModule({
  declarations: [ NzRowComponent, NzColDirective, NzColComponent ],
  exports     : [ NzRowComponent, NzColDirective, NzColComponent ],
  imports     : [ CommonModule ]
})
export class NzGridModule {
}
