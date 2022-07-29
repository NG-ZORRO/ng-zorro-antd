/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { BidiModule } from '@angular/cdk/bidi';
import { OverlayModule } from '@angular/cdk/overlay';
import { PlatformModule } from '@angular/cdk/platform';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzNoAnimationModule } from 'ng-zorro-antd/core/no-animation';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzOverlayModule } from 'ng-zorro-antd/core/overlay';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';

import { NzContextMenuServiceModule } from './context-menu.service.module';
import { NzDropDownADirective } from './dropdown-a.directive';
import { NzDropdownButtonDirective } from './dropdown-button.directive';
import { NzDropdownMenuComponent } from './dropdown-menu.component';
import { NzDropDownDirective } from './dropdown.directive';

@NgModule({
  imports: [
    BidiModule,
    CommonModule,
    OverlayModule,
    FormsModule,
    NzButtonModule,
    NzMenuModule,
    NzIconModule,
    NzNoAnimationModule,
    PlatformModule,
    NzOverlayModule,
    NzContextMenuServiceModule,
    NzOutletModule
  ],
  declarations: [NzDropDownDirective, NzDropDownADirective, NzDropdownMenuComponent, NzDropdownButtonDirective],
  exports: [NzMenuModule, NzDropDownDirective, NzDropDownADirective, NzDropdownMenuComponent, NzDropdownButtonDirective]
})
export class NzDropDownModule {}
