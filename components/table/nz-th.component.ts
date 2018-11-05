import {
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  Renderer2,
  ViewChild
} from '@angular/core';
import { isNotNil } from '../core/util/check';

import { toBoolean } from '../core/util/convert';

import { NzDropDownComponent } from '../dropdown/nz-dropdown.component';

/* tslint:disable-next-line:no-any */
export type NzThFilterType = Array<{ text: string; value: any; byDefault?: boolean }>;

export interface NzThItemInterface {
  text: string;
  /* tslint:disable-next-line:no-any */
  value: any;
  checked: boolean;
}

@Component({
  // tslint:disable-next-line:component-selector
  selector           : 'th:not(.nz-disable-th)',
  preserveWhitespaces: false,
  templateUrl        : './nz-th.component.html'
})
export class NzThComponent {
  private _sort = null;
  private _filters: NzThFilterType = [];
  private _showSort = false;
  private _showFilter = false;
  private _showCheckbox = false;
  private _showRowSelection = false;
  private _hasDefaultFilter = false;
  private _customFilter = false;
  el: HTMLElement = this.elementRef.nativeElement;
  hasFilterValue = false;
  filterVisible = false;
  multipleFilterList: NzThItemInterface[] = [];
  singleFilterList: NzThItemInterface[] = [];
  @ViewChild(NzDropDownComponent) nzDropDownComponent: NzDropDownComponent;
  /* tslint:disable-next-line:no-any */
  @Input() nzSelections: Array<{ text: string, onSelect: any }> = [];
  @Input() nzChecked = false;
  @Input() nzDisabled = false;
  @Input() nzIndeterminate = false;
  @Input() nzSortKey: string;
  @Input() nzFilterMultiple = true;
  @Input() nzWidth: string;
  @Output() nzCheckedChange = new EventEmitter<boolean>();
  @Output() nzSortChange = new EventEmitter<string>();
  @Output() nzSortChangeWithKey = new EventEmitter<{ key: string, value: string }>();
  /* tslint:disable-next-line:no-any */
  @Output() nzFilterChange = new EventEmitter<any[] | any>();

  @HostBinding('class.ant-table-column-has-actions')
  get hasActionsClass(): boolean {
    return this.nzShowFilter || this.nzShowSort || this.nzCustomFilter;
  }

  @HostBinding('class.ant-table-column-has-filters')
  get hasFiltersClass(): boolean {
    return this.nzShowFilter || this.nzCustomFilter;
  }

  @HostBinding('class.ant-table-column-has-sorters')
  get hasSortersClass(): boolean {
    return this.nzShowSort;
  }

  updateSortValue(): void {
    if (this.nzShowSort) {
      if (this.nzSort === 'descend') {
        this.setSortValue('ascend');
      } else if (this.nzSort === 'ascend') {
        this.setSortValue(null);
      } else {
        this.setSortValue('descend');
      }
    }
  }

  @Input()
  set nzCustomFilter(value: boolean) {
    this._customFilter = toBoolean(value);
  }

  get nzCustomFilter(): boolean {
    return this._customFilter;
  }

  @Input()
  set nzShowSort(value: boolean) {
    this._showSort = toBoolean(value);
  }

  get nzShowSort(): boolean {
    return this._showSort;
  }

  @Input()
  set nzShowFilter(value: boolean) {
    this._showFilter = toBoolean(value);
  }

  get nzShowFilter(): boolean {
    return this._showFilter;
  }

  @Input()
  set nzShowRowSelection(value: boolean) {
    this._showRowSelection = toBoolean(value);
    if (this._showRowSelection) {
      this.renderer.addClass(this.el, 'ant-table-selection-column-custom');
    } else {
      this.renderer.removeClass(this.el, 'ant-table-selection-column-custom');
    }
  }

  get nzShowRowSelection(): boolean {
    return this._showRowSelection;
  }

  @Input()
  set nzLeft(value: string) {
    if (isNotNil(value)) {
      this.renderer.addClass(this.el, 'ant-table-th-left-sticky');
      this.renderer.setStyle(this.el, 'left', value);
    } else {
      this.renderer.removeClass(this.el, 'ant-table-th-left-sticky');
      this.renderer.removeStyle(this.el, 'left');
    }
  }

  @Input()
  set nzRight(value: string) {
    if (isNotNil(value)) {
      this.renderer.addClass(this.el, 'ant-table-th-right-sticky');
      this.renderer.setStyle(this.el, 'right', value);
    } else {
      this.renderer.removeClass(this.el, 'ant-table-th-right-sticky');
      this.renderer.removeStyle(this.el, 'right');
    }
  }

  @Input()
  set nzExpand(value: boolean) {
    const isExpand = toBoolean(value);
    if (isExpand) {
      this.renderer.addClass(this.el, 'ant-table-expand-icon-th');
    } else {
      this.renderer.removeClass(this.el, 'ant-table-expand-icon-th');
    }
  }

  @Input()
  set nzShowCheckbox(value: boolean) {
    this._showCheckbox = toBoolean(value);
    if (this._showCheckbox) {
      this.renderer.addClass(this.el, 'ant-table-selection-column');
    } else {
      this.renderer.removeClass(this.el, 'ant-table-selection-column');
    }
  }

  get nzShowCheckbox(): boolean {
    return this._showCheckbox;
  }

  @Input()
  set nzSort(value: string) {
    this._sort = value;
    if ((value !== 'ascend') && (value !== 'descend')) {
      this.renderer.removeClass(this.el, 'ant-table-column-sort');
    } else {
      this.renderer.addClass(this.el, 'ant-table-column-sort');
    }
  }

  get nzSort(): string {
    return this._sort;
  }

  setSortValue(value: string): void {
    this.nzSort = value;
    this.nzSortChangeWithKey.emit({ key: this.nzSortKey, value: this.nzSort });
    this.nzSortChange.emit(this.nzSort);
  }

  get filterList(): NzThItemInterface[] {
    return this.multipleFilterList.filter(item => item.checked).map(item => item.value);
  }

  /* tslint:disable-next-line:no-any */
  get filterValue(): any {
    const checkedFilter = this.singleFilterList.find(item => item.checked);
    return checkedFilter ? checkedFilter.value : null;
  }

  updateFilterStatus(): void {
    if (this.nzFilterMultiple) {
      this.hasFilterValue = this.filterList.length > 0;
    } else {
      this.hasFilterValue = isNotNil(this.filterValue);
    }
  }

  search(): void {
    this.updateFilterStatus();
    if (this.nzFilterMultiple) {
      this.nzFilterChange.emit(this.filterList);
    } else {
      this.nzFilterChange.emit(this.filterValue);
    }
    this.hideDropDown();
  }

  reset(): void {
    this.initMultipleFilterList(true);
    this.initSingleFilterList(true);
    this.search();
    this.hideDropDown();
    this.hasFilterValue = false;
  }

  checkMultiple(filter: NzThItemInterface): void {
    filter.checked = !filter.checked;
  }

  checkSingle(filter: NzThItemInterface): void {
    this.singleFilterList.forEach(item => item.checked = item === filter);
  }

  hideDropDown(): void {
    this.nzDropDownComponent.nzVisible = false;
    this.nzDropDownComponent.hide();
    this.filterVisible = false;
  }

  dropDownVisibleChange(value: boolean): void {
    this.filterVisible = value;
    if (!value) {
      this.search();
    }
  }

  @Input()
  set nzFilters(value: NzThFilterType) {
    if (Array.isArray(value)) {
      this._filters = value;
      this.initMultipleFilterList();
      this.initSingleFilterList();
      this.updateFilterStatus();
    } else {
      console.warn('nzFilters only accept type of Array<{ text: string; value: any }>');
    }
  }

  get nzFilters(): NzThFilterType {
    return this._filters;
  }

  initMultipleFilterList(force?: boolean): void {
    this.multipleFilterList = this.nzFilters.map(item => {
      const checked = force ? false : !!item.byDefault;
      if (checked) {
        this._hasDefaultFilter = true;
      }
      return { text: item.text, value: item.value, checked };
    });
    this.checkDefaultFilters();
  }

  initSingleFilterList(force?: boolean): void {
    this.singleFilterList = this.nzFilters.map(item => {
      const checked = force ? false : !!item.byDefault;
      if (checked) {
        this._hasDefaultFilter = true;
      }
      return { text: item.text, value: item.value, checked };
    });
    this.checkDefaultFilters();
  }

  checkDefaultFilters(): void {
    if (!this.nzFilters || this.nzFilters.length === 0 || !this._hasDefaultFilter) {
      return;
    }
    this.updateFilterStatus();
  }

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
  }
}
