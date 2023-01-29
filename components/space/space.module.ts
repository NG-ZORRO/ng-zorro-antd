/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { BidiModule } from '@angular/cdk/bidi';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NzSpaceItemDirective } from './space-item.directive';
import { NzSpaceComponent } from './space.component';

@NgModule({
  declarations: [NzSpaceComponent, NzSpaceItemDirective],
  exports: [NzSpaceComponent, NzSpaceItemDirective],
  imports: [BidiModule, CommonModule]
})
export class NzSpaceModule {}
