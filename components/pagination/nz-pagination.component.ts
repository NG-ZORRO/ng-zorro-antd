import {
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { isInteger } from '../core/util/check';
import { toBoolean } from '../core/util/convert';

export const KEYCODE = {
  ZERO: 48,
  NINE: 57,

  NUMPAD_ZERO: 96,
  NUMPAD_NINE: 105,

  BACKSPACE: 8,
  DELETE   : 46,
  ENTER    : 13,

  ARROW_UP  : 38,
  ARROW_DOWN: 40
};

@Component({
  selector           : 'nz-pagination',
  preserveWhitespaces: false,
  template           : `
    <ng-template #renderItemTemplate let-type let-page="page">
      <a class="ant-pagination-item-link" *ngIf="type!='page'"></a>
      <a *ngIf="type=='page'">{{page}}</a>
    </ng-template>
    <ul
      *ngIf="nzSimple"
      [class.ant-table-pagination]="nzInTable"
      class="ant-pagination ant-pagination-simple">
      <li
        title="{{ 'Pagination.prev_page' | nzI18n }}"
        class="ant-pagination-prev"
        (click)="jumpPage(current-1)"
        [class.ant-pagination-disabled]="isFirstIndex">
        <ng-template [ngTemplateOutlet]="nzRenderItem" [ngTemplateOutletContext]="{ $implicit: 'pre'}"></ng-template>
      </li>
      <li [attr.title]="current+'/'+lastIndex" class="ant-pagination-simple-pager">
        <input
          [ngModel]="nzPageIndex"
          (ngModelChange)="onPageIndexChange($event)"
          size="3">
        <span class="ant-pagination-slash">／</span>
        {{ lastIndex }}
      </li>
      <li
        title="{{ 'Pagination.next_page' | nzI18n }}"
        class="ant-pagination-next"
        (click)="jumpPage(current+1)"
        [class.ant-pagination-disabled]="isLastIndex">
        <ng-template [ngTemplateOutlet]="nzRenderItem" [ngTemplateOutletContext]="{ $implicit: 'next'}"></ng-template>
      </li>
    </ul>
    <ul
      *ngIf="!nzSimple"
      [class.mini]="nzSize=='small'"
      [class.ant-table-pagination]="nzInTable"
      class="ant-pagination">
      <span class="ant-pagination-total-text" *ngIf="nzShowTotal">
        <ng-template
          [ngTemplateOutlet]="nzShowTotal"
          [ngTemplateOutletContext]="{ $implicit: total,range:[(nzPageIndex-1)*nzPageSize+1,nzPageIndex*nzPageSize] }">
        </ng-template>
      </span>
      <li
        title="{{ 'Pagination.prev_page' | nzI18n }}"
        class="ant-pagination-prev"
        (click)="jumpPage(current-1)"
        [class.ant-pagination-disabled]="isFirstIndex">
        <ng-template [ngTemplateOutlet]="nzRenderItem" [ngTemplateOutletContext]="{ $implicit: 'pre'}"></ng-template>
      </li>
      <li
        [attr.title]="firstIndex"
        class="ant-pagination-item"
        (click)="jumpPage(firstIndex)"
        [class.ant-pagination-item-active]="isFirstIndex">
        <ng-template [ngTemplateOutlet]="nzRenderItem" [ngTemplateOutletContext]="{ $implicit: 'page',page: firstIndex }"></ng-template>
      </li>
      <li
        [attr.title]="'Pagination.prev_5' | nzI18n"
        (click)="jumpBefore(pageSize)"
        class="ant-pagination-jump-prev"
        *ngIf="(lastIndex >9)&&(current-3>firstIndex)">
        <a></a>
      </li>
      <li
        *ngFor="let page of pages"
        [attr.title]="page.index"
        class="ant-pagination-item"
        (click)="jumpPage(page.index)"
        [class.ant-pagination-item-active]="current==page.index">
        <ng-template [ngTemplateOutlet]="nzRenderItem" [ngTemplateOutletContext]="{ $implicit: 'page',page: page.index }"></ng-template>
      </li>
      <li
        [attr.title]="'Pagination.next_5' | nzI18n"
        (click)="jumpAfter(pageSize)"
        class="ant-pagination-jump-next"
        *ngIf="(lastIndex >9)&&(current+3<lastIndex)">
        <a></a>
      </li>
      <li
        [attr.title]="lastIndex"
        class="ant-pagination-item"
        (click)="jumpPage(lastIndex)"
        *ngIf="(lastIndex>0)&&(lastIndex!==firstIndex)"
        [class.ant-pagination-item-active]="isLastIndex">
        <ng-template [ngTemplateOutlet]="nzRenderItem" [ngTemplateOutletContext]="{ $implicit: 'page',page: lastIndex }"></ng-template>
      </li>
      <li
        title="{{ 'Pagination.next_page' | nzI18n }}"
        class="ant-pagination-next"
        (click)="jumpPage(current+1)"
        [class.ant-pagination-disabled]="isLastIndex">
        <ng-template [ngTemplateOutlet]="nzRenderItem" [ngTemplateOutletContext]="{ $implicit: 'next'}"></ng-template>
      </li>
      <div class="ant-pagination-options">
        <nz-select
          *ngIf="nzShowSizeChanger"
          [nzSize]="nzSize=='small'?'small':''"
          class="ant-pagination-options-size-changer"
          [ngModel]="pageSize"
          (ngModelChange)="onPageSizeChange($event)">
          <nz-option
            *ngFor="let option of nzPageSizeOptions"
            [nzLabel]="option + ('Pagination.items_per_page' | nzI18n)"
            [nzValue]="option">
          </nz-option>
          <nz-option
            *ngIf="nzPageSizeOptions.indexOf(nzPageSize)==-1"
            [nzLabel]="nzPageSize + ('Pagination.items_per_page' | nzI18n)"
            [nzValue]="nzPageSize">
          </nz-option>
        </nz-select>
        <div class="ant-pagination-options-quick-jumper"
          *ngIf="nzShowQuickJumper">
          {{ 'Pagination.jump_to' | nzI18n }}
          <input
            (keydown)="handleKeyDown($event)"
            (keyup)="handleKeyUp($event)"
            (change)="handleKeyUp($event)">
          {{ 'Pagination.page' | nzI18n }}
        </div>
      </div>
    </ul>`
})
export class NzPaginationComponent {
  @ViewChild('renderItemTemplate') private _renderItem: TemplateRef<{ $implicit: 'page' | 'prev' | 'next', page: number }>;
  private _showSizeChanger = false;
  private _showTotal: TemplateRef<{ $implicit: number, range: [ number, number ] }>;
  private _showQuickJumper = false;
  private _simple = false;
  private _pageSizeOptions = [ 10, 20, 30, 40 ];
  current = 1;
  total: number;
  pageSize = 10;
  firstIndex = 1;
  lastIndex = Infinity;
  pages = [];

  @Input() nzInTable = false;
  @Input() nzSize: string;
  @Output() nzPageSizeChange: EventEmitter<number> = new EventEmitter();
  @Output() nzPageIndexChange: EventEmitter<number> = new EventEmitter();
  @Output() nzPageIndexClickChange: EventEmitter<number> = new EventEmitter();

  @Input()
  set nzRenderItem(value: TemplateRef<{ $implicit: 'page' | 'prev' | 'next', page: number }>) {
    this._renderItem = value;
  }

  get nzRenderItem(): TemplateRef<{ $implicit: 'page' | 'prev' | 'next', page: number }> {
    return this._renderItem;
  }

  @Input()
  set nzShowSizeChanger(value: boolean) {
    this._showSizeChanger = toBoolean(value);
  }

  get nzShowSizeChanger(): boolean {
    return this._showSizeChanger;
  }

  @Input()
  set nzShowQuickJumper(value: boolean) {
    this._showQuickJumper = toBoolean(value);
  }

  get nzShowQuickJumper(): boolean {
    return this._showQuickJumper;
  }

  @Input()
  set nzShowTotal(value: TemplateRef<{ $implicit: number, range: [ number, number ] }>) {
    this._showTotal = value;
  }

  get nzShowTotal(): TemplateRef<{ $implicit: number, range: [ number, number ] }> {
    return this._showTotal;
  }

  @Input()
  set nzSimple(value: boolean) {
    this._simple = toBoolean(value);
  }

  get nzSimple(): boolean {
    return this._simple;
  }

  /** page size changer select values */
  @Input()
  set nzPageSizeOptions(value: number[]) {
    if (value && value.length) {
      this._pageSizeOptions = value;
    }
  }

  get nzPageSizeOptions(): number[] {
    return this._pageSizeOptions;
  }

  @Input()
  set nzPageIndex(value: number) {
    if (this.current === value) {
      return;
    }
    if (value > this.lastIndex) {
      this.current = this.lastIndex;
    } else if (value < this.firstIndex) {
      this.current = this.firstIndex;
    }
    this.current = Number(value);
    this.buildIndexes();
  }

  get nzPageIndex(): number {
    return this.current;
  }

  @Input()
  set nzPageSize(value: number) {
    if (value === this.pageSize) {
      return;
    }
    this.pageSize = value;
    this.nzPageIndexChange.emit(this.nzPageIndex);
    this.buildIndexes();
  }

  get nzPageSize(): number {
    return this.pageSize;
  }

  @Input()
  set nzTotal(value: number) {
    if (value === this.total) {
      return;
    }
    this.total = value;
    this.buildIndexes();
  }

  get nzTotal(): number {
    return this.total;
  }

  jumpBefore(pageSize: number): void {
    this.jumpPage(this.current - Math.round(pageSize / 2));
  }

  jumpAfter(pageSize: number): void {
    this.jumpPage(this.current + Math.round(pageSize / 2));
  }

  onPageSizeChange($event: number): void {
    this.nzPageSize = $event;
    this.nzPageSizeChange.emit($event);
  }

  onPageIndexChange($event: number): void {
    this.nzPageIndex = $event;
    this.nzPageIndexChange.emit($event);
  }

  handleKeyDown(e: KeyboardEvent): void {
    if (e.keyCode === KEYCODE.ARROW_UP || e.keyCode === KEYCODE.ARROW_DOWN) {
      e.preventDefault();
    }
  }

  handleKeyUp(e: KeyboardEvent): void {
    const target = e.target as HTMLInputElement;
    const inputValue = target.value;
    const currentInputValue = this.nzPageIndex;
    let value;

    if (inputValue === '') {
      value = inputValue;
    } else if (isNaN(Number(inputValue))) {
      value = currentInputValue;
    } else {
      value = Number(inputValue);
    }
    if (e.keyCode === KEYCODE.ENTER) {
      this.handleChange(value, target);
    }
  }

  isValid(page: number): boolean {
    return isInteger(page) && page >= 1 && page !== this.nzPageIndex;
  }

  handleChange(value: number, target: HTMLInputElement): void {
    const page = value;
    if (this.isValid(page)) {
      this.nzPageIndex = page;
      this.nzPageIndexChange.emit(this.nzPageIndex);
    }
    target.value = null;
  }

  /** generate indexes list */
  buildIndexes(): void {
    this.lastIndex = Math.ceil(this.total / this.pageSize);
    if (this.current > this.lastIndex) {
      this.nzPageIndex = this.lastIndex;
      this.nzPageIndexChange.emit(this.nzPageIndex);
    }
    const tmpPages = [];
    if (this.lastIndex <= 9) {
      for (let i = 2; i <= this.lastIndex - 1; i++) {
        tmpPages.push({ index: i });
      }
    } else {
      const current = +this.current;
      let left = Math.max(2, current - 2);
      let right = Math.min(current + 2, this.lastIndex - 1);

      if (current - 1 <= 2) {
        right = 5;
      }

      if (this.lastIndex - current <= 2) {
        left = this.lastIndex - 4;
      }

      for (let i = left; i <= right; i++) {
        tmpPages.push({ index: i });
      }
    }
    this.pages = tmpPages;
  }

  jumpPage(index: number): void {
    if (index === this.nzPageIndex) {
      return;
    }

    if (index < this.firstIndex) {
      this.nzPageIndex = this.firstIndex;
    } else if (index > this.lastIndex) {
      this.nzPageIndex = this.lastIndex;
    } else {
      this.nzPageIndex = index;
    }
    this.nzPageIndexClickChange.emit(this.nzPageIndex);
    this.nzPageIndexChange.emit(this.nzPageIndex);
  }

  get isLastIndex(): boolean {
    return this.current === this.lastIndex;
  }

  get isFirstIndex(): boolean {
    return this.current === this.firstIndex;
  }

  constructor() {
  }
}
