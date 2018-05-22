import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  Renderer2,
  ViewChild
} from '@angular/core';
import { isNotNil } from '../core/util/check';

import { toBoolean } from '../core/util/convert';

import { NzDropDownComponent } from '../dropdown/nz-dropdown.component';

/* tslint:disable-next-line:no-any */
export type NzThFilterType = Array<{ text: string; value: any }>;

export interface NzThItemInterface {
  text: string;
  /* tslint:disable-next-line:no-any */
  value: any;
  checked: boolean;
}

@Component({
  // tslint:disable-next-line:component-selector
  selector           : 'th',
  preserveWhitespaces: false,
  template           : `
    <ng-template #checkboxTemplate>
      <label
        [class.ant-table-selection-select-all-custom]="nzShowRowSelection"
        nz-checkbox
        [(ngModel)]="nzChecked"
        [nzDisabled]="nzDisabled"
        [nzIndeterminate]="nzIndeterminate"
        (ngModelChange)="nzCheckedChange.emit($event)">
      </label>
    </ng-template>
    <div class="ant-table-selection" *ngIf="nzShowRowSelection">
      <ng-container *ngIf="nzShowCheckbox">
        <ng-template [ngTemplateOutlet]="checkboxTemplate"></ng-template>
      </ng-container>
      <nz-dropdown nzPlacement="bottomLeft">
        <div nz-dropdown class="ant-table-selection-down">
          <i class="anticon anticon-down"></i>
        </div>
        <ul nz-menu class="ant-table-selection-menu">
          <li nz-menu-item *ngFor="let selection of nzSelections" (click)="selection.onSelect()">{{selection.text}}</li>
        </ul>
      </nz-dropdown>
    </div>
    <ng-container *ngIf="nzShowCheckbox && !nzShowRowSelection">
      <ng-template [ngTemplateOutlet]="checkboxTemplate"></ng-template>
    </ng-container>
    <ng-content></ng-content>
    <div class="ant-table-column-sorter" *ngIf="nzShowSort">
      <span
        class="ant-table-column-sorter-up"
        [class.on]="nzSort == 'ascend'"
        [class.off]="nzSort != 'ascend'"
        title="↑"
        (click)="setSortValue('ascend')">
        <i class="anticon anticon-caret-up"></i>
      </span>
      <span
        class="ant-table-column-sorter-down"
        [class.on]="nzSort == 'descend'"
        [class.off]="nzSort != 'descend'"
        title="↓"
        (click)="setSortValue('descend')">
        <i class="anticon anticon-caret-down"></i>
      </span>
    </div>
    <nz-dropdown nzTrigger="click" *ngIf="nzShowFilter" [nzClickHide]="false" [hasFilterButton]="true" (nzVisibleChange)="dropDownVisibleChange($event)">
      <i class="anticon anticon-filter" [class.ant-table-filter-selected]="hasFilterValue" nz-dropdown></i>
      <ul nz-menu>
        <ng-container *ngIf="nzFilterMultiple">
          <li nz-menu-item *ngFor="let filter of multipleFilterList" (click)="checkMultiple(filter)">
            <label nz-checkbox [ngModel]="filter.checked"></label><span>{{filter.text}}</span>
          </li>
        </ng-container>
        <ng-container *ngIf="!nzFilterMultiple">
          <li nz-menu-item *ngFor="let filter of singleFilterList" (click)="checkSingle(filter)">
            <label nz-radio [ngModel]="filter.checked">{{filter.text}}</label>
          </li>
        </ng-container>
      </ul>
      <div class="ant-table-filter-dropdown-btns">
        <a class="ant-table-filter-dropdown-link confirm" (click)="hideDropDown()">
          <span (click)="search()">{{'Table.filterConfirm' | nzI18n}}</span>
        </a>
        <a class="ant-table-filter-dropdown-link clear" (click)="hideDropDown()">
          <span (click)="reset()">{{'Table.filterReset' | nzI18n}}</span>
        </a>
      </div>
    </nz-dropdown>
  `
})
export class NzThComponent {
  private _sort = null;
  private _filters: NzThFilterType = [];
  private _showSort = false;
  private _showFilter = false;
  private _showCheckbox = false;
  private _showRowSelection = false;
  el: HTMLElement;
  hasFilterValue = false;
  multipleFilterList: NzThItemInterface[] = [];
  singleFilterList: NzThItemInterface[] = [];
  /* tslint:disable-next-line:no-any */
  @Input() nzSelections: Array<{ text: string, onSelect: any }> = [];
  @Input() nzChecked = false;
  @Input() nzDisabled = false;
  @Input() nzIndeterminate = false;
  @Input() nzSortKey: string;
  @Input() nzFilterMultiple = true;
  @Input() nzWidth: string;
  @Output() nzCheckedChange = new EventEmitter<boolean>();
  @ViewChild(NzDropDownComponent) nzDropDownComponent: NzDropDownComponent;
  @Output() nzSortChange = new EventEmitter<string>();
  @Output() nzSortChangeWithKey = new EventEmitter<{ key: string, value: string }>();
  /* tslint:disable-next-line:no-any */
  @Output() nzFilterChange = new EventEmitter<any[] | any>();

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
    if (this.nzSort === value) {
      this.nzSort = null;
    } else {
      this.nzSort = value;
    }
    this.nzSortChangeWithKey.emit({ key: this.nzSortKey, value: this.nzSort });
    this.nzSortChange.emit(this.nzSort);
  }

  search(): void {
    if (this.nzFilterMultiple) {
      const filterList = this.multipleFilterList.filter(item => item.checked).map(item => item.value);
      this.hasFilterValue = filterList.length > 0;
      this.nzFilterChange.emit(filterList);
    } else {
      const checkedFilter = this.singleFilterList.find(item => item.checked);
      const filterValue = checkedFilter ? checkedFilter.value : null;
      this.hasFilterValue = isNotNil(filterValue);
      this.nzFilterChange.emit(filterValue);
    }
    this.hideDropDown();
  }

  reset(): void {
    this.initMultipleFilterList();
    this.initSingleFilterList();
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
  }

  dropDownVisibleChange(value: boolean): void {
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
    } else {
      console.warn('nzFilters only accept type of Array<{ text: string; value: any }>');
    }
  }

  get nzFilters(): NzThFilterType {
    return this._filters;
  }

  initMultipleFilterList(): void {
    this.multipleFilterList = this.nzFilters.map(item => {
      return { text: item.text, value: item.value, checked: false };
    });
  }

  initSingleFilterList(): void {
    this.singleFilterList = this.nzFilters.map(item => {
      return { text: item.text, value: item.value, checked: false };
    });
  }

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    this.el = this.elementRef.nativeElement;
  }
}
