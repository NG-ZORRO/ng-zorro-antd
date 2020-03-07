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
import { NzThFilterType } from './table.types';

@Component({
  selector: 'th:not(.nz-disable-th):not([mat-sort-header]):not([mat-header-cell])',
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-container *ngIf="!nzShowSort && !(nzShowFilter || nzCustomFilter) && !(nzShowCheckbox || nzShowRowSelection)">
      <ng-template [ngTemplateOutlet]="contentTemplate"></ng-template>
    </ng-container>
    <ng-container *ngIf="nzShowSort && !(nzShowFilter || nzCustomFilter)">
      <ng-template [ngTemplateOutlet]="sortTemplate"></ng-template>
    </ng-container>
    <ng-template #sortTemplate>
      <nz-table-sorters [nzSort]="nzSort" [contentTemplate]="contentTemplate"></nz-table-sorters>
    </ng-template>
    <nz-table-filter
      *ngIf="nzShowFilter || nzCustomFilter"
      [contentTemplate]="nzShowSort ? sortTemplate : contentTemplate"
      [extraTemplate]="extraTemplate"
      [locale]="locale"
      [nzCustomFilter]="nzCustomFilter"
      [nzFilterMultiple]="nzFilterMultiple"
      [nzFilters]="nzFilters"
      (nzFilterChange)="nzFilterChange.emit($event)"
    ></nz-table-filter>
    <nz-table-selection
      *ngIf="nzShowCheckbox || nzShowRowSelection"
      [contentTemplate]="contentTemplate"
      [(nzChecked)]="nzChecked"
      [nzDisabled]="nzDisabled"
      [nzIndeterminate]="nzIndeterminate"
      [nzSelections]="nzSelections"
      [nzShowCheckbox]="nzShowCheckbox"
      [nzShowRowSelection]="nzShowRowSelection"
      (nzCheckedChange)="nzCheckedChange.emit($event)"
    ></nz-table-selection>
    <ng-template #extraTemplate>
      <ng-content select="[nz-th-extra]"></ng-content>
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

  marForCheck(): void {
    this.cdr.markForCheck();
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
    if (changes.nzWidth || changes.colspan) {
      this.widthChange$.next();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
