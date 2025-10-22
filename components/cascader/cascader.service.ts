/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { DestroyRef, inject, Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { NzTreeNode, NzTreeNodeOptions } from 'ng-zorro-antd/core/tree';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { isNotNil, wrapIntoObservable } from 'ng-zorro-antd/core/util';

import { isShowSearchObject, NzCascaderComponentAsSource, NzCascaderFilter, NzCascaderOption } from './typings';
import { isChildNode, isParentNode } from './utils';

/**
 * All data is stored and parsed in NzCascaderService.
 */
@Injectable()
export class NzCascaderService {
  private destroyRef = inject(DestroyRef);
  /** Activated options in each column. */
  activatedNodes: NzTreeNode[] = [];

  /** An array to store cascader items arranged in different layers. */
  columns: NzTreeNode[][] = [];

  /** If user has entered searching mode. */
  inSearchingMode = false;

  values: NzSafeAny[] = [];

  /**
   * Emit an event when loading state changes.
   * Emit true if nzOptions is loading by `nzLoadData`.
   */
  readonly $loading = new BehaviorSubject<boolean>(false);

  /**
   * Emit an event to notify cascader it needs to redraw because activated or
   * selected options are changed.
   */
  readonly $redraw = new Subject<void>();

  /**
   * Emit an event when an option gets selected.
   * Emit true if a leaf options is selected.
   */
  readonly $nodeSelected = new Subject<NzTreeNode | null>();

  /**
   * Emit an event to notify cascader it needs to quit searching mode.
   * Only emit when user do select a searching option.
   */
  readonly $quitSearching = new Subject<void>();

  /** To hold columns before entering searching mode. */
  private columnSnapshot: NzTreeNode[][] = [[]];

  private cascaderComponent!: NzCascaderComponentAsSource;

  private searchOptionPathMap = new Map<NzTreeNode, NzCascaderOption[]>();

  constructor() {
    this.destroyRef.onDestroy(() => {
      this.$redraw.complete();
      this.$quitSearching.complete();
      this.$nodeSelected.complete();
      this.$loading.complete();
      this.searchOptionPathMap.clear();
    });
  }

  /** Return cascader options in the first layer. */
  get nzOptions(): NzCascaderOption[] {
    return this.cascaderComponent.treeService.toOptions(this.columns[0] || []);
  }

  /**
   * Bind cascader component so this service could use inputs.
   */
  withComponent(cascaderComponent: NzCascaderComponentAsSource): void {
    this.cascaderComponent = cascaderComponent;
  }

  /**
   * Try to set an option as activated.
   *
   * @param node Cascader option node
   * @param columnIndex Of which column this option is in
   * @param performSelect Select
   * @param multiple Multiple mode
   * @param loadingChildren Try to load children asynchronously.
   */
  setNodeActivated(
    node: NzTreeNode,
    columnIndex: number,
    performSelect: boolean = false,
    multiple: boolean = false,
    loadingChildren: boolean = true
  ): void {
    if (node.isDisabled) {
      return;
    }

    this.activatedNodes[columnIndex] = node;
    this.trackAncestorActivatedNodes(columnIndex);
    this.dropBehindActivatedNodes(columnIndex);

    if (isParentNode(node)) {
      // Parent option that has children.
      this.setColumnData(node.children!, columnIndex + 1);
    } else if (!node.isLeaf && loadingChildren) {
      // Parent option that should try to load children asynchronously.
      this.loadChildren(node, columnIndex);
    } else if (node.isLeaf) {
      // Leaf option.
      this.dropBehindColumns(columnIndex);
    }

    // Actually perform selection to make an options not only activated but also selected.
    if (performSelect && node.isSelectable) {
      this.setNodeSelected(node, columnIndex, multiple);
    }

    this.$redraw.next();
  }

  /**
   * Set an option as selected.
   * @param node
   * @param index
   * @param multiple
   */
  setNodeSelected(node: NzTreeNode, index: number, multiple: boolean = false): void {
    const changeOn = this.cascaderComponent.nzChangeOn;
    const shouldPerformSelection = (o: NzCascaderOption, i: number): boolean =>
      typeof changeOn === 'function' ? changeOn(o, i) : false;

    if (
      multiple ||
      node.isLeaf ||
      this.cascaderComponent.nzChangeOnSelect ||
      shouldPerformSelection(node.origin, index)
    ) {
      node.isSelected = true;
      this.cascaderComponent.treeService.setSelectedNodeList(node, multiple);
      this.cascaderComponent.updateSelectedNodes();
      this.$redraw.next();
      this.$nodeSelected.next(node);
    }
  }

  setNodeDeactivatedSinceColumn(column: number): void {
    this.dropBehindActivatedNodes(column - 1);
    this.dropBehindColumns(column);
    this.$redraw.next();
  }

  /**
   * Set a searching option as selected, finishing up things.
   *
   * @param node
   * @param multiple
   */
  setSearchOptionSelected(node: NzTreeNode, multiple = false): void {
    this.setNodeSelected(node, node.level, multiple);

    setTimeout(() => {
      // Reset data and tell UI only to remove input and reset dropdown width style.
      this.$quitSearching.next();
      this.$redraw.next();
    }, 200);
  }

  /**
   * Reset node's `title` and `disabled` status and clear `searchOptionPathMap`.
   */
  private clearSearchOptions(): void {
    for (const node of this.searchOptionPathMap.keys()) {
      node.isDisabled = node.origin.disabled || false;
      node.title = this.getOptionLabel(node.origin);
    }
    this.searchOptionPathMap.clear();
  }

  /**
   * Filter cascader options to reset `columns`.
   *
   * @param searchValue The string user wants to search.
   */
  prepareSearchOptions(searchValue: string): void {
    const results: NzTreeNode[] = []; // Search results only have one layer.
    const path: NzTreeNode[] = [];
    const defaultFilter: NzCascaderFilter = (i, p) =>
      p.some(o => {
        const label = this.getOptionLabel(o);
        return !!label && label.indexOf(i) !== -1;
      });
    const showSearch = this.cascaderComponent.nzShowSearch;
    const filter = isShowSearchObject(showSearch) && showSearch.filter ? showSearch.filter : defaultFilter;
    const sorter = isShowSearchObject(showSearch) && showSearch.sorter ? showSearch.sorter : null;
    const loopChild = (node: NzTreeNode, forceDisabled = false): void => {
      path.push(node);
      const cPath = this.cascaderComponent.treeService.toOptions(path);
      if (filter(searchValue, cPath)) {
        this.searchOptionPathMap.set(node, cPath);
        node.isDisabled = forceDisabled || node.isDisabled;
        node.title = cPath.map(p => this.getOptionLabel(p)).join(' / ');
        results.push(node);
      }
      path.pop();
    };
    const loopParent = (node: NzTreeNode, forceDisabled = false): void => {
      const disabled = forceDisabled || node.isDisabled;
      path.push(node);
      node.children!.forEach(sNode => {
        if (!sNode.isLeaf) {
          loopParent(sNode, disabled);
        }
        if (sNode.isLeaf || !sNode.children || !sNode.children.length) {
          loopChild(sNode, disabled);
        }
      });
      path.pop();
    };

    if (!this.columnSnapshot.length) {
      this.columns = [[]];
      return;
    }

    this.columnSnapshot[0].forEach(o => (isChildNode(o) ? loopChild(o) : loopParent(o)));

    if (sorter) {
      results.sort((a, b) => sorter(this.searchOptionPathMap.get(a)!, this.searchOptionPathMap.get(b)!, searchValue));
    }

    this.columns = [results];
    this.$redraw.next(); // Search results may be empty, so should redraw.
  }

  /**
   * Set searching mode by UI. It deals with things not directly related to UI.
   *
   * @param toSearching If this cascader is entering searching mode
   */
  setSearchingMode(toSearching: boolean): void {
    this.inSearchingMode = toSearching;

    if (toSearching) {
      this.clearSearchOptions(); // if reset nzOptions when searching, should clear searchOptionPathMap
      this.columnSnapshot = [...this.columns];
      this.activatedNodes = [];
    } else {
      // User quit searching mode without selecting an option.
      this.clearSearchOptions();
      this.activatedNodes = [];

      setTimeout(() => {
        this.columns = [...this.columnSnapshot];
        if (this.cascaderComponent.selectedNodes.length) {
          const activatedNode = this.cascaderComponent.selectedNodes[0];
          const columnIndex = activatedNode.level;
          this.activatedNodes[columnIndex] = activatedNode;
          this.trackAncestorActivatedNodes(columnIndex);
          this.trackAncestorColumnData(columnIndex);
        }
        this.$redraw.next();
      });
    }

    this.$redraw.next();
  }

  /**
   * Clear selected options.
   */
  clear(): void {
    this.values = [];
    this.activatedNodes = [];
    this.dropBehindColumns(0);
    this.$redraw.next();
    this.$nodeSelected.next(null);
  }

  getOptionLabel(o: NzCascaderOption): string {
    return o[this.cascaderComponent.nzLabelProperty || 'label'] as string;
  }

  getOptionValue(o: NzCascaderOption): NzSafeAny {
    return o[this.cascaderComponent.nzValueProperty || 'value'];
  }

  /**
   * Try to insert options into a column.
   *
   * @param nodes Options to insert
   * @param columnIndex Position
   */
  setColumnData(nodes: NzTreeNode[], columnIndex: number): void {
    this.columns[columnIndex] = nodes;
    this.dropBehindColumns(columnIndex);
  }

  /**
   * Set all columns data according to activate option's path
   */
  private trackAncestorColumnData(startIndex: number): void {
    const node = this.activatedNodes[startIndex];
    if (!node) {
      return;
    }

    this.dropBehindColumns(startIndex);
    for (let i = 0; i < startIndex; i++) {
      this.columns[i + 1] = this.activatedNodes[i].children;
    }
  }

  /**
   * Set all ancestor options as activated.
   */
  private trackAncestorActivatedNodes(startIndex: number): void {
    for (let i = startIndex - 1; i >= 0; i--) {
      if (!this.activatedNodes[i]) {
        this.activatedNodes[i] = this.activatedNodes[i + 1].parentNode!;
      }
    }
  }

  private dropBehindActivatedNodes(lastReserveIndex: number): void {
    this.activatedNodes = this.activatedNodes.splice(0, lastReserveIndex + 1);
  }

  dropBehindColumns(lastReserveIndex: number): void {
    if (lastReserveIndex < this.columns.length - 1) {
      this.columns = this.columns.slice(0, lastReserveIndex + 1);
    }
  }

  /**
   * Load children of an option asynchronously.
   */
  loadChildren(node: NzTreeNode | null, columnIndex: number, onLoaded?: (options: NzCascaderOption[]) => void): void {
    const isRoot = columnIndex < 0 || !isNotNil(node);
    const option: NzCascaderOption = node?.origin || {};
    const loadFn = this.cascaderComponent.nzLoadData;

    if (loadFn) {
      // If there isn't any option in columns.
      this.$loading.next(isRoot);

      if (node) {
        node.isLoading = true;
      }

      wrapIntoObservable(loadFn(option, columnIndex))
        .pipe(
          finalize(() => {
            node && (node.isLoading = false);
            this.$loading.next(false);
            this.$redraw.next();
          })
        )
        .subscribe({
          next: () => {
            if (option.children) {
              if (!isRoot) {
                const nodes = option.children.map(o => new NzTreeNode(o as NzTreeNodeOptions, node));
                node.children = nodes;
                this.setColumnData(nodes, columnIndex + 1);
              } else {
                // If it's root node, we should initialize the tree.
                const nodes = this.cascaderComponent.coerceTreeNodes(option.children);
                this.cascaderComponent.treeService.initTree(nodes);
                this.setColumnData(nodes, 0);
              }
              onLoaded?.(option.children);
            }
          },
          error: () => {
            node && (node.isLeaf = true);
          }
        });
    }
  }

  isLoaded(index: number): boolean {
    return !!this.columns[index] && this.columns[index].length > 0;
  }
}
