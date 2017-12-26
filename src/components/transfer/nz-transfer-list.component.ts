// tslint:disable:member-ordering
import { Component, ContentChild, DoCheck, ElementRef, EventEmitter, Input, IterableDiffer, IterableDiffers, OnChanges, OnInit, Output, Renderer2, SimpleChanges, TemplateRef } from '@angular/core';
import { toBoolean } from '../util/convert';
import { TransferItem } from './item';

@Component({
  selector: 'nz-transfer-list',
  template: `
    <div class="ant-transfer-list-header">
      <label nz-checkbox [(ngModel)]="stat.checkAll" (ngModelChange)="onHandleSelectAll($event)"
        [nzIndeterminate]="stat.checkHalf"></label><span class="ant-transfer-list-header-selected">
        <span>{{ (stat.checkCount > 0 ? stat.checkCount + '/' : '') + stat.shownCount }} {{ dataSource.length > 1 ? itemsUnit : itemUnit }}</span>
        <span *ngIf="titleText" class="ant-transfer-list-header-title">{{ titleText }}</span>
      </span>
    </div>
    <div class="{{showSearch ? 'ant-transfer-list-body ant-transfer-list-body-with-search' : 'ant-transfer-list-body'}}"
      [ngClass]="{'ant-transfer__nodata': stat.shownCount === 0}">
      <div *ngIf="showSearch" class="ant-transfer-list-body-search-wrapper">
        <nz-transfer-search class="ant-transfer-list-search"
          (valueChanged)="handleFilter($event)"
          (valueClear)="handleClear()"
          [placeholder]="searchPlaceholder"
          [value]="filter"></nz-transfer-search>
      </div>
      <ul class="ant-transfer-list-content">
        <ng-container *ngFor="let item of dataSource">
          <li *ngIf="!item._hiden" (click)="_handleSelect(item)" class="ant-transfer-list-content-item">
            <label nz-checkbox [ngModel]="item.checked" [nzDisabled]="item.disabled">
              <span>
                <ng-container *ngIf="!render; else renderContainer">{{ item.title }}</ng-container>
                <ng-template #renderContainer [ngTemplateOutlet]="render" [ngTemplateOutletContext]="{ $implicit: item }"></ng-template>
              </span>
            </label>
          </li>
        </ng-container>
      </ul>
      <div class="ant-transfer-list-body-not-found">{{ notFoundContent }}</div>
    </div>
    <div *ngIf="footer" class="ant-transfer-list-footer">
        <ng-template [ngTemplateOutlet]="footer" [ngTemplateOutletContext]="{ $implicit: direction }"></ng-template>
    </div>
  `
})
export class NzTransferListComponent implements OnChanges, OnInit, DoCheck {
  private _showSearch = false;

  // region: fields

  @Input() direction = '';
  @Input() titleText = '';

  @Input() dataSource: TransferItem[] = [];

  @Input() itemUnit = '';
  @Input() itemsUnit = '';
  @Input() filter = '';
  // search
  @Input()
  set showSearch(value: boolean) {
    this._showSearch = toBoolean(value);
  }

  get showSearch(): boolean {
    return this._showSearch;
  }

  @Input() searchPlaceholder: string;
  @Input() notFoundContent: string;
  @Input() filterOption: (inputValue: string, item: TransferItem) => boolean;

  @Input() render: TemplateRef<void>;
  @Input() footer: TemplateRef<void>;

  // events
  @Output() handleSelectAll: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() handleSelect: EventEmitter<TransferItem> = new EventEmitter();
  @Output() filterChange: EventEmitter<{ direction: string, value: string }> = new EventEmitter();

  // endregion

  // region: styles

  _prefixCls = 'ant-transfer-list';
  _classList: string[] = [];

  _setClassMap(): void {
    this._classList.forEach(cls => this._renderer.removeClass(this._el.nativeElement, cls));

    this._classList = [
      this._prefixCls,
      !!this.footer && `${this._prefixCls}-with-footer`
    ].filter(item => !!item);

    this._classList.forEach(cls => this._renderer.addClass(this._el.nativeElement, cls));
  }

  // endregion

  // region: select all

  stat = {
    checkAll: false,
    checkHalf: false,
    checkCount: 0,
    shownCount: 0
  };

  onHandleSelectAll(status: boolean): void {
    this.dataSource.forEach(item => {
      if (!item.disabled && !item._hiden) {
        item.checked = status;
      }
    });

    // ngModelChange 事件内对状态的变更会无效，因此使用延迟改变执行顺序
    setTimeout(() => this.updateCheckStatus());

    this.handleSelectAll.emit(status);
  }

  private updateCheckStatus(): void {
    const validCount = this.dataSource.filter(w => !w.disabled).length;
    this.stat.checkCount = this.dataSource.filter(w => w.checked && !w.disabled).length;
    this.stat.shownCount = this.dataSource.filter(w => !w._hiden).length;
    this.stat.checkAll = validCount > 0 && validCount === this.stat.checkCount;
    this.stat.checkHalf = this.stat.checkCount > 0 && !this.stat.checkAll;
  }

  // endregion

  // region: search

  handleFilter(value: string): void {
    this.filter = value;
    this.dataSource.forEach(item => {
      item._hiden = value.length > 0 && !this.matchFilter(value, item);
    });
    this.stat.shownCount = this.dataSource.filter(w => !w._hiden).length;
    this.filterChange.emit({ direction: this.direction, value });
  }

  handleClear(): void {
    this.handleFilter('');
  }

  private matchFilter(text: string, item: TransferItem): boolean {
    if (this.filterOption) {
      return this.filterOption(text, item);
    }
    return item.title.includes(text);
  }

  // endregion

  _listDiffer: IterableDiffer<{}>;
  constructor(private _el: ElementRef, private _renderer: Renderer2, differs: IterableDiffers) {
    this._listDiffer = differs.find([]).create(null);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('footer' in changes) {
      this._setClassMap();
    }
  }

  ngOnInit(): void {
    this._setClassMap();
  }

  ngDoCheck(): void {
    const change = this._listDiffer.diff(this.dataSource);
    if (change) {
      this.updateCheckStatus();
    }
  }

  _handleSelect(item: TransferItem): void {
    if (item.disabled) {
      return;
    }
    item.checked = !item.checked;
    this.updateCheckStatus();
    this.handleSelect.emit(item);
  }
}
