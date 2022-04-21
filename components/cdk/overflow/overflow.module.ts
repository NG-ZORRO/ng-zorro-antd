/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NgModule } from '@angular/core';

import { NzResizeObserverModule } from 'ng-zorro-antd/cdk/resize-observer';

import { NzOverflowContainerComponent } from './overflow-container.component';
import { NzOverflowItemDirective } from './overflow-item.directive';
import { NzOverflowRestDirective } from './overflow-rest.directive';
import { NzOverflowSuffixDirective } from './overflow-suffix.directive';

@NgModule({
  imports: [NzResizeObserverModule],
  declarations: [
    NzOverflowContainerComponent,
    NzOverflowItemDirective,
    NzOverflowRestDirective,
    NzOverflowSuffixDirective
  ],
  exports: [NzOverflowContainerComponent, NzOverflowItemDirective, NzOverflowRestDirective, NzOverflowSuffixDirective]
})
export class NzOverflowModule {}
