/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { BidiModule } from '@angular/cdk/bidi';
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { NzMessageContainerComponent } from './message-container.component';
import { NzMessageComponent } from './message.component';
import { NzMessageServiceModule } from './message.service.module';

@NgModule({
  imports: [BidiModule, CommonModule, OverlayModule, NzIconModule, NzOutletModule, NzMessageServiceModule],
  declarations: [NzMessageContainerComponent, NzMessageComponent]
})
export class NzMessageModule {}
