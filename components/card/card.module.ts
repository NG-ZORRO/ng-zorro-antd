/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { BidiModule } from '@angular/cdk/bidi';
import { NgModule } from '@angular/core';

import { NzCardGridDirective } from './card-grid.directive';
import { NzCardMetaComponent } from './card-meta.component';
import { NzCardTabComponent } from './card-tab.component';
import { NzCardComponent } from './card.component';

@NgModule({
  imports: [NzCardComponent, NzCardGridDirective, NzCardMetaComponent, NzCardTabComponent],
  exports: [BidiModule, NzCardComponent, NzCardGridDirective, NzCardMetaComponent, NzCardTabComponent]
})
export class NzCardModule {}
