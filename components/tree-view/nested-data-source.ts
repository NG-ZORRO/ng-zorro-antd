/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, merge } from 'rxjs';
import { map } from 'rxjs/operators';

import { NzTreeView } from './tree';

export class NzTreeViewNestedDataSource<T> extends DataSource<T> {
  private _data = new BehaviorSubject<T[]>([]);

  constructor(
    private _tree: NzTreeView<T>,
    readonly initialData: T[] = []
  ) {
    super();
    this.setData(initialData);
  }

  setData(value: T[]): void {
    this._data.next(value);
    this.setTreeDataNodes(value);
  }

  getData(): T[] {
    return this._data.getValue();
  }

  connect(collectionViewer: CollectionViewer): Observable<T[]> {
    return merge(collectionViewer.viewChange, this._data.asObservable()).pipe(map(() => this.getData()));
  }

  disconnect(): void {
    // no op
  }

  private setTreeDataNodes(nodes: T[]): void {
    this._tree.dataNodes = nodes;
  }
}
