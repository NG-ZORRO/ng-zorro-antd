/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
/* tslint:disable:component-selector */
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChange,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { warnDeprecation } from 'ng-zorro-antd/core/logger';
import { BooleanInput } from 'ng-zorro-antd/core/types';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NzTableFilterFn, NzTableFilterList, NzTableFilterValue, NzTableSortFn, NzTableSortOrder } from '../table.types';

@Component({
  selector:
    'th[nzSortKey], th[nzColumnKey], th[nzSort], th[nzSortFn], th[nzSortOrder], th[nzFilters], th[nzShowSort], th[nzShowFilter], th[nzCustomFilter]',
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nz-table-filter
      *ngIf="nzShowFilter || nzCustomFilter; else notFilterTemplate"
      [contentTemplate]="notFilterTemplate"
      [extraTemplate]="extraTemplate"
      [customFilter]="nzCustomFilter"
      [filterMultiple]="nzFilterMultiple"
      [listOfFilter]="nzFilters"
      (filterChange)="onFilterValueChange($event)"
    ></nz-table-filter>
    <ng-template #notFilterTemplate>
      <ng-template [ngTemplateOutlet]="nzShowSort ? sortTemplate : contentTemplate"></ng-template>
    </ng-template>
    <ng-template #extraTemplate>
      <ng-content select="[nz-th-extra]"></ng-content>
      <ng-content select="nz-filter-trigger"></ng-content>
    </ng-template>
    <ng-template #sortTemplate>
      <nz-table-sorters [sortOrder]="sortOrder" [sortDirections]="sortDirections" [contentTemplate]="contentTemplate"></nz-table-sorters>
    </ng-template>
    <ng-template #contentTemplate>
      <ng-content></ng-content>
    </ng-template>
  `,
  host: {
    '[class.ant-table-column-has-sorters]': 'nzShowSort',
    '[class.ant-table-column-sort]': `sortOrder === 'descend' || sortOrder === 'ascend'`,
    '(click)': 'emitNextSortValue()'
  }
})
export class NzThAddOnComponent implements OnChanges, OnInit, OnDestroy {
  static ngAcceptInputType_nzShowSort: BooleanInput;
  static ngAcceptInputType_nzShowFilter: BooleanInput;
  static ngAcceptInputType_nzCustomFilter: BooleanInput;

  manualClickOrder$ = new Subject<NzThAddOnComponent>();
  calcOperatorChange$ = new Subject();
  nzFilterValue: NzTableFilterValue = null;
  sortOrder: NzTableSortOrder = null;
  sortDirections: NzTableSortOrder[] = ['ascend', 'descend', null];
  private sortOrderChange$ = new Subject<NzTableSortOrder>();
  private destroy$ = new Subject();
  private isNzShowSortChanged = false;
  private isNzShowFilterChanged = false;
  @Input() nzColumnKey?: string;
  @Input() nzFilterMultiple = true;
  @Input() nzSortOrder: NzTableSortOrder = null;
  @Input() nzSortPriority: number | boolean = false;
  @Input() nzSortDirections: NzTableSortOrder[] = ['ascend', 'descend', null];
  @Input() nzFilters: NzTableFilterList = [];
  @Input() nzSortFn: NzTableSortFn | boolean | null = null;
  @Input() nzFilterFn: NzTableFilterFn | boolean | null = null;
  @Input() @InputBoolean() nzShowSort = false;
  @Input() @InputBoolean() nzShowFilter = false;
  @Input() @InputBoolean() nzCustomFilter = false;
  @Output() readonly nzCheckedChange = new EventEmitter<boolean>();
  @Output() readonly nzSortOrderChange = new EventEmitter<string | null>();
  @Output() readonly nzFilterChange = new EventEmitter<NzTableFilterValue>();
  /** @deprecated use nzColumnKey instead **/
  @Input() nzSortKey?: string;
  /** @deprecated use nzSortOrder instead **/
  @Input() nzSort: NzTableSortOrder = null;
  /** @deprecated use nzSortOrderChange instead **/
  @Output() readonly nzSortChange = new EventEmitter<string | null>();

  getNextSortDirection(sortDirections: NzTableSortOrder[], current: NzTableSortOrder): NzTableSortOrder {
    const index = sortDirections.indexOf(current);
    if (index === sortDirections.length - 1) {
      return sortDirections[0];
    } else {
      return sortDirections[index + 1];
    }
  }

  emitNextSortValue(): void {
    if (this.nzShowSort) {
      const nextOrder = this.getNextSortDirection(this.sortDirections, this.sortOrder!);
      this.setSortOrder(nextOrder);
      this.manualClickOrder$.next(this);
    }
  }

  setSortOrder(order: NzTableSortOrder): void {
    this.sortOrderChange$.next(order);
  }

  clearSortOrder(): void {
    if (this.sortOrder !== null) {
      this.setSortOrder(null);
    }
  }

  onFilterValueChange(value: NzTableFilterValue): void {
    this.nzFilterChange.emit(value);
    this.nzFilterValue = value;
    this.updateCalcOperator();
  }

  updateCalcOperator(): void {
    this.calcOperatorChange$.next();
  }

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.sortOrderChange$.pipe(takeUntil(this.destroy$)).subscribe(order => {
      if (this.sortOrder !== order) {
        this.sortOrder = order;
        this.nzSortChange.emit(order);
        this.nzSortOrderChange.emit(order);
      }
      this.updateCalcOperator();
      this.cdr.markForCheck();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const {
      nzSortKey,
      nzSort,
      nzSortDirections,
      nzFilters,
      nzSortOrder,
      nzSortFn,
      nzFilterFn,
      nzSortPriority,
      nzFilterMultiple,
      nzShowSort,
      nzShowFilter
    } = changes;
    if (nzSortDirections) {
      if (this.nzSortDirections && this.nzSortDirections.length) {
        this.sortDirections = this.nzSortDirections;
      }
    }
    if (nzSort) {
      this.sortOrder = this.nzSort;
      this.setSortOrder(this.nzSort);
      warnDeprecation(
        `'nzSort' and 'nzSortChange' is deprecated and will be removed in 10.0.0. Please use 'nzSortOrder' and 'nzSortOrderChange' instead.`
      );
    }
    if (nzSortKey) {
      this.nzColumnKey = this.nzSortKey;
      warnDeprecation(`'nzSortKey' is deprecated and will be removed in 10.0.0. Please use 'nzColumnKey' instead.`);
    }
    if (nzSortOrder) {
      this.sortOrder = this.nzSortOrder;
      this.setSortOrder(this.nzSortOrder);
    }
    if (nzShowSort) {
      this.isNzShowSortChanged = true;
    }
    if (nzShowFilter) {
      this.isNzShowFilterChanged = true;
    }
    const isFirstChange = (value: SimpleChange) => value && value.firstChange && value.currentValue !== undefined;
    if (
      (isFirstChange(nzSortKey) || isFirstChange(nzSort) || isFirstChange(nzSortOrder) || isFirstChange(nzSortFn)) &&
      !this.isNzShowSortChanged
    ) {
      this.nzShowSort = true;
    }
    if (isFirstChange(nzFilters) && !this.isNzShowFilterChanged) {
      this.nzShowFilter = true;
    }
    if ((nzFilters || nzFilterMultiple) && this.nzShowFilter) {
      const listOfValue = this.nzFilters.filter(item => item.byDefault).map(item => item.value);
      this.nzFilterValue = this.nzFilterMultiple ? listOfValue : listOfValue[0] || null;
    }
    if (nzSortFn || nzFilterFn || nzSortPriority || nzFilters) {
      this.updateCalcOperator();
    }
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
