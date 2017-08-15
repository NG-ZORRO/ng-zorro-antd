import { NgModule } from '@angular/core';
import { NzRadioComponent } from './nz-radio.component';
import { NzRadioButtonComponent } from './nz-radio-button.component';
import { NzRadioGroupComponent } from './nz-radio-group.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports     : [ CommonModule, FormsModule ],
  exports     : [ NzRadioComponent, NzRadioButtonComponent, NzRadioGroupComponent ],
  declarations: [ NzRadioComponent, NzRadioButtonComponent, NzRadioGroupComponent ]
})

export class NzRadioModule {
}
