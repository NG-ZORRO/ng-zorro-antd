/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NzSafeAny } from 'ng-zorro-antd/core/types';

export type NzTableLayout = 'fixed' | 'auto';
export type NzTablePaginationPosition = 'top' | 'bottom' | 'both';
export type NzTablePaginationType = 'default' | 'small';
export type NzTableSize = 'middle' | 'default' | 'small';
export type NzTableFilterList = Array<{ text: string; value: NzSafeAny; byDefault?: boolean }>;
export type NzTableSortOrder = string | 'ascend' | 'descend' | null;
export type NzTableSortFn<T = unknown> = (a: T, b: T, sortOrder?: NzTableSortOrder) => number;
export type NzTableFilterValue = NzSafeAny[] | NzSafeAny;
export type NzTableFilterFn<T = unknown> = (value: NzTableFilterValue, data: T) => boolean;
export type NzTableFilterOptionValue = string | number | boolean | Date;
/**
 * - `date`: compare `Date` values by local calendar day
 * - `datetime`: compare `Date` values by exact timestamp
 */
export type NzTableFilterOptionDateMode = 'date' | 'datetime';

export interface NzTableOptionsFilterConfig<T = unknown> {
  type: 'options';
  /**
   * Reads the value to filter from a row. `null`, `undefined`, `''`, `NaN` and invalid dates are grouped as empty.
   * Required when `options` is `'auto'`. When omitted, the table does not filter locally (use `nzFilterFn`).
   */
  valueGetter?: (data: T) => NzTableFilterOptionValue | null | undefined;
  /** `'auto'` (default) generates options from the unique row values; otherwise the given list is used. */
  options?: 'auto' | NzTableFilterList;
  /** Defaults to `'date'`. */
  dateMode?: NzTableFilterOptionDateMode;
  labelFormatter?: (value: NzTableFilterOptionValue) => string;
  /** Sorts non-empty generated option values. The empty option is always listed last. */
  sortFn?: (a: NzTableFilterOptionValue, b: NzTableFilterOptionValue) => number;
}

export type NzTableTextFilterOperator = 'contains' | 'equals' | 'startsWith' | 'endsWith' | 'fuzzy';
export type NzTableTextFilterMatcher = (query: string, value: string, options: { caseSensitive: boolean }) => boolean;

export interface NzTableTextFilterConfig<T = unknown> {
  type: 'text';
  /** Numbers are converted to strings. `null`, `undefined` and `''` never match. */
  valueGetter: (data: T) => string | number | null | undefined;
  /** Defaults to `['contains', 'equals', 'startsWith', 'endsWith']`, plus `'fuzzy'` when `fuzzyMatcher` is set. */
  operators?: NzTableTextFilterOperator[];
  /** Defaults to the first operator. */
  defaultOperator?: NzTableTextFilterOperator;
  /** Initial state of the "Match case" toggle. Defaults to `false`. */
  caseSensitive?: boolean;
  /** Required by the `'fuzzy'` operator. */
  fuzzyMatcher?: NzTableTextFilterMatcher;
  placeholder?: string;
}

export interface NzTableTextFilterCriterion {
  operator: NzTableTextFilterOperator;
  value: string;
  caseSensitive?: boolean;
}

export type NzTableNumberFilterOperator =
  'equals' | 'notEquals' | 'greaterThan' | 'greaterThanOrEqual' | 'lessThan' | 'lessThanOrEqual' | 'between';

export interface NzTableNumberFilterConfig<T = unknown> {
  type: 'number';
  /** `null`, `undefined` and `NaN` never match. */
  valueGetter: (data: T) => number | null | undefined;
  /** Defaults to all number operators. */
  operators?: NzTableNumberFilterOperator[];
  /** Defaults to the first operator. */
  defaultOperator?: NzTableNumberFilterOperator;
  step?: number;
}

export interface NzTableNumberFilterCriterion {
  operator: NzTableNumberFilterOperator;
  value: number | null;
  /** Upper bound of `'between'` (inclusive). */
  valueTo?: number | null;
}

export type NzTableDateFilterOperator = 'on' | 'before' | 'after' | 'between';

export interface NzTableDateFilterConfig<T = unknown> {
  type: 'date';
  /** Strings and numbers are parsed with `new Date()`. Empty and invalid dates never match. */
  valueGetter: (data: T) => Date | string | number | null | undefined;
  /**
   * - `date` (default): compare by local calendar day, criterion values are `yyyy-MM-dd` strings
   * - `datetime`: compare exact instants, criterion values are ISO strings (`on` still compares calendar days)
   */
  dateMode?: NzTableFilterOptionDateMode;
  /** Defaults to `['on', 'before', 'after', 'between']`. */
  operators?: NzTableDateFilterOperator[];
  /** Defaults to the first operator. */
  defaultOperator?: NzTableDateFilterOperator;
}

export interface NzTableDateFilterCriterion {
  operator: NzTableDateFilterOperator;
  value: string | null;
  /** Upper bound of `'between'` (inclusive). */
  valueTo?: string | null;
}

export type NzTableCriteriaFilterConfig<T = unknown> =
  NzTableTextFilterConfig<T> | NzTableNumberFilterConfig<T> | NzTableDateFilterConfig<T>;

export type NzTableFilterCriterion =
  NzTableTextFilterCriterion | NzTableNumberFilterCriterion | NzTableDateFilterCriterion;

export type NzTableFilterConfig<T = unknown> = NzTableOptionsFilterConfig<T> | NzTableCriteriaFilterConfig<T>;

export interface NzTableQueryParams {
  pageIndex: number;
  pageSize: number;
  sort: Array<{ key: string; value: NzTableSortOrder }>;
  filter: Array<{ key: string; value: NzTableFilterValue }>;
}

export interface NzCustomColumn {
  value: string;
  default: boolean;
  width: number;
  fixWidth?: boolean;
}

export type NzTableSummaryFixedType = 'top' | 'bottom';
