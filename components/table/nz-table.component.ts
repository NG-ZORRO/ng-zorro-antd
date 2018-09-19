import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  Renderer2,
  TemplateRef,
  ViewChild
} from '@angular/core';

import { fromEvent, merge, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { NzMeasureScrollbarService } from '../core/services/nz-measure-scrollbar.service';
import { isNotNil } from '../core/util/check';
import { toBoolean } from '../core/util/convert';
import { NzI18nService } from '../i18n/nz-i18n.service';

import { NzThComponent } from './nz-th.component';
import { NzTheadComponent } from './nz-thead.component';

@Component({
  selector           : 'nz-table',
  preserveWhitespaces: false,
  templateUrl        : './nz-table.component.html'
})
export class NzTableComponent implements OnInit, AfterViewInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  private _bordered = false;
  private _showPagination = true;
  private _loading = false;
  private _showSizeChanger = false;
  private _showQuickJumper = false;
  private _hideOnSinglePage = false;
  private _scroll: { x: string; y: string } = { x: null, y: null };
  private _footer: string | TemplateRef<void>;
  private _title: string | TemplateRef<void>;
  private _noResult: string | TemplateRef<void>;
  private _pageIndex = 1;
  private _pageSize = 10;
  private _widthConfig: string[] = [];
  private _frontPagination = true;
  private _simple = false;
  /* tslint:disable-next-line:no-any */
  locale: any = {};
  nzTheadComponent: NzTheadComponent;
  isFooterString: boolean;
  isTitleString: boolean;
  isNoResultString: boolean;
  el: HTMLElement;
  lastScrollLeft = 0;
  /* tslint:disable-next-line:no-any */
  rawData: any[] = [];
  /* tslint:disable-next-line:no-any */
  syncData: any[] = [];
  /** public data for ngFor tr */
  /* tslint:disable-next-line:no-any */
  data: any[] = [];
  headerBottomStyle;
  isWidthConfigSet = false;
  @ViewChild('tableHeaderElement') tableHeaderElement: ElementRef;
  @ViewChild('tableBodyElement') tableBodyElement: ElementRef;
  @ViewChild('tableMainElement') tableMainElement: ElementRef;
  @ContentChildren(NzThComponent, { descendants: true }) listOfNzThComponent: QueryList<NzThComponent>;

  @Output() nzPageSizeChange: EventEmitter<number> = new EventEmitter();
  @Output() nzPageIndexChange: EventEmitter<number> = new EventEmitter();
  @Input() nzShowTotal: TemplateRef<{ $implicit: number, range: [ number, number ] }>;

  /* tslint:disable-next-line:no-any */
  @Output() nzCurrentPageDataChange: EventEmitter<any[]> = new EventEmitter();
  @Input() nzSize: string = 'default';
  /** page size changer select values */
  @Input() nzPageSizeOptions = [ 10, 20, 30, 40, 50 ];
  @Input() nzLoadingDelay = 0;
  @Input() nzTotal: number;

  @Input()
  set nzSimple(value: boolean) {
    this._simple = toBoolean(value);
  }

  get nzSimple(): boolean {
    return this._simple;
  }

  @Input()
  set nzFrontPagination(value: boolean) {
    this._frontPagination = toBoolean(value);
    this.parseInputData();
  }

  get nzFrontPagination(): boolean {
    return this._frontPagination;
  }

  @Input()
  set nzWidthConfig(value: string[]) {
    this.isWidthConfigSet = true;
    this._widthConfig = value;
  }

  get nzWidthConfig(): string[] {
    return this._widthConfig;
  }

  @Input()
  set nzTitle(value: string | TemplateRef<void>) {
    this.isTitleString = !(value instanceof TemplateRef);
    this._title = value;
  }

  get nzTitle(): string | TemplateRef<void> {
    return this._title;
  }

  @Input()
  set nzFooter(value: string | TemplateRef<void>) {
    this.isFooterString = !(value instanceof TemplateRef);
    this._footer = value;
  }

  get nzFooter(): string | TemplateRef<void> {
    return this._footer;
  }

  @Input()
  set nzNoResult(value: string | TemplateRef<void>) {
    this.isNoResultString = !(value instanceof TemplateRef);
    this._noResult = value;
  }

  get nzNoResult(): string | TemplateRef<void> {
    return this._noResult;
  }

  @Input()
  set nzBordered(value: boolean) {
    this._bordered = toBoolean(value);
  }

  get nzBordered(): boolean {
    return this._bordered;
  }

  @Input()
  set nzShowPagination(value: boolean) {
    this._showPagination = toBoolean(value);
  }

  get nzShowPagination(): boolean {
    return this._showPagination;
  }

  @Input()
  set nzLoading(value: boolean) {
    this._loading = toBoolean(value);
  }

  get nzLoading(): boolean {
    return this._loading;
  }

  @Input()
  set nzShowSizeChanger(value: boolean) {
    this._showSizeChanger = toBoolean(value);
  }

  get nzShowSizeChanger(): boolean {
    return this._showSizeChanger;
  }

  @Input()
  set nzHideOnSinglePage(value: boolean) {
    this._hideOnSinglePage = toBoolean(value);
  }

  get nzHideOnSinglePage(): boolean {
    return this._hideOnSinglePage;
  }

  @Input()
  set nzShowQuickJumper(value: boolean) {
    this._showQuickJumper = toBoolean(value);
  }

  get nzShowQuickJumper(): boolean {
    return this._showQuickJumper;
  }

  @Input()
  set nzScroll(value: { x: string; y: string }) {
    if (isNotNil(value)) {
      this._scroll = value;
    } else {
      this._scroll = { x: null, y: null };
    }
    this.cdr.detectChanges();
    this.setScrollPositionClassName();
  }

  get nzScroll(): { x: string; y: string } {
    return this._scroll;
  }

  @Input()
  /* tslint:disable-next-line:no-any */
  set nzData(data: any[]) {
    if (Array.isArray(data)) {
      this.rawData = data;
      this.parseInputData();
    } else {
      console.warn('nzData only accept array');
    }
  }

  parseInputData(): void {
    if (this.nzFrontPagination) {
      this.syncData = this.rawData;
      this.nzTotal = this.syncData.length;
      this.checkPageIndexBounding();
      this.generateSyncDisplayData();
    } else {
      this.data = this.rawData;
      this.nzCurrentPageDataChange.emit(this.data);
    }
  }

  @Input()
  set nzPageIndex(value: number) {
    if (this._pageIndex === value) {
      return;
    }
    this._pageIndex = value;
    if (this.nzFrontPagination) {
      this.generateSyncDisplayData();
    }
  }

  get nzPageIndex(): number {
    return this._pageIndex;
  }

  emitPageIndex(index: number): void {
    this.nzPageIndex = index;
    this.nzPageIndexChange.emit(this.nzPageIndex);
  }

  emitPageSize(size: number): void {
    this.nzPageSize = size;
    this.nzPageSizeChange.emit(this.nzPageSize);
  }

  @Input()
  set nzPageSize(value: number) {
    if (this._pageSize === value) {
      return;
    }
    this._pageSize = value;
    if (this.nzFrontPagination) {
      this.checkPageIndexBounding();
      this.generateSyncDisplayData();
    }
  }

  get nzPageSize(): number {
    return this._pageSize;
  }

  checkPageIndexBounding(): void {
    if (this.nzFrontPagination) {
      const maxPageIndex = Math.ceil(this.syncData.length / this.nzPageSize);
      const pageIndex = !this.nzPageIndex ? 1 : (this.nzPageIndex > maxPageIndex ? maxPageIndex : this.nzPageIndex);
      if (pageIndex !== this.nzPageIndex) {
        this._pageIndex = pageIndex;
        Promise.resolve().then(() => this.nzPageIndexChange.emit(pageIndex));
      }
    }
  }

  generateSyncDisplayData(): void {
    this.data = this.syncData.slice((this.nzPageIndex - 1) * this.nzPageSize, this.nzPageIndex * this.nzPageSize);
    this.nzCurrentPageDataChange.emit(this.data);
  }

  syncScrollTable(e: MouseEvent): void {
    if (e.currentTarget === e.target) {
      const target = e.target as HTMLElement;
      if (target.scrollLeft !== this.lastScrollLeft && this.nzScroll && this.nzScroll.x) {
        if (target === this.tableBodyElement.nativeElement && this.tableHeaderElement) {
          this.tableHeaderElement.nativeElement.scrollLeft = target.scrollLeft;
        } else if (target === this.tableHeaderElement.nativeElement && this.tableBodyElement) {
          this.tableBodyElement.nativeElement.scrollLeft = target.scrollLeft;
        }
        this.setScrollPositionClassName();
      }
      this.lastScrollLeft = target.scrollLeft;
    }
  }

  setScrollPositionClassName(): void {
    if (this.tableBodyElement && this.nzScroll && this.nzScroll.x) {
      if ((this.tableBodyElement.nativeElement.scrollWidth === this.tableBodyElement.nativeElement.clientWidth) && (this.tableBodyElement.nativeElement.scrollWidth !== 0)) {
        this.setScrollName();
      } else if (this.tableBodyElement.nativeElement.scrollLeft === 0) {
        this.setScrollName('left');
      } else if (this.tableBodyElement.nativeElement.scrollWidth === (this.tableBodyElement.nativeElement.scrollLeft + this.tableBodyElement.nativeElement.clientWidth)) {
        this.setScrollName('right');
      } else {
        this.setScrollName('middle');
      }
    }
  }

  setScrollName(position?: string): void {
    const prefix = 'ant-table-scroll-position';
    const classList = [ 'left', 'right', 'middle' ];
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
        marginBottom : `-${scrollbarWidth}px`,
        paddingBottom: `0px`
      };
    }
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    this.fitScrollBar();
    this.setScrollPositionClassName();
  }

  ngOnInit(): void {
    this.i18n.localeChange.pipe(takeUntil(this.unsubscribe$)).subscribe(() => this.locale = this.i18n.getLocaleData('Table'));
    this.fitScrollBar();
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.setScrollPositionClassName());
    this.ngZone.runOutsideAngular(() => {
      if (this.tableHeaderElement
        && this.tableHeaderElement.nativeElement
        && this.tableBodyElement
        && this.tableBodyElement.nativeElement) {
        merge(
          fromEvent(this.tableHeaderElement.nativeElement, 'scroll'),
          fromEvent(this.tableBodyElement.nativeElement, 'scroll')
        ).pipe(takeUntil(this.unsubscribe$)).subscribe((data: MouseEvent) => {
          this.syncScrollTable(data);
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  constructor(private renderer: Renderer2, private ngZone: NgZone, private elementRef: ElementRef, private cdr: ChangeDetectorRef, private nzMeasureScrollbarService: NzMeasureScrollbarService, private i18n: NzI18nService) {
    this.el = this.elementRef.nativeElement;
  }
}
