import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzButtonModule } from '../button/nz-button.module';
import { NzMenuDividerComponent } from '../menu/nz-menu-divider.component';
import { NzMenuGroupComponent } from '../menu/nz-menu-group.component';
import { NzMenuItemComponent } from '../menu/nz-menu-item.component';
import { NzMenuComponent } from '../menu/nz-menu.component';
import { NzSubMenuComponent } from '../menu/nz-submenu.component';

@NgModule({
  imports     : [ CommonModule, FormsModule, NzButtonModule ],
  declarations: [ NzMenuComponent, NzMenuItemComponent, NzSubMenuComponent, NzMenuDividerComponent, NzMenuGroupComponent ],
  exports     : [ NzMenuComponent, NzMenuItemComponent, NzSubMenuComponent, NzMenuDividerComponent, NzMenuGroupComponent ]
})
export class NzMenuModule {
}
