/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Direction, Directionality } from '@angular/cdk/bidi';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { NgTemplateOutlet } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  SimpleChanges,
  TemplateRef,
  TrackByFunction,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';

import { NzResizeObserver } from 'ng-zorro-antd/cdk/resize-observer';
import { NzConfigKey, NzConfigService, WithConfig } from 'ng-zorro-antd/core/config';
import { BooleanInput, NzSafeAny } from 'ng-zorro-antd/core/types';
import { InputBoolean, measureScrollbar } from 'ng-zorro-antd/core/util';
import { NzPaginationModule, PaginationItemRenderContext } from 'ng-zorro-antd/pagination';
import { NzSpinComponent } from 'ng-zorro-antd/spin';

import { NzTableDataService } from '../table-data.service';
import { NzTableStyleService } from '../table-style.service';
import {
  NzCustomColumn,
  NzTableLayout,
  NzTablePaginationPosition,
  NzTablePaginationType,
  NzTableQueryParams,
  NzTableSize
} from '../table.types';
import { NzTableInnerDefaultComponent } from './table-inner-default.component';
import { NzTableInnerScrollComponent } from './table-inner-scroll.component';
import { NzTableVirtualScrollDirective } from './table-virtual-scroll.directive';
import { NzTableTitleFooterComponent } from './title-footer.component';

const NZ_CONFIG_MODULE_NAME: NzConfigKey = 'table';

@Component({
  selector: 'nz-table',
  exportAs: 'nzTable',
  providers: [NzTableStyleService, NzTableDataService],
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <nz-spin [nzDelay]="nzLoadingDelay" [nzSpinning]="nzLoading" [nzIndicator]="nzLoadingIndicator">
      @if (nzPaginationPosition === 'both' || nzPaginationPosition === 'top') {
        <ng-template [ngTemplateOutlet]="paginationTemplate"></ng-template>
      }
      <div
        #tableMainElement
        class="ant-table"
        [class.ant-table-rtl]="dir === 'rtl'"
        [class.ant-table-fixed-header]="nzData.length && scrollY"
        [class.ant-table-fixed-column]="scrollX"
        [class.ant-table-has-fix-left]="hasFixLeft"
        [class.ant-table-has-fix-right]="hasFixRight"
        [class.ant-table-bordered]="nzBordered"
        [class.nz-table-out-bordered]="nzOuterBordered && !nzBordered"
        [class.ant-table-middle]="nzSize === 'middle'"
        [class.ant-table-small]="nzSize === 'small'"
      >
        @if (nzTitle) {
          <nz-table-title-footer [title]="nzTitle"></nz-table-title-footer>
        }
        @if (scrollY || scrollX) {
          <nz-table-inner-scroll
            [data]="data"
            [scrollX]="scrollX"
            [scrollY]="scrollY"
            [contentTemplate]="contentTemplate"
            [listOfColWidth]="listOfAutoColWidth"
            [theadTemplate]="theadTemplate"
            [verticalScrollBarWidth]="verticalScrollBarWidth"
            [virtualTemplate]="nzVirtualScrollDirective ? nzVirtualScrollDirective.templateRef : null"
            [virtualItemSize]="nzVirtualItemSize"
            [virtualMaxBufferPx]="nzVirtualMaxBufferPx"
            [virtualMinBufferPx]="nzVirtualMinBufferPx"
            [tableMainElement]="tableMainElement"
            [virtualForTrackBy]="nzVirtualForTrackBy"
          ></nz-table-inner-scroll>
        } @else {
          <nz-table-inner-default
            [tableLayout]="nzTableLayout"
            [listOfColWidth]="listOfManualColWidth"
            [theadTemplate]="theadTemplate"
            [contentTemplate]="contentTemplate"
          ></nz-table-inner-default>
        }
        @if (nzFooter) {
          <nz-table-title-footer [footer]="nzFooter"></nz-table-title-footer>
        }
      </div>
      @if (nzPaginationPosition === 'both' || nzPaginationPosition === 'bottom') {
        <ng-template [ngTemplateOutlet]="paginationTemplate"></ng-template>
      }
    </nz-spin>
    <ng-template #paginationTemplate>
      @if (nzShowPagination && data.length) {
        <nz-pagination
          [hidden]="!showPagination"
          class="ant-table-pagination ant-table-pagination-right"
          [nzShowSizeChanger]="nzShowSizeChanger"
          [nzPageSizeOptions]="nzPageSizeOptions"
          [nzItemRender]="nzItemRender!"
          [nzShowQuickJumper]="nzShowQuickJumper"
          [nzHideOnSinglePage]="nzHideOnSinglePage"
          [nzShowTotal]="nzShowTotal"
          [nzSize]="nzPaginationType === 'small' ? 'small' : nzSize === 'default' ? 'default' : 'small'"
          [nzPageSize]="nzPageSize"
          [nzTotal]="nzTotal"
          [nzSimple]="nzSimple"
          [nzPageIndex]="nzPageIndex"
          (nzPageSizeChange)="onPageSizeChange($event)"
          (nzPageIndexChange)="onPageIndexChange($event)"
        ></nz-pagination>
      }
    </ng-template>
    <ng-template #contentTemplate>
      <ng-content></ng-content>
    </ng-template>
  `,
  host: {
    class: 'ant-table-wrapper',
    '[class.ant-table-wrapper-rtl]': 'dir === "rtl"',
    '[class.ant-table-custom-column]': `nzCustomColumn.length`
  },
  imports: [
    NzSpinComponent,
    NgTemplateOutlet,
    NzTableTitleFooterComponent,
    NzTableInnerScrollComponent,
    NzTableInnerDefaultComponent,
    NzPaginationModule
  ],
  standalone: true
})
export class NzTableComponent<T> implements OnInit, OnDestroy, OnChanges, AfterViewInit {
  readonly _nzModuleName: NzConfigKey = NZ_CONFIG_MODULE_NAME;

  static ngAcceptInputType_nzFrontPagination: BooleanInput;
  static ngAcceptInputType_nzTemplateMode: BooleanInput;
  static ngAcceptInputType_nzShowPagination: BooleanInput;
  static ngAcceptInputType_nzLoading: BooleanInput;
  static ngAcceptInputType_nzBordered: BooleanInput;
  static ngAcceptInputType_nzOuterBordered: BooleanInput;
  static ngAcceptInputType_nzShowSizeChanger: BooleanInput;
  static ngAcceptInputType_nzHideOnSinglePage: BooleanInput;
  static ngAcceptInputType_nzShowQuickJumper: BooleanInput;
  static ngAcceptInputType_nzSimple: BooleanInput;

  @Input() nzTableLayout: NzTableLayout = 'auto';
  @Input() nzShowTotal: TemplateRef<{ $implicit: number; range: [number, number] }> | null = null;
  @Input() nzItemRender: TemplateRef<PaginationItemRenderContext> | null = null;
  @Input() nzTitle: string | TemplateRef<NzSafeAny> | null = null;
  @Input() nzFooter: string | TemplateRef<NzSafeAny> | null = null;
  @Input() nzNoResult: string | TemplateRef<NzSafeAny> | undefined = undefined;
  @Input() nzPageSizeOptions = [10, 20, 30, 40, 50];
  @Input() nzVirtualItemSize = 0;
  @Input() nzVirtualMaxBufferPx = 200;
  @Input() nzVirtualMinBufferPx = 100;
  @Input() nzVirtualForTrackBy: TrackByFunction<T> = index => index;
  @Input() nzLoadingDelay = 0;
  @Input() nzPageIndex = 1;
  @Input() nzPageSize = 10;
  @Input() nzTotal = 0;
  @Input() nzWidthConfig: ReadonlyArray<string | null> = [];
  @Input() nzData: readonly T[] = [];
  @Input() nzCustomColumn: NzCustomColumn[] = [];

  @Input() nzPaginationPosition: NzTablePaginationPosition = 'bottom';
  @Input() nzScroll: { x?: string | null; y?: string | null } = { x: null, y: null };
  @Input() nzPaginationType: NzTablePaginationType = 'default';
  @Input() @InputBoolean() nzFrontPagination = true;
  @Input() @InputBoolean() nzTemplateMode = false;
  @Input() @InputBoolean() nzShowPagination = true;
  @Input() @InputBoolean() nzLoading = false;
  @Input() @InputBoolean() nzOuterBordered = false;
  @Input() @WithConfig() nzLoadingIndicator: TemplateRef<NzSafeAny> | null = null;
  @Input() @WithConfig() @InputBoolean() nzBordered: boolean = false;
  @Input() @WithConfig() nzSize: NzTableSize = 'default';
  @Input() @WithConfig() @InputBoolean() nzShowSizeChanger: boolean = false;
  @Input() @WithConfig() @InputBoolean() nzHideOnSinglePage: boolean = false;
  @Input() @WithConfig() @InputBoolean() nzShowQuickJumper: boolean = false;
  @Input() @WithConfig() @InputBoolean() nzSimple: boolean = false;
  @Output() readonly nzPageSizeChange = new EventEmitter<number>();
  @Output() readonly nzPageIndexChange = new EventEmitter<number>();
  @Output() readonly nzQueryParams = new EventEmitter<NzTableQueryParams>();
  @Output() readonly nzCurrentPageDataChange = new EventEmitter<readonly T[]>();
  @Output() readonly nzCustomColumnChange = new EventEmitter<readonly NzCustomColumn[]>();

  /** public data for ngFor tr */
  public data: readonly T[] = [];
  public cdkVirtualScrollViewport?: CdkVirtualScrollViewport;
  scrollX: string | null = null;
  scrollY: string | null = null;
  theadTemplate: TemplateRef<NzSafeAny> | null = null;
  listOfAutoColWidth: ReadonlyArray<string | null> = [];
  listOfManualColWidth: ReadonlyArray<string | null> = [];
  hasFixLeft = false;
  hasFixRight = false;
  showPagination = true;
  private destroy$ = new Subject<void>();
  private templateMode$ = new BehaviorSubject<boolean>(false);
  dir: Direction = 'ltr';
  @ContentChild(NzTableVirtualScrollDirective, { static: false })
  nzVirtualScrollDirective!: NzTableVirtualScrollDirective<T>;
  @ViewChild(NzTableInnerScrollComponent) nzTableInnerScrollComponent!: NzTableInnerScrollComponent<T>;
  verticalScrollBarWidth = 0;
  onPageSizeChange(size: number): void {
    this.nzTableDataService.updatePageSize(size);
  }

  onPageIndexChange(index: number): void {
    this.nzTableDataService.updatePageIndex(index);
  }

  constructor(
    private elementRef: ElementRef,
    private nzResizeObserver: NzResizeObserver,
    private nzConfigService: NzConfigService,
    private cdr: ChangeDetectorRef,
    private nzTableStyleService: NzTableStyleService,
    private nzTableDataService: NzTableDataService<T>,
    @Optional() private directionality: Directionality
  ) {
    this.nzConfigService
      .getConfigChangeEventForComponent(NZ_CONFIG_MODULE_NAME)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.cdr.markForCheck();
      });
  }

  ngOnInit(): void {
    const { pageIndexDistinct$, pageSizeDistinct$, listOfCurrentPageData$, total$, queryParams$, listOfCustomColumn$ } =
      this.nzTableDataService;
    const { theadTemplate$, hasFixLeft$, hasFixRight$ } = this.nzTableStyleService;

    this.dir = this.directionality.value;
    this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction: Direction) => {
      this.dir = direction;
      this.cdr.detectChanges();
    });

    queryParams$.pipe(takeUntil(this.destroy$)).subscribe(this.nzQueryParams);
    pageIndexDistinct$.pipe(takeUntil(this.destroy$)).subscribe(pageIndex => {
      if (pageIndex !== this.nzPageIndex) {
        this.nzPageIndex = pageIndex;
        this.nzPageIndexChange.next(pageIndex);
      }
    });
    pageSizeDistinct$.pipe(takeUntil(this.destroy$)).subscribe(pageSize => {
      if (pageSize !== this.nzPageSize) {
        this.nzPageSize = pageSize;
        this.nzPageSizeChange.next(pageSize);
      }
    });
    total$
      .pipe(
        takeUntil(this.destroy$),
        filter(() => this.nzFrontPagination)
      )
      .subscribe(total => {
        if (total !== this.nzTotal) {
          this.nzTotal = total;
          this.cdr.markForCheck();
        }
      });
    listOfCurrentPageData$.pipe(takeUntil(this.destroy$)).subscribe(data => {
      this.data = data;
      this.nzCurrentPageDataChange.next(data);
      this.cdr.markForCheck();
    });

    listOfCustomColumn$.pipe(takeUntil(this.destroy$)).subscribe(data => {
      this.nzCustomColumn = data;
      this.nzCustomColumnChange.next(data);
      this.cdr.markForCheck();
    });

    theadTemplate$.pipe(takeUntil(this.destroy$)).subscribe(theadTemplate => {
      this.theadTemplate = theadTemplate;
      this.cdr.markForCheck();
    });

    hasFixLeft$.pipe(takeUntil(this.destroy$)).subscribe(hasFixLeft => {
      this.hasFixLeft = hasFixLeft;
      this.cdr.markForCheck();
    });

    hasFixRight$.pipe(takeUntil(this.destroy$)).subscribe(hasFixRight => {
      this.hasFixRight = hasFixRight;
      this.cdr.markForCheck();
    });

    combineLatest([total$, this.templateMode$])
      .pipe(
        map(([total, templateMode]) => total === 0 && !templateMode),
        takeUntil(this.destroy$)
      )
      .subscribe(empty => {
        this.nzTableStyleService.setShowEmpty(empty);
      });

    this.verticalScrollBarWidth = measureScrollbar('vertical');
    this.nzTableStyleService.listOfListOfThWidthPx$.pipe(takeUntil(this.destroy$)).subscribe(listOfWidth => {
      this.listOfAutoColWidth = listOfWidth;
      this.cdr.markForCheck();
    });
    this.nzTableStyleService.manualWidthConfigPx$.pipe(takeUntil(this.destroy$)).subscribe(listOfWidth => {
      this.listOfManualColWidth = listOfWidth;
      this.cdr.markForCheck();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const {
      nzScroll,
      nzPageIndex,
      nzPageSize,
      nzFrontPagination,
      nzData,
      nzCustomColumn,
      nzWidthConfig,
      nzNoResult,
      nzTemplateMode
    } = changes;
    if (nzPageIndex) {
      this.nzTableDataService.updatePageIndex(this.nzPageIndex);
    }
    if (nzPageSize) {
      this.nzTableDataService.updatePageSize(this.nzPageSize);
    }
    if (nzData) {
      this.nzData = this.nzData || [];
      this.nzTableDataService.updateListOfData(this.nzData);
    }
    if (nzCustomColumn) {
      this.nzCustomColumn = this.nzCustomColumn || [];
      this.nzTableDataService.updateListOfCustomColumn(this.nzCustomColumn);
    }
    if (nzFrontPagination) {
      this.nzTableDataService.updateFrontPagination(this.nzFrontPagination);
    }
    if (nzScroll) {
      this.setScrollOnChanges();
    }
    if (nzWidthConfig) {
      this.nzTableStyleService.setTableWidthConfig(this.nzWidthConfig);
    }
    if (nzTemplateMode) {
      this.templateMode$.next(this.nzTemplateMode);
    }
    if (nzNoResult) {
      this.nzTableStyleService.setNoResult(this.nzNoResult);
    }

    this.updateShowPagination();
  }

  ngAfterViewInit(): void {
    this.nzResizeObserver
      .observe(this.elementRef)
      .pipe(
        map(([entry]) => {
          const { width } = entry.target.getBoundingClientRect();
          const scrollBarWidth = this.scrollY ? this.verticalScrollBarWidth : 0;
          return Math.floor(width - scrollBarWidth);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe(this.nzTableStyleService.hostWidth$);
    if (this.nzTableInnerScrollComponent && this.nzTableInnerScrollComponent.cdkVirtualScrollViewport) {
      this.cdkVirtualScrollViewport = this.nzTableInnerScrollComponent.cdkVirtualScrollViewport;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private setScrollOnChanges(): void {
    this.scrollX = (this.nzScroll && this.nzScroll.x) || null;
    this.scrollY = (this.nzScroll && this.nzScroll.y) || null;
    this.nzTableStyleService.setScroll(this.scrollX, this.scrollY);
  }

  private updateShowPagination(): void {
    this.showPagination =
      (this.nzHideOnSinglePage && this.nzData.length > this.nzPageSize) ||
      (this.nzData.length > 0 && !this.nzHideOnSinglePage) ||
      (!this.nzFrontPagination && this.nzTotal > this.nzPageSize);
  }
}
