/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
/* tslint:disable:component-selector */
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
  ViewEncapsulation
} from '@angular/core';
import { InputBoolean, isNotNil } from 'ng-zorro-antd/core';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzI18nInterface, NzI18nService } from 'ng-zorro-antd/i18n';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export type NzThFilterType = Array<{ text: string; value: NzSafeAny; byDefault?: boolean }>;
export interface NzThItemInterface {
  text: string;
  value: NzSafeAny;
  checked: boolean;
}

@Component({
  selector: 'th:not(.nz-disable-th):not([mat-sort-header]):not([mat-header-cell])',
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-template #checkboxTemplate>
      <label
        nz-checkbox
        [class.ant-table-selection-select-all-custom]="nzShowRowSelection"
        [(ngModel)]="nzChecked"
        [nzDisabled]="nzDisabled"
        [nzIndeterminate]="nzIndeterminate"
        (ngModelChange)="nzCheckedChange.emit($event)"
      >
      </label>
    </ng-template>
    <ng-template #contentTemplate><ng-content></ng-content></ng-template>
    <ng-container *ngIf="!nzShowSort && !(nzShowFilter || nzCustomFilter)">
      <ng-template [ngTemplateOutlet]="contentTemplate"></ng-template>
    </ng-container>
    <ng-container *ngIf="nzShowSort && !(nzShowFilter || nzCustomFilter)">
      <ng-template [ngTemplateOutlet]="sortTemplate"></ng-template>
    </ng-container>
    <ng-template #sortTemplate>
      <div class="ant-table-column-sorters">
        <span><ng-template [ngTemplateOutlet]="contentTemplate"></ng-template></span>
        <span class="ant-table-column-sorter ant-table-column-sorter-full">
          <span class="ant-table-column-sorter-inner">
            <i nz-icon nzType="caret-up" class="ant-table-column-sorter-up" [class.active]="nzSort == 'ascend'"></i>
            <i nz-icon nzType="caret-down" class="ant-table-column-sorter-down" [class.active]="nzSort == 'descend'"></i>
          </span>
        </span>
      </div>
    </ng-template>
    <div class="ant-table-filter-column" *ngIf="nzShowFilter || nzCustomFilter">
      <span class="ant-table-filter-column-title">
        <ng-container *ngIf="!nzShowSort">
          <ng-template [ngTemplateOutlet]="contentTemplate"></ng-template>
        </ng-container>
        <ng-container *ngIf="nzShowSort">
          <ng-template [ngTemplateOutlet]="sortTemplate"></ng-template>
        </ng-container>
      </span>
      <span class="ant-table-filter-trigger-container" [class.ant-table-filter-trigger-container-open]="filterVisible">
        <ng-container *ngIf="nzCustomFilter">
          <ng-template [ngTemplateOutlet]="extraTemplate"></ng-template>
        </ng-container>
        <ng-container *ngIf="!nzCustomFilter">
          <span
            nz-dropdown
            class="ant-table-filter-trigger"
            nzTrigger="click"
            nzTableFilter
            (click)="$event.stopPropagation()"
            [nzClickHide]="false"
            [nzDropdownMenu]="filterMenu"
            [class.active]="hasFilterValue"
            nzPlacement="bottomRight"
            [class.ant-table-filter-open]="filterVisible"
            [nzVisible]="filterVisible"
            (nzVisibleChange)="dropDownVisibleChange($event)"
          >
            <i nz-icon nzType="filter" nzTheme="fill"></i>
          </span>
          <nz-dropdown-menu #filterMenu="nzDropdownMenu">
            <ul nz-menu>
              <ng-container *ngIf="nzFilterMultiple">
                <li nz-menu-item *ngFor="let filter of multipleFilterList" (click)="checkMultiple(filter)">
                  <label nz-checkbox [ngModel]="filter.checked" (ngModelChange)="checkMultiple(filter)"></label>
                  <span>{{ filter.text }}</span>
                </li>
              </ng-container>
              <ng-container *ngIf="!nzFilterMultiple">
                <li nz-menu-item *ngFor="let filter of singleFilterList" (click)="checkSingle(filter)">
                  <label nz-radio [ngModel]="filter.checked" (ngModelChange)="checkSingle(filter)">{{ filter.text }}</label>
                </li>
              </ng-container>
            </ul>
            <div class="ant-table-filter-dropdown-btns">
              <a class="ant-table-filter-dropdown-link confirm" (click)="hideDropDown()">
                <span>{{ locale.filterConfirm }}</span>
              </a>
              <a class="ant-table-filter-dropdown-link clear" (click)="reset(); hideDropDown()">
                <span>{{ locale.filterReset }}</span>
              </a>
            </div>
          </nz-dropdown-menu>
        </ng-container>
      </span>
    </div>
    <div class="ant-table-selection" *ngIf="nzShowCheckbox || nzShowRowSelection">
      <ng-container *ngIf="nzShowCheckbox">
        <ng-template [ngTemplateOutlet]="checkboxTemplate"></ng-template>
      </ng-container>
      <div class="ant-table-selection-extra" *ngIf="nzShowRowSelection">
        <span nz-dropdown class="ant-table-selection-down" nzPlacement="bottomLeft" [nzDropdownMenu]="selectionMenu">
          <i nz-icon nzType="down"></i>
        </span>
        <nz-dropdown-menu #selectionMenu="nzDropdownMenu">
          <ul nz-menu class="ant-table-selection-menu">
            <li nz-menu-item *ngFor="let selection of nzSelections" (click)="selection.onSelect()">
              {{ selection.text }}
            </li>
          </ul>
        </nz-dropdown-menu>
      </div>
      <ng-template [ngTemplateOutlet]="contentTemplate"></ng-template>
    </div>
    <ng-template #extraTemplate>
      <ng-content select="[nz-th-extra]"></ng-content>
    </ng-template>
  `,
  host: {
    '[class.ant-table-column-has-sorters]': 'nzShowSort',
    '[class.ant-table-selection-column]': 'nzShowCheckbox || nzShowRowSelection',
    '[class.ant-table-expand-icon-th]': 'nzExpand',
    '[class.ant-table-cell]': 'true',
    '[class.ant-table-column-sort]': `nzSort === 'descend' || nzSort === 'ascend'`,
    '(click)': 'updateSortValue()'
  }
})
export class NzThComponent implements OnChanges, OnInit, OnDestroy {
  hasFilterValue = false;
  filterVisible = false;
  multipleFilterList: NzThItemInterface[] = [];
  singleFilterList: NzThItemInterface[] = [];
  locale: NzI18nInterface['Table'] = {} as NzI18nInterface['Table'];
  widthChange$ = new Subject();
  private destroy$ = new Subject();
  private hasDefaultFilter = false;
  @Input() colspan: number | null = null;
  @Input() nzSelections: Array<{ text: string; onSelect(...args: NzSafeAny[]): NzSafeAny }> = [];
  @Input() nzChecked = false;
  @Input() nzDisabled = false;
  @Input() nzIndeterminate = false;
  @Input() nzSortKey: string;
  @Input() nzFilterMultiple = true;
  @Input() nzWidth: string;
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
  @Output() readonly nzFilterChange = new EventEmitter<NzSafeAny[] | NzSafeAny>();

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
  get filterValue(): NzSafeAny {
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
    if (!this.nzFilters) {
      return;
    }
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
    this.filterVisible = false;
    this.search();
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
    if (changes.nzFilters && this.nzFilters) {
      this.initMultipleFilterList();
      this.initSingleFilterList();
      this.updateFilterStatus();
    }
    if (changes.nzWidth || changes.colspan) {
      this.widthChange$.next();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
