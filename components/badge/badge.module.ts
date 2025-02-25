/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NgModule } from '@angular/core';

import { NzBadgeComponent } from './badge.component';
import { NzRibbonComponent } from './ribbon.component';

@NgModule({
  exports: [NzBadgeComponent, NzRibbonComponent],
  imports: [NzBadgeComponent, NzRibbonComponent]
})
export class NzBadgeModule {}
