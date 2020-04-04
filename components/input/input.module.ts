/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { PlatformModule } from '@angular/cdk/platform';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzAutosizeDirective } from './autosize.directive';
import { NzInputGroupSlotComponent } from './input-group-slot.component';
import { NzInputGroupComponent } from './input-group.component';
import { NzInputDirective } from './input.directive';

@NgModule({
  declarations: [NzInputDirective, NzInputGroupComponent, NzAutosizeDirective, NzInputGroupSlotComponent],
  exports: [NzInputDirective, NzInputGroupComponent, NzAutosizeDirective],
  imports: [CommonModule, NzIconModule, PlatformModule, NzOutletModule]
})
export class NzInputModule {}
