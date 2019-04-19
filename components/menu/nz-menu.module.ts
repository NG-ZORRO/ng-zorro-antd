import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzNoAnimationModule } from 'ng-zorro-antd/core';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { NzMenuDividerDirective } from './nz-menu-divider.directive';
import { NzMenuGroupComponent } from './nz-menu-group.component';
import { NzMenuItemDirective } from './nz-menu-item.directive';
import { NzMenuDirective } from './nz-menu.directive';
import { NzSubMenuComponent } from './nz-submenu.component';

@NgModule({
  imports: [CommonModule, FormsModule, NzButtonModule, OverlayModule, NzIconModule, NzNoAnimationModule],
  declarations: [
    NzMenuDirective,
    NzMenuItemDirective,
    NzSubMenuComponent,
    NzMenuDividerDirective,
    NzMenuGroupComponent
  ],
  exports: [NzMenuDirective, NzMenuItemDirective, NzSubMenuComponent, NzMenuDividerDirective, NzMenuGroupComponent]
})
export class NzMenuModule {}
