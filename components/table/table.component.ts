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
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
  TrackByFunction,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { InputBoolean, NzConfigService, WithConfig } from 'ng-zorro-antd/core';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzI18nService } from 'ng-zorro-antd/i18n';
import { PaginationItemRenderContext } from 'ng-zorro-antd/pagination';
import { BehaviorSubject, combineLatest, merge, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { NzTableInnerScrollComponent } from './table-inner-scroll.component';
import { NzTableVirtualScrollDirective } from './table-virtual-scroll.directive';
import { NzTableService } from './table.service';
import { NzTableDataType, NzTableLayoutType, NzTablePaginationPositionType, NzTableSizeType } from './table.types';

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
        [class.ant-table-has-fix-left]="hasFixLeft"
        [class.ant-table-has-fix-right]="hasFixRight"
        [class.ant-table-bordered]="nzBordered"
        [class.ant-table-middle]="nzSize === 'middle'"
        [class.ant-table-small]="nzSize === 'small'"
      >
        <nz-table-title-footer [title]="nzTitle" *ngIf="nzTitle"></nz-table-title-footer>
        <nz-table-inner-default
          *ngIf="!nzScroll.y && !nzScroll.x"
          [tableLayout]="nzTableLayout"
          [listOfColWidth]="listOfColWidth"
          [theadTemplate]="theadTemplate"
          [contentTemplate]="contentTemplate"
        ></nz-table-inner-default>
        <nz-table-inner-scroll
          *ngIf="nzScroll.y || nzScroll.x"
          [data]="data"
          [scroll]="nzScroll"
          [contentTemplate]="contentTemplate"
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
          <nz-embed-empty nzComponentName="table" [specificContent]="nzNoResult"></nz-embed-empty>
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
        (nzPageSizeChange)="onPageSizeChange($event)"
        (nzPageIndexChange)="onPageIndexChange($event)"
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
  @Input() nzTableLayout: NzTableLayoutType = 'auto';
  @Input() nzShowTotal: TemplateRef<{ $implicit: number; range: [number, number] }> | null = null;
  @Input() nzItemRender: TemplateRef<PaginationItemRenderContext> | null = null;
  @Input() nzLoadingIndicator: TemplateRef<NzSafeAny> | null = null;
  @Input() nzTitle: string | TemplateRef<NzSafeAny> | null = null;
  @Input() nzFooter: string | TemplateRef<NzSafeAny> | null = null;
  @Input() nzNoResult: string | TemplateRef<NzSafeAny> | undefined = undefined;
  @Input() nzPageSizeOptions = [10, 20, 30, 40, 50];
  @Input() nzVirtualItemSize = 0;
  @Input() nzVirtualMaxBufferPx = 200;
  @Input() nzVirtualMinBufferPx = 100;
  @Input() nzVirtualForTrackBy: TrackByFunction<NzTableDataType> = index => index;
  @Input() nzLoadingDelay = 0;
  @Input() nzWidthConfig: string[] = [];
  @Input() nzPageIndex = 1;
  @Input() nzPageSize = 10;
  @Input() nzTotal = 0;
  @Input() nzData: NzTableDataType[] = [];
  @Input() nzPaginationPosition: NzTablePaginationPositionType = 'bottom';
  @Input() nzScroll: { x?: string | null; y?: string | null } = { x: null, y: null };
  @Input() @InputBoolean() nzFrontPagination = true;
  @Input() @InputBoolean() nzTemplateMode = false;
  @Input() @InputBoolean() nzShowPagination = true;
  @Input() @InputBoolean() nzLoading = false;
  @Input() @WithConfig(NZ_CONFIG_COMPONENT_NAME, false) @InputBoolean() nzBordered: boolean;
  @Input() @WithConfig(NZ_CONFIG_COMPONENT_NAME, 'default') nzSize: NzTableSizeType;
  @Input() @WithConfig(NZ_CONFIG_COMPONENT_NAME, false) @InputBoolean() nzShowSizeChanger: boolean;
  @Input() @WithConfig(NZ_CONFIG_COMPONENT_NAME, false) @InputBoolean() nzHideOnSinglePage: boolean;
  @Input() @WithConfig(NZ_CONFIG_COMPONENT_NAME, false) @InputBoolean() nzShowQuickJumper: boolean;
  @Input() @WithConfig(NZ_CONFIG_COMPONENT_NAME, false) @InputBoolean() nzSimple: boolean;
  @Output() readonly nzPageSizeChange: EventEmitter<number> = new EventEmitter();
  @Output() readonly nzPageIndexChange: EventEmitter<number> = new EventEmitter();
  @Output() readonly nzCurrentPageDataChange: EventEmitter<NzSafeAny[]> = new EventEmitter();

  /** public data for ngFor tr */
  public data: NzTableDataType[] = [];
  public cdkVirtualScrollViewport: CdkVirtualScrollViewport;
  locale: NzSafeAny = {};
  theadTemplate: TemplateRef<NzSafeAny> | null = null;
  listOfColWidth: string[] = [];
  hasFixLeft = false;
  hasFixRight = false;
  private destroy$ = new Subject<void>();
  private widthConfig$ = new BehaviorSubject<string[]>([]);
  @ContentChild(NzTableVirtualScrollDirective, { static: false })
  nzVirtualScrollDirective: NzTableVirtualScrollDirective;
  @ViewChild(NzTableInnerScrollComponent) nzTableInnerScrollComponent: NzTableInnerScrollComponent;

  onPageSizeChange(size: number): void {
    if (size !== this.nzPageSize) {
      this.nzPageSize = size;
      this.nzPageSizeChange.emit(this.nzPageSize);
      this.updateFrontPaginationDataIfNeeded(true);
    }
  }

  onPageIndexChange(index: number): void {
    if (index !== this.nzPageIndex) {
      this.nzPageIndex = index;
      this.nzPageIndexChange.emit(this.nzPageIndex);
      this.updateFrontPaginationDataIfNeeded(false);
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

  setHasFixLeft(hasFixLeft: boolean): void {
    this.hasFixLeft = hasFixLeft;
    this.cdr.markForCheck();
  }

  setHasFixRight(hasFixRight: boolean): void {
    this.hasFixRight = hasFixRight;
    this.cdr.markForCheck();
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
      this.nzTableService.setFixHeader(!!(this.nzScroll.y || this.nzScroll.x));
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
    const manualWidthConfig$ = combineLatest([this.widthConfig$, this.nzTableService.listOfThWidthConfig$]).pipe(
      map(([widthConfig, listOfWidth]) => (widthConfig.length ? widthConfig : listOfWidth))
    );
    const autoWidthConfig$ = this.nzTableService.listOfAutoWidth$.pipe(map(list => list.map(width => `${width}px`)));
    merge(autoWidthConfig$, manualWidthConfig$)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.listOfColWidth = data;
        this.cdr.markForCheck();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
