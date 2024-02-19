/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NgModule } from '@angular/core';

import { NzOverflowContainerComponent } from './overflow-container.component';
import { NzOverflowItemDirective } from './overflow-item.directive';
import { NzOverflowRestDirective } from './overflow-rest.directive';
import { NzOverflowSuffixDirective } from './overflow-suffix.directive';

@NgModule({
  imports: [NzOverflowContainerComponent, NzOverflowItemDirective, NzOverflowRestDirective, NzOverflowSuffixDirective],
  exports: [NzOverflowContainerComponent, NzOverflowItemDirective, NzOverflowRestDirective, NzOverflowSuffixDirective]
})
export class NzOverflowModule {}
