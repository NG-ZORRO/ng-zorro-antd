/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NgModule } from '@angular/core';

import { NzTransferListComponent } from './transfer-list.component';
import { NzTransferSearchComponent } from './transfer-search.component';
import { NzTransferComponent } from './transfer.component';

@NgModule({
  imports: [NzTransferComponent, NzTransferListComponent, NzTransferSearchComponent],
  exports: [NzTransferComponent]
})
export class NzTransferModule {}
