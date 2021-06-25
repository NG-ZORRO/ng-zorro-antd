/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NzOverflowModule } from 'ng-zorro-antd/cdk/overflow';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { NzMenuDeprecatedModule } from './deprecated/menu.module';
import { NzMenuGroupComponent } from './nz-menu-group.component';
import { NzMenuIconDirective } from './nz-menu-icon.directive';
import { NzMenuItemComponent } from './nz-menu-item.component';
import { NzMenuLazyItemDirective } from './nz-menu-lazy-item.directive';
import { NzMenuNextPanelDirective } from './nz-menu-next-panel.directive';
import { NzMenuPanelComponent } from './nz-menu-panel.component';
import { NzMenuTriggerForDirective } from './nz-menu-trigger-for.directive';
import { NzMenuComponent } from './nz-menu.component';
import { NzNavMenuComponent } from './nz-nav-menu.component';

const COMPONENTS = [
  NzMenuComponent,
  NzMenuItemComponent,
  NzMenuLazyItemDirective,
  NzNavMenuComponent,
  NzMenuTriggerForDirective,
  NzMenuPanelComponent,
  NzMenuGroupComponent,
  NzMenuNextPanelDirective,
  NzMenuIconDirective
];

@NgModule({
  declarations: [COMPONENTS],
  exports: [COMPONENTS, NzMenuDeprecatedModule],
  imports: [CommonModule, NzOverflowModule, OverlayModule, PortalModule, NzIconModule]
})
export class NzMenuModule {}
