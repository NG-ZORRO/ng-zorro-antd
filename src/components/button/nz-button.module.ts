import { NgModule } from '@angular/core';
import { NzButtonGroupComponent } from './nz-button-group.component';
import { NzButtonComponent } from './nz-button.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [ NzButtonComponent, NzButtonGroupComponent ],
  exports     : [ NzButtonComponent, NzButtonGroupComponent ],
  imports     : [ CommonModule ]
})
export class NzButtonModule {
}
