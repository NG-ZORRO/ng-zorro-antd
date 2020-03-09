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
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';

import { gridResponsiveMap, InputBoolean, InputNumber, NzBreakpointEnum, NzBreakpointService } from 'ng-zorro-antd/core';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzI18nService } from 'ng-zorro-antd/i18n';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PaginationItemRenderContext } from './pagination.types';

@Component({
  selector: 'nz-pagination',
  exportAs: 'nzPagination',
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-container *ngIf="showPagination">
      <ul
        *ngIf="nzSimple"
        nz-pagination-simple
        [class.ant-table-pagination]="nzInTable"
        [disabled]="nzDisabled"
        [itemRender]="nzItemRender"
        [locale]="locale"
        [pageSize]="nzPageSize"
        [total]="nzTotal"
        [pageIndex]="nzPageIndex"
        (pageIndexChange)="onPageIndexChange($event)"
      ></ul>
      <ul
        *ngIf="!nzSimple"
        nz-pagination-default
        [class.ant-table-pagination]="nzInTable"
        [nzSize]="size"
        [itemRender]="nzItemRender"
        [showTotal]="nzShowTotal"
        [disabled]="nzDisabled"
        [locale]="locale"
        [showSizeChanger]="nzShowSizeChanger"
        [showQuickJumper]="nzShowQuickJumper"
        [total]="nzTotal"
        [pageIndex]="nzPageIndex"
        [pageSize]="nzPageSize"
        [pageSizeOptions]="nzPageSizeOptions"
        (pageIndexChange)="onPageIndexChange($event)"
        (pageSizeChange)="onPageSizeChange($event)"
      ></ul>
    </ng-container>
  `
})
export class NzPaginationComponent implements OnInit, OnDestroy, OnChanges {
  @Output() readonly nzPageSizeChange: EventEmitter<number> = new EventEmitter();
  @Output() readonly nzPageIndexChange: EventEmitter<number> = new EventEmitter();
  @Input() nzShowTotal: TemplateRef<{ $implicit: number; range: [number, number] }> | null = null;
  @Input() nzInTable = false;
  @Input() nzSize: 'default' | 'small' = 'default';
  @Input() nzPageSizeOptions = [10, 20, 30, 40];
  @Input() nzItemRender: TemplateRef<PaginationItemRenderContext>;
  @Input() @InputBoolean() nzDisabled = false;
  @Input() @InputBoolean() nzShowSizeChanger = false;
  @Input() @InputBoolean() nzHideOnSinglePage = false;
  @Input() @InputBoolean() nzShowQuickJumper = false;
  @Input() @InputBoolean() nzSimple = false;
  @Input() @InputBoolean() nzAutoResize = false;
  @Input() @InputNumber() nzTotal = 0;
  @Input() @InputNumber() nzPageIndex = 1;
  @Input() @InputNumber() nzPageSize = 10;

  showPagination = true;
  locale: NzSafeAny = {};
  size: 'default' | 'small' = 'default';

  private destroy$ = new Subject<void>();

  validatePageIndex(value: number, lastIndex: number): number {
    if (value > lastIndex) {
      return lastIndex;
    } else if (value < 1) {
      return 1;
    } else {
      return value;
    }
  }

  onPageIndexChange(index: number): void {
    const lastIndex = this.getLastIndex(this.nzTotal, this.nzPageSize);
    const validIndex = this.validatePageIndex(index, lastIndex);
    if (validIndex !== this.nzPageIndex && !this.nzDisabled) {
      this.nzPageIndex = validIndex;
      this.nzPageIndexChange.emit(this.nzPageIndex);
    }
  }

  onPageSizeChange(size: number): void {
    this.nzPageSize = size;
    this.nzPageSizeChange.emit(size);
    const lastIndex = this.getLastIndex(this.nzTotal, this.nzPageSize);
    if (this.nzPageIndex > lastIndex) {
      this.onPageIndexChange(lastIndex);
    }
  }

  getLastIndex(total: number, pageSize: number): number {
    return Math.ceil(total / pageSize);
  }

  constructor(private i18n: NzI18nService, private cdr: ChangeDetectorRef, private breakpointService: NzBreakpointService) {}

  ngOnInit(): void {
    this.i18n.localeChange.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.locale = this.i18n.getLocaleData('Pagination');
      this.cdr.markForCheck();
    });

    this.breakpointService
      .subscribe(gridResponsiveMap)
      .pipe(takeUntil(this.destroy$))
      .subscribe(bp => {
        if (this.nzAutoResize) {
          this.size = bp === NzBreakpointEnum.xs ? 'small' : 'default';
          this.cdr.markForCheck();
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { nzHideOnSinglePage, nzTotal, nzPageSize, nzSize } = changes;

    if (nzHideOnSinglePage || nzTotal || nzPageSize) {
      this.showPagination = (this.nzHideOnSinglePage && this.nzTotal > this.nzPageSize) || (this.nzTotal > 0 && !this.nzHideOnSinglePage);
    }

    if (nzSize) {
      this.size = nzSize.currentValue;
    }
  }
}
