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
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { isNotNil, InputBoolean } from 'ng-zorro-antd/core';
import { NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';
import { NzI18nInterface, NzI18nService } from 'ng-zorro-antd/i18n';

/* tslint:disable-next-line:no-any */
export type NzThFilterType = Array<{ text: string; value: any; byDefault?: boolean }>;

export interface NzThItemInterface {
  text: string;
  /* tslint:disable-next-line:no-any */
  value: any;
  checked: boolean;
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'th:not(.nz-disable-th):not([mat-sort-header]):not([mat-header-cell])',
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './nz-th.component.html',
  host: {
    '[class.ant-table-column-has-actions]': 'nzShowFilter || nzShowSort || nzCustomFilter',
    '[class.ant-table-column-has-filters]': 'nzShowFilter || nzCustomFilter',
    '[class.ant-table-column-has-sorters]': 'nzShowSort',
    '[class.ant-table-selection-column-custom]': 'nzShowRowSelection',
    '[class.ant-table-selection-column]': 'nzShowCheckbox',
    '[class.ant-table-expand-icon-th]': 'nzExpand',
    '[class.ant-table-th-left-sticky]': 'nzLeft',
    '[class.ant-table-th-right-sticky]': 'nzRight',
    '[class.ant-table-column-sort]': `nzSort === 'descend' || nzSort === 'ascend'`,
    '[style.left]': 'nzLeft',
    '[style.right]': 'nzRight',
    '[style.text-align]': 'nzAlign'
  }
})
export class NzThComponent implements OnChanges, OnInit, OnDestroy {
  hasFilterValue = false;
  filterVisible = false;
  multipleFilterList: NzThItemInterface[] = [];
  singleFilterList: NzThItemInterface[] = [];
  /* tslint:disable-next-line:no-any */
  locale: NzI18nInterface['Table'] = {} as NzI18nInterface['Table'];
  nzWidthChange$ = new Subject();
  private destroy$ = new Subject();
  private hasDefaultFilter = false;
  @ViewChild(NzDropdownMenuComponent, { static: false }) nzDropdownMenuComponent: NzDropdownMenuComponent;
  /* tslint:disable-next-line:no-any */
  @Input() nzSelections: Array<{ text: string; onSelect(...args: any[]): any }> = [];
  @Input() nzChecked = false;
  @Input() nzDisabled = false;
  @Input() nzIndeterminate = false;
  @Input() nzSortKey: string;
  @Input() nzFilterMultiple = true;
  @Input() nzWidth: string;
  @Input() nzLeft: string;
  @Input() nzRight: string;
  @Input() nzAlign: 'left' | 'right' | 'center';
  @Input() nzSort: 'ascend' | 'descend' | null = null;
  @Input() nzFilters: NzThFilterType = [];
  @Input() @InputBoolean() nzExpand = false;
  @Input() @InputBoolean() nzShowCheckbox = false;
  @Input() @InputBoolean() nzCustomFilter = false;
  @Input() @InputBoolean() nzShowSort = false;
  @Input() @InputBoolean() nzShowFilter = false;
  @Input() @InputBoolean() nzShowRowSelection = false;
  @Output() readonly nzCheckedChange = new EventEmitter<boolean>();
  @Output() readonly nzSortChange = new EventEmitter<string | null>();
  @Output() readonly nzSortChangeWithKey = new EventEmitter<{ key: string; value: string | null }>();
  /* tslint:disable-next-line:no-any */
  @Output() readonly nzFilterChange = new EventEmitter<any[] | any>();

  updateSortValue(): void {
    if (this.nzShowSort) {
      if (this.nzSort === 'ascend') {
        this.setSortValue('descend');
      } else if (this.nzSort === 'descend') {
        this.setSortValue(null);
      } else {
        this.setSortValue('ascend');
      }
    }
  }

  setSortValue(value: 'ascend' | 'descend' | null): void {
    this.nzSort = value;
    this.nzSortChangeWithKey.emit({ key: this.nzSortKey, value: this.nzSort });
    this.nzSortChange.emit(this.nzSort);
  }

  get filterList(): NzThItemInterface[] {
    return this.multipleFilterList.filter(item => item.checked).map(item => item.value);
  }

  /* tslint:disable-next-line:no-any */
  get filterValue(): any {
    const checkedFilter = this.singleFilterList.find(item => item.checked);
    return checkedFilter ? checkedFilter.value : null;
  }

  updateFilterStatus(): void {
    if (this.nzFilterMultiple) {
      this.hasFilterValue = this.filterList.length > 0;
    } else {
      this.hasFilterValue = isNotNil(this.filterValue);
    }
  }

  search(): void {
    this.updateFilterStatus();
    if (this.nzFilterMultiple) {
      this.nzFilterChange.emit(this.filterList);
    } else {
      this.nzFilterChange.emit(this.filterValue);
    }
  }

  reset(): void {
    this.initMultipleFilterList(true);
    this.initSingleFilterList(true);
    this.hasFilterValue = false;
  }

  checkMultiple(filter: NzThItemInterface): void {
    filter.checked = !filter.checked;
  }

  checkSingle(filter: NzThItemInterface): void {
    this.singleFilterList.forEach(item => (item.checked = item === filter));
  }

  hideDropDown(): void {
    this.nzDropdownMenuComponent.setVisibleStateWhen(false);
    this.filterVisible = false;
  }

  dropDownVisibleChange(value: boolean): void {
    this.filterVisible = value;
    if (!value) {
      this.search();
    }
  }

  initMultipleFilterList(force?: boolean): void {
    this.multipleFilterList = this.nzFilters.map(item => {
      const checked = force ? false : !!item.byDefault;
      if (checked) {
        this.hasDefaultFilter = true;
      }
      return { text: item.text, value: item.value, checked };
    });
    this.checkDefaultFilters();
  }

  initSingleFilterList(force?: boolean): void {
    this.singleFilterList = this.nzFilters.map(item => {
      const checked = force ? false : !!item.byDefault;
      if (checked) {
        this.hasDefaultFilter = true;
      }
      return { text: item.text, value: item.value, checked };
    });
    this.checkDefaultFilters();
  }

  checkDefaultFilters(): void {
    if (!this.nzFilters || this.nzFilters.length === 0 || !this.hasDefaultFilter) {
      return;
    }
    this.updateFilterStatus();
  }

  marForCheck(): void {
    this.cdr.markForCheck();
  }

  constructor(private cdr: ChangeDetectorRef, private i18n: NzI18nService) {}

  ngOnInit(): void {
    this.i18n.localeChange.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.locale = this.i18n.getLocaleData('Table');
      this.cdr.markForCheck();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.nzFilters) {
      this.initMultipleFilterList();
      this.initSingleFilterList();
      this.updateFilterStatus();
    }
    if (changes.nzWidth) {
      this.nzWidthChange$.next(this.nzWidth);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
