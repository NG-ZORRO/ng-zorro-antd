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
import { NzResizeObserversModule } from 'ng-zorro-antd/core/resize-observers';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzI18nModule } from 'ng-zorro-antd/i18n';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTdComponent } from './cell/td.component';
import { NzThComponent } from './cell/th.component';
import { NzRowExpandButtonDirective } from './expand/row-expand-button.directive';
import { NzRowIndentDirective } from './expand/row-indent.directive';
import { NzTrExpandDirective } from './expand/tr-expand.directive';
import { NzFixedCellDirective } from './fixed/fixed-cell.directive';
import { NzMeasureRowComponent } from './fixed/measure-row.component';
import { NzTableFilterComponent } from './plugin/filter.component';
import { NzTableSelectionComponent } from './plugin/selection.component';
import { NzTableSortersComponent } from './plugin/sorters.component';
import { NzCellAlignDirective } from './styled/align.directive';
import { NzCellEllipsisDirective } from './styled/ellipsis.directive';
import { NzCellBreakWordDirective } from './styled/word-break.directive';
import { NzTableContentComponent } from './table/table-content.component';
import { NzTableFixedRowComponent } from './table/table-fixed-row.component';
import { NzTableInnerDefaultComponent } from './table/table-inner-default.component';
import { NzTableInnerScrollComponent } from './table/table-inner-scroll.component';
import { NzTableVirtualScrollDirective } from './table/table-virtual-scroll.directive';
import { NzTableComponent } from './table/table.component';
import { NzTbodyComponent } from './table/tbody.component';
import { NzTheadComponent } from './table/thead.component';
import { NzTableTitleFooterComponent } from './table/title-footer.component';
import { NzTrDirective } from './table/tr.directive';

@NgModule({
  declarations: [
    NzTableComponent,
    NzThComponent,
    NzTdComponent,
    NzTheadComponent,
    NzTbodyComponent,
    NzTrDirective,
    NzTrExpandDirective,
    NzTableVirtualScrollDirective,
    NzFixedCellDirective,
    NzTableContentComponent,
    NzTableTitleFooterComponent,
    NzTableInnerDefaultComponent,
    NzTableInnerScrollComponent,
    NzMeasureRowComponent,
    NzRowIndentDirective,
    NzRowExpandButtonDirective,
    NzCellBreakWordDirective,
    NzCellAlignDirective,
    NzTableSortersComponent,
    NzTableFilterComponent,
    NzTableSelectionComponent,
    NzCellEllipsisDirective,
    NzTableFixedRowComponent
  ],
  exports: [
    NzTableComponent,
    NzThComponent,
    NzTdComponent,
    NzTheadComponent,
    NzTbodyComponent,
    NzTrDirective,
    NzTableVirtualScrollDirective,
    NzFixedCellDirective,
    NzTrExpandDirective,
    NzCellBreakWordDirective,
    NzCellAlignDirective,
    NzCellEllipsisDirective,
    NzTableFixedRowComponent
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
    NzResizeObserversModule,
    NzSpinModule,
    NzI18nModule,
    NzIconModule,
    NzEmptyModule,
    ScrollingModule
  ]
})
export class NzTableModule {}
