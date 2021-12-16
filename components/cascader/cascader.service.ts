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
  selectedOptions: Array<NzCascaderOption | NzCascaderOption[]> = [];

  checkedOptionsKeySet: Set<NzSafeAny> = new Set();
  halfCheckedOptionsKeySet: Set<NzSafeAny> = new Set();
  checkedLeafOptionsKeySet: Set<NzSafeAny> = new Set();

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
          multiple
            ? (this.selectedOptions = [...this.selectedOptions, [...this.activatedOptions]])
            : (this.selectedOptions = [...this.selectedOptions, ...this.activatedOptions]);
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
   * Try to set a option as activated.
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

  setOptionSelected(option: NzCascaderOption, index: number, multiple: boolean = false): void {
    const changeOn = this.cascaderComponent.nzChangeOn;
    const shouldPerformSelection = (o: NzCascaderOption, i: number): boolean =>
      typeof changeOn === 'function' ? changeOn(o, i) : false;
    if (multiple && !this.hasOptionSelected(option.value, multiple)) {
      this.addCheckedOptions(option);
      this.conduct(option, index);
      this.activatedOptions = [];
      this.checkedLeafOptionsKeySet.forEach(leafValue => {
        const ancestorOptions = this.getAncestorOptions(this.findAllOptionWithValue(leafValue)!);
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
   * Get whether value has selected
   *
   * @param value
   * @param multiMode Set true if multiple select
   */
  hasOptionSelected(value: NzSafeAny, multipleMode: boolean = false): boolean {
    if (this.isMultipleSelections(this.selectedOptions, multipleMode)) {
      return this.checkedOptionsKeySet.has(value);
    }

    if (this.isSingleSelection(this.selectedOptions, multipleMode)) {
      return this.selectedOptions.some(o => JSON.stringify(o.value) === JSON.stringify(value));
    }
    return false;
  }

  /**
   * Remove item from selectedOptions
   *
   * @param value
   * @param multipleMode
   */
  removeSelectedOption(option: NzCascaderOption, index: number, multipleMode: boolean = false): void {
    if (this.isMultipleSelections(this.selectedOptions, multipleMode)) {
      this.selectedOptions = this.selectedOptions.filter(
        inOptions => !inOptions.some(o => JSON.stringify(o.value) === JSON.stringify(option.value))
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
   */
  private setColumnData(options: NzCascaderOption[], columnIndex: number, parent: NzCascaderOption): void {
    this.setColumnsFullData(options, columnIndex, parent);
    const existingOptions = this.columns[columnIndex];
    if (!arraysEqual(existingOptions, options)) {
      options.forEach(o => (o.parent = parent));
      this.columns[columnIndex] = options;
      this.dropBehindColumns(columnIndex);
    }
  }

  /**
   * Try to insert options into a column.
   *
   * @param options Options to insert
   * @param columnIndex Position
   */
  private setColumnsFullData(options: NzCascaderOption[], columnIndex: number, parent: NzCascaderOption): void {
    const existingOptions = this.columnsFull[columnIndex];
    if (!arraysEqual(existingOptions, options)) {
      options.forEach(o => (o.parent = parent));
      this.columnsFull[columnIndex] = this.columnsFull[columnIndex] ?? [];
      for (let option of options) {
        if (!this.columnsFull[columnIndex].some(o => o.value === option.value)) {
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
   * Find the first option with given value in all column
   */
  private findAllOptionWithValue(value: NzCascaderOption | NzSafeAny): NzCascaderOption | null {
    let option = null;
    for (let i = 0; i <= this.columnsFull.length; ++i) {
      option = this.findOptionWithValue(i, value, this.columnsFull);
      if (option) {
        return option;
      }
    }
    return option;
  }

  private prepareEmitValue(multiple: boolean = false): void {
    if (this.isMultipleSelections(this.selectedOptions, multiple)) {
      this.values = this.selectedOptions.map(options => options.map(o => this.getOptionValue(o)));
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
    const isChecked = this.checkedOptionsKeySet.has(option.value);
    if (option && !isCheckStrictly) {
      this.conductUp(option, index - 1);
      this.conductDown(option, isChecked, index + 1);
    }
  }

  /**
   * 1、children half checked
   * 2、children all checked, parent checked
   * 3、no children checked
   */
  // @ts-ignore
  conductUp(option: NzCascaderOption, index: number = 0): void {
    // this.setColumnData(this.columns[index], index, option.parent!);
    const parentNode = option.parent;
    if (parentNode) {
      if (!parentNode.disabled) {
        if (
          parentNode?.children?.every(
            child =>
              child.disabled ||
              (!this.halfCheckedOptionsKeySet.has(child.value) && this.checkedOptionsKeySet.has(child.value))
          )
        ) {
          this.addCheckedOptions(parentNode);
          this.halfCheckedOptionsKeySet.delete(parentNode.value);
        } else if (
          parentNode?.children?.some(
            child => this.halfCheckedOptionsKeySet.has(child.value) || this.checkedOptionsKeySet.has(child.value)
          )
        ) {
          this.removeCheckedOptions(parentNode);
          this.halfCheckedOptionsKeySet.add(parentNode.value);
        } else {
          this.removeCheckedOptions(parentNode);
          this.halfCheckedOptionsKeySet.delete(parentNode.value);
        }
      }
      this.conductUp(parentNode);
    }
  }

  /**
   * reset child check state
   *
   * put option into columnsSnapshot
   */
  conductDown(option: NzCascaderOption, value: boolean, index: number = 0): void {
    if (isParentOption(option)) {
      this.setColumnData(option?.children!, index, option);
    }
    if (!option.disabled && value) {
      this.addCheckedOptions(option);
      this.halfCheckedOptionsKeySet.delete(option.value);
    } else if (!option.disabled && !value) {
      this.removeCheckedOptions(option);
    }
    option?.children?.forEach(n => {
      this.conductDown(n, value, index + 1);
    });
  }

  addCheckedOptions(option: NzCascaderOption): void {
    this.checkedOptionsKeySet.add(option.value);
    if (option.isLeaf) {
      this.checkedLeafOptionsKeySet.add(option.value);
    }
  }

  removeCheckedOptions(option: NzCascaderOption): void {
    this.checkedOptionsKeySet.delete(option.value);
    this.checkedLeafOptionsKeySet.delete(option.value);
  }

  getOptionLevel(option: NzCascaderOption): number {
    let level = 0;
    let tOption = option;
    for (; !!tOption.parent; ++level, tOption = tOption.parent) {}
    return level;
  }
  /**
   * Load all options to columnsFull
   * For find option by value purpose
   *
   * @returns
   */
  //@ts-ignore
  private loadOptionsToColumnsFull(): void {
    let depth = 0;
    let travelOptions = this.nzOptions && this.nzOptions.length ? this.nzOptions : [];
    let nextDepthTravelOptions: NzCascaderOption[] = [];
    while (true) {
      travelOptions.forEach(o => {
        this.columnsFull[depth] = [...(this.columnsFull[depth] ?? []), o];
        if (o.children) {
          nextDepthTravelOptions = [...nextDepthTravelOptions, ...o.children];
        }
      });
      if (nextDepthTravelOptions.length) {
        ++depth;
        travelOptions = nextDepthTravelOptions;
        nextDepthTravelOptions = [];
      } else {
        return;
      }
    }
  }
}
