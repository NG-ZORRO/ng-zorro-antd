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

@Component({
  selector           : 'nz-pagination',
  preserveWhitespaces: false,
  template           : `
    <ng-template #renderItemTemplate let-type let-page="page">
      <a class="ant-pagination-item-link" *ngIf="type!='page'"></a>
      <a *ngIf="type=='page'">{{page}}</a>
    </ng-template>
    <ng-container *ngIf="(nzHideOnSinglePage&&(lastIndex!=1))||!nzHideOnSinglePage">
      <ul
        *ngIf="nzSimple"
        [class.ant-table-pagination]="nzInTable"
        class="ant-pagination ant-pagination-simple">
        <li
          title="{{ 'Pagination.prev_page' | nzI18n }}"
          class="ant-pagination-prev"
          (click)="jumpPreOne()"
          [class.ant-pagination-disabled]="isFirstIndex">
          <ng-template [ngTemplateOutlet]="nzItemRender" [ngTemplateOutletContext]="{ $implicit: 'pre'}"></ng-template>
        </li>
        <li [attr.title]="nzPageIndex+'/'+lastIndex" class="ant-pagination-simple-pager">
          <input
            #simplePagerInput
            [ngModel]="nzPageIndex"
            (keydown.enter)="handleKeyDown($event,simplePagerInput,false)"
            size="3">
          <span class="ant-pagination-slash">／</span>
          {{ lastIndex }}
        </li>
        <li
          title="{{ 'Pagination.next_page' | nzI18n }}"
          class="ant-pagination-next"
          (click)="jumpNextOne()"
          [class.ant-pagination-disabled]="isLastIndex">
          <ng-template [ngTemplateOutlet]="nzItemRender" [ngTemplateOutletContext]="{ $implicit: 'next'}"></ng-template>
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
          [ngTemplateOutletContext]="{ $implicit: nzTotal,range:[(nzPageIndex-1)*nzPageSize+1,nzPageIndex*nzPageSize] }">
        </ng-template>
      </span>
        <li
          title="{{ 'Pagination.prev_page' | nzI18n }}"
          class="ant-pagination-prev"
          (click)="jumpPreOne()"
          [class.ant-pagination-disabled]="isFirstIndex">
          <ng-template [ngTemplateOutlet]="nzItemRender" [ngTemplateOutletContext]="{ $implicit: 'pre'}"></ng-template>
        </li>
        <li
          [attr.title]="firstIndex"
          class="ant-pagination-item"
          (click)="jumpPage(firstIndex)"
          [class.ant-pagination-item-active]="isFirstIndex">
          <ng-template [ngTemplateOutlet]="nzItemRender" [ngTemplateOutletContext]="{ $implicit: 'page',page: firstIndex }"></ng-template>
        </li>
        <li
          [attr.title]="'Pagination.prev_5' | nzI18n"
          (click)="jumpPreFive()"
          class="ant-pagination-jump-prev"
          *ngIf="(lastIndex >9)&&(nzPageIndex-3>firstIndex)">
          <a></a>
        </li>
        <li
          *ngFor="let page of pages"
          [attr.title]="page.index"
          class="ant-pagination-item"
          (click)="jumpPage(page.index)"
          [class.ant-pagination-item-active]="nzPageIndex==page.index">
          <ng-template [ngTemplateOutlet]="nzItemRender" [ngTemplateOutletContext]="{ $implicit: 'page',page: page.index }"></ng-template>
        </li>
        <li
          [attr.title]="'Pagination.next_5' | nzI18n"
          (click)="jumpNextFive()"
          class="ant-pagination-jump-next"
          *ngIf="(lastIndex >9)&&(nzPageIndex+3<lastIndex)">
          <a></a>
        </li>
        <li
          [attr.title]="lastIndex"
          class="ant-pagination-item"
          (click)="jumpPage(lastIndex)"
          *ngIf="(lastIndex>0)&&(lastIndex!==firstIndex)"
          [class.ant-pagination-item-active]="isLastIndex">
          <ng-template [ngTemplateOutlet]="nzItemRender" [ngTemplateOutletContext]="{ $implicit: 'page',page: lastIndex }"></ng-template>
        </li>
        <li
          title="{{ 'Pagination.next_page' | nzI18n }}"
          class="ant-pagination-next"
          (click)="jumpNextOne()"
          [class.ant-pagination-disabled]="isLastIndex">
          <ng-template [ngTemplateOutlet]="nzItemRender" [ngTemplateOutletContext]="{ $implicit: 'next'}"></ng-template>
        </li>
        <div class="ant-pagination-options" *ngIf="nzShowQuickJumper||nzShowSizeChanger">
          <nz-select
            *ngIf="nzShowSizeChanger"
            [nzSize]="nzSize=='small'?'small':''"
            class="ant-pagination-options-size-changer"
            [ngModel]="nzPageSize"
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
            <input #quickJumperInput (keydown.enter)="handleKeyDown($event,quickJumperInput,true)">
            {{ 'Pagination.page' | nzI18n }}
          </div>
        </div>
      </ul>
    </ng-container>

  `
})
export class NzPaginationComponent {
  @ViewChild('renderItemTemplate') private _itemRender: TemplateRef<{ $implicit: 'page' | 'prev' | 'next', page: number }>;
  private _showSizeChanger = false;
  private _showQuickJumper = false;
  private _simple = false;
  private _hideOnSinglePage = false;
  private _pageSize = 10;
  private _pageSizeOptions = [ 10, 20, 30, 40 ];
  private _total: number;
  private _pageIndex = 1;
  firstIndex = 1;
  pages = [];
  @Input() nzShowTotal: TemplateRef<{ $implicit: number, range: [ number, number ] }>;
  @Input() nzInTable = false;
  @Input() nzSize: string;
  @Output() nzPageSizeChange: EventEmitter<number> = new EventEmitter();
  @Output() nzPageIndexChange: EventEmitter<number> = new EventEmitter();

  @Input()
  set nzItemRender(value: TemplateRef<{ $implicit: 'page' | 'prev' | 'next', page: number }>) {
    this._itemRender = value;
  }

  get nzItemRender(): TemplateRef<{ $implicit: 'page' | 'prev' | 'next', page: number }> {
    return this._itemRender;
  }

  @Input()
  set nzShowSizeChanger(value: boolean) {
    this._showSizeChanger = toBoolean(value);
  }

  get nzShowSizeChanger(): boolean {
    return this._showSizeChanger;
  }

  @Input()
  set nzHideOnSinglePage(value: boolean) {
    this._hideOnSinglePage = toBoolean(value);
  }

  get nzHideOnSinglePage(): boolean {
    return this._hideOnSinglePage;
  }

  @Input()
  set nzShowQuickJumper(value: boolean) {
    this._showQuickJumper = toBoolean(value);
  }

  get nzShowQuickJumper(): boolean {
    return this._showQuickJumper;
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
    if (this._pageIndex === value) {
      return;
    }
    if (value > this.lastIndex) {
      this._pageIndex = this.lastIndex;
    } else if (value < this.firstIndex) {
      this._pageIndex = this.firstIndex;
    } else {
      this._pageIndex = Number(value);
    }
    this.buildIndexes();
  }

  get nzPageIndex(): number {
    return this._pageIndex;
  }

  @Input()
  set nzPageSize(value: number) {
    if (value === this._pageSize) {
      return;
    }
    this._pageSize = value;
    const pageIndexOverflow = this.checkLastIndexOverflow();
    if (pageIndexOverflow) {
      this.nzPageIndex = this.lastIndex;
      this.nzPageIndexChange.emit(this.lastIndex);
    }
    this.buildIndexes();
  }

  get nzPageSize(): number {
    return this._pageSize;
  }

  @Input()
  set nzTotal(value: number) {
    this._total = value;
    this.buildIndexes();
  }

  get nzTotal(): number {
    return this._total;
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
    this.nzPageIndexChange.emit(this.nzPageIndex);
  }

  jumpPreFive(): void {
    this.jumpPage(this.nzPageIndex - 5);
  }

  jumpNextFive(): void {
    this.jumpPage(this.nzPageIndex + 5);
  }

  jumpPreOne(): void {
    if (this.isFirstIndex) {
      return;
    }
    this.jumpPage(this.nzPageIndex - 1);
  }

  jumpNextOne(): void {
    if (this.isLastIndex) {
      return;
    }
    this.jumpPage(this.nzPageIndex + 1);
  }

  onPageSizeChange($event: number): void {
    this.nzPageSize = $event;
    this.nzPageSizeChange.emit($event);
  }

  handleKeyDown(e: KeyboardEvent, input: HTMLInputElement, clearInputValue: boolean): void {
    const target = input;
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
    this.handleChange(value, target, clearInputValue);
  }

  isValid(page: number): boolean {
    return isInteger(page) && (page >= 1) && (page !== this.nzPageIndex) && (page <= this.lastIndex);
  }

  handleChange(value: number, target: HTMLInputElement, clearInputValue: boolean): void {
    const page = value;
    if (this.isValid(page)) {
      this.nzPageIndex = page;
      this.nzPageIndexChange.emit(this.nzPageIndex);
    }
    if (clearInputValue) {
      target.value = null;
    } else {
      target.value = `${this.nzPageIndex}`;
    }
  }

  checkLastIndexOverflow(): boolean {
    return this.nzPageIndex > this.lastIndex;
  }

  get lastIndex(): number {
    return Math.ceil(this.nzTotal / this.nzPageSize);
  }

  /** generate indexes list */
  buildIndexes(): void {
    const tmpPages = [];
    if (this.lastIndex <= 9) {
      for (let i = 2; i <= this.lastIndex - 1; i++) {
        tmpPages.push({ index: i });
      }
    } else {
      const current = +this.nzPageIndex;
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

  get isLastIndex(): boolean {
    return this.nzPageIndex === this.lastIndex;
  }

  get isFirstIndex(): boolean {
    return this.nzPageIndex === this.firstIndex;
  }

  constructor() {
  }
}
