/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';

import type { TransferDirection, TransferItem, TransferPaginationType } from './interface';

@Component({
  selector: 'nz-transfer-list',
  exportAs: 'nzTransferList',
  preserveWhitespaces: false,
  template: `
    <ng-template #defaultRenderList>
      <ul
        *ngIf="stat.shownCount > 0"
        class="ant-transfer-list-content"
        [class.ant-transfer-list-content-show-remove]="showRemove"
      >
        <li
          *ngFor="let item of validData"
          #checkboxes
          nz-transfer-list-item
          [item]="item"
          [checked]="item.checked"
          [disabled]="disabled || item.disabled"
          [render]="render"
          (itemSelect)="onItemSelect(item)"
          [showRemove]="showRemove"
          (remove)="itemRemove.emit([item])"
        >
        </li>
      </ul>
      <div *ngIf="stat.shownCount === 0" class="ant-transfer-list-body-not-found">
        <nz-embed-empty [nzComponentName]="'transfer'" [specificContent]="notFoundContent"></nz-embed-empty>
      </div>
      <nz-pagination
        *ngIf="pagination"
        [nzPageIndex]="pi"
        [nzTotal]="fullData.length"
        nzSimple
        nzSize="small"
        [nzDisabled]="disabled"
        (nzPageIndexChange)="pageChange($event)"
        class="ant-transfer-list-pagination"
      ></nz-pagination>
    </ng-template>
    <div class="ant-transfer-list-header">
      <ng-container *ngIf="showSelectAll">
        <label
          *ngIf="!showRemove && !pagination"
          class="ant-transfer-list-checkbox"
          nz-checkbox
          [nzChecked]="stat.checkAll"
          (nzCheckedChange)="onItemSelectAll($event)"
          [nzIndeterminate]="stat.checkHalf"
          [nzDisabled]="stat.shownCount === 0 || disabled"
        ></label>
      </ng-container>
      <span class="ant-transfer-list-header-selected">
        <span>
          {{ (stat.checkCount > 0 ? stat.checkCount + '/' : '') + stat.shownCount }}
          {{ validData.length > 1 ? itemsUnit : itemUnit }}
        </span>
      </span>
      <span *ngIf="titleText" class="ant-transfer-list-header-title">
        <ng-container *nzStringTemplateOutlet="titleText; context: { $implicit: direction }">
          {{ titleText }}
        </ng-container>
      </span>
    </div>
    <div
      class="{{ showSearch ? 'ant-transfer-list-body ant-transfer-list-body-with-search' : 'ant-transfer-list-body' }}"
      [ngClass]="{ 'ant-transfer__nodata': stat.shownCount === 0 }"
    >
      <div *ngIf="showSearch" class="ant-transfer-list-body-search-wrapper">
        <span
          nz-transfer-search
          class="ant-input-affix-wrapper ant-transfer-list-search"
          (valueChanged)="handleFilter($event)"
          (valueClear)="handleClear()"
          [placeholder]="searchPlaceholder"
          [disabled]="disabled"
          [value]="filter"
        ></span>
      </div>
      <ng-container *ngIf="renderList; else defaultRenderList">
        <div class="ant-transfer-list-body-customize-wrapper">
          <ng-container
            *ngTemplateOutlet="
              renderList;
              context: {
                $implicit: validData,
                direction: direction,
                disabled: disabled,
                onItemSelectAll: onItemSelectAll,
                onItemSelect: onItemSelect,
                stat: stat
              }
            "
          ></ng-container>
        </div>
      </ng-container>
    </div>
    <div *ngIf="footer" class="ant-transfer-list-footer">
      <ng-template [ngTemplateOutlet]="footer" [ngTemplateOutletContext]="{ $implicit: direction }"></ng-template>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ant-transfer-list',
    '[class.ant-transfer-list-with-pagination]': '!!pagination',
    '[class.ant-transfer-list-with-footer]': '!!footer'
  }
})
export class NzTransferListComponent {
  pi = 1;

  // #region fields

  @Input() direction: TransferDirection = 'left';
  @Input() titleText: TemplateRef<{ $implicit: TransferDirection }> | string = '';
  @Input() showSelectAll = true;

  @Input() dataSource: TransferItem[] = [];

  @Input() itemUnit: string | undefined = '';
  @Input() itemsUnit: string | undefined = '';
  @Input() filter = '';
  @Input() disabled: boolean = false;
  @Input() showSearch?: boolean;
  @Input() searchPlaceholder?: string;
  @Input() notFoundContent?: string;
  @Input() filterOption?: (inputValue: string, item: TransferItem) => boolean;
  @Input() showRemove: boolean = false;
  @Input() pagination?: TransferPaginationType;

  @Input() renderList: TemplateRef<void> | null = null;
  @Input() render: TemplateRef<void> | null = null;
  @Input() footer: TemplateRef<void> | null = null;

  // events
  @Output() readonly handleSelectAll: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() readonly handleSelect: EventEmitter<TransferItem> = new EventEmitter();
  @Output() readonly filterChange: EventEmitter<{ direction: TransferDirection; value: string }> = new EventEmitter();
  @Output() readonly itemRemove: EventEmitter<TransferItem[]> = new EventEmitter();

  stat = {
    checkAll: false,
    checkHalf: false,
    checkCount: 0,
    shownCount: 0
  };

  get fullData(): TransferItem[] {
    return this.dataSource.filter(w => !w.hide);
  }

  get validData(): TransferItem[] {
    let items = this.fullData;
    if (this.pagination != null) {
      const ps = this.pagination.pageSize!;
      items = items.slice((this.pi - 1) * ps, this.pi * ps);
    }
    return items;
  }

  onItemSelect = (item: TransferItem): void => {
    if (this.disabled || item.disabled) {
      return;
    }
    item.checked = !item.checked;
    this.updateCheckStatus();
    this.handleSelect.emit(item);
  };

  onItemSelectAll = (status: boolean): void => {
    this.dataSource.forEach(item => {
      if (!item.disabled && !item.hide) {
        item.checked = status;
      }
    });

    this.updateCheckStatus();
    this.handleSelectAll.emit(status);
  };

  pageChange(pi: number): void {
    this.pi = pi;
    this.cdr.detectChanges();
  }

  private updateCheckStatus(): void {
    const validCount = this.dataSource.filter(w => !w.disabled).length;
    this.stat.checkCount = this.dataSource.filter(w => w.checked && !w.disabled).length;
    this.stat.shownCount = this.validData.length;
    this.stat.checkAll = validCount > 0 && validCount === this.stat.checkCount;
    this.stat.checkHalf = this.stat.checkCount > 0 && !this.stat.checkAll;
  }

  // #endregion

  // #region search

  handleFilter(value: string): void {
    this.filter = value;
    this.dataSource.forEach(item => {
      item.hide = value.length > 0 && !this.matchFilter(value, item);
    });
    this.stat.shownCount = this.validData.length;
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

  // #endregion

  constructor(private cdr: ChangeDetectorRef) {}

  markForCheck(): void {
    this.updateCheckStatus();
    this.cdr.markForCheck();
  }
}
