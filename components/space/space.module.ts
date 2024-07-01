/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NgModule } from '@angular/core';

import { NzSpaceItemDirective } from './space-item.directive';
import { NzSpaceComponent } from './space.component';

@NgModule({
  imports: [NzSpaceComponent, NzSpaceItemDirective],
  exports: [NzSpaceComponent, NzSpaceItemDirective]
})
export class NzSpaceModule {}
