import { Overlay } from '@angular/cdk/overlay';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  QueryList,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { NzMeasureScrollbarService } from '../core/services/nz-measure-scrollbar.service';
import { isNotNil } from '../core/util/check';

import { toBoolean } from '../core/util/convert';
import { NzThComponent } from './nz-th.component';

import { NzTheadComponent } from './nz-thead.component';

@Component({
  selector           : 'nz-table',
  preserveWhitespaces: false,
  template           : `
    <ng-template #colGroupTemplate>
      <colgroup *ngIf="!isWidthConfigSet">
        <col [style.width]="th.nzWidth" [style.minWidth]="th.nzWidth" *ngFor="let th of listOfNzThComponent">
      </colgroup>
      <colgroup *ngIf="isWidthConfigSet">
        <col [style.width]="width" [style.minWidth]="width" *ngFor="let width of nzWidthConfig">
      </colgroup>
    </ng-template>
    <ng-template #tableInnerTemplate>
      <div
        #tableHeaderElement
        *ngIf="nzScroll.x || nzScroll.y"
        class="ant-table-header"
        (scroll)="syncScrollTable($event)"
        [ngStyle]="headerBottomStyle">
        <table
          [class.ant-table-fixed]="nzScroll.x"
          [style.width]="nzScroll.x">
          <ng-template [ngTemplateOutlet]="colGroupTemplate"></ng-template>
          <thead class="ant-table-thead" *ngIf="nzScroll.y">
            <ng-template [ngTemplateOutlet]="nzTheadComponent?.template"></ng-template>
          </thead>
        </table>
      </div>
      <div
        #tableBodyElement
        class="ant-table-body"
        (scroll)="syncScrollTable($event)"
        [style.maxHeight]="nzScroll.y"
        [style.overflow-y]="nzScroll.y?'scroll':''"
        [style.overflow-x]="nzScroll.x?'auto':''">
        <table [class.ant-table-fixed]="nzScroll.x" [style.width]="nzScroll.x">
          <ng-template [ngTemplateOutlet]="colGroupTemplate"></ng-template>
          <thead class="ant-table-thead" *ngIf="!nzScroll.y">
            <ng-template [ngTemplateOutlet]="nzTheadComponent?.template"></ng-template>
          </thead>
          <ng-content></ng-content>
        </table>
      </div>
      <div class="ant-table-placeholder" *ngIf="(data.length==0)&&!nzLoading">
        <span *ngIf="!nzNoResult">{{ 'Table.emptyText' | nzI18n }}</span>
        <ng-container *ngIf="nzNoResult">
          <ng-container *ngIf="isNoResultString; else noResultTemplate">{{ nzNoResult }}</ng-container>
          <ng-template #noResultTemplate>
            <ng-template [ngTemplateOutlet]="nzNoResult"></ng-template>
          </ng-template>
        </ng-container>
      </div>
      <div class="ant-table-footer" *ngIf="nzFooter">
        <ng-container *ngIf="isFooterString; else footerTemplate">{{ nzFooter }}</ng-container>
        <ng-template #footerTemplate>
          <ng-template [ngTemplateOutlet]="nzFooter"></ng-template>
        </ng-template>
      </div>
    </ng-template>
    <div
      class="ant-table-wrapper"
      [class.ant-table-empty]="data.length==0">
      <nz-spin
        [nzDelay]="nzLoadingDelay"
        [nzSpinning]="nzLoading">
        <div>
          <div
            class="ant-table"
            [class.ant-table-fixed-header]="nzScroll.x || nzScroll.y"
            [class.ant-table-scroll-position-left]="scrollPosition==='left'"
            [class.ant-table-scroll-position-right]="scrollPosition==='right'"
            [class.ant-table-scroll-position-middle]="scrollPosition==='middle'"
            [class.ant-table-bordered]="nzBordered"
            [class.ant-table-large]="nzSize=='default'"
            [class.ant-table-middle]="nzSize=='middle'"
            [class.ant-table-small]="nzSize=='small'">
            <div class="ant-table-title" *ngIf="nzTitle">
              <ng-container *ngIf="isTitleString; else titleTemplate">{{ nzTitle }}</ng-container>
              <ng-template #titleTemplate>
                <ng-template [ngTemplateOutlet]="nzTitle"></ng-template>
              </ng-template>
            </div>
            <div class="ant-table-content">
              <ng-container *ngIf="nzScroll.x || nzScroll.y; else tableInnerTemplate">
                <div class="ant-table-scroll">
                  <ng-template [ngTemplateOutlet]="tableInnerTemplate"></ng-template>
                </div>
              </ng-container>
            </div>
          </div>
        </div>
        <nz-pagination
          *ngIf="nzShowPagination&&data.length"
          [nzInTable]="true"
          [nzShowSizeChanger]="nzShowSizeChanger"
          [nzPageSizeOptions]="nzPageSizeOptions"
          [nzShowQuickJumper]="nzShowQuickJumper"
          [nzShowTotal]="nzShowTotal"
          [nzSize]="(nzSize=='middle'||nzSize=='small')?'small':''"
          [nzPageSize]="nzPageSize"
          (nzPageSizeChange)="emitPageSize($event)"
          [nzTotal]="nzTotal"
          [nzPageIndex]="nzPageIndex"
          (nzPageIndexChange)="emitPageIndex($event)">
        </nz-pagination>
      </nz-spin>
    </div>
  `
})
export class NzTableComponent implements OnInit, AfterViewInit {
  private _bordered = false;
  private _showPagination = true;
  private _loading = false;
  private _showSizeChanger = false;
  private _showQuickJumper = false;
  private _scroll: { x: string; y: string } = { x: null, y: null };
  private _footer: string | TemplateRef<void>;
  private _title: string | TemplateRef<void>;
  private _noResult: string | TemplateRef<void>;
  private _pageIndex = 1;
  private _pageSize = 10;
  private _widthConfig: string[] = [];
  private _frontPagination = true;
  nzTheadComponent: NzTheadComponent;
  isFooterString: boolean;
  isTitleString: boolean;
  isNoResultString: boolean;
  el: HTMLElement;
  scrollPosition: string;
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
        this.scrollPosition = 'default';
      } else if (this.tableBodyElement.nativeElement.scrollLeft === 0) {
        this.scrollPosition = 'left';
      } else if (this.tableBodyElement.nativeElement.scrollWidth === (this.tableBodyElement.nativeElement.scrollLeft + this.tableBodyElement.nativeElement.clientWidth)) {
        this.scrollPosition = 'right';
      } else {
        this.scrollPosition = 'middle';
      }
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
    this.fitScrollBar();
    if (this.nzScroll && this.nzScroll.x && this.nzScroll.y) {
      /** magic code to sync scroll **/
      const overlay = this.overlay.create();
      overlay.dispose();
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.setScrollPositionClassName());
  }

  constructor(private elementRef: ElementRef, private cdr: ChangeDetectorRef, private overlay: Overlay, private nzMeasureScrollbarService: NzMeasureScrollbarService) {
    this.el = this.elementRef.nativeElement;
  }
}
