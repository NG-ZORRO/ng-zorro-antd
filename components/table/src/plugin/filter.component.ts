/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { isNotNil } from 'ng-zorro-antd/core';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzI18nInterface } from 'ng-zorro-antd/i18n';
import { NzThFilterType, NzThItemInterface } from '../../table.types';

@Component({
  selector: 'nz-table-filter',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <span class="ant-table-filter-column-title">
      <ng-template [ngTemplateOutlet]="contentTemplate"></ng-template>
    </span>
    <span class="ant-table-filter-trigger-container" [class.ant-table-filter-trigger-container-open]="filterVisible">
      <ng-container *ngIf="!customFilter; else extraTemplate">
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
            <ng-container *ngIf="filterMultiple">
              <li nz-menu-item *ngFor="let filter of multipleFilterList" (click)="checkMultiple(filter)">
                <label nz-checkbox [ngModel]="filter.checked" (ngModelChange)="checkMultiple(filter)"></label>
                <span>{{ filter.text }}</span>
              </li>
            </ng-container>
            <ng-container *ngIf="!filterMultiple">
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
  `,
  host: {
    '[class.ant-table-filter-column]': 'true'
  }
})
export class NzTableFilterComponent implements OnChanges {
  @Input() locale: NzI18nInterface['Table'] = {} as NzI18nInterface['Table'];
  @Input() contentTemplate: TemplateRef<NzSafeAny> | null = null;
  @Input() customFilter = false;
  @Input() extraTemplate: TemplateRef<NzSafeAny> | null = null;
  @Input() filterMultiple = true;
  @Input() listOfFilters: NzThFilterType = [];
  @Output() readonly filterChange = new EventEmitter<NzSafeAny[] | NzSafeAny>();
  hasFilterValue = false;
  filterVisible = false;
  multipleFilterList: NzThItemInterface[] = [];
  singleFilterList: NzThItemInterface[] = [];
  private hasDefaultFilter = false;

  checkSingle(filter: NzThItemInterface): void {
    this.singleFilterList.forEach(item => (item.checked = item === filter));
  }
  checkMultiple(filter: NzThItemInterface): void {
    filter.checked = !filter.checked;
  }
  hideDropDown(): void {
    this.filterVisible = false;
    this.search();
  }
  get filterList(): NzThItemInterface[] {
    return this.multipleFilterList.filter(item => item.checked).map(item => item.value);
  }
  get filterValue(): NzSafeAny {
    const checkedFilter = this.singleFilterList.find(item => item.checked);
    return checkedFilter ? checkedFilter.value : null;
  }
  dropDownVisibleChange(value: boolean): void {
    this.filterVisible = value;
    if (!value) {
      this.search();
    }
  }
  updateFilterStatus(): void {
    if (this.filterMultiple) {
      this.hasFilterValue = this.filterList.length > 0;
    } else {
      this.hasFilterValue = isNotNil(this.filterValue);
    }
  }

  search(): void {
    this.updateFilterStatus();
    if (this.filterMultiple) {
      this.filterChange.emit(this.filterList);
    } else {
      this.filterChange.emit(this.filterValue);
    }
  }

  reset(): void {
    if (!this.listOfFilters) {
      return;
    }
    this.initMultipleFilterList(true);
    this.initSingleFilterList(true);
    this.hasFilterValue = false;
  }

  initMultipleFilterList(force?: boolean): void {
    this.multipleFilterList = this.listOfFilters.map(item => {
      const checked = force ? false : !!item.byDefault;
      if (checked) {
        this.hasDefaultFilter = true;
      }
      return { text: item.text, value: item.value, checked };
    });
    this.checkDefaultFilters();
  }

  initSingleFilterList(force?: boolean): void {
    this.singleFilterList = this.listOfFilters.map(item => {
      const checked = force ? false : !!item.byDefault;
      if (checked) {
        this.hasDefaultFilter = true;
      }
      return { text: item.text, value: item.value, checked };
    });
    this.checkDefaultFilters();
  }

  checkDefaultFilters(): void {
    if (!this.listOfFilters || this.listOfFilters.length === 0 || !this.hasDefaultFilter) {
      return;
    }
    this.updateFilterStatus();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.listOfFilters && this.listOfFilters) {
      this.initMultipleFilterList();
      this.initSingleFilterList();
      this.updateFilterStatus();
    }
  }
}
