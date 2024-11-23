/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NgModule } from '@angular/core';

import { NzMessageContainerComponent } from './message-container.component';
import { NzMessageComponent } from './message.component';

/**
 * @deprecated This module is no longer needed, will be removed in v20, please remove its import.
 */
@NgModule({
  imports: [NzMessageContainerComponent, NzMessageComponent]
})
export class NzMessageModule {}
