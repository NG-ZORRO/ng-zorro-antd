/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { vi } from 'vitest';

import {
  createCriteriaFilterFn,
  getCriteriaFilterOperators,
  getDefaultCriteriaFilterOperator,
  isCriterionActive,
  parseFilterDate,
  serializeFilterDate
} from '../table-filter-criteria';
import {
  NzTableDateFilterConfig,
  NzTableNumberFilterConfig,
  NzTableTextFilterConfig,
  NzTableFilterCriterion
} from '../table.types';

interface Row {
  value: unknown;
}

const match = (
  config: NzTableTextFilterConfig<Row> | NzTableNumberFilterConfig<Row> | NzTableDateFilterConfig<Row>,
  criterion: NzTableFilterCriterion | null,
  ...values: unknown[]
): boolean[] => {
  const filterFn = createCriteriaFilterFn(config);
  return values.map(value => filterFn(criterion, { value }));
};

describe('table filter criteria', () => {
  const text: NzTableTextFilterConfig<Row> = { type: 'text', valueGetter: row => row.value as string };
  const number: NzTableNumberFilterConfig<Row> = { type: 'number', valueGetter: row => row.value as number };
  const date: NzTableDateFilterConfig<Row> = { type: 'date', valueGetter: row => row.value as Date };

  describe('text', () => {
    it('should match operators case-insensitively by default', () => {
      const values = ['Apple', 'pineapple', 'APPLE', 'Banana', null, '', 42];
      expect(match(text, { operator: 'contains', value: 'apple' }, ...values)).toEqual([
        true,
        true,
        true,
        false,
        false,
        false,
        false
      ]);
      expect(match(text, { operator: 'equals', value: 'apple' }, ...values.slice(0, 3))).toEqual([true, false, true]);
      expect(match(text, { operator: 'startsWith', value: 'pine' }, 'Pineapple', 'apple')).toEqual([true, false]);
      expect(match(text, { operator: 'endsWith', value: 'PLE' }, 'apple', 'apples')).toEqual([true, false]);
      expect(match(text, { operator: 'contains', value: '4' }, 42, 13)).toEqual([true, false]);
    });

    it('should respect case sensitivity', () => {
      expect(match(text, { operator: 'contains', value: 'App', caseSensitive: true }, 'Apple', 'apple')).toEqual([
        true,
        false
      ]);
    });

    it('should delegate fuzzy matching to the consumer and drop fuzzy without a matcher', () => {
      const fuzzyMatcher = vi.fn((query: string, value: string) => value.startsWith(query[0]));
      const config: NzTableTextFilterConfig<Row> = { ...text, fuzzyMatcher };

      expect(match(config, { operator: 'fuzzy', value: 'axz', caseSensitive: true }, 'abc', 'bcd')).toEqual([
        true,
        false
      ]);
      expect(fuzzyMatcher).toHaveBeenCalledWith('axz', 'abc', { caseSensitive: true });
      expect(getCriteriaFilterOperators(config)).toContain('fuzzy');
      expect(getCriteriaFilterOperators(text)).not.toContain('fuzzy');
    });

    it('should not filter with an empty criterion', () => {
      expect(match(text, { operator: 'contains', value: '' }, 'a', null)).toEqual([true, true]);
      expect(match(text, null, 'a')).toEqual([true]);
    });

    it('should remove an explicitly requested fuzzy operator without a matcher', () => {
      expect(getCriteriaFilterOperators({ ...text, operators: ['fuzzy', 'equals'] })).toEqual(['equals']);
      expect(match(text, { operator: 'fuzzy', value: 'apple' }, 'pear')).toEqual([true]);
    });
  });

  describe('number', () => {
    const values = [1, 5, 10, null, NaN];

    it('should compare with each operator', () => {
      expect(match(number, { operator: 'equals', value: 5 }, ...values)).toEqual([false, true, false, false, false]);
      expect(match(number, { operator: 'notEquals', value: 5 }, ...values)).toEqual([true, false, true, false, false]);
      expect(match(number, { operator: 'greaterThan', value: 5 }, ...values)).toEqual([
        false,
        false,
        true,
        false,
        false
      ]);
      expect(match(number, { operator: 'greaterThanOrEqual', value: 5 }, 1, 5, 10)).toEqual([false, true, true]);
      expect(match(number, { operator: 'lessThan', value: 5 }, 1, 5, 10)).toEqual([true, false, false]);
      expect(match(number, { operator: 'lessThanOrEqual', value: 5 }, 1, 5, 10)).toEqual([true, true, false]);
      expect(match(number, { operator: 'equals', value: 0 }, 0, 1)).toEqual([true, false]);
    });

    it('should support inclusive and open-ended between', () => {
      expect(match(number, { operator: 'between', value: 1, valueTo: 5 }, ...values)).toEqual([
        true,
        true,
        false,
        false,
        false
      ]);
      expect(match(number, { operator: 'between', value: 10, valueTo: 5 }, 5, 10, 11)).toEqual([true, true, false]);
      expect(match(number, { operator: 'between', value: null, valueTo: 5 }, 1, 6)).toEqual([true, false]);
      expect(match(number, { operator: 'between', value: null, valueTo: null }, 1, null)).toEqual([true, true]);
    });
  });

  describe('date', () => {
    const day = (value: string, time = '00:00'): Date => new Date(`${value}T${time}:00`);
    const values = [day('2024-01-01', '23:00'), day('2024-01-02', '08:00'), day('2024-01-03'), null, 'invalid'];

    it('should compare calendar days in date mode', () => {
      expect(match(date, { operator: 'on', value: '2024-01-02' }, ...values)).toEqual([
        false,
        true,
        false,
        false,
        false
      ]);
      expect(match(date, { operator: 'before', value: '2024-01-02' }, ...values.slice(0, 3))).toEqual([
        true,
        false,
        false
      ]);
      expect(match(date, { operator: 'after', value: '2024-01-02' }, ...values.slice(0, 3))).toEqual([
        false,
        false,
        true
      ]);
      expect(
        match(date, { operator: 'between', value: '2024-01-01', valueTo: '2024-01-02' }, ...values.slice(0, 3))
      ).toEqual([true, true, false]);
    });

    it('should compare instants in datetime mode and parse string row values', () => {
      const config: NzTableDateFilterConfig<Row> = { ...date, dateMode: 'datetime' };
      const noon = day('2024-01-02', '12:00').toISOString();

      expect(match(config, { operator: 'before', value: noon }, ...values.slice(0, 3))).toEqual([true, true, false]);
      expect(match(config, { operator: 'on', value: '2024-01-02' }, ...values.slice(0, 3))).toEqual([
        false,
        true,
        false
      ]);
      expect(match(config, { operator: 'after', value: noon }, day('2024-01-02', '13:00').toISOString())).toEqual([
        true
      ]);
    });

    it('should serialize and parse criterion dates', () => {
      const value = day('2024-03-04', '15:30');

      expect(serializeFilterDate(value)).toBe('2024-03-04');
      expect(serializeFilterDate(value, 'datetime')).toBe(value.toISOString());
      expect(serializeFilterDate(null)).toBeNull();
      expect(parseFilterDate('2024-03-04')).toEqual(day('2024-03-04'));
      expect(parseFilterDate('nope')).toBeNull();
    });

    it('should reject unsupported date inputs and serialize invalid dates as empty', () => {
      expect(parseFilterDate({ year: 2024 })).toBeNull();
      expect(parseFilterDate(false)).toBeNull();
      expect(parseFilterDate(day('2024-03-04').getTime())).toEqual(day('2024-03-04'));
      expect(serializeFilterDate(new Date('invalid'))).toBeNull();
    });

    it('should leave rows unchanged for inactive or invalid date criteria', () => {
      expect(match(date, null, ...values)).toEqual([true, true, true, true, true]);
      expect(match(date, { operator: 'before', value: 'invalid' }, day('2024-01-01'))).toEqual([true]);
    });

    it('should support either endpoint of an open-ended date range', () => {
      expect(match(date, { operator: 'between', value: null, valueTo: '2024-01-02' }, ...values)).toEqual([
        true,
        true,
        false,
        false,
        false
      ]);
      expect(match(date, { operator: 'between', value: '2024-01-02' }, ...values)).toEqual([
        false,
        true,
        true,
        false,
        false
      ]);
    });
  });

  it('should resolve default operators and active state', () => {
    expect(getDefaultCriteriaFilterOperator(number)).toBe('equals');
    expect(getDefaultCriteriaFilterOperator({ ...number, defaultOperator: 'between' })).toBe('between');
    expect(getDefaultCriteriaFilterOperator({ ...date, operators: ['after'], defaultOperator: 'on' })).toBe('after');
    expect(isCriterionActive({ operator: 'between', value: null, valueTo: 3 })).toBe(true);
    expect(isCriterionActive({ operator: 'equals', value: NaN })).toBe(false);
    expect(isCriterionActive(null)).toBe(false);
    expect(isCriterionActive({ value: 'missing operator' })).toBe(false);
    expect(isCriterionActive('not a criterion')).toBe(false);
  });
});
