/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { SelectionModel } from '@angular/cdk/collections';
import { BehaviorSubject, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { NzSafeAny } from 'ng-zorro-antd/core/types';

import { NzGraphDataDef } from '../interface';
import { NzGraphBaseSource } from './base-graph-source';

export class NzGraphData implements NzGraphBaseSource<NzGraphDataDef, string> {
  private _data = new BehaviorSubject<NzGraphDataDef>({} as NzGraphDataDef);
  dataSource!: NzGraphDataDef;
  /** A selection model with multi-selection to track expansion status. */
  expansionModel: SelectionModel<string> = new SelectionModel<string>(true);

  /** Toggles one single data node's expanded/collapsed state. */
  toggle(nodeName: string): void {
    this.expansionModel.toggle(nodeName);
  }

  /** Expands one single data node. */
  expand(nodeName: string): void {
    const compound = this.dataSource.compound || {};
    const toBeSelected = this.findParents(compound, nodeName, [nodeName]);
    this.expansionModel.select(...toBeSelected);
  }

  /** Collapses one single data node. */
  collapse(nodeName: string): void {
    const compound = this.dataSource.compound || {};
    const toBeDeselected = this.findChildren(compound, nodeName, [nodeName]);
    this.expansionModel.deselect(...toBeDeselected);
  }

  /** Whether a given data node is expanded or not. Returns true if the data node is expanded. */
  isExpanded(nodeName: string): boolean {
    return this.expansionModel.isSelected(nodeName);
  }

  /** Collapse all dataNodes in the tree. */
  collapseAll(): void {
    this.expansionModel.clear();
  }

  expandAll(): void {
    this.expansionModel.select(...Object.keys(this._data.value.compound || {}));
  }

  setData(data: NzGraphDataDef): void {
    this.expansionModel?.clear();
    this.dataSource = data;
    this._data.next(data);
  }

  constructor(source?: NzGraphDataDef) {
    if (source) {
      this.expansionModel?.clear();
      this.dataSource = source;
      this._data.next(source);
    }
  }

  connect(): Observable<NzGraphDataDef> {
    const changes = [this._data, this.expansionModel.changed];
    return merge(...changes).pipe(map(() => this._data.value));
  }

  disconnect(): void {
    // do nothing for now
  }

  private findParents(data: NzSafeAny, key: string, parents: string[] = []): string[] {
    const parent = Object.keys(data)
      .filter(d => d !== key)
      .find(d => data[d].includes(key));
    if (!parent) {
      return parents;
    } else {
      return this.findParents(data, parent, [parent, ...parents]);
    }
  }

  private findChildren(data: NzSafeAny, key: string, children: string[] = []): string[] {
    const groupIds = Object.keys(data);
    const child = (data[key] || []).filter((c: string) => groupIds.includes(c));
    if (child && child.length > 0) {
      return child.reduce(
        (pre: string[], cur: string) =>
          Array.from(new Set([...pre, ...this.findChildren(data, cur, [...children, cur])])),
        children
      );
    }
    return children;
  }
}
