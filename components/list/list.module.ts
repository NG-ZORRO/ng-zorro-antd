/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzSpinModule } from 'ng-zorro-antd/spin';

import {
  NzListEmptyComponent,
  NzListFooterComponent,
  NzListGridDirective,
  NzListHeaderComponent,
  NzListLoadMoreDirective,
  NzListPaginationComponent
} from './list-cell';
import { NzListItemActionComponent, NzListItemActionsComponent, NzListItemExtraComponent } from './list-item-cell';
import { NzListItemMetaAvatarComponent, NzListItemMetaDescriptionComponent, NzListItemMetaTitleComponent } from './list-item-meta-cell';
import { NzListItemMetaComponent } from './list-item-meta.component';
import { NzListItemComponent } from './list-item.component';
import { NzListComponent } from './list.component';

const DIRECTIVES = [
  NzListComponent,
  NzListHeaderComponent,
  NzListFooterComponent,
  NzListPaginationComponent,
  NzListEmptyComponent,
  NzListItemComponent,
  NzListItemMetaComponent,
  NzListItemMetaTitleComponent,
  NzListItemMetaDescriptionComponent,
  NzListItemMetaAvatarComponent,
  NzListItemActionsComponent,
  NzListItemActionComponent,
  NzListItemExtraComponent,
  NzListLoadMoreDirective,
  NzListGridDirective
];

@NgModule({
  imports: [CommonModule, NzSpinModule, NzGridModule, NzAvatarModule, NzOutletModule, NzEmptyModule],
  declarations: [DIRECTIVES],
  exports: [DIRECTIVES]
})
export class NzListModule {}
