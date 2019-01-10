import { LayoutModule } from '@angular/cdk/layout';
import { PlatformModule } from '@angular/cdk/platform';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NzColComponent } from './nz-col.component';
import { NzColDirective } from './nz-col.directive';
import { NzRowComponent } from './nz-row.component';
import { NzRowDirective } from './nz-row.directive';

@NgModule({
  declarations: [ NzRowComponent, NzColDirective, NzColComponent, NzRowDirective ],
  exports     : [ NzRowComponent, NzColDirective, NzColComponent, NzRowDirective ],
  imports     : [ CommonModule, LayoutModule, PlatformModule ]
})
export class NzGridModule {
}
