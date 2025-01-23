/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NzAggregatePipe } from './nz-aggregate.pipe';

describe('NzAggregatePipe', () => {
  let nzAggregatePipe: NzAggregatePipe;

  beforeEach(() => {
    nzAggregatePipe = new NzAggregatePipe();
  });
  it('Should return 4', () => {
    expect(nzAggregatePipe.transform([1, 2, 3, 4], 'max')).toEqual(4);
  });

  it('Should return 1', () => {
    expect(nzAggregatePipe.transform([1], 'max')).toEqual(1);
  });

  it('Should return 1', () => {
    expect(nzAggregatePipe.transform([1, 1], 'max')).toEqual(1);
  });

  it('Should return undefined', () => {
    expect(nzAggregatePipe.transform([], 'max')).toBeUndefined();
  });

  it('Should return 1', () => {
    expect(nzAggregatePipe.transform([1, 2, 3, 4], 'min')).toEqual(1);
  });

  it('Should return 2', () => {
    expect(nzAggregatePipe.transform([4, 3, 2, 5], 'min')).toEqual(2);
  });

  it('Should return 1', () => {
    expect(nzAggregatePipe.transform([1], 'min')).toEqual(1);
  });

  it('Should return 1', () => {
    expect(nzAggregatePipe.transform([1, 1], 'min')).toEqual(1);
  });

  it('Should return undefined', () => {
    expect(nzAggregatePipe.transform([], 'min')).toBeUndefined();
  });

  it('Should return 10', () => {
    expect(nzAggregatePipe.transform([1, 2, 3, 4], 'sum')).toEqual(10);
  });

  it('Should return 1', () => {
    expect(nzAggregatePipe.transform([1], 'sum')).toEqual(1);
  });

  it('Should return 2', () => {
    expect(nzAggregatePipe.transform([1, 1], 'sum')).toEqual(2);
  });

  it('Should return 2.5', () => {
    expect(nzAggregatePipe.transform([1, 2, 3, 4], 'avg')).toEqual(2.5);
  });

  it('Should return 1', () => {
    expect(nzAggregatePipe.transform([1], 'avg')).toEqual(1);
  });

  it('Should return 1', () => {
    expect(nzAggregatePipe.transform([1, 1], 'avg')).toEqual(1);
  });

  it('Should return undefined', () => {
    expect(nzAggregatePipe.transform([], 'avg')).toBeUndefined();
  });
});
