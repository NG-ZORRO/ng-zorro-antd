import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzButtonModule } from '../button/nz-button.module';
import { NzMenuModule } from '../menu/nz-menu.module';

import { NzDropDownButtonComponent } from './nz-dropdown-button.component';
import { NzDropdownContextComponent } from './nz-dropdown-context.component';
import { NzDropDownComponent } from './nz-dropdown.component';
import { NzDropDownDirective } from './nz-dropdown.directive';

@NgModule({
  imports        : [ CommonModule, OverlayModule, FormsModule, NzButtonModule, NzMenuModule ],
  declarations   : [ NzDropDownComponent, NzDropDownButtonComponent, NzDropDownDirective, NzDropdownContextComponent ],
  entryComponents: [ NzDropdownContextComponent ],
  exports        : [ NzDropDownComponent, NzDropDownButtonComponent, NzDropDownDirective ]
})
export class NzDropDownModule {
}
