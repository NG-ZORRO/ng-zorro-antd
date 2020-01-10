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
import { NzIconModule } from 'ng-zorro-antd/icon';

import { NzTimelineItemComponent } from './nz-timeline-item.component';
import { NzTimelineComponent } from './nz-timeline.component';

@NgModule({
  declarations: [NzTimelineItemComponent, NzTimelineComponent],
  exports: [NzTimelineItemComponent, NzTimelineComponent],
  imports: [CommonModule, PlatformModule, NzIconModule, NzAddOnModule]
})
export class NzTimelineModule {}
