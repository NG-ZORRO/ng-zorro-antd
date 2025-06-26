/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Direction, Directionality } from '@angular/cdk/bidi';
import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewEncapsulation,
  booleanAttribute,
  numberAttribute,
  DestroyRef,
  inject
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReplaySubject } from 'rxjs';

import { NzConfigKey, NzConfigService, WithConfig } from 'ng-zorro-antd/core/config';
import { NzBreakpointEnum, NzBreakpointService, gridResponsiveMap } from 'ng-zorro-antd/core/services';
import { NzI18nService, NzPaginationI18nInterface } from 'ng-zorro-antd/i18n';

import { NzPaginationDefaultComponent } from './pagination-default.component';
import { NzPaginationSimpleComponent } from './pagination-simple.component';
import { PaginationItemRenderContext } from './pagination.types';

const NZ_CONFIG_MODULE_NAME: NzConfigKey = 'pagination';

@Component({
  selector: 'nz-pagination',
  exportAs: 'nzPagination',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (showPagination) {
      @if (nzSimple) {
        <ng-template [ngTemplateOutlet]="simplePagination.template" />
      } @else {
        <ng-template [ngTemplateOutlet]="defaultPagination.template" />
      }
    }

    <nz-pagination-simple
      #simplePagination
      [disabled]="nzDisabled"
      [itemRender]="nzItemRender"
      [locale]="locale"
      [pageSize]="nzPageSize"
      [total]="nzTotal"
      [pageIndex]="nzPageIndex"
      (pageIndexChange)="onPageIndexChange($event)"
    ></nz-pagination-simple>
    <nz-pagination-default
      #defaultPagination
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
    ></nz-pagination-default>
  `,
  host: {
    class: 'ant-pagination',
    '[class.ant-pagination-simple]': 'nzSimple',
    '[class.ant-pagination-disabled]': 'nzDisabled',
    '[class.ant-pagination-mini]': `!nzSimple && size === 'small'`,
    '[class.ant-pagination-rtl]': `dir === 'rtl'`
  },
  imports: [NgTemplateOutlet, NzPaginationSimpleComponent, NzPaginationDefaultComponent]
})
export class NzPaginationComponent implements OnInit, OnChanges {
  readonly _nzModuleName: NzConfigKey = NZ_CONFIG_MODULE_NAME;

  private readonly i18n = inject(NzI18nService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly breakpointService = inject(NzBreakpointService);
  protected readonly nzConfigService = inject(NzConfigService);
  private readonly directionality = inject(Directionality);
  private readonly destroyRef = inject(DestroyRef);

  @Output() readonly nzPageSizeChange = new EventEmitter<number>();
  @Output() readonly nzPageIndexChange = new EventEmitter<number>();
  @Input() nzShowTotal: TemplateRef<{ $implicit: number; range: [number, number] }> | null = null;
  @Input() nzItemRender: TemplateRef<PaginationItemRenderContext> | null = null;
  @Input() @WithConfig() nzSize: 'default' | 'small' = 'default';
  @Input() @WithConfig() nzPageSizeOptions: number[] = [10, 20, 30, 40];
  @Input({ transform: booleanAttribute }) @WithConfig() nzShowSizeChanger = false;
  @Input({ transform: booleanAttribute }) @WithConfig() nzShowQuickJumper = false;
  @Input({ transform: booleanAttribute }) @WithConfig() nzSimple = false;
  @Input({ transform: booleanAttribute }) nzDisabled = false;
  @Input({ transform: booleanAttribute }) nzResponsive = false;
  @Input({ transform: booleanAttribute }) nzHideOnSinglePage = false;
  @Input({ transform: numberAttribute }) nzTotal = 0;
  @Input({ transform: numberAttribute }) nzPageIndex = 1;
  @Input({ transform: numberAttribute }) nzPageSize = 10;

  showPagination = true;
  locale!: NzPaginationI18nInterface;
  size: 'default' | 'small' = 'default';
  dir: Direction = 'ltr';

  private total$ = new ReplaySubject<number>(1);

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

  onTotalChange(total: number): void {
    const lastIndex = this.getLastIndex(total, this.nzPageSize);
    if (this.nzPageIndex > lastIndex) {
      Promise.resolve().then(() => {
        this.onPageIndexChange(lastIndex);
        this.cdr.markForCheck();
      });
    }
  }

  getLastIndex(total: number, pageSize: number): number {
    return Math.ceil(total / pageSize);
  }

  ngOnInit(): void {
    this.i18n.localeChange.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.locale = this.i18n.getLocaleData('Pagination');
      this.cdr.markForCheck();
    });

    this.total$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(total => {
      this.onTotalChange(total);
    });

    this.breakpointService
      .subscribe(gridResponsiveMap)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(bp => {
        if (this.nzResponsive) {
          this.size = bp === NzBreakpointEnum.xs ? 'small' : 'default';
          this.cdr.markForCheck();
        }
      });

    this.directionality.change?.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(direction => {
      this.dir = direction;
      this.cdr.detectChanges();
    });
    this.dir = this.directionality.value;
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { nzHideOnSinglePage, nzTotal, nzPageSize, nzSize } = changes;
    if (nzTotal) {
      this.total$.next(this.nzTotal);
    }
    if (nzHideOnSinglePage || nzTotal || nzPageSize) {
      this.showPagination =
        (this.nzHideOnSinglePage && this.nzTotal > this.nzPageSize) || (this.nzTotal > 0 && !this.nzHideOnSinglePage);
    }

    if (nzSize) {
      this.size = nzSize.currentValue;
    }
  }
}
