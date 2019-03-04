import { LayoutModule } from '@angular/cdk/layout';
import { PlatformModule } from '@angular/cdk/platform';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NzColDirective } from './nz-col.directive';
import { NzRowDirective } from './nz-row.directive';

@NgModule({
  declarations: [ NzColDirective, NzRowDirective ],
  exports     : [ NzColDirective, NzRowDirective ],
  imports     : [ CommonModule, LayoutModule, PlatformModule ]
})
export class NzGridModule {
}
