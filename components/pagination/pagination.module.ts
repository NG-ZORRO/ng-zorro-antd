/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NgModule } from '@angular/core';

import { NzPaginationDefaultComponent } from './pagination-default.component';
import { NzPaginationItemComponent } from './pagination-item.component';
import { NzPaginationOptionsComponent } from './pagination-options.component';
import { NzPaginationSimpleComponent } from './pagination-simple.component';
import { NzPaginationComponent } from './pagination.component';

@NgModule({
  imports: [
    NzPaginationComponent,
    NzPaginationSimpleComponent,
    NzPaginationOptionsComponent,
    NzPaginationItemComponent,
    NzPaginationDefaultComponent
  ],
  exports: [NzPaginationComponent]
})
export class NzPaginationModule {}
