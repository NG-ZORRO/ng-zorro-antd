/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzAddOnModule } from 'ng-zorro-antd/core';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzSpinModule } from 'ng-zorro-antd/spin';

import { NzListItemMetaComponent } from './nz-list-item-meta.component';
import { NzListItemComponent } from './nz-list-item.component';
import { NzListComponent } from './nz-list.component';

@NgModule({
  imports: [CommonModule, NzSpinModule, NzGridModule, NzAvatarModule, NzAddOnModule, NzEmptyModule],
  declarations: [NzListComponent, NzListItemComponent, NzListItemMetaComponent],
  exports: [NzListComponent, NzListItemComponent, NzListItemMetaComponent]
})
export class NzListModule {}
