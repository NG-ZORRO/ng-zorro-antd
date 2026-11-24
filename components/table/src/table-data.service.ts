/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { DestroyRef, inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, skip, switchMap } from 'rxjs/operators';

import { arraysEqual } from 'ng-zorro-antd/core/util';

import {
  NzCustomColumn,
  NzTableFilterFn,
  NzTableFilterValue,
  NzTableQueryParams,
  NzTableSortFn,
  NzTableSortOrder
} from './table.types';

/** The fields of a `listOfCalcOperator$` item that `nzQueryParams` depends on. */
interface CalcOperator {
  key?: string;
  sortFn: unknown;
  sortOrder: NzTableSortOrder;
  sortPriority: number | boolean;
  filterFn: unknown;
  filterValue: NzTableFilterValue;
}

function isResetFilterValue(value: NzTableFilterValue): boolean {
  return value === null || value === undefined || (Array.isArray(value) && value.length === 0);
}

function isSameFilterValue(previous: NzTableFilterValue, current: NzTableFilterValue): boolean {
  return previous === current || (Array.isArray(previous) && Array.isArray(current) && arraysEqual(previous, current));
}

function isActiveSort(item: CalcOperator): boolean {
  return !!item.sortFn && item.sortOrder !== null;
}

function isActiveFilter(item: CalcOperator): boolean {
  return !!item.filterFn && !isResetFilterValue(item.filterValue);
}

/**
 * Only what a server-side query depends on is compared: page, active sort orders with their priority,
 * and non-reset filter values. Showing or hiding a column without an active sort or filter is therefore
 * not a change and does not emit `nzQueryParams`.
 */
function isSameQuery(
  [previousPageIndex, previousPageSize, previousListOfCalc]: [number, number, CalcOperator[]],
  [pageIndex, pageSize, listOfCalc]: [number, number, CalcOperator[]]
): boolean {
  const previousSort = previousListOfCalc.filter(isActiveSort);
  const currentSort = listOfCalc.filter(isActiveSort);
  const previousFilter = previousListOfCalc.filter(isActiveFilter);
  const currentFilter = listOfCalc.filter(isActiveFilter);
  return (
    previousPageIndex === pageIndex &&
    previousPageSize === pageSize &&
    previousSort.length === currentSort.length &&
    previousSort.every(
      (item, index) =>
        item.key === currentSort[index].key &&
        item.sortOrder === currentSort[index].sortOrder &&
        item.sortPriority === currentSort[index].sortPriority
    ) &&
    previousFilter.length === currentFilter.length &&
    previousFilter.every(
      (item, index) =>
        item.key === currentFilter[index].key && isSameFilterValue(item.filterValue, currentFilter[index].filterValue)
    )
  );
}

@Injectable()
export class NzTableDataService<T> {
  private destroyRef = inject(DestroyRef);
  private pageIndex$ = new BehaviorSubject<number>(1);
  private frontPagination$ = new BehaviorSubject<boolean>(true);
  private pageSize$ = new BehaviorSubject<number>(10);
  private listOfData$ = new BehaviorSubject<readonly T[]>([]);
  listOfCustomColumn$ = new BehaviorSubject<NzCustomColumn[]>([]);
  pageIndexDistinct$ = this.pageIndex$.pipe(distinctUntilChanged());
  pageSizeDistinct$ = this.pageSize$.pipe(distinctUntilChanged());
  listOfCalcOperator$ = new BehaviorSubject<
    Array<{
      key?: string;
      sortFn: NzTableSortFn<T> | null | boolean;
      sortOrder: NzTableSortOrder;
      filterFn: NzTableFilterFn<T> | null | boolean;
      filterValue: NzTableFilterValue;
      sortPriority: number | boolean;
    }>
  >([]);
  queryParams$: Observable<NzTableQueryParams> = combineLatest([
    this.pageIndexDistinct$,
    this.pageSizeDistinct$,
    this.listOfCalcOperator$
  ]).pipe(
    debounceTime(0),
    skip(1),
    distinctUntilChanged(isSameQuery),
    map(([pageIndex, pageSize, listOfCalc]) => ({
      pageIndex,
      pageSize,
      sort: listOfCalc
        .filter(item => item.sortFn)
        .map(item => ({
          key: item.key!,
          value: item.sortOrder
        })),
      filter: listOfCalc
        .filter(item => item.filterFn)
        .map(item => ({
          key: item.key!,
          value: item.filterValue
        }))
    }))
  );
  private listOfDataAfterCalc$ = combineLatest([this.listOfData$, this.listOfCalcOperator$]).pipe(
    map(([listOfData, listOfCalcOperator]) => {
      let listOfDataAfterCalc = [...listOfData];
      const listOfFilterOperator = listOfCalcOperator.filter(
        item => !isResetFilterValue(item.filterValue) && typeof item.filterFn === 'function'
      );
      for (const item of listOfFilterOperator) {
        const { filterFn, filterValue } = item;
        listOfDataAfterCalc = listOfDataAfterCalc.filter(data => (filterFn as NzTableFilterFn<T>)(filterValue, data));
      }
      const listOfSortOperator = listOfCalcOperator
        .filter(item => item.sortOrder !== null && typeof item.sortFn === 'function')
        .sort((a, b) => +b.sortPriority - +a.sortPriority);
      if (listOfCalcOperator.length) {
        listOfDataAfterCalc.sort((record1, record2) => {
          for (const item of listOfSortOperator) {
            const { sortFn, sortOrder } = item;
            if (sortFn && sortOrder) {
              const compareResult = (sortFn as NzTableSortFn<T>)(record1, record2, sortOrder);
              if (compareResult !== 0) {
                return sortOrder === 'ascend' ? compareResult : -compareResult;
              }
            }
          }
          return 0;
        });
      }
      return listOfDataAfterCalc;
    })
  );
  private listOfFrontEndCurrentPageData$ = combineLatest([
    this.pageIndexDistinct$,
    this.pageSizeDistinct$,
    this.listOfDataAfterCalc$
  ]).pipe(
    takeUntilDestroyed(this.destroyRef),
    filter(value => {
      const [pageIndex, pageSize, listOfData] = value;
      const maxPageIndex = pageSize > 0 ? Math.ceil(listOfData.length / pageSize) || 1 : 1;
      return pageIndex <= maxPageIndex;
    }),
    map(([pageIndex, pageSize, listOfData]) =>
      pageSize > 0 ? listOfData.slice((pageIndex - 1) * pageSize, pageIndex * pageSize) : listOfData
    )
  );
  listOfCurrentPageData$ = this.frontPagination$.pipe(
    switchMap(pagination => (pagination ? this.listOfFrontEndCurrentPageData$ : this.listOfDataAfterCalc$))
  );
  total$ = this.frontPagination$.pipe(
    switchMap(pagination => (pagination ? this.listOfDataAfterCalc$ : this.listOfData$)),
    map(list => list.length),
    distinctUntilChanged()
  );

  updatePageSize(size: number): void {
    this.pageSize$.next(size);
  }
  updateFrontPagination(pagination: boolean): void {
    this.frontPagination$.next(pagination);
  }
  updatePageIndex(index: number): void {
    this.pageIndex$.next(index);
  }
  updateListOfData(list: readonly T[]): void {
    this.listOfData$.next(list);
  }
  updateListOfCustomColumn(list: NzCustomColumn[]): void {
    this.listOfCustomColumn$.next(list);
  }
}
