/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NgModule } from '@angular/core';

import { NzDrawerContentDirective } from './drawer-content.directive';
import { NzDrawerFooterDirective } from './drawer-footer.directive';
import { NzDrawerComponent } from './drawer.component';
import { NzDrawerService } from './drawer.service';

@NgModule({
  imports: [NzDrawerComponent, NzDrawerContentDirective, NzDrawerFooterDirective],
  providers: [NzDrawerService],
  exports: [NzDrawerComponent, NzDrawerContentDirective, NzDrawerFooterDirective]
})
export class NzDrawerModule {}
