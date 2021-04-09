/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { A11yModule } from '@angular/cdk/a11y';
import { BidiModule } from '@angular/cdk/bidi';
import { ObserversModule } from '@angular/cdk/observers';
import { PlatformModule } from '@angular/cdk/platform';
import { CdkScrollableModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { NzTabAddButtonComponent } from './tab-add-button.component';
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
import { NzTabSetComponent } from './tabset.component';

const DIRECTIVES = [
  NzTabSetComponent,
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
  NzTabLinkTemplateDirective
];

@NgModule({
  declarations: [DIRECTIVES],
  exports: [DIRECTIVES],
  imports: [
    BidiModule,
    CommonModule,
    ObserversModule,
    NzIconModule,
    NzOutletModule,
    PlatformModule,
    A11yModule,
    CdkScrollableModule,
    NzDropDownModule
  ]
})
export class NzTabsModule {}
