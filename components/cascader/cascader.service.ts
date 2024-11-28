/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, from, Subject } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { arraysEqual, isNotNil } from 'ng-zorro-antd/core/util';

import {
  isShowSearchObject,
  NzCascaderComponentAsSource,
  NzCascaderFilter,
  NzCascaderOption,
  NzCascaderSearchOption,
  NzCascaderShowCheckedStrategy
} from './typings';
import { getOptionKey, isChildOption, isParentOption, setOptionKey, toPathKey } from './utils';

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
  selectedOptions: Array<NzCascaderOption | NzCascaderOption[]> = [];

  /** Checked options key set */
  checkedOptionsKeySet = new Set<string>();
  /** Half checked options key set */
  halfCheckedOptionsKeySet = new Set<string>();
  /** Checked leaf options key set */
  checkedLeafOptionsKeySet = new Set<string>();

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

  /** To hold columns for full options */
  private columnsFull: NzCascaderOption[][] = [[]];

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
   *
   * If on multiple mode show last selected value
   */
  syncOptions(multiple: boolean = false, first: boolean = false): void {
    let values = this.values;
    const hasValue = values && values.length;
    const lastColumnIndex = values.length - 1;
    const initColumnWithIndex = (value: NzSafeAny, columnIndex: number, length: number = lastColumnIndex): void => {
      const activatedOptionSetter = (): void => {
        const currentValue = value[columnIndex];

        if (!isNotNil(currentValue)) {
          this.$redraw.next();
          return;
        }

        const option =
          this.findOptionWithValue(columnIndex, value[columnIndex]) ||
          (typeof currentValue === 'object'
            ? currentValue
            : {
                [`${this.cascaderComponent.nzValueProperty}`]: currentValue,
                [`${this.cascaderComponent.nzLabelProperty}`]: currentValue
              });
        this.setOptionActivated(option, columnIndex, false, multiple, false);

        if (columnIndex < length) {
          initColumnWithIndex(value, columnIndex + 1, length);
        } else {
          this.dropBehindColumns(columnIndex);
          this.selectedOptions = multiple
            ? [...this.selectedOptions, [...this.activatedOptions]]
            : [...this.selectedOptions, ...this.activatedOptions];
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

    if (this.isLoaded(0)) {
      this.columns[0].forEach(option => setOptionKey(option, this.getOptionValue(option)));
    }

    if (first && this.cascaderComponent.nzLoadData && !hasValue) {
      // Should also notify the component that value changes. Fix #3480.
      this.$redraw.next();
      return;
    } else {
      if (multiple) {
        values.forEach(value => initColumnWithIndex(value, 0, value.length - 1));
      } else {
        initColumnWithIndex(values, 0);
      }
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
  withOptions(options: NzCascaderOption[] | null, multiple: boolean = false): void {
    this.columnsSnapshot = this.columns = options && options.length ? [options] : [];

    if (this.inSearchingMode) {
      this.prepareSearchOptions(this.cascaderComponent.inputValue);
    } else if (this.columns.length) {
      this.syncOptions(multiple);
    }
  }

  /**
   * Try to set an option as activated.
   *
   * @param option Cascader option
   * @param columnIndex Of which column this option is in
   * @param performSelect Select
   * @param multiple Multiple Select
   * @param loadingChildren Try to load children asynchronously.
   */
  setOptionActivated(
    option: NzCascaderOption,
    columnIndex: number,
    performSelect: boolean = false,
    multiple: boolean = false,
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
      this.setOptionSelected(option, columnIndex, multiple);
    }

    this.$redraw.next();
  }

  /**
   * Set an option as selected.
   * @param option
   * @param index
   * @param multiple
   */
  setOptionSelected(option: NzCascaderOption, index: number, multiple: boolean = false): void {
    const changeOn = this.cascaderComponent.nzChangeOn;
    const shouldPerformSelection = (o: NzCascaderOption, i: number): boolean =>
      typeof changeOn === 'function' ? changeOn(o, i) : false;
    if (multiple) {
      const key = getOptionKey(option);
      if (this.checkedOptionsKeySet.has(key)) {
        return;
      }
      this.addCheckedOptions(option);
      this.conduct(option, index);
      this.activatedOptions = [];
      this.checkedLeafOptionsKeySet.forEach(leafValue => {
        const ancestorOptions = this.getAncestorOptions(this.findOptionWithKey(leafValue)!);
        this.activatedOptions.push(ancestorOptions);
      });
      this.selectedOptions = [...this.activatedOptions];
      this.activatedOptions = [];
      this.prepareEmitValue(multiple);
      this.$redraw.next();
      this.$optionSelected.next({ option, index });
    } else if (option.isLeaf || this.cascaderComponent.nzChangeOnSelect || shouldPerformSelection(option, index)) {
      this.selectedOptions = [...this.activatedOptions];
      this.prepareEmitValue(multiple);
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
   * Remove item from selectedOptions
   *
   * @param option
   * @param index
   * @param multipleMode
   */
  removeSelectedOption(option: NzCascaderOption, index: number, multipleMode: boolean): void {
    if (this.isMultipleSelections(this.selectedOptions, multipleMode)) {
      this.selectedOptions = this.selectedOptions.filter(
        options => !options.some(o => this.getOptionValue(o) === this.getOptionValue(option))
      );
      this.removeCheckedOptions(option);
      this.conduct(option, index);
      this.prepareEmitValue(multipleMode);
      this.$redraw.next();
      this.$optionSelected.next({ option, index: index });
    }
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

  private setOptionParent(option: NzCascaderOption, parent: NzCascaderOption): void {
    option.parent = parent;
    setOptionKey(option, toPathKey([getOptionKey(parent), this.getOptionValue(option)]));
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
          this.setOptionParent(sNode, node);
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
   * @param multiple
   */
  toggleSearchingMode(toSearching: boolean, multiple: boolean = false): void {
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
      this.syncOptions(multiple);
      this.$redraw.next();
    }
  }

  /**
   * Clear selected options.
   */
  clear(): void {
    this.values = [];
    this.selectedOptions = [];
    this.checkedOptionsKeySet.clear();
    this.halfCheckedOptionsKeySet.clear();
    this.checkedLeafOptionsKeySet.clear();
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
   * @param parent Parent option
   */
  private setColumnData(options: NzCascaderOption[], columnIndex: number, parent: NzCascaderOption): void {
    this.setColumnsFullData(options, columnIndex, parent);
    const existingOptions = this.columns[columnIndex];
    if (!arraysEqual(existingOptions, options)) {
      options.forEach(o => this.setOptionParent(o, parent));
      this.columns[columnIndex] = options;
    }
    this.dropBehindColumns(columnIndex);
  }

  /**
   * Try to insert options into a column.
   *
   * @param options Options to insert
   * @param columnIndex Position
   * @param parent Parent option
   */
  private setColumnsFullData(options: NzCascaderOption[], columnIndex: number, parent: NzCascaderOption): void {
    const existingOptions = this.columnsFull[columnIndex];
    if (!arraysEqual(existingOptions, options)) {
      options.forEach(o => this.setOptionParent(o, parent));
      this.columnsFull[columnIndex] = this.columnsFull[columnIndex] ?? [];
      for (let option of options) {
        if (!this.columnsFull[columnIndex].some(o => this.getOptionValue(o) === this.getOptionValue(option))) {
          this.columnsFull[columnIndex].push(option);
        }
      }
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

  /**
   * Provide a leaf option and then set all ancestor option activated
   */
  private getAncestorOptions(option: NzCascaderOption): NzCascaderOption[] {
    if (!option) {
      return [];
    }
    if (option.parent) {
      return [...this.getAncestorOptions(option.parent), option];
    }
    return [option];
  }

  private dropBehindActivatedOptions(lastReserveIndex: number): void {
    this.activatedOptions = this.activatedOptions.splice(0, lastReserveIndex + 1);
  }

  dropBehindColumns(lastReserveIndex: number): void {
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

      from(loadFn(option, columnIndex))
        .pipe(
          finalize(() => {
            option.loading = false;
            this.$loading.next(false);
            this.$redraw.next();
          })
        )
        .subscribe({
          next: () => {
            if (option.children) {
              this.setColumnData(option.children, columnIndex + 1, option);
            }
            success?.();
          },
          error: () => {
            option.isLeaf = true;
            failure?.();
          }
        });
    }
  }

  private isLoaded(index: number): boolean {
    return this.columns[index] && this.columns[index].length > 0;
  }

  /**
   * Find an option that has a given value in a given column.
   */
  private findOptionWithValue(
    columnIndex: number,
    value: NzCascaderOption | NzSafeAny,
    columns: NzCascaderOption[][] = this.columns
  ): NzCascaderOption | null {
    const targetColumn = columns[columnIndex];
    if (targetColumn) {
      const v = typeof value === 'object' ? this.getOptionValue(value) : value;
      return targetColumn.find(o => v === this.getOptionValue(o))!;
    }
    return null;
  }

  /**
   * Find the first option with given key in all column
   */
  private findOptionWithKey(key: string): NzCascaderOption | null {
    let option: NzCascaderOption | null = null;
    for (let i = 0; i < this.columnsFull.length; ++i) {
      option = this.columnsFull[i].find(o => getOptionKey(o) === key) || null;
      if (option) {
        return option;
      }
    }
    return option;
  }

  private prepareEmitValue(multiple: boolean = false): void {
    if (this.isMultipleSelections(this.selectedOptions, multiple)) {
      this.values = this.getShownCheckedOptions(this.selectedOptions).map(options =>
        options.map(o => this.getOptionValue(o))
      );
    } else if (this.isSingleSelection(this.selectedOptions)) {
      this.values = this.selectedOptions.map(o => this.getOptionValue(o));
    }
  }

  isMultipleSelections(
    //@ts-ignore
    selectedOptions: Array<NzCascaderOption[] | NzCascaderOption>,
    multiple: boolean = false
  ): selectedOptions is NzCascaderOption[][] {
    return multiple;
  }

  isSingleSelection(
    //@ts-ignore
    selectedOptions: Array<NzCascaderOption[] | NzCascaderOption>,
    multiple: boolean = false
  ): selectedOptions is NzCascaderOption[] {
    return !multiple;
  }

  // reset other node checked state based current node
  conduct(option: NzCascaderOption, index: number, isCheckStrictly: boolean = false): void {
    const checked = this.checkedOptionsKeySet.has(getOptionKey(option));
    if (option && !isCheckStrictly) {
      /**
       * @note `conductDown` should be called before `conductUp`, because `conductUp` depends on the halfChecked state of
       * current node, which is set by `conductDown`.
       */
      this.conductDown(option, checked, index + 1);
      this.conductUp(option, index - 1);
    }
  }

  /**
   * 1、children half checked
   * 2、children all checked, parent checked
   * 3、no children checked
   *
   * @param option Current option
   * @param index Column index
   */
  conductUp(option: NzCascaderOption, index: number): void {
    const parentNode = option.parent;
    if (!parentNode || index < 0) {
      return;
    }

    if (!parentNode.disabled) {
      let allSiblingChecked = true;
      let someSiblingChecked = false;
      const parentKey = getOptionKey(parentNode);

      parentNode?.children?.forEach(child => {
        const key = getOptionKey(child);
        const disabled = child.disabled;
        const checked = this.checkedOptionsKeySet.has(key);
        const halfChecked = this.halfCheckedOptionsKeySet.has(key);

        allSiblingChecked = allSiblingChecked && (disabled || (!halfChecked && checked));
        someSiblingChecked = someSiblingChecked || checked || halfChecked;
      });

      // if all the siblings are checked (or disabled), set the parent checked
      if (allSiblingChecked) {
        this.addCheckedOptions(parentNode);
        this.halfCheckedOptionsKeySet.delete(parentKey);
      } else {
        this.removeCheckedOptions(parentNode);
        // if there is any sibling checked or half checked, set the parent half checked
        if (someSiblingChecked) {
          this.halfCheckedOptionsKeySet.add(parentKey);
        } else {
          this.halfCheckedOptionsKeySet.delete(parentKey);
        }
      }
    }

    // conduct parent
    this.conductUp(parentNode, index - 1);
  }

  /**
   * reset child check state
   *
   * put option into columnsSnapshot
   *
   * @param option Current option
   * @param value Checked state
   * @param index Column index
   */
  conductDown(option: NzCascaderOption, value: boolean, index: number = 0): void {
    if (isParentOption(option)) {
      this.setColumnData(option?.children!, index, option);
    }
    if (!option.disabled) {
      const key = getOptionKey(option);
      if (value) {
        this.addCheckedOptions(option);
        this.halfCheckedOptionsKeySet.delete(key);
      } else {
        this.removeCheckedOptions(option);
      }
    }
    // conduct children
    option?.children?.forEach(n => this.conductDown(n, value, index + 1));
  }

  getShownCheckedOptions(
    selectedOptions: NzCascaderOption[][],
    showCheckedStrategy: NzCascaderShowCheckedStrategy = 'parent'
  ): NzCascaderOption[][] {
    if (showCheckedStrategy === 'child') {
      return selectedOptions.filter(options => {
        const last = options[options.length - 1];
        return isChildOption(last);
      });
    } else {
      const shownOptionsKeySet = new Set<string>();
      const shownOptions: NzCascaderOption[][] = [];
      selectedOptions.forEach(options => {
        const index = options.findIndex(o => this.checkedOptionsKeySet.has(getOptionKey(o)));
        const key = getOptionKey(options[index]);
        if (index !== -1 && !shownOptionsKeySet.has(key)) {
          shownOptionsKeySet.add(key);
          shownOptions.push(options.slice(0, index + 1));
        }
      });
      return shownOptions;
    }
  }

  addCheckedOptions(option: NzCascaderOption): void {
    const key = getOptionKey(option);
    this.checkedOptionsKeySet.add(key);
    if (option.isLeaf) {
      this.checkedLeafOptionsKeySet.add(key);
    }
  }

  removeCheckedOptions(option: NzCascaderOption): void {
    const key = getOptionKey(option);
    this.checkedOptionsKeySet.delete(key);
    this.checkedLeafOptionsKeySet.delete(key);
  }
}
