/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/* eslint-disable @angular-eslint/component-selector */
import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnChanges,
  OnInit,
  Output,
  SimpleChange,
  SimpleChanges,
  ViewEncapsulation,
  booleanAttribute,
  inject,
  DestroyRef
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { combineLatest, of, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

import { NzConfigKey, NzConfigService, WithConfig } from 'ng-zorro-antd/core/config';
import { warn } from 'ng-zorro-antd/core/logger';
import { fromEventOutsideAngular } from 'ng-zorro-antd/core/util';
import { NzI18nService, NzTableI18nInterface } from 'ng-zorro-antd/i18n';

import { NzTableCriteriaFilterComponent } from '../addon/criteria-filter.component';
import { NzTableFilterComponent } from '../addon/filter.component';
import { NzTableSortersComponent } from '../addon/sorters.component';
import { NzTableDataService } from '../table-data.service';
import { createCriteriaFilterFn } from '../table-filter-criteria';
import {
  buildFilterOptions,
  createOptionsFilterFn,
  formatFilterOptionValue,
  getFilterOptionKeySet,
  NZ_TABLE_FILTER_EMPTY_KEY,
  NzTableFilterOption
} from '../table-filter-options';
import {
  NzTableCriteriaFilterConfig,
  NzTableFilterConfig,
  NzTableFilterFn,
  NzTableFilterList,
  NzTableFilterValue,
  NzTableOptionsFilterConfig,
  NzTableSortFn,
  NzTableSortOrder
} from '../table.types';

const NZ_CONFIG_MODULE_NAME: NzConfigKey = 'table';
// The dropdown treats a single `null` selection as cleared, so the empty option uses a private value internally.
const NZ_TABLE_FILTER_EMPTY_OPTION_VALUE = Symbol('NzTableFilterEmptyOption');

@Component({
  selector:
    'th[nzColumnKey], th[nzSortFn], th[nzSortOrder], th[nzFilters], th[nzShowSort], th[nzShowFilter], th[nzCustomFilter], th[nzFilterConfig]',
  encapsulation: ViewEncapsulation.None,
  template: `
    @if (nzShowFilter && !nzCustomFilter && criteriaConfig) {
      <nz-table-criteria-filter
        [contentTemplate]="notFilterTemplate"
        [config]="criteriaConfig"
        [value]="nzFilterValue"
        (filterChange)="onFilterValueChange($event)"
      />
    } @else if (nzShowFilter || nzCustomFilter) {
      <nz-table-filter
        [contentTemplate]="notFilterTemplate"
        [extraTemplate]="extraTemplate"
        [customFilter]="nzCustomFilter"
        [filterMultiple]="nzFilterMultiple"
        [listOfFilter]="listOfFilterForDisplay"
        (filterChange)="onFilterValueChange($event)"
      />
    } @else {
      <ng-container [ngTemplateOutlet]="notFilterTemplate" />
    }
    <ng-template #notFilterTemplate>
      <ng-template [ngTemplateOutlet]="nzShowSort ? sortTemplate : contentTemplate" />
    </ng-template>
    <ng-template #extraTemplate>
      <ng-content select="[nz-th-extra]" />
      <ng-content select="nz-filter-trigger" />
    </ng-template>
    <ng-template #sortTemplate>
      <nz-table-sorters [sortOrder]="sortOrder" [sortDirections]="sortDirections" [contentTemplate]="contentTemplate" />
    </ng-template>
    <ng-template #contentTemplate>
      <ng-content />
    </ng-template>
  `,
  host: {
    '[class.ant-table-column-has-sorters]': 'nzShowSort',
    '[class.ant-table-column-sort]': `sortOrder === 'descend' || sortOrder === 'ascend'`
  },
  imports: [NzTableFilterComponent, NzTableCriteriaFilterComponent, NgTemplateOutlet, NzTableSortersComponent]
})
export class NzThAddOnComponent<T> implements OnChanges, OnInit {
  readonly _nzModuleName: NzConfigKey = NZ_CONFIG_MODULE_NAME;

  nzConfigService = inject(NzConfigService);
  private el: HTMLElement = inject(ElementRef<HTMLElement>).nativeElement;
  private destroyRef = inject(DestroyRef);
  private cdr = inject(ChangeDetectorRef);
  private ngZone = inject(NgZone);
  private nzTableDataService = inject<NzTableDataService<T>>(NzTableDataService, { optional: true });
  private i18n = inject(NzI18nService);

  manualClickOrder$ = new Subject<NzThAddOnComponent<T>>();
  calcOperatorChange$ = new Subject<void>();
  sortOrder: NzTableSortOrder = null;
  sortDirections: NzTableSortOrder[] = ['ascend', 'descend', null];
  listOfFilterForDisplay: NzTableFilterList = [];
  private sortOrderChange$ = new Subject<NzTableSortOrder>();
  private isNzShowSortChanged = false;
  private isNzShowFilterChanged = false;
  private isNzFilterValueChanged = false;
  private listOfSourceData: readonly T[] = [];
  private listOfFilterOption: NzTableFilterOption[] = [];
  private generatedFilterFn: NzTableFilterFn<T> | null = null;
  @Input() nzColumnKey?: string;
  @Input() nzFilterMultiple = true;
  @Input() nzSortOrder: NzTableSortOrder = null;
  @Input() nzSortPriority: number | boolean = false;
  @Input() @WithConfig() nzSortDirections: NzTableSortOrder[] = ['ascend', 'descend', null];
  @Input() nzFilters: NzTableFilterList = [];
  @Input() nzSortFn: NzTableSortFn<T> | boolean | null = null;
  @Input() nzFilterFn: NzTableFilterFn<T> | boolean | null = null;
  @Input() nzFilterConfig: NzTableFilterConfig<T> | null = null;
  @Input() nzFilterValue: NzTableFilterValue = null;
  @Input({ transform: booleanAttribute }) nzShowSort = false;
  @Input({ transform: booleanAttribute }) nzShowFilter = false;
  @Input({ transform: booleanAttribute }) nzCustomFilter = false;
  @Output() readonly nzCheckedChange = new EventEmitter<boolean>();
  @Output() readonly nzSortOrderChange = new EventEmitter<string | null>();
  @Output() readonly nzFilterChange = new EventEmitter<NzTableFilterValue>();
  @Output() readonly nzFilterValueChange = new EventEmitter<NzTableFilterValue>();

  /** The filter function used by the table: `nzFilterFn` takes precedence over one generated by `nzFilterConfig`. */
  get filterFn(): NzTableFilterFn<T> | boolean | null {
    return this.nzFilterFn || this.generatedFilterFn;
  }

  get criteriaConfig(): NzTableCriteriaFilterConfig<T> | null {
    return this.nzFilterConfig && this.nzFilterConfig.type !== 'options' ? this.nzFilterConfig : null;
  }

  /** `nzFilters` is shorthand for a hand-written options config whose values are matched by `nzFilterFn`. */
  private get optionsConfig(): NzTableOptionsFilterConfig<T> {
    return this.nzFilterConfig?.type === 'options' ? this.nzFilterConfig : { type: 'options', options: this.nzFilters };
  }

  private get isLegacyFilters(): boolean {
    return !this.nzFilterConfig;
  }

  getNextSortDirection(sortDirections: NzTableSortOrder[], current: NzTableSortOrder): NzTableSortOrder {
    const index = sortDirections.indexOf(current);
    if (index === sortDirections.length - 1) {
      return sortDirections[0];
    } else {
      return sortDirections[index + 1];
    }
  }

  setSortOrder(order: NzTableSortOrder): void {
    this.sortOrderChange$.next(order);
  }

  clearSortOrder(): void {
    if (this.sortOrder !== null) {
      this.setSortOrder(null);
    }
  }

  onFilterValueChange(value: NzTableFilterValue): void {
    const filterValue = this.nzFilterConfig?.type === 'options' ? this.normalizeOptionsFilterValue(value) : value;
    this.nzFilterValue = filterValue;
    this.nzFilterChange.emit(filterValue);
    this.nzFilterValueChange.emit(filterValue);
    this.updateListOfFilterOption();
    this.updateCalcOperator();
  }

  updateCalcOperator(): void {
    this.calcOperatorChange$.next();
  }

  private normalizeOptionsFilterValue(value: NzTableFilterValue): NzTableFilterValue[] {
    const listOfValue: NzTableFilterValue[] =
      value === null || value === undefined ? [] : Array.isArray(value) ? value : [value];
    return listOfValue.map(item => (item === NZ_TABLE_FILTER_EMPTY_OPTION_VALUE ? null : item));
  }

  private isFilterValueSelected(value: NzTableFilterValue): boolean {
    return this.isLegacyFilters && !this.nzFilterMultiple
      ? this.nzFilterValue === value
      : this.normalizeOptionsFilterValue(this.nzFilterValue).includes(value);
  }

  private updateListOfFilterOption(): void {
    if (this.criteriaConfig) {
      this.listOfFilterOption = [];
      this.listOfFilterForDisplay = [];
      return;
    }
    const config = this.optionsConfig;
    const { options, hasUnsupportedValue } = buildFilterOptions(this.listOfSourceData, config, this.nzFilterValue);
    if (hasUnsupportedValue) {
      warn(
        '`nzFilterConfig` options filters only support string, number, boolean, and Date values. Unsupported values are ignored.'
      );
    }
    this.listOfFilterOption = options;
    this.updateListOfFilterForDisplay();
  }

  private updateListOfFilterForDisplay(): void {
    const { dateMode, labelFormatter } = this.optionsConfig;
    const isLegacy = this.isLegacyFilters;
    const selectedKeys = getFilterOptionKeySet(this.nzFilterValue, dateMode);
    const locale = this.i18n.getLocaleData('Table') as NzTableI18nInterface;
    const emptyText = locale.filterEmptyOption ?? '(empty)';
    this.listOfFilterForDisplay = this.listOfFilterOption.map(({ key, value, text }) => {
      // `nzFilters` keeps its original semantics: raw values matched by identity.
      if (isLegacy) {
        return { text: text ?? '', value, byDefault: this.isFilterValueSelected(value) };
      }
      const isEmpty = key === NZ_TABLE_FILTER_EMPTY_KEY;
      const label = isEmpty
        ? emptyText
        : labelFormatter
          ? labelFormatter(value)
          : formatFilterOptionValue(value, dateMode);
      return {
        text: text ?? label,
        value: isEmpty ? NZ_TABLE_FILTER_EMPTY_OPTION_VALUE : value,
        byDefault: key.startsWith('custom:') ? this.isFilterValueSelected(value) : selectedKeys.has(key)
      };
    });
  }

  ngOnInit(): void {
    combineLatest([this.nzTableDataService?.listOfSourceData$ ?? of<readonly T[]>([]), this.i18n.localeChange])
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(([listOfSourceData]) => {
        this.listOfSourceData = listOfSourceData;
        if (this.nzFilterConfig?.type === 'options') {
          this.updateListOfFilterOption();
          this.cdr.markForCheck();
        }
      });
    fromEventOutsideAngular(this.el, 'click')
      .pipe(
        filter(() => this.nzShowSort),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => {
        const nextOrder = this.getNextSortDirection(this.sortDirections, this.sortOrder!);
        this.ngZone.run(() => {
          this.setSortOrder(nextOrder);
          this.manualClickOrder$.next(this);
        });
      });

    this.sortOrderChange$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(order => {
      if (this.sortOrder !== order) {
        this.sortOrder = order;
        this.nzSortOrderChange.emit(order);
      }
      this.updateCalcOperator();
      this.cdr.markForCheck();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const {
      nzSortDirections,
      nzFilters,
      nzSortOrder,
      nzSortFn,
      nzFilterFn,
      nzSortPriority,
      nzFilterMultiple,
      nzFilterConfig,
      nzFilterValue,
      nzShowSort,
      nzShowFilter
    } = changes;
    if (nzSortDirections) {
      if (this.nzSortDirections && this.nzSortDirections.length) {
        this.sortDirections = this.nzSortDirections;
      }
    }
    if (nzSortOrder) {
      this.sortOrder = this.nzSortOrder;
      this.setSortOrder(this.nzSortOrder);
    }
    if (nzShowSort) {
      this.isNzShowSortChanged = true;
    }
    if (nzShowFilter) {
      this.isNzShowFilterChanged = true;
    }
    if (nzFilterValue) {
      this.isNzFilterValueChanged = true;
    }
    const isFirstChange = (value: SimpleChange): boolean =>
      value && value.firstChange && value.currentValue !== undefined;
    if ((isFirstChange(nzSortOrder) || isFirstChange(nzSortFn)) && !this.isNzShowSortChanged) {
      this.nzShowSort = true;
    }
    if (isFirstChange(nzFilters) && !this.isNzShowFilterChanged) {
      this.nzShowFilter = true;
    }
    if (nzFilterConfig && this.nzFilterConfig && !this.isNzShowFilterChanged) {
      this.nzShowFilter = true;
    }
    if (nzFilterConfig) {
      const config = this.nzFilterConfig;
      this.generatedFilterFn = !config
        ? null
        : config.type === 'options'
          ? createOptionsFilterFn(config)
          : createCriteriaFilterFn(config);
    }
    const listOfDefaultFilter = this.isLegacyFilters
      ? this.nzFilters
      : Array.isArray(this.optionsConfig.options) && !this.criteriaConfig
        ? this.optionsConfig.options
        : null;
    if (
      (nzFilters || nzFilterMultiple || nzFilterConfig) &&
      this.nzShowFilter &&
      listOfDefaultFilter &&
      !this.isNzFilterValueChanged
    ) {
      const listOfValue = listOfDefaultFilter.filter(item => item.byDefault).map(item => item.value);
      this.nzFilterValue = this.isLegacyFilters
        ? this.nzFilterMultiple
          ? listOfValue
          : listOfValue[0] || null
        : this.normalizeOptionsFilterValue(listOfValue);
    }
    if (nzFilters || nzFilterMultiple || nzFilterConfig || nzFilterValue) {
      this.updateListOfFilterOption();
    }
    if (nzSortFn || nzFilterFn || nzSortPriority || nzFilters || nzFilterConfig || nzFilterValue) {
      this.updateCalcOperator();
    }
  }
}
