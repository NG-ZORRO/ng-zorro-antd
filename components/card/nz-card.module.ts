/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzOutletModule } from 'ng-zorro-antd/core';

import { NzCardGridDirective } from './nz-card-grid.directive';
import { NzCardLoadingComponent } from './nz-card-loading.component';
import { NzCardMetaComponent } from './nz-card-meta.component';
import { NzCardTabComponent } from './nz-card-tab.component';
import { NzCardComponent } from './nz-card.component';

@NgModule({
  imports: [CommonModule, NzOutletModule],
  declarations: [NzCardComponent, NzCardGridDirective, NzCardMetaComponent, NzCardLoadingComponent, NzCardTabComponent],
  exports: [NzCardComponent, NzCardGridDirective, NzCardMetaComponent, NzCardLoadingComponent, NzCardTabComponent]
})
export class NzCardModule {}
