/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzAddOnModule, NzNoAnimationModule, NzOverlayModule } from 'ng-zorro-antd/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';

import { PlatformModule } from '@angular/cdk/platform';
import { NzContextMenuServiceModule } from './nz-context-menu.service.module';
import { NzDropDownADirective } from './nz-dropdown-a.directive';
import { NzDropDownButtonComponent } from './nz-dropdown-button.component';
import { NzDropdownContextComponent } from './nz-dropdown-context.component';
import { NzDropdownMenuComponent } from './nz-dropdown-menu.component';
import { NzDropDownComponent } from './nz-dropdown.component';
import { NzDropDownDirective } from './nz-dropdown.directive';
import { NzDropdownServiceModule } from './nz-dropdown.service.module';

@NgModule({
  imports: [
    CommonModule,
    OverlayModule,
    FormsModule,
    NzButtonModule,
    NzMenuModule,
    NzIconModule,
    PlatformModule,
    NzNoAnimationModule,
    NzOverlayModule,
    NzDropdownServiceModule,
    NzContextMenuServiceModule,
    NzAddOnModule
  ],
  entryComponents: [NzDropdownContextComponent, NzDropdownMenuComponent],
  declarations: [
    NzDropDownComponent,
    NzDropDownButtonComponent,
    NzDropDownDirective,
    NzDropDownADirective,
    NzDropdownContextComponent,
    NzDropdownMenuComponent
  ],
  exports: [
    NzMenuModule,
    NzDropDownComponent,
    NzDropDownButtonComponent,
    NzDropDownDirective,
    NzDropDownADirective,
    NzDropdownMenuComponent
  ]
})
export class NzDropDownModule {}
