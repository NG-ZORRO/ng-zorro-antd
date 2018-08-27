import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
  ViewChild
} from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { isInteger } from '../core/util/check';
import { toBoolean } from '../core/util/convert';
import { NzI18nService } from '../i18n/nz-i18n.service';

@Component({
  selector           : 'nz-pagination',
  preserveWhitespaces: false,
  templateUrl        : './nz-pagination.component.html'
})
export class NzPaginationComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  // tslint:disable-next-line:no-any
  locale: any = {};
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

  min(val1: number, val2: number): number {
    return Math.min(val1, val2);
  }

  constructor(private i18n: NzI18nService) {
  }

  ngOnInit(): void {
    this.i18n.localeChange.pipe(takeUntil(this.unsubscribe$)).subscribe(() => this.locale = this.i18n.getLocaleData('Pagination'));
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
