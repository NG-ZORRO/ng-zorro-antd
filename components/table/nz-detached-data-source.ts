/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { NzDataSource } from './nz-data-source';
import { NzTableComponent } from './nz-table.component';

/**
 * This DataSource answer data requests coming only from the table Component.
 * Any other connected {@link CollectionViewer} is ignored.
 */
export class NzDetachedDataSource<T> extends NzDataSource<T> {
  private readonly source$ = new BehaviorSubject<ReadonlyArray<T>>([]);
  private readonly data$ = this.source$.asObservable().pipe(shareReplay(1));
  private readonly subscription = new Subscription();

  constructor(table: NzTableComponent<T>, readonly dataSource: NzDataSource<T>) {
    super();
    this.subscription.add(
      this.dataSource.connect(table).subscribe({
        next: data => this.source$.next(data)
      })
    );
  }

  get length(): number {
    return this.dataSource.length;
  }

  connect(): Observable<ReadonlyArray<T>> {
    return this.data$;
  }

  disconnect(): void {
    this.subscription.unsubscribe();
  }

  [Symbol.iterator](): Iterator<T> {
    return this.dataSource[Symbol.iterator]
      ? this.dataSource[Symbol.iterator]() //
      : super[Symbol.iterator]();
  }
}
