/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ObserversModule } from '@angular/cdk/observers';
import { PlatformModule } from '@angular/cdk/platform';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzAddOnModule } from 'ng-zorro-antd/core';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { NzTabBodyComponent } from './nz-tab-body.component';
import { NzTabLabelDirective } from './nz-tab-label.directive';
import { NzTabLinkDirective } from './nz-tab-link.directive';
import { NzTabComponent } from './nz-tab.component';
import { NzTabDirective } from './nz-tab.directive';
import { NzTabsInkBarDirective } from './nz-tabs-ink-bar.directive';
import { NzTabsNavComponent } from './nz-tabs-nav.component';
import { NzTabSetComponent } from './nz-tabset.component';

@NgModule({
  declarations: [
    NzTabComponent,
    NzTabDirective,
    NzTabSetComponent,
    NzTabsNavComponent,
    NzTabLabelDirective,
    NzTabsInkBarDirective,
    NzTabBodyComponent,
    NzTabLinkDirective
  ],
  exports: [
    NzTabComponent,
    NzTabDirective,
    NzTabSetComponent,
    NzTabsNavComponent,
    NzTabLabelDirective,
    NzTabsInkBarDirective,
    NzTabBodyComponent,
    NzTabLinkDirective
  ],
  imports: [CommonModule, ObserversModule, NzIconModule, NzAddOnModule, PlatformModule]
})
export class NzTabsModule {}
