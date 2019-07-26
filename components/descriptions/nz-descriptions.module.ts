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
import { NzAddOnModule } from 'ng-zorro-antd/core';

import { NzDescriptionsItemComponent } from './nz-descriptions-item.component';
import { NzDescriptionsComponent } from './nz-descriptions.component';

@NgModule({
  imports: [CommonModule, NzAddOnModule, PlatformModule],
  declarations: [NzDescriptionsComponent, NzDescriptionsItemComponent],
  exports: [NzDescriptionsComponent, NzDescriptionsItemComponent]
})
export class NzDescriptionsModule {}
