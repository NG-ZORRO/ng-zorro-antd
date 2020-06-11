/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { NzCollapsePanelComponent } from './collapse-panel.component';
import { NzCollapseComponent } from './collapse.component';

@NgModule({
  declarations: [NzCollapsePanelComponent, NzCollapseComponent],
  exports: [NzCollapsePanelComponent, NzCollapseComponent],
  imports: [CommonModule, NzIconModule, NzOutletModule]
})
export class NzCollapseModule {}
