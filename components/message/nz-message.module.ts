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
import { NzAddOnModule } from 'ng-zorro-antd/core';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { NZ_MESSAGE_DEFAULT_CONFIG_PROVIDER } from './nz-message-config';
import { NzMessageContainerComponent } from './nz-message-container.component';
import { NzMessageComponent } from './nz-message.component';
import { NzMessageServiceModule } from './nz-message.service.module';

@NgModule({
  imports: [CommonModule, OverlayModule, NzIconModule, NzAddOnModule, NzMessageServiceModule],
  declarations: [NzMessageContainerComponent, NzMessageComponent],
  providers: [NZ_MESSAGE_DEFAULT_CONFIG_PROVIDER],
  entryComponents: [NzMessageContainerComponent]
})
export class NzMessageModule {}
