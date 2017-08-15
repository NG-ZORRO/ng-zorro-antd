import { NgModule } from '@angular/core';
import { NzRootComponent } from './nz-root.component';
import { CommonModule } from '@angular/common';

@NgModule({
  exports     : [ NzRootComponent ],
  declarations: [ NzRootComponent ],
  imports     : [ CommonModule ]
})

export class NzRootModule {
}
