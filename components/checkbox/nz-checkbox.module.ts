import { ObserversModule } from '@angular/cdk/observers';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzCheckboxGroupComponent } from './nz-checkbox-group.component';
import { NzCheckboxWrapperComponent } from './nz-checkbox-wrapper.component';
import { NzCheckboxComponent } from './nz-checkbox.component';

@NgModule({
  imports     : [ CommonModule, FormsModule, ObserversModule ],
  declarations: [
    NzCheckboxComponent,
    NzCheckboxGroupComponent,
    NzCheckboxWrapperComponent
  ],
  exports     : [
    NzCheckboxComponent,
    NzCheckboxGroupComponent,
    NzCheckboxWrapperComponent
  ]
})
export class NzCheckboxModule {
}
