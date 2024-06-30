/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NgModule } from '@angular/core';

import { NzDescriptionsItemComponent } from './descriptions-item.component';
import { NzDescriptionsComponent } from './descriptions.component';

@NgModule({
  imports: [NzDescriptionsComponent, NzDescriptionsItemComponent],
  exports: [NzDescriptionsComponent, NzDescriptionsItemComponent]
})
export class NzDescriptionsModule {}
