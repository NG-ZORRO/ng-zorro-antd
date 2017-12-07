import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzInputGroupComponent } from './nz-input-group.component';
import { NzInputComponent } from './nz-input.component';
import { NzInputDirectiveComponent } from './nz-input.directive.component';

@NgModule({
  declarations: [ NzInputComponent, NzInputGroupComponent, NzInputDirectiveComponent ],
  exports     : [ NzInputComponent, NzInputGroupComponent, NzInputDirectiveComponent ],
  imports     : [ CommonModule, FormsModule ]
})
export class NzInputModule {
}
