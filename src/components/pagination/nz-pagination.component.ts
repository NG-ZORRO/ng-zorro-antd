import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { toBoolean } from '../util/convert';

@Component({
  selector     : 'nz-pagination',
  encapsulation: ViewEncapsulation.None,
  template     : `
    <ul [class.ant-table-pagination]="nzInTable" class="ant-pagination ant-pagination-simple" *ngIf="nzSimple">
      <li
        title="{{ 'Pagination.prevPage' | nzTranslate }}"
        class="ant-pagination-prev"
        (click)="_jumpPage(_current-1)"
        [class.ant-pagination-disabled]="_isFirstIndex">
        <a class="ant-pagination-item-link"></a>
      </li>
      <li [attr.title]="_current+'/'+_lastIndex" class="ant-pagination-simple-pager">
        <input [ngModel]="nzPageIndex" (ngModelChange)="_nzPageIndexChange($event)" size="3"><span class="ant-pagination-slash">／</span>{{ _lastIndex }}
      </li>
      <li
        title="{{ 'Pagination.nextPage' | nzTranslate }}"
        class="ant-pagination-next"
        (click)="_jumpPage(_current+1)"
        [class.ant-pagination-disabled]="_isLastIndex">
        <a class="ant-pagination-item-link"></a>
      </li>
    </ul>
    <ul [class.ant-table-pagination]="nzInTable" *ngIf="!nzSimple" class="ant-pagination" [class.mini]="nzSize=='small'">
      <span class="ant-pagination-total-text" *ngIf="nzShowTotal">{{ 'Pagination.totalItems' | nzTranslate: { total: _total } }}</span>
      <li
        title="{{ 'Pagination.prevPage' | nzTranslate }}"
        class="ant-pagination-prev"
        (click)="_jumpPage(_current-1)"
        [class.ant-pagination-disabled]="_isFirstIndex">
        <a class="ant-pagination-item-link"></a>
      </li>
      <li
        title="{{ 'Pagination.firstPage' | nzTranslate }}"
        class="ant-pagination-item"
        (click)="_jumpPage(_firstIndex)"
        [class.ant-pagination-item-active]="_isFirstIndex">
        <a>{{ _firstIndex }}</a>
      </li>
      <li
        [attr.title]="'Pagination.forwardPage' | nzTranslate: { num: _roundPageSize }"
        (click)="_jumpBefore(_pageSize)"
        class="ant-pagination-jump-prev"
        *ngIf="(_lastIndex >9)&&(_current-3>_firstIndex)">
        <a></a>
      </li>
      <li
        *ngFor="let page of _pages"
        [attr.title]="page.index"
        class="ant-pagination-item"
        (click)="_jumpPage(page.index)"
        [class.ant-pagination-item-active]="_current==page.index">
        <a>{{ page.index }}</a>
      </li>
      <li
        [attr.title]="'Pagination.backwardPage' | nzTranslate: { num: _roundPageSize }"
        (click)="_jumpAfter(_pageSize)"
        class="ant-pagination-jump-next"
        *ngIf="(_lastIndex >9)&&(_current+3<_lastIndex)">
        <a></a>
      </li>
      <li
        [attr.title]="'Pagination.lastPage' | nzTranslate: { page: _lastIndex }"
        class="ant-pagination-item"
        (click)="_jumpPage(_lastIndex)"
        *ngIf="(_lastIndex>0)&&(_lastIndex!==_firstIndex)"
        [class.ant-pagination-item-active]="_isLastIndex">
        <a>{{ _lastIndex }}</a>
      </li>
      <li
        title="{{ 'Pagination.nextPage' | nzTranslate }}"
        class="ant-pagination-next"
        (click)="_jumpPage(_current+1)"
        [class.ant-pagination-disabled]="_isLastIndex">
        <a class="ant-pagination-item-link"></a>
      </li>
      <div class="ant-pagination-options">
        <nz-select
          *ngIf="nzShowSizeChanger"
          [nzSize]="nzSize=='small'?'small':''"
          class="ant-pagination-options-size-changer"
          [ngModel]="_pageSize"
          (ngModelChange)="_pageSizeChange($event)">
          <nz-option
            *ngFor="let option of _options"
            [nzLabel]="'Pagination.itemsPerPage' | nzTranslate: { num: option }"
            [nzValue]="option">
          </nz-option>
          <nz-option
            *ngIf="_options.indexOf(nzPageSize)==-1"
            [nzLabel]="'Pagination.itemsPerPage' | nzTranslate: { num: nzPageSize }"
            [nzValue]="nzPageSize">
          </nz-option>
        </nz-select>
        <div class="ant-pagination-options-quick-jumper"
          *ngIf="nzShowQuickJumper">
          {{ 'Pagination.jumpTo' | nzTranslate }}<input [ngModel]="nzPageIndex" (ngModelChange)="_nzPageIndexChange($event)">{{ 'Pagination.page' | nzTranslate }}
        </div>
      </div>
    </ul>`,
  styleUrls    : [
    './style/index.less',
    './style/patch.less'
  ]
})
export class NzPaginationComponent {
  private _showSizeChanger = false;
  private _showTotal = false;
  private _showQuickJumper = false;
  private _simple = false;
  _el: HTMLElement;
  _current = 1;
  _total: number;
  _pageSize = 10;
  _firstIndex = 1;
  _lastIndex = Infinity;
  _pages = [];
  _options = [ 10, 20, 30, 40, 50 ];

  @Input() nzInTable = false;

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
  set nzShowTotal(value: boolean) {
      this._showTotal = toBoolean(value);
  }

  get nzShowTotal(): boolean {
    return this._showTotal;
  }

  @Input()
  set nzSimple(value: boolean) {
    this._simple = toBoolean(value);
  }

  get nzSimple(): boolean {
    return this._simple;
  }

  @Input() nzSize: string;

  @Output() nzPageSizeChange: EventEmitter<number> = new EventEmitter();
  @Output() nzPageIndexChange: EventEmitter<number> = new EventEmitter();
  @Output() nzPageIndexClickChange: EventEmitter<number> = new EventEmitter();

  _jumpBefore(pageSize: number): void {
    this._jumpPage(this._current - Math.round(pageSize / 2));
  }

  _jumpAfter(pageSize: number): void {
    this._jumpPage(this._current + Math.round(pageSize / 2));
  }

  /** page size changer select values */
  @Input()
  set nzPageSizeSelectorValues(value: number[]) {
    if (value) {
      this._options = value;
    }
  }

  @Input()
  set nzPageIndex(value: number) {
    if (this._current === value) {
      return;
    }
    if (value > this._lastIndex || value < this._firstIndex) {
      return;
    }
    this._current = Number(value);
    this._buildIndexes();
  }

  get nzPageIndex(): number {
    return this._current;
  }

  @Input()
  set nzPageSize(value: number) {
    if (value === this._pageSize) {
      return;
    }
    this._pageSize = value;
    this.nzPageIndexChange.emit(this.nzPageIndex);
    this._buildIndexes();
  }

  get nzPageSize(): number {
    return this._pageSize;
  }

  @Input()
  set nzTotal(value: number) {
    if (value === this._total) {
      return;
    }
    this._total = value;
    this._buildIndexes();
  }

  get nzTotal(): number {
    return this._total;
  }

  _pageSizeChange($event: number): void {
    this.nzPageSize = $event;
    this.nzPageSizeChange.emit($event);
  }

  _nzPageIndexChange($event: number): void {
    this.nzPageIndex = $event;
    this.nzPageIndexChange.emit(this.nzPageIndex);
  }

  /** generate indexes list */
  _buildIndexes(): void {
    this._lastIndex = Math.ceil(this._total / this._pageSize);
    if (this._current > this._lastIndex) {
      this.nzPageIndex = this._lastIndex;
      this.nzPageIndexChange.emit(this.nzPageIndex);
    }
    const tmpPages = [];
    if (this._lastIndex <= 9) {
      for (let i = 2; i <= this._lastIndex - 1; i++) {
        tmpPages.push({ index: i });
      }
    } else {
      const current = +this._current;
      let left = Math.max(2, current - 2);
      let right = Math.min(current + 2, this._lastIndex - 1);

      if (current - 1 <= 2) {
        right = 5;
      }

      if (this._lastIndex - current <= 2) {
        left = this._lastIndex - 4;
      }

      for (let i = left; i <= right; i++) {
        tmpPages.push({ index: i });
      }
    }
    this._pages = tmpPages;
  }

  _jumpPage(index: number): void {
    if (index === this._firstIndex - 1 || index === this._lastIndex +  1 || index === this.nzPageIndex) {
      return ;
    }

    if (index < this._firstIndex) {
      this.nzPageIndex = this._firstIndex;
    } else if (index > this._lastIndex) {
      this.nzPageIndex = this._lastIndex;
    } else {
      this.nzPageIndex = index;
    }
    this.nzPageIndexClickChange.emit(this.nzPageIndex);
    this.nzPageIndexChange.emit(this.nzPageIndex);
  }

  get _isLastIndex(): boolean {
    return this._current === this._lastIndex;
  }

  get _isFirstIndex(): boolean {
    return this._current === this._firstIndex;
  }

  get _roundPageSize(): number {
    return Math.round(this._pageSize / 2);
  }

  constructor(private _elementRef: ElementRef) {
    this._el = this._elementRef.nativeElement;
  }
}
