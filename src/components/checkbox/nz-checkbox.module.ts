import { NgModule } from '@angular/core';
import { NzCheckboxComponent } from './nz-checkbox.component';
import { NzCheckboxGroupComponent } from './nz-checkbox-group.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
