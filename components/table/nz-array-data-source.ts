/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { CollectionViewer } from '@angular/cdk/collections';
import { of, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { NzDataSource } from './nz-data-source';

/**
 * This DataSource manages a simple array.
 * It also offers pagination capabilities via a {@link CollectionViewer}.
 */
export class NzArrayDataSource<T> extends NzDataSource<T> {
  /**
   * The length of the original (non-paginated) array {@link data}.
   */
  readonly length = this.data.length;

  /**
   * Holds the temporary state of the data array when pagination is enabled.
   */
  private paginatedData: ReadonlyArray<T> = [...this.data];

  /**
   * @param data The original data array coming from the user
   * @param frontPagination If `true`, emits the entire array at once without reacting to range/view events
   */
  constructor(
    private readonly data: ReadonlyArray<T>, //
    private readonly frontPagination: boolean = false
  ) {
    super();
  }

  connect(collectionViewer: CollectionViewer): Observable<ReadonlyArray<T>> {
    return this.frontPagination
      ? of(this.data)
      : collectionViewer.viewChange.pipe(
          map(({ start, end }) => this.data.slice(start, end)),
          tap(data => (this.paginatedData = data))
        );
  }

  disconnect(): void {}

  [Symbol.iterator](): Iterator<T> {
    return this.paginatedData.values();
  }
}
