import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzButtonModule } from '../button/nz-button.module';
import { NzIconModule } from '../icon/nz-icon.module';
import { NzMenuDividerDirective } from '../menu/nz-menu-divider.directive';
import { NzMenuGroupComponent } from '../menu/nz-menu-group.component';
import { NzMenuItemDirective } from '../menu/nz-menu-item.directive';
import { NzMenuDirective } from '../menu/nz-menu.directive';
import { NzSubMenuComponent } from '../menu/nz-submenu.component';

@NgModule({
  imports     : [ CommonModule, FormsModule, NzButtonModule, OverlayModule, NzIconModule ],
  declarations: [ NzMenuDirective, NzMenuItemDirective, NzSubMenuComponent, NzMenuDividerDirective, NzMenuGroupComponent ],
  exports     : [ NzMenuDirective, NzMenuItemDirective, NzSubMenuComponent, NzMenuDividerDirective, NzMenuGroupComponent ]
})
export class NzMenuModule {
}
