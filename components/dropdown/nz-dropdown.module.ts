import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzNoAnimationModule } from '../core/no-animation/nz-no-animation.module';

import { NzButtonModule } from '../button/nz-button.module';
import { NzIconModule } from '../icon/nz-icon.module';
import { NzMenuModule } from '../menu/nz-menu.module';
import { NzDropDownADirective } from './nz-dropdown-a.directive';
import { NzDropDownButtonComponent } from './nz-dropdown-button.component';
import { NzDropdownContextComponent } from './nz-dropdown-context.component';
import { NzDropDownComponent } from './nz-dropdown.component';
import { NzDropDownDirective } from './nz-dropdown.directive';

@NgModule({
  imports        : [ CommonModule, OverlayModule, FormsModule, NzButtonModule, NzMenuModule, NzIconModule, NzNoAnimationModule ],
  entryComponents: [ NzDropdownContextComponent ],
  declarations   : [ NzDropDownComponent, NzDropDownButtonComponent, NzDropDownDirective, NzDropDownADirective, NzDropdownContextComponent ],
  exports        : [ NzDropDownComponent, NzDropDownButtonComponent, NzDropDownDirective, NzDropDownADirective ]
})
export class NzDropDownModule {
}
