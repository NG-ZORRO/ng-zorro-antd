/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { DataSource } from '@angular/cdk/table';

// tslint:disable-next-line
const EMPTY_ITERATOR: Iterator<any> = {
  // tslint:disable-next-line
  next(): IteratorResult<any> {
    return { done: true, value: undefined! };
  }
};

export abstract class NzDataSource<T> extends DataSource<T> implements Iterable<T> {
  /**
   * The length of the data represented by this DataSource.
   */
  abstract readonly length: number;

  /**
   * A default implementation for the {@link Iterable} interface, returning a zero-length iterator.
   */
  [Symbol.iterator](): Iterator<T> {
    return EMPTY_ITERATOR;
  }
}
