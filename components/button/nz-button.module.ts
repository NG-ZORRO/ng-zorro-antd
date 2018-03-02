import { ObserversModule } from '@angular/cdk/observers';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NzButtonGroupComponent } from './nz-button-group.component';
import { NzButtonComponent } from './nz-button.component';

@NgModule({
  declarations: [ NzButtonComponent, NzButtonGroupComponent ],
  exports     : [ NzButtonComponent, NzButtonGroupComponent ],
  imports     : [ CommonModule, ObserversModule ]
})
export class NzButtonModule {
}
