import {
  Component,
  DoCheck,
  ElementRef,
  EventEmitter,
  Input,
  IterableDiffer,
  IterableDiffers,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef
} from '@angular/core';

import { NzUpdateHostClassService } from '../core/services/update-host-class.service';
import { toBoolean } from '../core/util/convert';

import { TransferItem } from './interface';

@Component({
  selector           : 'nz-transfer-list',
  preserveWhitespaces: false,
  providers          : [ NzUpdateHostClassService ],
  template           : `
    <div class="ant-transfer-list-header">
      <label nz-checkbox [ngModel]="stat.checkAll" (ngModelChange)="onHandleSelectAll($event)"
        [nzIndeterminate]="stat.checkHalf">
        <span class="ant-transfer-list-header-selected">
          <span>{{ (stat.checkCount > 0 ? stat.checkCount + '/' : '') + stat.shownCount }} {{ dataSource.length > 1 ? itemsUnit : itemUnit }}</span>
          <span *ngIf="titleText" class="ant-transfer-list-header-title">{{ titleText }}</span>
        </span>
      </label>
    </div>
    <div class="{{showSearch ? 'ant-transfer-list-body ant-transfer-list-body-with-search' : 'ant-transfer-list-body'}}"
      [ngClass]="{'ant-transfer__nodata': stat.shownCount === 0}">
      <div *ngIf="showSearch" class="ant-transfer-list-body-search-wrapper">
        <div nz-transfer-search
          (valueChanged)="handleFilter($event)"
          (valueClear)="handleClear()"
          [placeholder]="searchPlaceholder"
          [value]="filter"></div>
      </div>
      <ul class="ant-transfer-list-content">
        <ng-container *ngFor="let item of dataSource">
          <li *ngIf="!item._hiden" (click)="_handleSelect(item)" class="ant-transfer-list-content-item">
            <label nz-checkbox [ngModel]="item.checked" [nzDisabled]="item.disabled">
              <ng-container *ngIf="!render; else renderContainer">{{ item.title }}</ng-container>
              <ng-template #renderContainer [ngTemplateOutlet]="render" [ngTemplateOutletContext]="{ $implicit: item }"></ng-template>
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

  prefixCls = 'ant-transfer-list';

  setClassMap(): void {
    const classMap = {
      [ this.prefixCls ]: true,
      [ `${this.prefixCls}-with-footer` ]: !!this.footer
    };
    this.updateHostClassService.updateHostClass(this.el.nativeElement, classMap);
  }

  // endregion

  // region: select all

  stat = {
    checkAll  : false,
    checkHalf : false,
    checkCount: 0,
    shownCount: 0
  };

  onHandleSelectAll(status: boolean): void {
    this.dataSource.forEach(item => {
      if (!item.disabled && !item._hiden) {
        item.checked = status;
      }
    });

    this.updateCheckStatus();
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

  listDiffer: IterableDiffer<{}>;

  constructor(private el: ElementRef, private updateHostClassService: NzUpdateHostClassService, differs: IterableDiffers) {
    this.listDiffer = differs.find([]).create(null);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('footer' in changes) {
      this.setClassMap();
    }
  }

  ngOnInit(): void {
    this.setClassMap();
  }

  ngDoCheck(): void {
    const change = this.listDiffer.diff(this.dataSource);
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
