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
import { LoadingOutline } from '@ant-design/icons-angular/icons';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { NzTimelineItemComponent } from './timeline-item.component';
import { NzTimelineComponent } from './timeline.component';

@NgModule({
  declarations: [NzTimelineItemComponent, NzTimelineComponent],
  exports: [NzTimelineItemComponent, NzTimelineComponent],
  imports: [CommonModule, PlatformModule, NzIconModule.forChild([LoadingOutline]), NzOutletModule]
})
export class NzTimelineModule {}
