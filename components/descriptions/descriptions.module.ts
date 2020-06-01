/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { PlatformModule } from '@angular/cdk/platform';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';

import { NzDescriptionsItemComponent } from './descriptions-item.component';
import { NzDescriptionsComponent } from './descriptions.component';

@NgModule({
  imports: [CommonModule, NzOutletModule, PlatformModule],
  declarations: [NzDescriptionsComponent, NzDescriptionsItemComponent],
  exports: [NzDescriptionsComponent, NzDescriptionsItemComponent]
})
export class NzDescriptionsModule {}
