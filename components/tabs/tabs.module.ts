/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ObserversModule } from '@angular/cdk/observers';
import { PlatformModule } from '@angular/cdk/platform';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { NzTabBodyComponent } from './tab-body.component';
import { NzTabLabelDirective } from './tab-label.directive';
import { NzTabLinkDirective } from './tab-link.directive';
import { NzTabComponent } from './tab.component';
import { NzTabDirective } from './tab.directive';
import { NzTabsInkBarDirective } from './tabs-ink-bar.directive';
import { NzTabsNavComponent } from './tabs-nav.component';
import { NzTabSetComponent } from './tabset.component';

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
  imports: [CommonModule, ObserversModule, NzIconModule, NzOutletModule, PlatformModule]
})
export class NzTabsModule {}
