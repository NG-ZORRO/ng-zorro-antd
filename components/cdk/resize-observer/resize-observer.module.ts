/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NgModule } from '@angular/core';

import { NzResizeObserverDirective } from './resize-observer.directive';
import { NzResizeObserverFactory } from './resize-observer.service';

@NgModule({
  providers: [NzResizeObserverFactory],
  declarations: [NzResizeObserverDirective],
  exports: [NzResizeObserverDirective]
})
export class NzResizeObserverModule {}
