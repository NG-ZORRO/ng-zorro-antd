import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzCollapseComponent } from './nz-collapse.component';
import { NzCollapsesetComponent } from './nz-collapseset.component';

export const NZ_COLLAPSE_DIRECTIVES = [ NzCollapsesetComponent, NzCollapseComponent ];

@NgModule({
  declarations: NZ_COLLAPSE_DIRECTIVES,
  exports     : NZ_COLLAPSE_DIRECTIVES,
  imports     : [ CommonModule ]
})

export class NzCollapseModule {
}
