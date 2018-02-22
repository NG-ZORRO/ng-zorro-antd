import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzInputGroupComponent } from './nz-input-group.component';
import { NzInputDirective } from './nz-input.directive';

@NgModule({
  declarations: [ NzInputDirective, NzInputGroupComponent ],
  exports     : [ NzInputDirective, NzInputGroupComponent ],
  imports     : [ CommonModule, FormsModule ]
})
export class NzInputModule {
}
