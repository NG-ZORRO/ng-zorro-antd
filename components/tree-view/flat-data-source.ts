/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, merge } from 'rxjs';
import { map } from 'rxjs/operators';

import { NzTreeView } from 'ng-zorro-antd/tree-view/tree';

import { NzTreeFlattener } from './flattener';

export class NzTreeViewFlatDataSource<T, F = T, K = F> extends DataSource<F> {
  private _flattenedData = new BehaviorSubject<F[]>([]);

  private _data: BehaviorSubject<T[]>;

  constructor(
    private readonly _tree: NzTreeView<F, K>,
    private readonly _treeFlattener: NzTreeFlattener<T, F, K>,
    readonly initialData: T[] = []
  ) {
    super();
    this._data = new BehaviorSubject<T[]>(initialData);
    this.setFlattenedData(this.flatten(initialData));
  }

  setData(data: T[]): void {
    this._data.next(data);
    this.setFlattenedData(this.flatten(data));
  }

  getData(): T[] {
    return this._data.getValue();
  }

  getFlattenData(): F[] {
    return this._flattenedData.getValue();
  }

  setFlattenedData(nodes: F[]): void {
    this._flattenedData.next(nodes);
    this.setDataNodes(nodes);
  }

  connect(collectionViewer: CollectionViewer): Observable<F[]> {
    return merge(
      collectionViewer.viewChange,
      this._tree._getExpansionModel().changed.asObservable(),
      this._flattenedData.asObservable()
    ).pipe(map(() => this._treeFlattener.expandFlattenedNodes(this.getFlattenData(), this._tree)));
  }

  disconnect(): void {
    // no op
  }

  private setDataNodes(nodes: F[]): void {
    this._tree.dataNodes = nodes;
  }

  private flatten(data: T[]): F[] {
    return this._treeFlattener.flattenNodes(data);
  }
}
