/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  SimpleChanges,
  TemplateRef,
  TrackByFunction,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { InputBoolean, NzConfigService, NzSizeMDSType, WithConfig } from 'ng-zorro-antd/core';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzI18nService } from 'ng-zorro-antd/i18n';
import { PaginationItemRenderContext } from 'ng-zorro-antd/pagination';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NzFixedLeftCellDirective } from './fixed-left-cell.directive';
import { NzFixedRightCellDirective } from './fixed-right-cell.directive';
import { NzTableInnerScrollComponent } from './table-inner-scroll.component';
import { NzTableVirtualScrollDirective } from './table-virtual-scroll.directive';
import { NzTableService } from './table.service';
import { NzTableDataInterface } from './table.types';

const NZ_CONFIG_COMPONENT_NAME = 'table';

@Component({
  selector: 'nz-table',
  exportAs: 'nzTable',
  providers: [NzTableService],
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <nz-spin [nzDelay]="nzLoadingDelay" [nzSpinning]="nzLoading" [nzIndicator]="nzLoadingIndicator">
      <ng-container *ngIf="nzPaginationPosition === 'both' || nzPaginationPosition === 'top'">
        <ng-template [ngTemplateOutlet]="paginationTemplate"></ng-template>
      </ng-container>
      <div
        #tableMainElement
        class="ant-table"
        [class.ant-table-fixed-header]="nzData.length && nzScroll.y"
        [class.ant-table-fixed-column]="nzScroll.x"
        [class.ant-table-has-fix-left]="listOfNzFixedLeftCellDirective.length"
        [class.ant-table-has-fix-right]="listOfNzFixedRightCellDirective.length"
        [class.ant-table-bordered]="nzBordered"
        [class.ant-table-middle]="nzSize === 'middle'"
        [class.ant-table-small]="nzSize === 'small'"
      >
        <nz-table-title-footer [title]="nzTitle" *ngIf="nzTitle"></nz-table-title-footer>
        <nz-table-inner-default
          *ngIf="!nzScroll.y && !nzScroll.x"
          [listOfColWidth]="listOfColWidth"
          [theadTemplate]="theadTemplate"
          [contentTemplate]="contentTemplate"
        ></nz-table-inner-default>
        <nz-table-inner-scroll
          *ngIf="nzScroll.y || nzScroll.x"
          [data]="data"
          [scroll]="nzScroll"
          [contentTemplate]="contentTemplate"
          [virtualScroll]="nzVirtualScroll"
          [listOfColWidth]="listOfColWidth"
          [theadTemplate]="theadTemplate"
          [virtualTemplate]="nzVirtualScrollDirective?.templateRef"
          [virtualItemSize]="nzVirtualItemSize"
          [virtualMaxBufferPx]="nzVirtualMaxBufferPx"
          [virtualMinBufferPx]="nzVirtualMinBufferPx"
          [tableMainElement]="tableMainElement"
          [virtualForTrackBy]="nzVirtualForTrackBy"
        ></nz-table-inner-scroll>
        <div class="ant-table-placeholder" *ngIf="data.length === 0 && !nzLoading && !nzTemplateMode">
          <nz-embed-empty [nzComponentName]="'table'" [specificContent]="nzNoResult"></nz-embed-empty>
        </div>
        <nz-table-title-footer [footer]="nzFooter" *ngIf="nzFooter"></nz-table-title-footer>
      </div>
      <ng-container *ngIf="nzPaginationPosition === 'both' || nzPaginationPosition === 'bottom'">
        <ng-template [ngTemplateOutlet]="paginationTemplate"></ng-template>
      </ng-container>
    </nz-spin>
    <ng-template #paginationTemplate>
      <nz-pagination
        nzInsideTable
        *ngIf="nzShowPagination && data.length"
        [nzShowSizeChanger]="nzShowSizeChanger"
        [nzPageSizeOptions]="nzPageSizeOptions"
        [nzItemRender]="nzItemRender"
        [nzShowQuickJumper]="nzShowQuickJumper"
        [nzHideOnSinglePage]="nzHideOnSinglePage"
        [nzShowTotal]="nzShowTotal"
        [nzSize]="nzSize === 'default' ? 'default' : 'small'"
        [nzPageSize]="nzPageSize"
        [nzTotal]="nzTotal"
        [nzSimple]="nzSimple"
        [nzPageIndex]="nzPageIndex"
        (nzPageSizeChange)="emitPageSizeOrIndex($event, nzPageIndex)"
        (nzPageIndexChange)="emitPageSizeOrIndex(nzPageSize, $event)"
      >
      </nz-pagination>
    </ng-template>
    <ng-template #contentTemplate><ng-content></ng-content></ng-template>
  `,
  host: {
    '[class.ant-table-empty]': 'data.length === 0 && !nzTemplateMode',
    '[class.ant-table-wrapper]': 'true'
  }
})
export class NzTableComponent implements OnInit, OnDestroy, OnChanges, AfterContentInit, AfterViewInit {
  /** public data for ngFor tr */
  public data: NzTableDataInterface[] = [];
  public cdkVirtualScrollViewport: CdkVirtualScrollViewport;
  locale: NzSafeAny = {};
  theadTemplate: TemplateRef<NzSafeAny> | null = null;
  listOfColWidth: string[] = [];
  private destroy$ = new Subject<void>();
  private widthConfig$ = new BehaviorSubject<string[]>([]);
  // TODO: should not descendants
  @ContentChildren(NzFixedLeftCellDirective, { descendants: true }) listOfNzFixedLeftCellDirective: QueryList<NzFixedLeftCellDirective>;
  @ContentChildren(NzFixedRightCellDirective, { descendants: true }) listOfNzFixedRightCellDirective: QueryList<NzFixedRightCellDirective>;
  @ContentChild(NzTableVirtualScrollDirective, { static: false })
  nzVirtualScrollDirective: NzTableVirtualScrollDirective;
  @ViewChild(NzTableInnerScrollComponent) nzTableInnerScrollComponent: NzTableInnerScrollComponent;
  // TODO: layout
  @Input() nzTableLayout = 'auto';
  @Input() nzShowTotal: TemplateRef<{ $implicit: number; range: [number, number] }>;
  @Input() nzPageSizeOptions = [10, 20, 30, 40, 50];
  @Input() nzVirtualItemSize = 0;
  @Input() nzVirtualMaxBufferPx = 200;
  @Input() nzVirtualMinBufferPx = 100;
  @Input() nzVirtualForTrackBy: TrackByFunction<NzTableDataInterface> | undefined;
  @Input() nzLoadingDelay = 0;
  @Input() nzLoadingIndicator: TemplateRef<NzSafeAny> | null = null;
  @Input() nzTotal = 0;
  @Input() nzTitle: string | TemplateRef<NzSafeAny> | null = null;
  @Input() nzFooter: string | TemplateRef<NzSafeAny> | null = null;
  @Input() nzNoResult: string | TemplateRef<NzSafeAny> | null = null;
  @Input() nzWidthConfig: string[] = [];
  @Input() nzPageIndex = 1;
  @Input() nzPageSize = 10;
  @Input() nzData: NzTableDataInterface[] = [];
  @Input() nzPaginationPosition: 'top' | 'bottom' | 'both' = 'bottom';
  @Input() nzScroll: { x?: string | null; y?: string | null } = { x: null, y: null };
  @Input() nzItemRender: TemplateRef<PaginationItemRenderContext>;
  @Input() @InputBoolean() nzFrontPagination = true;
  @Input() @InputBoolean() nzTemplateMode = false;
  @Input() @InputBoolean() nzShowPagination = true;
  @Input() @InputBoolean() nzLoading = false;
  @Input() @InputBoolean() nzVirtualScroll = false;
  @Input() @WithConfig(NZ_CONFIG_COMPONENT_NAME, false) @InputBoolean() nzBordered: boolean;
  @Input() @WithConfig(NZ_CONFIG_COMPONENT_NAME, 'default') nzSize: NzSizeMDSType;
  @Input() @WithConfig(NZ_CONFIG_COMPONENT_NAME, false) @InputBoolean() nzShowSizeChanger: boolean;
  @Input() @WithConfig(NZ_CONFIG_COMPONENT_NAME, false) @InputBoolean() nzHideOnSinglePage: boolean;
  @Input() @WithConfig(NZ_CONFIG_COMPONENT_NAME, false) @InputBoolean() nzShowQuickJumper: boolean;
  @Input() @WithConfig(NZ_CONFIG_COMPONENT_NAME, false) @InputBoolean() nzSimple: boolean;
  @Output() readonly nzPageSizeChange: EventEmitter<number> = new EventEmitter();
  @Output() readonly nzPageIndexChange: EventEmitter<number> = new EventEmitter();
  @Output() readonly nzCurrentPageDataChange: EventEmitter<NzSafeAny[]> = new EventEmitter();
  emitPageSizeOrIndex(size: number, index: number): void {
    if (this.nzPageSize !== size || this.nzPageIndex !== index) {
      if (this.nzPageSize !== size) {
        this.nzPageSize = size;
        this.nzPageSizeChange.emit(this.nzPageSize);
      }
      if (this.nzPageIndex !== index) {
        this.nzPageIndex = index;
        this.nzPageIndexChange.emit(this.nzPageIndex);
      }
      this.updateFrontPaginationDataIfNeeded(this.nzPageSize !== size);
    }
  }

  updateFrontPaginationDataIfNeeded(isPageSizeOrDataChange: boolean = false): void {
    let data = this.nzData || [];
    if (this.nzFrontPagination) {
      this.nzTotal = data.length;
      if (isPageSizeOrDataChange) {
        const maxPageIndex = Math.ceil(data.length / this.nzPageSize) || 1;
        const pageIndex = this.nzPageIndex > maxPageIndex ? maxPageIndex : this.nzPageIndex;
        if (pageIndex !== this.nzPageIndex) {
          this.nzPageIndex = pageIndex;
          Promise.resolve().then(() => this.nzPageIndexChange.emit(pageIndex));
        }
      }
      data = data.slice((this.nzPageIndex - 1) * this.nzPageSize, this.nzPageIndex * this.nzPageSize);
    }
    this.data = [...data];
    this.nzCurrentPageDataChange.emit(this.data);
  }

  constructor(
    private nzConfigService: NzConfigService,
    private cdr: ChangeDetectorRef,
    private i18n: NzI18nService,
    private nzTableService: NzTableService
  ) {
    this.nzConfigService
      .getConfigChangeEventForComponent(NZ_CONFIG_COMPONENT_NAME)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.cdr.markForCheck();
      });
  }

  ngOnInit(): void {
    this.i18n.localeChange.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.locale = this.i18n.getLocaleData('Table');
      this.cdr.markForCheck();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { nzScroll, nzPageIndex, nzPageSize, nzFrontPagination, nzData, nzWidthConfig } = changes;
    if (nzScroll) {
      if (nzScroll.currentValue) {
        this.nzScroll = nzScroll.currentValue;
      } else {
        this.nzScroll = { x: null, y: null };
      }
      this.nzTableService.isFixedHeader$.next(!!this.nzScroll.y);
    }
    if (nzWidthConfig) {
      this.widthConfig$.next(this.nzWidthConfig);
    }
    if (nzPageIndex || nzPageSize || nzFrontPagination || nzData) {
      this.updateFrontPaginationDataIfNeeded(!!(nzPageSize || nzData));
    }
  }

  ngAfterViewInit(): void {
    if (this.nzTableInnerScrollComponent && this.nzTableInnerScrollComponent.cdkVirtualScrollViewport) {
      this.cdkVirtualScrollViewport = this.nzTableInnerScrollComponent.cdkVirtualScrollViewport;
    }
  }

  ngAfterContentInit(): void {
    combineLatest([this.widthConfig$, this.nzTableService.listOfColumnWidth$]).subscribe(([widthConfig, listOfWidth]) => {
      if (widthConfig.length) {
        this.listOfColWidth = widthConfig;
      } else {
        this.listOfColWidth = listOfWidth;
      }
      this.cdr.markForCheck();
    });
    this.nzTableService.listOfAutoWidth$.pipe(takeUntil(this.destroy$)).subscribe(data => {
      this.listOfColWidth = data;
      this.cdr.markForCheck();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
