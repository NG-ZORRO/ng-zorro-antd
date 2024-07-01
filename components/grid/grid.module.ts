/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NgModule } from '@angular/core';

import { NzColDirective } from './col.directive';
import { NzRowDirective } from './row.directive';

@NgModule({
  imports: [NzColDirective, NzRowDirective],
  exports: [NzColDirective, NzRowDirective]
})
export class NzGridModule {}
