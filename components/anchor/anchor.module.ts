/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NgModule } from '@angular/core';

import { NzAnchorLinkComponent } from './anchor-link.component';
import { NzAnchorComponent } from './anchor.component';

@NgModule({
  exports: [NzAnchorComponent, NzAnchorLinkComponent],
  imports: [NzAnchorComponent, NzAnchorLinkComponent]
})
export class NzAnchorModule {}
