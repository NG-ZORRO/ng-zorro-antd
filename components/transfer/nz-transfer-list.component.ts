/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';

import { NzUpdateHostClassService } from 'ng-zorro-antd/core';

import { TransferItem } from './interface';

@Component({
  selector: 'nz-transfer-list',
  exportAs: 'nzTransferList',
  preserveWhitespaces: false,
  providers: [NzUpdateHostClassService],
  templateUrl: './nz-transfer-list.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NzTransferListComponent implements OnChanges, OnInit {
  // #region fields

  @Input() direction = '';
  @Input() titleText = '';
  @Input() showSelectAll = true;

  @Input() dataSource: TransferItem[] = [];

  @Input() itemUnit = '';
  @Input() itemsUnit = '';
  @Input() filter = '';
  @Input() disabled: boolean;
  @Input() showSearch: boolean;
  @Input() searchPlaceholder: string;
  @Input() notFoundContent: string;
  @Input() filterOption: (inputValue: string, item: TransferItem) => boolean;

  @Input() renderList: TemplateRef<void>;
  @Input() render: TemplateRef<void>;
  @Input() footer: TemplateRef<void>;

  // events
  @Output() readonly handleSelectAll: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() readonly handleSelect: EventEmitter<TransferItem> = new EventEmitter();
  @Output() readonly filterChange: EventEmitter<{ direction: string; value: string }> = new EventEmitter();

  // #endregion

  // #region styles

  prefixCls = 'ant-transfer-list';

  setClassMap(): void {
    const classMap = {
      [this.prefixCls]: true,
      [`${this.prefixCls}-with-footer`]: !!this.footer
    };
    this.updateHostClassService.updateHostClass(this.el.nativeElement, classMap);
  }

  // #endregion

  // #region select all

  stat = {
    checkAll: false,
    checkHalf: false,
    checkCount: 0,
    shownCount: 0
  };

  onItemSelect = (item: TransferItem) => {
    if (this.disabled || item.disabled) {
      return;
    }
    item.checked = !item.checked;
    this.updateCheckStatus();
    this.handleSelect.emit(item);
  };

  onItemSelectAll = (status: boolean) => {
    this.dataSource.forEach(item => {
      if (!item.disabled && !item.hide) {
        item.checked = status;
      }
    });

    this.updateCheckStatus();
    this.handleSelectAll.emit(status);
  };

  private updateCheckStatus(): void {
    const validCount = this.dataSource.filter(w => !w.disabled).length;
    this.stat.checkCount = this.dataSource.filter(w => w.checked && !w.disabled).length;
    this.stat.shownCount = this.dataSource.filter(w => !w.hide).length;
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
    this.stat.shownCount = this.dataSource.filter(w => !w.hide).length;
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

  constructor(
    private el: ElementRef,
    private updateHostClassService: NzUpdateHostClassService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if ('footer' in changes) {
      this.setClassMap();
    }
  }

  ngOnInit(): void {
    this.setClassMap();
  }

  markForCheck(): void {
    this.updateCheckStatus();
    this.cdr.markForCheck();
  }
}
