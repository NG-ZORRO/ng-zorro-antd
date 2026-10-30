/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  buildFilterOptions,
  createOptionsFilterFn,
  formatFilterOptionValue,
  getFilterOptionKey
} from '../table-filter-options';
import { NzTableOptionsFilterConfig } from '../table.types';

interface Row {
  value: unknown;
}

const config = (overrides: Partial<NzTableOptionsFilterConfig<Row>> = {}): NzTableOptionsFilterConfig<Row> => ({
  type: 'options',
  valueGetter: row => row.value as string,
  ...overrides
});

const rows = (...values: unknown[]): Row[] => values.map(value => ({ value }));

describe('table filter options', () => {
  it('should deduplicate values and list the empty option last', () => {
    const { options } = buildFilterOptions(rows('c', 'a', null, 'b', 'a', undefined, '', 'c'), config());

    expect(options.map(option => option.value)).toEqual(['a', 'b', 'c', null]);
  });

  it('should keep values of different types distinct', () => {
    expect(getFilterOptionKey(1)).not.toBe(getFilterOptionKey('1'));
    expect(getFilterOptionKey(true)).not.toBe(getFilterOptionKey('true'));
  });

  it('should treat NaN, invalid dates, and empty values as empty', () => {
    const emptyKey = getFilterOptionKey(null);

    expect([undefined, '', NaN, new Date('invalid')].map(value => getFilterOptionKey(value))).toEqual([
      emptyKey,
      emptyKey,
      emptyKey,
      emptyKey
    ]);
    expect(getFilterOptionKey(' ')).not.toBe(emptyKey);
  });

  it('should compare dates by calendar day or exact time', () => {
    const morning = new Date(2024, 0, 1, 8);
    const evening = new Date(2024, 0, 1, 20);

    expect(getFilterOptionKey(morning)).toBe(getFilterOptionKey(evening));
    expect(getFilterOptionKey(morning, 'datetime')).not.toBe(getFilterOptionKey(evening, 'datetime'));
    expect(getFilterOptionKey(morning, 'datetime')).toBe(getFilterOptionKey(new Date(morning), 'datetime'));
  });

  it('should sort numbers numerically and support a custom sort', () => {
    const data = rows(10, 9, 100);

    expect(buildFilterOptions(data, config()).options.map(option => option.value)).toEqual([9, 10, 100]);
    expect(
      buildFilterOptions(data, config({ sortFn: (a, b) => Number(b) - Number(a) })).options.map(option => option.value)
    ).toEqual([100, 10, 9]);
  });

  it('should sort mixed types consistently and dates chronologically', () => {
    const earlier = new Date(2024, 0, 1);
    const later = new Date(2024, 0, 2);
    const { options } = buildFilterOptions(rows(later, true, 2, 'a', earlier, false), config());

    expect(options.map(option => option.value)).toEqual(['a', 2, false, true, earlier, later]);
    expect(formatFilterOptionValue(earlier)).toBe('2024-01-01');
    expect(formatFilterOptionValue(earlier, 'datetime')).toBe(earlier.toISOString());
    expect(formatFilterOptionValue(false)).toBe('false');
  });

  it('should leave automatic options empty without a value getter', () => {
    expect(buildFilterOptions(rows('a'), { type: 'options' })).toEqual({
      options: [],
      hasUnsupportedValue: false
    });
  });

  it('should report and skip unsupported values', () => {
    const result = buildFilterOptions(rows('a', ['b'], { value: 'c' }), config());

    expect(result.hasUnsupportedValue).toBe(true);
    expect(result.options.map(option => option.value)).toEqual(['a']);
  });

  it('should keep selected values that are missing from the data', () => {
    const { options } = buildFilterOptions(rows('a'), config(), ['z', null]);

    expect(options.map(option => option.value)).toEqual(['a', 'z', null]);
  });

  it('should match selected values and empty values', () => {
    const filterFn = createOptionsFilterFn(config())!;
    const selected = ['a', null];

    expect(rows('a', 'b', null, undefined, '', ['a']).map(row => filterFn(selected, row))).toEqual([
      true,
      false,
      true,
      true,
      true,
      false
    ]);
    expect(filterFn('b', { value: 'b' })).toBe(true);
  });

  it('should use hand-written options in order and skip local matching without a value getter', () => {
    const { options } = buildFilterOptions(rows('b', 'a'), {
      type: 'options',
      options: [
        { text: 'Bee', value: 'b' },
        { text: 'None', value: null }
      ]
    });

    expect(options).toEqual([
      { key: 'string:b', value: 'b', text: 'Bee' },
      { key: 'empty', value: null, text: 'None' }
    ]);
    expect(createOptionsFilterFn({ type: 'options', options: [] })).toBeNull();
  });
});
