/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NgModule } from '@angular/core';

import { NzFilterTriggerComponent } from './addon/filter-trigger.component';
import { NzTableFilterComponent } from './addon/filter.component';
import { NzRowExpandButtonDirective } from './addon/row-expand-button.directive';
import { NzRowIndentDirective } from './addon/row-indent.directive';
import { NzTableSelectionComponent } from './addon/selection.component';
import { NzTableSortersComponent } from './addon/sorters.component';
import { NzCellFixedDirective } from './cell/cell-fixed.directive';
import { NzTableCellDirective } from './cell/cell.directive';
import { NzCustomColumnDirective } from './cell/custom-column.directive';
import { NzTdAddOnComponent } from './cell/td-addon.component';
import { NzThAddOnComponent } from './cell/th-addon.component';
import { NzThMeasureDirective } from './cell/th-measure.directive';
import { NzThSelectionComponent } from './cell/th-selection.component';
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
import { NzTfootSummaryComponent } from './table/tfoot-summary.component';
import { NzTheadComponent } from './table/thead.component';
import { NzTableTitleFooterComponent } from './table/title-footer.component';
import { NzTrExpandDirective } from './table/tr-expand.directive';
import { NzTrMeasureComponent } from './table/tr-measure.component';
import { NzTrDirective } from './table/tr.directive';

@NgModule({
  imports: [
    NzTableComponent,
    NzThAddOnComponent,
    NzTableCellDirective,
    NzThMeasureDirective,
    NzTdAddOnComponent,
    NzTheadComponent,
    NzTbodyComponent,
    NzTrDirective,
    NzTrExpandDirective,
    NzTfootSummaryComponent,
    NzTableVirtualScrollDirective,
    NzCellFixedDirective,
    NzCustomColumnDirective,
    NzTableContentComponent,
    NzTableTitleFooterComponent,
    NzTableInnerDefaultComponent,
    NzTableInnerScrollComponent,
    NzTrMeasureComponent,
    NzRowIndentDirective,
    NzRowExpandButtonDirective,
    NzCellBreakWordDirective,
    NzCellAlignDirective,
    NzTableSortersComponent,
    NzTableFilterComponent,
    NzTableSelectionComponent,
    NzCellEllipsisDirective,
    NzFilterTriggerComponent,
    NzTableFixedRowComponent,
    NzThSelectionComponent
  ],
  exports: [
    NzTableComponent,
    NzThAddOnComponent,
    NzTableCellDirective,
    NzThMeasureDirective,
    NzTdAddOnComponent,
    NzTheadComponent,
    NzTbodyComponent,
    NzTrDirective,
    NzTableVirtualScrollDirective,
    NzCellFixedDirective,
    NzCustomColumnDirective,
    NzFilterTriggerComponent,
    NzTrExpandDirective,
    NzTfootSummaryComponent,
    NzCellBreakWordDirective,
    NzCellAlignDirective,
    NzCellEllipsisDirective,
    NzTableFixedRowComponent,
    NzThSelectionComponent
  ]
})
export class NzTableModule {}
