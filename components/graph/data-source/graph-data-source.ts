/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { SelectionModel } from '@angular/cdk/collections';
import { BehaviorSubject, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
    this.expansionModel.select(nodeName);
  }

  /** Collapses one single data node. */
  collapse(nodeName: string): void {
    this.expansionModel.deselect(nodeName);
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
}
