/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzAddOnModule } from 'ng-zorro-antd/core';

import { NzIconModule } from 'ng-zorro-antd/icon';

import { PlatformModule } from '@angular/cdk/platform';
import { NzAutosizeDirective } from './nz-autosize.directive';
import { NzInputGroupComponent } from './nz-input-group.component';
import { NzInputDirective } from './nz-input.directive';

@NgModule({
  declarations: [NzInputDirective, NzInputGroupComponent, NzAutosizeDirective],
  exports: [NzInputDirective, NzInputGroupComponent, NzAutosizeDirective],
  imports: [CommonModule, NzIconModule, PlatformModule, NzAddOnModule]
})
export class NzInputModule {}
