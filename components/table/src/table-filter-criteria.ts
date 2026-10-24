/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { warn } from 'ng-zorro-antd/core/logger';

import {
  NzTableCriteriaFilterConfig,
  NzTableDateFilterConfig,
  NzTableDateFilterCriterion,
  NzTableDateFilterOperator,
  NzTableFilterFn,
  NzTableFilterOptionDateMode,
  NzTableNumberFilterConfig,
  NzTableNumberFilterCriterion,
  NzTableNumberFilterOperator,
  NzTableTextFilterConfig,
  NzTableTextFilterCriterion,
  NzTableTextFilterOperator
} from './table.types';

export const NZ_TABLE_TEXT_FILTER_OPERATORS: NzTableTextFilterOperator[] = [
  'contains',
  'equals',
  'startsWith',
  'endsWith',
  'fuzzy'
];
export const NZ_TABLE_NUMBER_FILTER_OPERATORS: NzTableNumberFilterOperator[] = [
  'equals',
  'notEquals',
  'greaterThan',
  'greaterThanOrEqual',
  'lessThan',
  'lessThanOrEqual',
  'between'
];
export const NZ_TABLE_DATE_FILTER_OPERATORS: NzTableDateFilterOperator[] = ['on', 'before', 'after', 'between'];

type NzTableCriteriaFilterOperator =
  NzTableTextFilterOperator | NzTableNumberFilterOperator | NzTableDateFilterOperator;

/** Returns the operators available for a criteria config. `'fuzzy'` is dropped when no `fuzzyMatcher` is given. */
export function getCriteriaFilterOperators<T>(config: NzTableCriteriaFilterConfig<T>): NzTableCriteriaFilterOperator[] {
  switch (config.type) {
    case 'text': {
      const operators = config.operators ?? NZ_TABLE_TEXT_FILTER_OPERATORS;
      if (config.fuzzyMatcher) {
        return operators;
      }
      if (config.operators?.includes('fuzzy')) {
        warn('The `fuzzy` text filter operator requires `fuzzyMatcher`; it has been removed from the operators.');
      }
      return operators.filter(operator => operator !== 'fuzzy');
    }
    case 'number':
      return config.operators ?? NZ_TABLE_NUMBER_FILTER_OPERATORS;
    case 'date':
      return config.operators ?? NZ_TABLE_DATE_FILTER_OPERATORS;
  }
}

export function getDefaultCriteriaFilterOperator<T>(
  config: NzTableCriteriaFilterConfig<T>
): NzTableCriteriaFilterOperator {
  const operators = getCriteriaFilterOperators(config);
  const { defaultOperator } = config;
  return defaultOperator && (operators as string[]).includes(defaultOperator) ? defaultOperator : operators[0];
}

const isEmptyText = (value: unknown): boolean => value === null || value === undefined || value === '';

const isValidNumber = (value: unknown): value is number => typeof value === 'number' && !Number.isNaN(value);

const padNumber = (value: number, length = 2): string => `${value}`.padStart(length, '0');

/** Formats a date as a local `yyyy-MM-dd` string. */
export function formatFilterDate(date: Date): string {
  return `${padNumber(date.getFullYear(), 4)}-${padNumber(date.getMonth() + 1)}-${padNumber(date.getDate())}`;
}

/** Parses a `yyyy-MM-dd` string as a local date, or any other value with `new Date()`. */
export function parseFilterDate(value: unknown): Date | null {
  if (value === null || value === undefined || value === '') {
    return null;
  }
  let date: Date;
  if (value instanceof Date) {
    date = value;
  } else if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const [year, month, day] = value.split('-').map(Number);
    date = new Date(year, month - 1, day);
  } else if (typeof value === 'string' || typeof value === 'number') {
    date = new Date(value);
  } else {
    return null;
  }
  return Number.isNaN(date.getTime()) ? null : date;
}

/** Serializes a date for a criterion in the given date mode. */
export function serializeFilterDate(date: Date | null, dateMode: NzTableFilterOptionDateMode = 'date'): string | null {
  if (!date || Number.isNaN(date.getTime())) {
    return null;
  }
  return dateMode === 'datetime' ? date.toISOString() : formatFilterDate(date);
}

/** Whether a criterion holds enough input to filter rows. */
export function isCriterionActive(criterion: unknown): boolean {
  if (!criterion || typeof criterion !== 'object') {
    return false;
  }
  const { operator, value, valueTo } = criterion as { operator?: string; value?: unknown; valueTo?: unknown };
  if (!operator) {
    return false;
  }
  const hasValue = (item: unknown): boolean => !isEmptyText(item) && !(typeof item === 'number' && Number.isNaN(item));
  return operator === 'between' ? hasValue(value) || hasValue(valueTo) : hasValue(value);
}

function createTextFilterFn<T>(config: NzTableTextFilterConfig<T>): NzTableFilterFn<T> {
  const { valueGetter, fuzzyMatcher } = config;
  return (criterion: NzTableTextFilterCriterion, data: T): boolean => {
    if (!isCriterionActive(criterion)) {
      return true;
    }
    const rawValue = valueGetter(data);
    if (isEmptyText(rawValue) || (typeof rawValue === 'number' && Number.isNaN(rawValue))) {
      return false;
    }
    const caseSensitive = !!criterion.caseSensitive;
    if (criterion.operator === 'fuzzy') {
      return fuzzyMatcher ? fuzzyMatcher(criterion.value, `${rawValue}`, { caseSensitive }) : true;
    }
    const value = caseSensitive ? `${rawValue}` : `${rawValue}`.toLocaleLowerCase();
    const query = caseSensitive ? criterion.value : criterion.value.toLocaleLowerCase();
    switch (criterion.operator) {
      case 'equals':
        return value === query;
      case 'startsWith':
        return value.startsWith(query);
      case 'endsWith':
        return value.endsWith(query);
      case 'contains':
      default:
        return value.includes(query);
    }
  };
}

function createNumberFilterFn<T>(config: NzTableNumberFilterConfig<T>): NzTableFilterFn<T> {
  const { valueGetter } = config;
  return (criterion: NzTableNumberFilterCriterion, data: T): boolean => {
    if (!isCriterionActive(criterion)) {
      return true;
    }
    const value = valueGetter(data);
    if (!isValidNumber(value)) {
      return false;
    }
    const { operator } = criterion;
    if (operator === 'between') {
      const from = isValidNumber(criterion.value) ? criterion.value : -Infinity;
      const to = isValidNumber(criterion.valueTo) ? criterion.valueTo : Infinity;
      return value >= Math.min(from, to) && value <= Math.max(from, to);
    }
    const target = criterion.value as number;
    switch (operator) {
      case 'notEquals':
        return value !== target;
      case 'greaterThan':
        return value > target;
      case 'greaterThanOrEqual':
        return value >= target;
      case 'lessThan':
        return value < target;
      case 'lessThanOrEqual':
        return value <= target;
      case 'equals':
      default:
        return value === target;
    }
  };
}

function createDateFilterFn<T>(config: NzTableDateFilterConfig<T>): NzTableFilterFn<T> {
  const { valueGetter, dateMode = 'date' } = config;
  // Calendar days are compared as `yyyy-MM-dd` strings, instants as timestamps.
  const toComparable = (date: Date, byDay: boolean): string | number =>
    byDay ? formatFilterDate(date) : date.getTime();
  return (criterion: NzTableDateFilterCriterion, data: T): boolean => {
    if (!isCriterionActive(criterion)) {
      return true;
    }
    const date = parseFilterDate(valueGetter(data));
    if (!date) {
      return false;
    }
    const { operator } = criterion;
    const byDay = dateMode === 'date' || operator === 'on';
    const value = toComparable(date, byDay);
    const from = parseFilterDate(criterion.value);
    if (operator === 'between') {
      const to = parseFilterDate(criterion.valueTo);
      const lower = from && toComparable(from, byDay);
      const upper = to && toComparable(to, byDay);
      return (lower === null || value >= lower) && (upper === null || value <= upper);
    }
    if (!from) {
      return true;
    }
    const target = toComparable(from, byDay);
    switch (operator) {
      case 'before':
        return value < target;
      case 'after':
        return value > target;
      case 'on':
      default:
        return value === target;
    }
  };
}

export function createCriteriaFilterFn<T>(config: NzTableCriteriaFilterConfig<T>): NzTableFilterFn<T> {
  switch (config.type) {
    case 'text':
      return createTextFilterFn(config);
    case 'number':
      return createNumberFilterFn(config);
    case 'date':
      return createDateFilterFn(config);
  }
}
