// tslint:disable:member-ordering
import { Component, Input, ContentChild, TemplateRef, Renderer2, ElementRef, OnChanges, SimpleChanges, Output, EventEmitter, OnInit, DoCheck, IterableDiffers, IterableDiffer } from '@angular/core';
import { TransferItem } from './item';

@Component({
    selector: 'nz-transfer-list',
    template: `
    <div class="ant-transfer-list-header">
        <label nz-checkbox [(ngModel)]="stat.checkAll" (ngModelChange)="onHandleSelectAll()"
            [nzIndeterminate]="stat.checkHalf"></label><span class="ant-transfer-list-header-selected">
            <span>{{ (stat.checkCount > 0 ? stat.checkCount + '/' : '') + stat.shownCount}} {{_list.length > 1 ? itemsUnit : itemUnit}}</span>
            <span *ngIf="titleText" class="ant-transfer-list-header-title">{{titleText}}</span>
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
            <ng-container *ngFor="let item of _list">
                <li *ngIf="!item._hiden" (click)="_handleSelect(item)" class="ant-transfer-list-content-item">
                    <label nz-checkbox [ngModel]="item.checked" [nzDisabled]="item.disabled">
                        <span>
                          <ng-container *ngIf="!render; else renderContainer">{{item.title}}</ng-container>
                          <ng-template #renderContainer [ngTemplateOutlet]="render" [ngTemplateOutletContext]="{ $implicit: item }"></ng-template>
                        </span>
                    </label>
                </li>
            </ng-container>
        </ul>
        <div class="ant-transfer-list-body-not-found">{{notFoundContent}}</div>
    </div>
    <div *ngIf="footer" class="ant-transfer-list-footer">
        <ng-template [ngTemplateOutlet]="footer" [ngTemplateOutletContext]="{ $implicit: direction }"></ng-template>
    </div>
    `
})
export class NzTransferListComponent implements OnChanges, OnInit, DoCheck {

    // private
    _list: TransferItem[] = [];

    // region: fields

    @Input() direction = '';
    @Input() titleText = '';

    @Input()
    set dataSource(list: TransferItem[]) {
      this._list = list;
      this.updateCheckStatus();
    }

    @Input() itemUnit = '';
    @Input() itemsUnit = '';
    @Input() filter = '';
    // search
    @Input() showSearch: boolean;
    @Input() searchPlaceholder: string;
    @Input() notFoundContent: string;
    @Input() filterOption: (inputValue: any, item: any) => boolean;

    @Input() render: TemplateRef<any>;
    @Input() footer: TemplateRef<any>;

    // events
    @Output() handleSelectAll: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() handleSelect: EventEmitter<any> = new EventEmitter<any>();
    @Output() filterChange: EventEmitter<any> = new EventEmitter<any>();

    // endregion

    // region: styles

    _prefixCls = 'ant-transfer-list';
    _classList: string[] = [];

    _setClassMap() {
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

    onHandleSelectAll() {
      this._list.forEach(item => {
        if (!item.disabled) {
          item.checked = this.stat.checkAll;
        }
      });
      this.updateCheckStatus();

      this.handleSelectAll.emit(this.stat.checkAll);
    }

    private updateCheckStatus() {
      const validCount = this._list.filter(w => !w.disabled).length;
      this.stat.checkCount = this._list.filter(w => w.checked && !w.disabled).length;
      this.stat.shownCount = this._list.filter(w => !w._hiden).length;
      this.stat.checkAll = validCount > 0 && validCount === this.stat.checkCount;
      this.stat.checkHalf = this.stat.checkCount > 0 && !this.stat.checkAll;
    }

    // endregion

    // region: search

    handleFilter(value: string) {
      this._list.forEach(item => {
        item._hiden = value.length > 0 && !this.matchFilter(value, item);
      });
      this.stat.shownCount = this._list.filter(w => !w._hiden).length;
      this.filterChange.emit({ direction: this.direction, value });
    }

    handleClear() {
      this.handleFilter('');
    }

    private matchFilter(text: string, item: TransferItem) {
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

    ngOnInit() {
      this._setClassMap();
    }

    ngDoCheck(): void {
      const change = this._listDiffer.diff(this._list);
      if (change) {
        this.updateCheckStatus();
      }
    }

    _handleSelect(item: TransferItem) {
      if (item.disabled) {
        return;
      }
      item.checked = !item.checked;
      this.updateCheckStatus();
      this.handleSelect.emit(item);
    }
}
