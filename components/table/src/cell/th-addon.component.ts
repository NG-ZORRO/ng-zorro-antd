/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
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
import { InputBoolean, warnDeprecation } from 'ng-zorro-antd/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NzFilterFn, NzFilterValue, NzSortCompareFn, NzSortOrderType, NzThFilterType } from '../table.types';

@Component({
  selector: 'th[nzSortKey], th[nzSort], th[nzSortFn], th[nzSortOrder], th[nzFilters], th[nzShowSort], th[nzShowFilter], th[nzCustomFilter]',
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
      <nz-table-sorters
        [sortOrder]="nzSortOrder"
        [sortDirections]="nzSortDirections"
        [contentTemplate]="contentTemplate"
      ></nz-table-sorters>
    </ng-template>
    <ng-template #contentTemplate>
      <ng-content></ng-content>
    </ng-template>
  `,
  host: {
    '[class.ant-table-column-has-sorters]': 'nzShowSort',
    '[class.ant-table-column-sort]': `nzSortOrder === 'descend' || nzSortOrder === 'ascend'`,
    '(click)': 'nextSortValue()'
  }
})
export class NzThAddOnComponent implements OnChanges, OnInit, OnDestroy {
  manualClickOrder$ = new Subject<NzThAddOnComponent>();
  calcOperatorChange$ = new Subject();
  nzFilterValue: NzFilterValue = null;
  sortOrder: NzSortOrderType | undefined = undefined;
  private sortOrderChange$ = new Subject<NzSortOrderType>();
  private destroy$ = new Subject();
  @Input() nzSortKey: string;
  @Input() nzFilterMultiple = true;
  @Input() nzSortOrder: NzSortOrderType = null;
  @Input() nzSortPriority: number | boolean = false;
  @Input() nzSortDirections: NzSortOrderType[] = ['ascend', 'descend', null];
  @Input() nzFilters: NzThFilterType = [];
  @Input() nzSortFn: NzSortCompareFn | null = null;
  @Input() nzFilterFn: NzFilterFn | null = null;
  @Input() @InputBoolean() nzShowSort = false;
  @Input() @InputBoolean() nzShowFilter = false;
  @Input() @InputBoolean() nzCustomFilter = false;
  @Output() readonly nzCheckedChange = new EventEmitter<boolean>();
  @Output() readonly nzSortOrderChange = new EventEmitter<string | null>();
  @Output() readonly nzFilterChange = new EventEmitter<NzFilterValue>();
  /** @deprecated use nzSortOrder instead **/
  @Input() nzSort: NzSortOrderType = null;
  /** @deprecated use nzSortOrderChange instead **/
  @Output() readonly nzSortChange = new EventEmitter<string | null>();

  nextSortValue(): void {
    if (this.nzShowSort) {
      const nextSortDirection = (sortDirections: NzSortOrderType[], current: NzSortOrderType) => {
        const index = sortDirections.indexOf(current);
        if (index === sortDirections.length - 1) {
          return sortDirections[0];
        } else {
          return sortDirections[index + 1];
        }
      };
      const nextOrder = nextSortDirection(this.nzSortDirections, this.nzSortOrder);
      this.manualClickOrder$.next(this);
      this.sortOrderChange$.next(nextOrder);
    }
  }

  setSortOrder(order: NzSortOrderType): void {
    this.nzSortOrder = order;
    this.sortOrder = order;
    this.nzSortChange.emit(order);
    this.nzSortOrderChange.emit(order);
    this.cdr.markForCheck();
  }

  clearSortOrder(): void {
    if (this.sortOrder !== null) {
      this.setSortOrder(null);
    }
  }

  onFilterValueChange(value: NzFilterValue): void {
    this.nzFilterChange.emit(value);
    this.nzFilterValue = value;
    this.updateCalcOperator();
  }

  updateCalcOperator(): void {
    if (this.nzSortFn || this.nzFilterFn) {
      this.calcOperatorChange$.next();
    }
  }

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    // TODO: need perf
    this.sortOrderChange$.pipe(takeUntil(this.destroy$)).subscribe(order => {
      if (this.sortOrder !== order) {
        this.setSortOrder(order);
        this.updateCalcOperator();
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { nzSortKey, nzSort, nzFilters, nzSortOrder, nzSortFn, nzFilterFn, nzSortPriority, nzFilterMultiple } = changes;
    if (nzSort) {
      this.nzSortOrder = this.nzSort;
      warnDeprecation(
        `'nzSort' and 'nzSortChange' is deprecated and will be removed in 10.0.0. Please use 'nzSortOrder' instead and 'nzSortOrderChange'!`
      );
    }
    const isFirstChange = (value: SimpleChange) => value && value.firstChange && value.currentValue !== undefined;
    if (isFirstChange(nzSortKey) || isFirstChange(nzSort) || isFirstChange(nzSortOrder) || isFirstChange(nzSortFn)) {
      this.nzShowSort = true;
    }
    if (isFirstChange(nzFilters)) {
      this.nzShowFilter = true;
    }
    if (nzFilters || nzFilterMultiple) {
      const listOfValue = this.nzFilters.filter(item => item.byDefault).map(item => item.value);
      this.nzFilterValue = this.nzFilterMultiple ? listOfValue : listOfValue[0] || null;
    }
    if (nzSortOrder) {
      if (this.nzSortOrder !== this.sortOrder) {
        this.updateCalcOperator();
      }
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
