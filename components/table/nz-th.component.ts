import {
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  Renderer2
} from '@angular/core';

import { toBoolean } from '../core/util/convert';

/* tslint:disable-next-line:no-any */
export type NzThFilterType = Array<{ text: string; value: any }>;

@Component({
  selector           : 'nz-table th',
  preserveWhitespaces: false,
  template           : `
    <ng-content></ng-content>
    <div class="ant-table-column-sorter">
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
    <nz-dropdown nzTrigger="click" *ngIf="showFilter&&nzFilterMultiple">
      <i class="anticon anticon-filter" nz-dropdown></i>
      <ul nz-menu>
        <li nz-menu-item *ngFor="let filter of multipleFilterList">
          <label nz-checkbox [(ngModel)]="filter.checked">
            {{filter.text}}
          </label>
        </li>
      </ul>
      <div nz-table-filter>
        <span nz-table-filter-confirm (click)="search()">{{'Table.filterConfirm' | nzI18n}}</span>
        <span nz-table-filter-clear (click)="reset()">{{'Table.filterReset' | nzI18n}}</span>
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
  /* tslint:disable-next-line:no-any */
  multipleFilterList: Array<{ text: string; value: any, checked: boolean }> = [];
  @Output() nzSortChange = new EventEmitter<string>();
  /* tslint:disable-next-line:no-any */
  @Output() nzOnFilter = new EventEmitter<any[]>();
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
    this.nzOnFilter.emit(this.multipleFilterList.filter(item => item.checked).map(item => item.value));
  }

  reset(): void {
    this.initMultipleFilterList();
    this.search();
  }

  @Input()
  set nzFilters(value: NzThFilterType) {
    if (value) {
      this.showFilter = true;
      this._filters = value;
      if (this.nzFilterMultiple) {
        this.initMultipleFilterList();
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
