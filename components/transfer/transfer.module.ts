/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { BidiModule } from '@angular/cdk/bidi';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzI18nModule } from 'ng-zorro-antd/i18n';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';

import { NzTransferListComponent } from './transfer-list.component';
import { NzTransferSearchComponent } from './transfer-search.component';
import { NzTransferComponent } from './transfer.component';

@NgModule({
  imports: [
    BidiModule,
    CommonModule,
    FormsModule,
    NzCheckboxModule,
    NzButtonModule,
    NzInputModule,
    NzI18nModule,
    NzIconModule,
    NzEmptyModule
  ],
  declarations: [NzTransferComponent, NzTransferListComponent, NzTransferSearchComponent],
  exports: [NzTransferComponent]
})
export class NzTransferModule {}
