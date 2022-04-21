/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { arraysEqual, isNotNil } from 'ng-zorro-antd/core/util';

import {
  isShowSearchObject,
  NzCascaderComponentAsSource,
  NzCascaderFilter,
  NzCascaderOption,
  NzCascaderSearchOption
} from './typings';
import { isChildOption, isParentOption } from './utils';

/**
 * All data is stored and parsed in NzCascaderService.
 */
@Injectable()
export class NzCascaderService implements OnDestroy {
  /** Activated options in each column. */
  activatedOptions: NzCascaderOption[] = [];

  /** An array to store cascader items arranged in different layers. */
  columns: NzCascaderOption[][] = [];

  /** If user has entered searching mode. */
  inSearchingMode = false;

  /** Selected options would be output to user. */
  selectedOptions: NzCascaderOption[] = [];

  values: NzSafeAny[] = [];

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
  readonly $optionSelected = new Subject<{
    option: NzCascaderOption;
    index: number;
  } | null>();

  /**
   * Emit an event to notify cascader it needs to quit searching mode.
   * Only emit when user do select a searching option.
   */
  readonly $quitSearching = new Subject<void>();

  /** To hold columns before entering searching mode. */
  private columnsSnapshot: NzCascaderOption[][] = [[]];

  /** To hold activated options before entering searching mode. */
  private activatedOptionsSnapshot: NzCascaderOption[] = [];

  private cascaderComponent!: NzCascaderComponentAsSource;

  /** Return cascader options in the first layer. */
  get nzOptions(): NzCascaderOption[] {
    return this.columns[0];
  }

  ngOnDestroy(): void {
    this.$redraw.complete();
    this.$quitSearching.complete();
    this.$optionSelected.complete();
    this.$loading.complete();
  }

  /**
   * Make sure that value matches what is displayed in the dropdown.
   */
  syncOptions(first: boolean = false): void {
    const values = this.values;
    const hasValue = values && values.length;
    const lastColumnIndex = values.length - 1;
    const initColumnWithIndex = (columnIndex: number): void => {
      const activatedOptionSetter = (): void => {
        const currentValue = values[columnIndex];

        if (!isNotNil(currentValue)) {
          this.$redraw.next();
          return;
        }

        const option =
          this.findOptionWithValue(columnIndex, values[columnIndex]) ||
          (typeof currentValue === 'object'
            ? currentValue
            : {
                [`${this.cascaderComponent.nzValueProperty}`]: currentValue,
                [`${this.cascaderComponent.nzLabelProperty}`]: currentValue
              });

        this.setOptionActivated(option, columnIndex, false, false);

        if (columnIndex < lastColumnIndex) {
          initColumnWithIndex(columnIndex + 1);
        } else {
          this.dropBehindColumns(columnIndex);
          this.selectedOptions = [...this.activatedOptions];
          this.$redraw.next();
        }
      };

      if (this.isLoaded(columnIndex) || !this.cascaderComponent.nzLoadData) {
        activatedOptionSetter();
      } else {
        const option = this.activatedOptions[columnIndex - 1] || {};
        this.loadChildren(option, columnIndex - 1, activatedOptionSetter);
      }
    };

    this.activatedOptions = [];
    this.selectedOptions = [];

    if (first && this.cascaderComponent.nzLoadData && !hasValue) {
      // Should also notify the component that value changes. Fix #3480.
      this.$redraw.next();
      return;
    } else {
      initColumnWithIndex(0);
    }
  }

  /**
   * Bind cascader component so this service could use inputs.
   */
  withComponent(cascaderComponent: NzCascaderComponentAsSource): void {
    this.cascaderComponent = cascaderComponent;
  }

  /**
   * Reset all options. Rebuild searching options if in searching mode.
   */
  withOptions(options: NzCascaderOption[] | null): void {
    this.columnsSnapshot = this.columns = options && options.length ? [options] : [];

    if (this.inSearchingMode) {
      this.prepareSearchOptions(this.cascaderComponent.inputValue);
    } else if (this.columns.length) {
      this.syncOptions();
    }
  }

  /**
   * Try to set a option as activated.
   *
   * @param option Cascader option
   * @param columnIndex Of which column this option is in
   * @param performSelect Select
   * @param loadingChildren Try to load children asynchronously.
   */
  setOptionActivated(
    option: NzCascaderOption,
    columnIndex: number,
    performSelect: boolean = false,
    loadingChildren: boolean = true
  ): void {
    if (option.disabled) {
      return;
    }
    this.activatedOptions[columnIndex] = option;
    this.trackAncestorActivatedOptions(columnIndex);
    this.dropBehindActivatedOptions(columnIndex);

    const isParent = isParentOption(option);

    if (isParent) {
      // Parent option that has children.
      this.setColumnData(option.children!, columnIndex + 1, option);
    } else if (!option.isLeaf && loadingChildren) {
      // Parent option that should try to load children asynchronously.
      this.loadChildren(option, columnIndex);
    } else if (option.isLeaf) {
      // Leaf option.
      this.dropBehindColumns(columnIndex);
    }

    // Actually perform selection to make an options not only activated but also selected.
    if (performSelect) {
      this.setOptionSelected(option, columnIndex);
    }

    this.$redraw.next();
  }

  setOptionSelected(option: NzCascaderOption, index: number): void {
    const changeOn = this.cascaderComponent.nzChangeOn;
    const shouldPerformSelection = (o: NzCascaderOption, i: number): boolean =>
      typeof changeOn === 'function' ? changeOn(o, i) : false;

    if (option.isLeaf || this.cascaderComponent.nzChangeOnSelect || shouldPerformSelection(option, index)) {
      this.selectedOptions = [...this.activatedOptions];
      this.prepareEmitValue();
      this.$redraw.next();
      this.$optionSelected.next({ option, index });
    }
  }

  setOptionDeactivatedSinceColumn(column: number): void {
    this.dropBehindActivatedOptions(column - 1);
    this.dropBehindColumns(column);
    this.$redraw.next();
  }

  /**
   * Set a searching option as selected, finishing up things.
   *
   * @param option
   */
  setSearchOptionSelected(option: NzCascaderSearchOption): void {
    this.activatedOptions = [option];
    this.selectedOptions = [...option.path];
    this.prepareEmitValue();
    this.$redraw.next();
    this.$optionSelected.next({ option, index: 0 });

    setTimeout(() => {
      // Reset data and tell UI only to remove input and reset dropdown width style.
      this.$quitSearching.next();
      this.$redraw.next();
      this.inSearchingMode = false;
      this.columns = [...this.columnsSnapshot];
      this.activatedOptions = [...this.selectedOptions];
    }, 200);
  }

  /**
   * Filter cascader options to reset `columns`.
   *
   * @param searchValue The string user wants to search.
   */
  prepareSearchOptions(searchValue: string): void {
    const results: NzCascaderOption[] = []; // Search results only have one layer.
    const path: NzCascaderOption[] = [];
    const defaultFilter: NzCascaderFilter = (i, p) =>
      p.some(o => {
        const label = this.getOptionLabel(o);
        return !!label && label.indexOf(i) !== -1;
      });
    const showSearch = this.cascaderComponent.nzShowSearch;
    const filter = isShowSearchObject(showSearch) && showSearch.filter ? showSearch.filter : defaultFilter;
    const sorter = isShowSearchObject(showSearch) && showSearch.sorter ? showSearch.sorter : null;
    const loopChild = (node: NzCascaderOption, forceDisabled = false): void => {
      path.push(node);
      const cPath = Array.from(path);
      if (filter(searchValue, cPath)) {
        const disabled = forceDisabled || node.disabled;
        const option: NzCascaderSearchOption = {
          disabled,
          isLeaf: true,
          path: cPath,
          [this.cascaderComponent.nzLabelProperty]: cPath.map(p => this.getOptionLabel(p)).join(' / ')
        };
        results.push(option);
      }
      path.pop();
    };
    const loopParent = (node: NzCascaderOption, forceDisabled = false): void => {
      const disabled = forceDisabled || node.disabled;
      path.push(node);
      node.children!.forEach(sNode => {
        if (!sNode.parent) {
          sNode.parent = node;
        }
        if (!sNode.isLeaf) {
          loopParent(sNode, disabled);
        }
        if (sNode.isLeaf || !sNode.children || !sNode.children.length) {
          loopChild(sNode, disabled);
        }
      });
      path.pop();
    };

    if (!this.columnsSnapshot.length) {
      this.columns = [[]];
      return;
    }

    this.columnsSnapshot[0].forEach(o => (isChildOption(o) ? loopChild(o) : loopParent(o)));

    if (sorter) {
      results.sort((a, b) => sorter(a.path, b.path, searchValue));
    }

    this.columns = [results];

    this.$redraw.next(); // Search results may be empty, so should redraw.
  }

  /**
   * Toggle searching mode by UI. It deals with things not directly related to UI.
   *
   * @param toSearching If this cascader is entering searching mode
   */
  toggleSearchingMode(toSearching: boolean): void {
    this.inSearchingMode = toSearching;

    if (toSearching) {
      this.activatedOptionsSnapshot = [...this.activatedOptions];
      this.activatedOptions = [];
      this.selectedOptions = [];
      this.$redraw.next();
    } else {
      // User quit searching mode without selecting an option.
      this.activatedOptions = [...this.activatedOptionsSnapshot];
      this.selectedOptions = [...this.activatedOptions];
      this.columns = [...this.columnsSnapshot];
      this.syncOptions();
      this.$redraw.next();
    }
  }

  /**
   * Clear selected options.
   */
  clear(): void {
    this.values = [];
    this.selectedOptions = [];
    this.activatedOptions = [];
    this.dropBehindColumns(0);
    this.$redraw.next();
    this.$optionSelected.next(null);
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
   * @param options Options to insert
   * @param columnIndex Position
   */
  private setColumnData(options: NzCascaderOption[], columnIndex: number, parent: NzCascaderOption): void {
    const existingOptions = this.columns[columnIndex];
    if (!arraysEqual(existingOptions, options)) {
      options.forEach(o => (o.parent = parent));
      this.columns[columnIndex] = options;
      this.dropBehindColumns(columnIndex);
    }
  }

  /**
   * Set all ancestor options as activated.
   */
  private trackAncestorActivatedOptions(startIndex: number): void {
    for (let i = startIndex - 1; i >= 0; i--) {
      if (!this.activatedOptions[i]) {
        this.activatedOptions[i] = this.activatedOptions[i + 1].parent!;
      }
    }
  }

  private dropBehindActivatedOptions(lastReserveIndex: number): void {
    this.activatedOptions = this.activatedOptions.splice(0, lastReserveIndex + 1);
  }

  private dropBehindColumns(lastReserveIndex: number): void {
    if (lastReserveIndex < this.columns.length - 1) {
      this.columns = this.columns.slice(0, lastReserveIndex + 1);
    }
  }

  /**
   * Load children of an option asynchronously.
   */
  loadChildren(
    option: NzCascaderOption | NzSafeAny,
    columnIndex: number,
    success?: VoidFunction,
    failure?: VoidFunction
  ): void {
    const loadFn = this.cascaderComponent.nzLoadData;

    if (loadFn) {
      // If there isn't any option in columns.
      this.$loading.next(columnIndex < 0);

      if (typeof option === 'object') {
        option.loading = true;
      }

      loadFn(option, columnIndex).then(
        () => {
          option.loading = false;
          if (option.children) {
            this.setColumnData(option.children, columnIndex + 1, option);
          }
          if (success) {
            success();
          }
          this.$loading.next(false);
          this.$redraw.next();
        },
        () => {
          option.loading = false;
          option.isLeaf = true;
          if (failure) {
            failure();
          }
          this.$redraw.next();
        }
      );
    }
  }

  private isLoaded(index: number): boolean {
    return this.columns[index] && this.columns[index].length > 0;
  }

  /**
   * Find a option that has a given value in a given column.
   */
  private findOptionWithValue(columnIndex: number, value: NzCascaderOption | NzSafeAny): NzCascaderOption | null {
    const targetColumn = this.columns[columnIndex];
    if (targetColumn) {
      const v = typeof value === 'object' ? this.getOptionValue(value) : value;
      return targetColumn.find(o => v === this.getOptionValue(o))!;
    }
    return null;
  }

  private prepareEmitValue(): void {
    this.values = this.selectedOptions.map(o => this.getOptionValue(o));
  }
}
