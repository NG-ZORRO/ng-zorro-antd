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
  Optional,
  Output,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { InputBoolean } from 'ng-zorro-antd/core';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzI18nInterface, NzI18nService } from 'ng-zorro-antd/i18n';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NzTableService } from './table.service';
import { NzSortValueType, NzThFilterType } from './table.types';

@Component({
  selector: 'th:not(.nz-disable-th):not([mat-sort-header]):not([mat-header-cell])',
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nz-table-selection
      *ngIf="nzShowCheckbox || nzShowRowSelection; else notSelectionTemplate"
      [contentTemplate]="contentTemplate"
      [checked]="nzChecked"
      [disabled]="nzDisabled"
      [indeterminate]="nzIndeterminate"
      [listOfSelections]="nzSelections"
      [showCheckbox]="nzShowCheckbox"
      [showRowSelection]="nzShowRowSelection"
      (checkedChange)="onCheckedChange($event)"
    ></nz-table-selection>
    <ng-template #notSelectionTemplate>
      <nz-table-filter
        *ngIf="nzShowFilter || nzCustomFilter; else notFilterTemplate"
        [contentTemplate]="notFilterTemplate"
        [extraTemplate]="extraTemplate"
        [locale]="locale"
        [customFilter]="nzCustomFilter"
        [filterMultiple]="nzFilterMultiple"
        [listOfFilters]="nzFilters"
        (filterChange)="nzFilterChange.emit($event)"
      ></nz-table-filter>
    </ng-template>
    <ng-template #notFilterTemplate>
      <ng-template [ngTemplateOutlet]="nzShowSort ? sortTemplate : contentTemplate"></ng-template>
    </ng-template>
    <ng-template #extraTemplate>
      <ng-content select="[nz-th-extra]"></ng-content>
    </ng-template>
    <ng-template #sortTemplate>
      <nz-table-sorters
        [currentSortValue]="nzSort"
        [sortDirections]="nzSortDirections"
        [contentTemplate]="contentTemplate"
      ></nz-table-sorters>
    </ng-template>
    <ng-template #contentTemplate><ng-content></ng-content></ng-template>
  `,
  host: {
    '[class.ant-table-column-has-sorters]': 'nzShowSort',
    '[class.ant-table-selection-column]': 'nzShowCheckbox || nzShowRowSelection',
    '[class.ant-table-expand-icon-th]': 'nzExpand',
    '[class.ant-table-cell]': 'isInsideTable',
    '[class.ant-table-column-sort]': `nzSort === 'descend' || nzSort === 'ascend'`,
    '(click)': 'updateSortValue()'
  }
})
export class NzThComponent implements OnChanges, OnInit, OnDestroy {
  locale: NzI18nInterface['Table'] = {} as NzI18nInterface['Table'];
  widthChange$ = new Subject();
  isInsideTable = false;
  private destroy$ = new Subject();
  @Input() colspan: number | null = null;
  @Input() nzSelections: Array<{ text: string; onSelect(...args: NzSafeAny[]): NzSafeAny }> = [];
  @Input() nzChecked = false;
  @Input() nzDisabled = false;
  @Input() nzIndeterminate = false;
  @Input() nzSortKey: string;
  @Input() nzFilterMultiple = true;
  @Input() nzWidth: string;
  @Input() nzSort: NzSortValueType = null;
  @Input() nzSortDirections: NzSortValueType[] = ['ascend', 'descend', null];
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
      const nextSortDirection = (sortDirections: NzSortValueType[], current: NzSortValueType) => {
        const index = sortDirections.indexOf(current);
        if (index === sortDirections.length - 1) {
          return sortDirections[0];
        } else {
          return sortDirections[index + 1];
        }
      };
      this.nzSort = nextSortDirection(this.nzSortDirections, this.nzSort);
      this.nzSortChangeWithKey.emit({ key: this.nzSortKey, value: this.nzSort });
      this.nzSortChange.emit(this.nzSort);
    }
  }

  marForCheck(): void {
    this.cdr.markForCheck();
  }

  onCheckedChange(checked: boolean): void {
    this.nzChecked = checked;
    this.nzCheckedChange.emit(checked);
  }

  constructor(private cdr: ChangeDetectorRef, private i18n: NzI18nService, @Optional() nzTableService: NzTableService) {
    this.isInsideTable = !!nzTableService;
  }

  ngOnInit(): void {
    this.i18n.localeChange.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.locale = this.i18n.getLocaleData('Table');
      this.cdr.markForCheck();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { nzWidth, colspan } = changes;
    if (nzWidth || colspan) {
      this.widthChange$.next();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
