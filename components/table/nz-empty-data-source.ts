/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { of, Observable } from 'rxjs';
import { NzDataSource } from './nz-data-source';

/**
 * A "placeholder" DataSource which is always empty.
 * Get a hold of the singleton instance via {@link NzEmptyDataSource.INSTANCE}.
 */
export class NzEmptyDataSource<T> extends NzDataSource<T> {
  // tslint:disable-next-line:no-any
  static readonly INSTANCE = new NzEmptyDataSource<any>();

  readonly length = 0;

  private constructor() {
    super();
  }

  connect(): Observable<ReadonlyArray<T>> {
    return of([]);
  }

  disconnect(): void {}
}
