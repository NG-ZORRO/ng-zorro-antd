/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/* eslint-disable @angular-eslint/component-selector */
import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnChanges,
  OnInit,
  Output,
  SimpleChange,
  SimpleChanges,
  ViewEncapsulation,
  booleanAttribute,
  inject,
  DestroyRef
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

import { NzConfigKey, NzConfigService, WithConfig } from 'ng-zorro-antd/core/config';
import { fromEventOutsideAngular } from 'ng-zorro-antd/core/util';

import { NzTableFilterComponent } from '../addon/filter.component';
import { NzTableSortersComponent } from '../addon/sorters.component';
import {
  NzTableFilterFn,
  NzTableFilterList,
  NzTableFilterValue,
  NzTableSortFn,
  NzTableSortOrder
} from '../table.types';

const NZ_CONFIG_MODULE_NAME: NzConfigKey = 'table';

@Component({
  selector:
    'th[nzColumnKey], th[nzSortFn], th[nzSortOrder], th[nzFilters], th[nzShowSort], th[nzShowFilter], th[nzCustomFilter]',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (nzShowFilter || nzCustomFilter) {
      <nz-table-filter
        [contentTemplate]="notFilterTemplate"
        [extraTemplate]="extraTemplate"
        [customFilter]="nzCustomFilter"
        [filterMultiple]="nzFilterMultiple"
        [listOfFilter]="nzFilters"
        (filterChange)="onFilterValueChange($event)"
      ></nz-table-filter>
    } @else {
      <ng-container [ngTemplateOutlet]="notFilterTemplate"></ng-container>
    }
    <ng-template #notFilterTemplate>
      <ng-template [ngTemplateOutlet]="nzShowSort ? sortTemplate : contentTemplate"></ng-template>
    </ng-template>
    <ng-template #extraTemplate>
      <ng-content select="[nz-th-extra]"></ng-content>
      <ng-content select="nz-filter-trigger"></ng-content>
    </ng-template>
    <ng-template #sortTemplate>
      <nz-table-sorters
        [sortOrder]="sortOrder"
        [sortDirections]="sortDirections"
        [contentTemplate]="contentTemplate"
      ></nz-table-sorters>
    </ng-template>
    <ng-template #contentTemplate>
      <ng-content></ng-content>
    </ng-template>
  `,
  host: {
    '[class.ant-table-column-has-sorters]': 'nzShowSort',
    '[class.ant-table-column-sort]': `sortOrder === 'descend' || sortOrder === 'ascend'`
  },
  imports: [NzTableFilterComponent, NgTemplateOutlet, NzTableSortersComponent]
})
export class NzThAddOnComponent<T> implements OnChanges, OnInit {
  readonly _nzModuleName: NzConfigKey = NZ_CONFIG_MODULE_NAME;

  nzConfigService = inject(NzConfigService);
  private el: HTMLElement = inject(ElementRef<HTMLElement>).nativeElement;
  private destroyRef = inject(DestroyRef);
  private cdr = inject(ChangeDetectorRef);
  private ngZone = inject(NgZone);

  manualClickOrder$ = new Subject<NzThAddOnComponent<T>>();
  calcOperatorChange$ = new Subject<void>();
  nzFilterValue: NzTableFilterValue = null;
  sortOrder: NzTableSortOrder = null;
  sortDirections: NzTableSortOrder[] = ['ascend', 'descend', null];
  private sortOrderChange$ = new Subject<NzTableSortOrder>();
  private isNzShowSortChanged = false;
  private isNzShowFilterChanged = false;
  @Input() nzColumnKey?: string;
  @Input() nzFilterMultiple = true;
  @Input() nzSortOrder: NzTableSortOrder = null;
  @Input() nzSortPriority: number | boolean = false;
  @Input() @WithConfig() nzSortDirections: NzTableSortOrder[] = ['ascend', 'descend', null];
  @Input() nzFilters: NzTableFilterList = [];
  @Input() nzSortFn: NzTableSortFn<T> | boolean | null = null;
  @Input() nzFilterFn: NzTableFilterFn<T> | boolean | null = null;
  @Input({ transform: booleanAttribute }) nzShowSort = false;
  @Input({ transform: booleanAttribute }) nzShowFilter = false;
  @Input({ transform: booleanAttribute }) nzCustomFilter = false;
  @Output() readonly nzCheckedChange = new EventEmitter<boolean>();
  @Output() readonly nzSortOrderChange = new EventEmitter<string | null>();
  @Output() readonly nzFilterChange = new EventEmitter<NzTableFilterValue>();

  getNextSortDirection(sortDirections: NzTableSortOrder[], current: NzTableSortOrder): NzTableSortOrder {
    const index = sortDirections.indexOf(current);
    if (index === sortDirections.length - 1) {
      return sortDirections[0];
    } else {
      return sortDirections[index + 1];
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

  ngOnInit(): void {
    fromEventOutsideAngular(this.el, 'click')
      .pipe(
        filter(() => this.nzShowSort),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => {
        const nextOrder = this.getNextSortDirection(this.sortDirections, this.sortOrder!);
        this.ngZone.run(() => {
          this.setSortOrder(nextOrder);
          this.manualClickOrder$.next(this);
        });
      });

    this.sortOrderChange$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(order => {
      if (this.sortOrder !== order) {
        this.sortOrder = order;
        this.nzSortOrderChange.emit(order);
      }
      this.updateCalcOperator();
      this.cdr.markForCheck();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const {
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
    const isFirstChange = (value: SimpleChange): boolean =>
      value && value.firstChange && value.currentValue !== undefined;
    if ((isFirstChange(nzSortOrder) || isFirstChange(nzSortFn)) && !this.isNzShowSortChanged) {
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
}
