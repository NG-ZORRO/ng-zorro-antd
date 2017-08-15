import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCollapseComponent } from './nz-collapse.component';
import { NzCollapsesetComponent } from './nz-collapseset.component';

export const NZ_COLLAPSE_DIRECTIVES: Array<any> = [ NzCollapsesetComponent, NzCollapseComponent ];

@NgModule({
  declarations: NZ_COLLAPSE_DIRECTIVES,
  exports     : NZ_COLLAPSE_DIRECTIVES,
  imports     : [ CommonModule ]
})

export class NzCollapseModule {
}
