/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { PlatformModule } from '@angular/cdk/platform';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzOutletModule } from 'ng-zorro-antd/core';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzI18nModule } from 'ng-zorro-antd/i18n';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzFixedLeftCellDirective } from './fixed-left-cell.directive';
import { NzFixedRightCellDirective } from './fixed-right-cell.directive';
import { NzTableInnerDefaultComponent } from './table-inner-default.component';
import { NzTableInnerScrollComponent } from './table-inner-scroll.component';
import { NzTableInnerComponent } from './table-inner.component';
import { NzTableVirtualScrollDirective } from './table-virtual-scroll.directive';

import { NzTableComponent } from './table.component';
import { NzTbodyComponent } from './tbody.component';
import { NzTdComponent } from './td.component';
import { NzThComponent } from './th.component';
import { NzTheadComponent } from './thead.component';
import { NzTableTitleFooterComponent } from './title-footer.component';
import { NzTrDirective } from './tr.directive';

@NgModule({
  declarations: [
    NzTableComponent,
    NzThComponent,
    NzTdComponent,
    NzTheadComponent,
    NzTbodyComponent,
    NzTrDirective,
    NzTableVirtualScrollDirective,
    NzFixedLeftCellDirective,
    NzFixedRightCellDirective,
    NzTableInnerComponent,
    NzTableTitleFooterComponent,
    NzTableInnerDefaultComponent,
    NzTableInnerScrollComponent
  ],
  exports: [
    NzTableComponent,
    NzThComponent,
    NzTdComponent,
    NzTheadComponent,
    NzTbodyComponent,
    NzTrDirective,
    NzTableVirtualScrollDirective,
    NzFixedLeftCellDirective,
    NzFixedRightCellDirective
  ],
  imports: [
    NzMenuModule,
    FormsModule,
    NzOutletModule,
    NzRadioModule,
    NzCheckboxModule,
    NzDropDownModule,
    CommonModule,
    PlatformModule,
    NzPaginationModule,
    NzSpinModule,
    NzI18nModule,
    NzIconModule,
    NzEmptyModule,
    ScrollingModule
  ]
})
export class NzTableModule {}
