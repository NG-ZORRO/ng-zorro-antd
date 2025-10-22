/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NgModule } from '@angular/core';

import { NzTabAddButtonComponent } from './tab-add-button.component';
import { NzTabBarExtraContentDirective } from './tab-bar-extra-content.directive';
import { NzTabBodyComponent } from './tab-body.component';
import { NzTabCloseButtonComponent } from './tab-close-button.component';
import { NzTabLinkDirective, NzTabLinkTemplateDirective } from './tab-link.directive';
import { NzTabNavBarComponent } from './tab-nav-bar.component';
import { NzTabNavItemDirective } from './tab-nav-item.directive';
import { NzTabNavOperationComponent } from './tab-nav-operation.component';
import { NzTabScrollListDirective } from './tab-scroll-list.directive';
import { NzTabComponent } from './tab.component';
import { NzTabDirective } from './tab.directive';
import { NzTabsInkBarDirective } from './tabs-ink-bar.directive';
import { NzTabsComponent } from './tabs.component';

const DIRECTIVES = [
  NzTabsComponent,
  NzTabComponent,
  NzTabNavBarComponent,
  NzTabNavItemDirective,
  NzTabsInkBarDirective,
  NzTabScrollListDirective,
  NzTabNavOperationComponent,
  NzTabAddButtonComponent,
  NzTabCloseButtonComponent,
  NzTabDirective,
  NzTabBodyComponent,
  NzTabLinkDirective,
  NzTabLinkTemplateDirective,
  NzTabBarExtraContentDirective
];

@NgModule({
  imports: [DIRECTIVES],
  exports: [DIRECTIVES]
})
export class NzTabsModule {}
