/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Platform } from '@angular/cdk/platform';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  Renderer2,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { fromEvent, merge, EMPTY, Subject } from 'rxjs';
import { flatMap, startWith, takeUntil } from 'rxjs/operators';

import { InputBoolean, InputNumber, NzMeasureScrollbarService, NzSizeMDSType } from 'ng-zorro-antd/core';
import { NzI18nService } from 'ng-zorro-antd/i18n';

import { NzThComponent } from './nz-th.component';
import { NzTheadComponent } from './nz-thead.component';
import { NzVirtualScrollDirective } from './nz-virtual-scroll.directive';

@Component({
  selector: 'nz-table',
  exportAs: 'nzTable',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './nz-table.component.html',
  host: {
    '[class.ant-table-empty]': 'data.length === 0'
  },
  styles: [
    `
      nz-table {
        display: block;
      }
    `
  ]
})
// tslint:disable-next-line no-any
export class NzTableComponent<T = any> implements OnInit, AfterViewInit, OnDestroy, OnChanges, AfterContentInit {
  /** public data for ngFor tr */
  data: T[] = [];
  locale: any = {}; // tslint:disable-line:no-any
  nzTheadComponent: NzTheadComponent;
  lastScrollLeft = 0;
  headerBottomStyle = {};
  private destroy$ = new Subject<void>();
  @ContentChildren(NzThComponent, { descendants: true }) listOfNzThComponent: QueryList<NzThComponent>;
  @ViewChild('tableHeaderElement', { read: ElementRef }) tableHeaderElement: ElementRef;
  @ViewChild('tableBodyElement', { read: ElementRef }) tableBodyElement: ElementRef;
  @ViewChild('tableMainElement', { read: ElementRef }) tableMainElement: ElementRef;
  @ViewChild(CdkVirtualScrollViewport, { read: ElementRef }) cdkVirtualScrollElement: ElementRef;
  @ViewChild(CdkVirtualScrollViewport, { read: CdkVirtualScrollViewport })
  cdkVirtualScrollViewport: CdkVirtualScrollViewport;
  @ContentChild(NzVirtualScrollDirective) nzVirtualScrollDirective: NzVirtualScrollDirective;
  @Input() nzSize: NzSizeMDSType = 'default';
  @Input() nzShowTotal: TemplateRef<{ $implicit: number; range: [number, number] }>;
  @Input() nzPageSizeOptions = [10, 20, 30, 40, 50];
  @Input() @InputBoolean() nzVirtualScroll = false;
  @Input() @InputNumber() nzVirtualItemSize = 0;
  @Input() @InputNumber() nzVirtualMaxBufferPx = 200;
  @Input() @InputNumber() nzVirtualMinBufferPx = 100;
  @Input() nzLoadingDelay = 0;
  @Input() nzLoadingIndicator: TemplateRef<void>;
  @Input() nzTotal = 0;
  @Input() nzTitle: string | TemplateRef<void>;
  @Input() nzFooter: string | TemplateRef<void>;
  @Input() nzNoResult: string | TemplateRef<void>;
  @Input() nzWidthConfig: string[] = [];
  @Input() nzPageIndex = 1;
  @Input() nzPageSize = 10;
  @Input() nzData: T[] = [];
  @Input() nzPaginationPosition: 'top' | 'bottom' | 'both' = 'bottom';
  @Input() nzScroll: { x?: string | null; y?: string | null } = { x: null, y: null };
  @Input() @ViewChild('renderItemTemplate') nzItemRender: TemplateRef<{
    $implicit: 'page' | 'prev' | 'next';
    page: number;
  }>;
  @Input() @InputBoolean() nzFrontPagination = true;
  @Input() @InputBoolean() nzTemplateMode = false;
  @Input() @InputBoolean() nzBordered = false;
  @Input() @InputBoolean() nzShowPagination = true;
  @Input() @InputBoolean() nzLoading = false;
  @Input() @InputBoolean() nzShowSizeChanger = false;
  @Input() @InputBoolean() nzHideOnSinglePage = false;
  @Input() @InputBoolean() nzShowQuickJumper = false;
  @Input() @InputBoolean() nzSimple = false;
  @Output() readonly nzPageSizeChange: EventEmitter<number> = new EventEmitter();
  @Output() readonly nzPageIndexChange: EventEmitter<number> = new EventEmitter();
  /* tslint:disable-next-line:no-any */
  @Output() readonly nzCurrentPageDataChange: EventEmitter<any[]> = new EventEmitter();

  get tableBodyNativeElement(): HTMLElement {
    return this.tableBodyElement && this.tableBodyElement.nativeElement;
  }

  get tableHeaderNativeElement(): HTMLElement {
    return this.tableHeaderElement && this.tableHeaderElement.nativeElement;
  }

  get cdkVirtualScrollNativeElement(): HTMLElement {
    return this.cdkVirtualScrollElement && this.cdkVirtualScrollElement.nativeElement;
  }

  get mixTableBodyNativeElement(): HTMLElement {
    return this.tableBodyNativeElement || this.cdkVirtualScrollNativeElement;
  }

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

  syncScrollTable(e: MouseEvent): void {
    if (e.currentTarget === e.target) {
      const target = e.target as HTMLElement;
      if (target.scrollLeft !== this.lastScrollLeft && this.nzScroll && this.nzScroll.x) {
        if (target === this.mixTableBodyNativeElement && this.tableHeaderNativeElement) {
          this.tableHeaderNativeElement.scrollLeft = target.scrollLeft;
        } else if (target === this.tableHeaderNativeElement && this.mixTableBodyNativeElement) {
          this.mixTableBodyNativeElement.scrollLeft = target.scrollLeft;
        }
        this.setScrollPositionClassName();
      }
      this.lastScrollLeft = target.scrollLeft;
    }
  }

  setScrollPositionClassName(): void {
    if (this.mixTableBodyNativeElement && this.nzScroll && this.nzScroll.x) {
      if (
        this.mixTableBodyNativeElement.scrollWidth === this.mixTableBodyNativeElement.clientWidth &&
        this.mixTableBodyNativeElement.scrollWidth !== 0
      ) {
        this.setScrollName();
      } else if (this.mixTableBodyNativeElement.scrollLeft === 0) {
        this.setScrollName('left');
      } else if (
        this.mixTableBodyNativeElement.scrollWidth ===
        this.mixTableBodyNativeElement.scrollLeft + this.mixTableBodyNativeElement.clientWidth
      ) {
        this.setScrollName('right');
      } else {
        this.setScrollName('middle');
      }
    }
  }

  setScrollName(position?: string): void {
    const prefix = 'ant-table-scroll-position';
    const classList = ['left', 'right', 'middle'];
    classList.forEach(name => {
      this.renderer.removeClass(this.tableMainElement.nativeElement, `${prefix}-${name}`);
    });
    if (position) {
      this.renderer.addClass(this.tableMainElement.nativeElement, `${prefix}-${position}`);
    }
  }

  fitScrollBar(): void {
    const scrollbarWidth = this.nzMeasureScrollbarService.scrollBarWidth;
    if (scrollbarWidth) {
      this.headerBottomStyle = {
        marginBottom: `-${scrollbarWidth}px`,
        paddingBottom: `0px`
      };
      this.cdr.markForCheck();
    }
  }

  updateFrontPaginationDataIfNeeded(isPageSizeOrDataChange: boolean = false): void {
    let data: any[] = []; // tslint:disable-line:no-any
    if (this.nzFrontPagination) {
      this.nzTotal = this.nzData.length;
      if (isPageSizeOrDataChange) {
        const maxPageIndex = Math.ceil(this.nzData.length / this.nzPageSize) || 1;
        const pageIndex = this.nzPageIndex > maxPageIndex ? maxPageIndex : this.nzPageIndex;
        if (pageIndex !== this.nzPageIndex) {
          this.nzPageIndex = pageIndex;
          Promise.resolve().then(() => this.nzPageIndexChange.emit(pageIndex));
        }
      }
      data = this.nzData.slice((this.nzPageIndex - 1) * this.nzPageSize, this.nzPageIndex * this.nzPageSize);
    } else {
      data = this.nzData;
    }
    this.data = [...data];
    this.nzCurrentPageDataChange.next(this.data);
  }

  constructor(
    private renderer: Renderer2,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef,
    private nzMeasureScrollbarService: NzMeasureScrollbarService,
    private i18n: NzI18nService,
    private platform: Platform,
    elementRef: ElementRef
  ) {
    renderer.addClass(elementRef.nativeElement, 'ant-table-wrapper');
  }

  ngOnInit(): void {
    this.i18n.localeChange.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.locale = this.i18n.getLocaleData('Table');
      this.cdr.markForCheck();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.nzScroll) {
      if (changes.nzScroll.currentValue) {
        this.nzScroll = changes.nzScroll.currentValue;
      } else {
        this.nzScroll = { x: null, y: null };
      }
      this.setScrollPositionClassName();
    }
    if (changes.nzPageIndex || changes.nzPageSize || changes.nzFrontPagination || changes.nzData) {
      this.updateFrontPaginationDataIfNeeded(!!(changes.nzPageSize || changes.nzData));
    }
  }

  ngAfterViewInit(): void {
    if (!this.platform.isBrowser) {
      return;
    }
    setTimeout(() => this.setScrollPositionClassName());
    this.ngZone.runOutsideAngular(() => {
      merge<MouseEvent>(
        this.tableHeaderNativeElement ? fromEvent<MouseEvent>(this.tableHeaderNativeElement, 'scroll') : EMPTY,
        this.mixTableBodyNativeElement ? fromEvent<MouseEvent>(this.mixTableBodyNativeElement, 'scroll') : EMPTY
      )
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: MouseEvent) => {
          this.syncScrollTable(data);
        });
      fromEvent<UIEvent>(window, 'resize')
        .pipe(
          startWith(true),
          takeUntil(this.destroy$)
        )
        .subscribe(() => {
          this.fitScrollBar();
          this.setScrollPositionClassName();
        });
    });
  }

  ngAfterContentInit(): void {
    this.listOfNzThComponent.changes
      .pipe(
        startWith(true),
        flatMap(() =>
          merge(this.listOfNzThComponent.changes, ...this.listOfNzThComponent.map(th => th.nzWidthChange$))
        ),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.cdr.markForCheck();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
