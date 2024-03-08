/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NgModule } from '@angular/core';

import { NzEmbedEmptyComponent } from './embed-empty.component';
import { NzEmptyComponent } from './empty.component';
import { NzEmptyDefaultComponent } from './partial/default';
import { NzEmptySimpleComponent } from './partial/simple';

@NgModule({
  imports: [NzEmptyComponent, NzEmbedEmptyComponent, NzEmptyDefaultComponent, NzEmptySimpleComponent],
  exports: [NzEmptyComponent, NzEmbedEmptyComponent]
})
export class NzEmptyModule {}
