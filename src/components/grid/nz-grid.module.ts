import { NgModule } from '@angular/core';
import { NzRowComponent } from './nz-row.component';
import { NzColDirective } from './nz-col.directive';
import { NzColComponent } from './nz-col.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [ NzRowComponent, NzColDirective, NzColComponent ],
  exports     : [ NzRowComponent, NzColDirective, NzColComponent ],
  imports     : [ CommonModule ]
})

export class NzGridModule {
}
