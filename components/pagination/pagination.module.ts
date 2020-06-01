/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzI18nModule } from 'ng-zorro-antd/i18n';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzPaginationDefaultComponent } from './pagination-default.component';
import { NzPaginationItemComponent } from './pagination-item.component';
import { NzPaginationOptionsComponent } from './pagination-options.component';
import { NzPaginationSimpleComponent } from './pagination-simple.component';
import { NzPaginationComponent } from './pagination.component';

@NgModule({
  declarations: [
    NzPaginationComponent,
    NzPaginationSimpleComponent,
    NzPaginationOptionsComponent,
    NzPaginationItemComponent,
    NzPaginationDefaultComponent
  ],
  exports: [NzPaginationComponent],
  imports: [CommonModule, FormsModule, NzSelectModule, NzI18nModule, NzIconModule]
})
export class NzPaginationModule {}
