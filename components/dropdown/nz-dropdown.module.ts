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
import { NzNoAnimationModule, NzOverlayModule } from 'ng-zorro-antd/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';

import { NzDropDownADirective } from './nz-dropdown-a.directive';
import { NzDropDownButtonComponent } from './nz-dropdown-button.component';
import { NzDropdownContextComponent } from './nz-dropdown-context.component';
import { NzDropDownComponent } from './nz-dropdown.component';
import { NzDropDownDirective } from './nz-dropdown.directive';
import { NzDropdownService } from './nz-dropdown.service';

@NgModule({
  imports: [
    CommonModule,
    OverlayModule,
    FormsModule,
    NzButtonModule,
    NzMenuModule,
    NzIconModule,
    NzNoAnimationModule,
    NzOverlayModule
  ],
  entryComponents: [NzDropdownContextComponent],
  declarations: [
    NzDropDownComponent,
    NzDropDownButtonComponent,
    NzDropDownDirective,
    NzDropDownADirective,
    NzDropdownContextComponent
  ],
  exports: [NzMenuModule, NzDropDownComponent, NzDropDownButtonComponent, NzDropDownDirective, NzDropDownADirective],
  providers: [NzDropdownService]
})
export class NzDropDownModule {}
