/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { PlatformModule } from '@angular/cdk/platform';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzResizeObserversModule } from 'ng-zorro-antd/core/resize-observers';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzI18nModule } from 'ng-zorro-antd/i18n';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzFilterTriggerComponent } from './addon/filter-trigger.component';
import { NzTableFilterComponent } from './addon/filter.component';
import { NzRowExpandButtonDirective } from './addon/row-expand-button.directive';
import { NzRowIndentDirective } from './addon/row-indent.directive';
import { NzTableSelectionComponent } from './addon/selection.component';
import { NzTableSortersComponent } from './addon/sorters.component';
import { NzCellFixedDirective } from './cell/cell-fixed.directive';
import { NzTableCellDirective } from './cell/cell.directive';
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
import { NzTheadComponent } from './table/thead.component';
import { NzTableTitleFooterComponent } from './table/title-footer.component';
import { NzTrExpandDirective } from './table/tr-expand.directive';
import { NzTrMeasureComponent } from './table/tr-measure.component';
import { NzTrDirective } from './table/tr.directive';

@NgModule({
  declarations: [
    NzTableComponent,
    NzThAddOnComponent,
    NzTableCellDirective,
    NzThMeasureDirective,
    NzTdAddOnComponent,
    NzTheadComponent,
    NzTbodyComponent,
    NzTrDirective,
    NzTrExpandDirective,
    NzTableVirtualScrollDirective,
    NzCellFixedDirective,
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
    NzFilterTriggerComponent,
    NzTrExpandDirective,
    NzCellBreakWordDirective,
    NzCellAlignDirective,
    NzCellEllipsisDirective,
    NzTableFixedRowComponent,
    NzThSelectionComponent
  ],
  imports: [
    NzMenuModule,
    FormsModule,
    NzOutletModule,
    NzRadioModule,
    NzCheckboxModule,
    NzDropDownModule,
    NzButtonModule,
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
