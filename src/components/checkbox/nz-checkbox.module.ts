import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzCheckboxGroupComponent } from './nz-checkbox-group.component';
import { NzCheckboxComponent } from './nz-checkbox.component';

@NgModule({
  imports     : [ CommonModule, FormsModule ],
  declarations: [
    NzCheckboxComponent,
    NzCheckboxGroupComponent
  ],
  exports     : [
    NzCheckboxComponent,
    NzCheckboxGroupComponent
  ]
})
export class NzCheckboxModule {
}
