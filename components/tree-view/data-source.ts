/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { BehaviorSubject, Observable, merge } from 'rxjs';
import { map } from 'rxjs/operators';

import { NzTreeFlattener } from 'ng-zorro-antd/tree-view';

/**
 * @deprecated Use the combination of 'NzTreeViewFlatDataSource' and 'nzLevelAccessor' instead
 */
export class NzTreeFlatDataSource<T, F, K = F> extends DataSource<F> {
  _flattenedData = new BehaviorSubject<F[]>([]);

  _expandedData = new BehaviorSubject<F[]>([]);

  _data: BehaviorSubject<T[]>;

  constructor(
    private _treeControl: FlatTreeControl<F, K>,
    private _treeFlattener: NzTreeFlattener<T, F, K>,
    initialData: T[] = []
  ) {
    super();
    this._data = new BehaviorSubject<T[]>(initialData);
    this.flatNodes();
  }

  setData(value: T[]): void {
    this._data.next(value);
    this.flatNodes();
  }

  getData(): T[] {
    return this._data.getValue();
  }

  connect(collectionViewer: CollectionViewer): Observable<F[]> {
    const changes = [
      collectionViewer.viewChange,
      this._treeControl.expansionModel.changed.asObservable(),
      this._flattenedData.asObservable()
    ];
    return merge(...changes).pipe(
      map(() => {
        this._expandedData.next(this._treeFlattener.expandFlattenedNodes(this._flattenedData.value, this._treeControl));
        return this._expandedData.value;
      })
    );
  }

  disconnect(): void {
    // no op
  }

  private flatNodes(): void {
    const flattendData = this._treeFlattener.flattenNodes(this.getData());
    this._flattenedData.next(flattendData);
    this.setTreeDataNodes(flattendData);
  }

  private setTreeDataNodes(nodes: F[]): void {
    this._treeControl.dataNodes = nodes;
  }
}
