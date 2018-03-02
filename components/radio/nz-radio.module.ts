import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzRadioButtonComponent } from './nz-radio-button.component';
import { NzRadioGroupComponent } from './nz-radio-group.component';
import { NzRadioComponent } from './nz-radio.component';

@NgModule({
  imports     : [ CommonModule, FormsModule ],
  exports     : [ NzRadioComponent, NzRadioButtonComponent, NzRadioGroupComponent ],
  declarations: [ NzRadioComponent, NzRadioButtonComponent, NzRadioGroupComponent ]
})
export class NzRadioModule {
}
