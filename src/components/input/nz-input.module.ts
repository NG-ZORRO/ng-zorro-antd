import { NgModule } from '@angular/core';
import { NzInputComponent } from './nz-input.component';
import { NzInputDirectiveComponent } from './nz-input.directive.component';
import { NzInputGroupComponent } from './nz-input-group.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ NzInputComponent, NzInputGroupComponent, NzInputDirectiveComponent ],
  exports     : [ NzInputComponent, NzInputGroupComponent, NzInputDirectiveComponent ],
  imports     : [ CommonModule, FormsModule ]
})
export class NzInputModule {
}
