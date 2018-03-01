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

import { toBoolean } from '../core/util/convert';
import { NzDropDownComponent } from '../dropdown';
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
  selector           : 'nz-table th',
  preserveWhitespaces: false,
  template           : `
    <ng-content></ng-content>
    <div class="ant-table-column-sorter" *ngIf="showSort">
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
    <nz-dropdown nzTrigger="click" *ngIf="showFilter" [nzClickHide]="false" [hasFilterButton]="true" (nzVisibleChange)="dropDownVisibleChange($event)">
      <i class="anticon anticon-filter" nz-dropdown></i>
      <ul nz-menu>
        <ng-container *ngIf="nzFilterMultiple">
          <li nz-menu-item *ngFor="let filter of multipleFilterList" (click)="filter.checked=!filter.checked">
            <label nz-checkbox [ngModel]="filter.checked">{{filter.text}}</label>
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
  private _checkbox = false;
  private _expand = false;
  private _left = null;
  private _right = null;
  private _sort = null;
  private _filters: NzThFilterType = [];
  el: HTMLElement;
  showSort: boolean;
  showFilter: boolean;
  @ViewChild(NzDropDownComponent) nzDropDownComponent: NzDropDownComponent;
  multipleFilterList: NzThItemInterface[] = [];
  singleFilterList: NzThItemInterface[] = [];
  @Output() nzSortChange = new EventEmitter<string>();
  /* tslint:disable-next-line:no-any */
  @Output() nzOnFilter = new EventEmitter<any[] | any>();
  @Input() nzFilterMultiple = true;

  @Input()
  set nzSort(value: string) {
    this.showSort = true;
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
    this.nzSortChange.emit(this.nzSort);
  }

  search(): void {
    if (this.nzFilterMultiple) {
      this.nzOnFilter.emit(this.multipleFilterList.filter(item => item.checked).map(item => item.value));
    } else {
      const checkedFilter = this.singleFilterList.find(item => item.checked);
      this.nzOnFilter.emit(checkedFilter ? checkedFilter.value : null);
    }
    this.hideDropDown();
  }

  reset(): void {
    this.initMultipleFilterList();
    this.initSingleFilterList();
    this.search();
    this.hideDropDown();
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
    if (value) {
      this.showFilter = true;
      this._filters = value;
      if (this.nzFilterMultiple) {
        this.initMultipleFilterList();
      } else {
        this.initSingleFilterList();
      }
    } else {
      this.showFilter = false;
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

  @Input() nzWidth;

  @Input()
  @HostBinding(`class.ant-table-selection-column`)
  set nzCheckbox(value: boolean) {
    this._checkbox = toBoolean(value);
  }

  get nzCheckbox(): boolean {
    return this._checkbox;
  }

  @Input()
  @HostBinding(`style.left`)
  @HostBinding(`class.ant-table-th-left-sticky`)
  set nzLeft(value: string) {
    this._left = value;
  }

  get nzLeft(): string {
    return this._left;
  }

  @Input()
  @HostBinding(`style.right`)
  @HostBinding(`class.ant-table-th-right-sticky`)
  set nzRight(value: string) {
    this._right = value;
  }

  get nzRight(): string {
    return this._right;
  }

  @Input()
  @HostBinding(`class.ant-table-expand-icon-th`)
  set nzExpand(value: boolean) {
    this._expand = toBoolean(value);
  }

  get nzExpand(): boolean {
    return this._expand;
  }

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    this.el = this.elementRef.nativeElement;
  }
}
