import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OverlayModule } from '../core/overlay/index';
import { NzButtonModule } from '../button/nz-button.module';

import { NzDropDownComponent } from './nz-dropdown.component';
import { NzDropDownDirective } from './nz-dropdown.directive';
import { NzDropDownButtonComponent } from './nz-dropdown-button.component';
import { NzMenuModule } from '../menu/nz-menu.module';

@NgModule({
  imports     : [ CommonModule, OverlayModule, FormsModule, NzButtonModule, NzMenuModule ],
  declarations: [ NzDropDownComponent, NzDropDownButtonComponent, NzDropDownDirective ],
  exports     : [ NzDropDownComponent, NzDropDownButtonComponent, NzDropDownDirective ]
})
export class NzDropDownModule {
}
