/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directionality } from '@angular/cdk/bidi';
import { DataSource } from '@angular/cdk/collections';
import { CdkTree } from '@angular/cdk/tree';
import {
  ChangeDetectorRef,
  Component,
  Input,
  IterableDiffer,
  ViewContainerRef,
  booleanAttribute,
  inject,
  DestroyRef,
  TrackByFunction
} from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { NzNoAnimationDirective } from 'ng-zorro-antd/core/animation';

import { getDescendants } from './utils';

@Component({
  template: ''
})
export class NzTreeView<T> extends CdkTree<T> {
  /* eslint-disable @angular-eslint/no-input-rename */
  @Input({ alias: 'nzLevelAccessor' }) override levelAccessor?: (dataNode: T) => number = undefined;
  @Input({ alias: 'nzChildrenAccessor' }) override childrenAccessor?: (dataNode: T) => T[] = undefined;
  @Input({ alias: 'nzDataSource' })
  override get dataSource(): DataSource<T> | Observable<T[]> | T[] {
    return super.dataSource;
  }
  override set dataSource(dataSource: DataSource<T> | Observable<T[]> | T[]) {
    super.dataSource = dataSource;
  }
  @Input({ alias: 'nzTrackBy' }) override trackBy: TrackByFunction<T> = (_index, item: T) => item;
  @Input({ transform: booleanAttribute }) nzDirectoryTree = false;
  @Input({ transform: booleanAttribute }) nzBlockNode = false;

  protected readonly noAnimation = inject(NzNoAnimationDirective, { host: true, optional: true });
  protected readonly destroyRef = inject(DestroyRef);
  protected readonly directionality = inject(Directionality);
  protected readonly cdr = inject(ChangeDetectorRef);

  protected readonly dir = inject(Directionality).valueSignal;
  readonly dataSourceChanged$ = new Subject<void>();

  dataNodes: T[] = [];

  override renderNodeChanges(
    data: T[],
    dataDiffer?: IterableDiffer<T>,
    viewContainer?: ViewContainerRef,
    parentData?: T
  ): void {
    /* https://github.com/angular/components/blob/21cc21ea3b280c3f82a19f5ec1b679eb1eee1358/src/cdk/tree/tree.ts#L1103
     * If levelAccessor is used, renderNodes needs to be recalculated, because flattenData (i.e., dataNodes) is used as renderNodes by default in the @angular/components library
     * If childrenAccessor is used, @angular/cdk library inner will calculate renderNodes.
     */
    const renderNodes = this.levelAccessor ? this.getRenderNodes(data) : [...data];
    super.renderNodeChanges(renderNodes, dataDiffer, viewContainer, parentData);
    this.dataSourceChanged$.next();
    this.cdr.markForCheck();
  }

  /**
   * get render nodes (length <= flattenData.length)>
   * @param nodes all flatten nodes
   */
  protected getRenderNodes(nodes: T[]): T[] {
    const getLevel = this.levelAccessor!;
    const results: T[] = [];
    const currentExpand: boolean[] = [];
    currentExpand[0] = true;

    nodes.forEach(node => {
      let expand = true;
      for (let i = 0; i <= getLevel(node); i++) {
        expand = expand && currentExpand[i];
      }
      if (expand) {
        results.push(node);
      }
      if (getDescendants(nodes, node, getLevel)) {
        currentExpand[getLevel(node) + 1] = this.isExpanded(node);
      }
    });
    return results;
  }
}
