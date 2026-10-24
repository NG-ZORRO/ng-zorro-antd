/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NzSafeAny } from 'ng-zorro-antd/core/types';

import {
  NzTableFilterFn,
  NzTableFilterOptionDateMode,
  NzTableFilterOptionValue,
  NzTableFilterValue,
  NzTableOptionsFilterConfig
} from './table.types';

export const NZ_TABLE_FILTER_EMPTY_KEY = 'empty';

export interface NzTableFilterOption {
  key: string;
  /** `null` represents the empty option. Hand-written options may hold any value. */
  value: NzTableFilterOptionValue | null | NzSafeAny;
  /** Label of a hand-written option. */
  text?: string;
}

export interface NzTableFilterOptionsResult {
  options: NzTableFilterOption[];
  hasUnsupportedValue: boolean;
}

const padNumber = (value: number, length = 2): string => `${value}`.padStart(length, '0');

const formatLocalDate = (date: Date): string =>
  `${padNumber(date.getFullYear(), 4)}-${padNumber(date.getMonth() + 1)}-${padNumber(date.getDate())}`;

/**
 * Returns a type-aware key used to deduplicate and match option values.
 * Returns `undefined` for values that cannot be used as options.
 */
export function getFilterOptionKey(value: unknown, dateMode: NzTableFilterOptionDateMode = 'date'): string | undefined {
  if (value === null || value === undefined || value === '') {
    return NZ_TABLE_FILTER_EMPTY_KEY;
  }
  switch (typeof value) {
    case 'string':
      return `string:${value}`;
    case 'number':
      return Number.isNaN(value) ? NZ_TABLE_FILTER_EMPTY_KEY : `number:${value}`;
    case 'boolean':
      return `boolean:${value}`;
    default:
      if (value instanceof Date) {
        const time = value.getTime();
        if (Number.isNaN(time)) {
          return NZ_TABLE_FILTER_EMPTY_KEY;
        }
        return dateMode === 'datetime' ? `date:${time}` : `date:${formatLocalDate(value)}`;
      }
      return undefined;
  }
}

const getTypeRank = (value: NzTableFilterOptionValue): number => {
  if (value instanceof Date) {
    return 3;
  }
  return ['string', 'number', 'boolean'].indexOf(typeof value);
};

export function compareFilterOptionValues(a: NzTableFilterOptionValue, b: NzTableFilterOptionValue): number {
  const rankDiff = getTypeRank(a) - getTypeRank(b);
  if (rankDiff !== 0) {
    return rankDiff;
  }
  if (typeof a === 'string' && typeof b === 'string') {
    return a.localeCompare(b);
  }
  if (a instanceof Date && b instanceof Date) {
    return a.getTime() - b.getTime();
  }
  return Number(a) - Number(b);
}

export function formatFilterOptionValue(
  value: NzTableFilterOptionValue,
  dateMode: NzTableFilterOptionDateMode = 'date'
): string {
  if (value instanceof Date) {
    return dateMode === 'datetime' ? value.toISOString() : formatLocalDate(value);
  }
  return `${value}`;
}

const toArray = (value: NzTableFilterValue): unknown[] => {
  if (value === null || value === undefined) {
    return [];
  }
  return Array.isArray(value) ? value : [value];
};

export function getFilterOptionKeySet(
  value: NzTableFilterValue,
  dateMode: NzTableFilterOptionDateMode = 'date'
): Set<string> {
  const keys = new Set<string>();
  for (const item of toArray(value)) {
    const key = getFilterOptionKey(item, dateMode);
    if (key !== undefined) {
      keys.add(key);
    }
  }
  return keys;
}

/**
 * Builds unique options from all source rows. Selected values missing from the data are kept so that they stay
 * visible and can be cleared.
 */
export function buildFilterOptions<T>(
  data: readonly T[],
  config: NzTableOptionsFilterConfig<T>,
  selectedValue: NzTableFilterValue = null
): NzTableFilterOptionsResult {
  const { dateMode = 'date', sortFn = compareFilterOptionValues, valueGetter, options: source = 'auto' } = config;
  if (source !== 'auto') {
    return {
      options: source.map((item, index) => {
        const key = getFilterOptionKey(item.value, dateMode);
        return {
          key: key ?? `custom:${index}`,
          value: item.value,
          text: item.text
        };
      }),
      hasUnsupportedValue: false
    };
  }
  if (!valueGetter) {
    return { options: [], hasUnsupportedValue: false };
  }
  const optionMap = new Map<string, NzTableFilterOption>();
  let hasUnsupportedValue = false;

  const addValue = (value: unknown): boolean => {
    const key = getFilterOptionKey(value, dateMode);
    if (key === undefined) {
      return false;
    }
    if (!optionMap.has(key)) {
      optionMap.set(key, {
        key,
        value: key === NZ_TABLE_FILTER_EMPTY_KEY ? null : (value as NzTableFilterOptionValue)
      });
    }
    return true;
  };

  for (const item of data) {
    if (!addValue(valueGetter(item))) {
      hasUnsupportedValue = true;
    }
  }
  toArray(selectedValue).forEach(addValue);

  const emptyOption = optionMap.get(NZ_TABLE_FILTER_EMPTY_KEY);
  optionMap.delete(NZ_TABLE_FILTER_EMPTY_KEY);
  const options = [...optionMap.values()].sort((a, b) => sortFn(a.value!, b.value!));
  if (emptyOption) {
    options.push(emptyOption);
  }
  return { options, hasUnsupportedValue };
}

export function createOptionsFilterFn<T>(config: NzTableOptionsFilterConfig<T>): NzTableFilterFn<T> | null {
  const { dateMode = 'date', valueGetter } = config;
  if (!valueGetter) {
    return null;
  }
  let lastFilterValue: NzTableFilterValue = undefined;
  let selectedKeys = new Set<string>();

  return (filterValue: NzTableFilterValue, data: T): boolean => {
    if (filterValue !== lastFilterValue) {
      lastFilterValue = filterValue;
      selectedKeys = getFilterOptionKeySet(filterValue, dateMode);
    }
    const key = getFilterOptionKey(valueGetter(data), dateMode);
    return key !== undefined && selectedKeys.has(key);
  };
}
