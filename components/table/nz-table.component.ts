import { Overlay } from '@angular/cdk/overlay';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild
} from '@angular/core';

import { toBoolean } from '../core/util/convert';
import { measureScrollbar } from '../core/util/mesure-scrollbar';

import { NzThComponent } from './nz-th.component';

@Component({
  selector           : 'nz-table',
  preserveWhitespaces: false,
  template           : `
    <div
      class="ant-table-wrapper"
      [class.ant-table-empty]="data.length==0">
      <nz-spin [nzSpinning]="nzLoading">
        <div>
          <div
            class="ant-table"
            [class.ant-table-fixed-header]="nzScroll"
            [class.ant-table-scroll-position-left]="scrollPosition==='left'"
            [class.ant-table-scroll-position-right]="scrollPosition==='right'"
            [class.ant-table-scroll-position-middle]="scrollPosition==='middle'"
            [class.ant-table-bordered]="nzBordered"
            [class.ant-table-large]="(nzSize!=='middle')&&(nzSize!=='small')"
            [class.ant-table-middle]="nzSize=='middle'"
            [class.ant-table-small]="nzSize=='small'">
            <div class="ant-table-title" *ngIf="nzTitle">
              <ng-container *ngIf="isTitleString; else titleTemplate">{{ nzTitle }}</ng-container>
              <ng-template #titleTemplate>
                <ng-template [ngTemplateOutlet]="nzTitle"></ng-template>
              </ng-template>
            </div>
            <div class="ant-table-content">
              <ng-container *ngIf="!nzScroll">
                <ng-template [ngTemplateOutlet]="tableInner"></ng-template>
              </ng-container>
              <div class="ant-table-scroll" *ngIf="nzScroll">
                <ng-template [ngTemplateOutlet]="tableInner"></ng-template>
              </div>
            </div>
          </div>
        </div>
        <nz-pagination
          *ngIf="nzIsPagination&&data.length"
          [nzInTable]="true"
          [nzShowSizeChanger]="nzShowSizeChanger"
          [nzPageSizeOptions]="nzPageSizeSelectorValues"
          [nzShowQuickJumper]="nzShowQuickJumper"
          [nzShowTotal]="nzShowTotal"
          [nzSize]="(nzSize=='middle'||nzSize=='small')?'small':''"
          [(nzPageSize)]="nzPageSize"
          [nzTotal]="nzTotal"
          [(nzPageIndex)]="nzPageIndex"
          (nzPageIndexChange)="pageChangeClick($event)">
        </nz-pagination>
      </nz-spin>
    </div>
    <ng-template #colGroupTemplate>
      <colgroup *ngIf="!colgroup">
        <col [style.width]="th.nzWidth" [style.minWidth]="th.nzWidth" *ngFor="let th of ths">
      </colgroup>
      <ng-template [ngTemplateOutlet]="colgroup" [ngIf]="colgroup"></ng-template>
    </ng-template>
    <ng-template #tableInner>
      <div class="ant-table-header" #tableHeader (scroll)="syncScrollTable($event)" [ngStyle]="headerBottomStyle" *ngIf="nzScroll">
        <table [class.ant-table-fixed]="nzScroll?.x" [style.width]="nzScroll?.x">
          <ng-template [ngTemplateOutlet]="colGroupTemplate"></ng-template>
          <ng-template [ngTemplateOutlet]="fixedHeader"></ng-template>
        </table>
      </div>
      <div class="ant-table-body" #tableBody (scroll)="syncScrollTable($event)" [style.maxHeight]="nzScroll?.y" [style.overflow-y]="nzScroll?.y?'scroll':''" [style.overflow-x]="nzScroll?.x?'auto':''">
        <table [class.ant-table-fixed]="nzScroll?.x" [style.width]="nzScroll?.x">
          <ng-template [ngTemplateOutlet]="colGroupTemplate"></ng-template>
          <ng-content></ng-content>
        </table>
      </div>
      <div class="ant-table-placeholder" *ngIf="data.length==0">
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
  `
})
export class NzTableComponent implements AfterViewInit, OnInit {
  private _bordered = false;
  private _isPageIndexReset = true;
  private _isPagination = true;
  private _loading = false;
  private _showSizeChanger = false;
  private _showQuickJumper = false;
  private _showTotal = false;
  private _scroll: { x: string; y: string };
  private _footer: string | TemplateRef<void>;
  private _title: string | TemplateRef<void>;
  private _noResult: string | TemplateRef<void>;
  private _pageIndex = 1;
  private _pageSize = 10;
  /* tslint:disable-next-line:no-any */
  private _dataSource: any[] = [];
  private _total: number;
  isFooterString: boolean;
  isTitleString: boolean;
  isNoResultString: boolean;
  el: HTMLElement;
  scrollPosition: string;
  lastScrollLeft = 0;
  /** public data for ngFor tr */
  // TODO: the data cannot be type-checked in current design
  /* tslint:disable-next-line:no-any */
  data: any[] = [];
  headerBottomStyle;
  isInit = false;
  isAjaxData = false;
  @Output() nzPageSizeChange: EventEmitter<number> = new EventEmitter();
  @Output() nzPageIndexChange: EventEmitter<number> = new EventEmitter();
  /* tslint:disable-next-line:no-any */
  @Output() nzDataChange: EventEmitter<any[]> = new EventEmitter();
  @Output() nzPageIndexChangeClick: EventEmitter<number> = new EventEmitter();
  @Input() nzSize: string;
  @ViewChild('tableHeader') tableHeader: ElementRef;
  @ViewChild('tableBody') tableBody: ElementRef;
  /** page size changer select values */
  @Input() nzPageSizeSelectorValues = [ 10, 20, 30, 40, 50 ];
  @ContentChild('nzFixedHeader') fixedHeader: TemplateRef<void>;
  @ContentChild('nzColgroup') colgroup: TemplateRef<void>;
  @ContentChildren(NzThComponent, { descendants: true }) ths = [];

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
  set nzIsPagination(value: boolean) {
    this._isPagination = toBoolean(value);
  }

  get nzIsPagination(): boolean {
    return this._isPagination;
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
  set nzShowTotal(value: boolean) {
    this._showTotal = toBoolean(value);
  }

  get nzShowTotal(): boolean {
    return this._showTotal;
  }

  @Input()
  set nzIsPageIndexReset(value: boolean) {
    this._isPageIndexReset = toBoolean(value);
  }

  get nzIsPageIndexReset(): boolean {
    return this._isPageIndexReset;
  }

  @Input()
  set nzScroll(value: { x: string; y: string }) {
    this._scroll = value;
    this.cdr.detectChanges();
    if (value && value.x) {
      this.scrollPosition = 'left';
    }
  }

  get nzScroll(): { x: string; y: string } {
    return this._scroll;
  }

  /** async data */
  @Input()
  /* tslint:disable-next-line:no-any */
  set nzAjaxData(data: any[]) {
    this.isAjaxData = true;
    this.data = data;
  }

  /** sync data */
  @Input()
  /* tslint:disable-next-line:no-any */
  set nzDataSource(value: any[]) {
    this._dataSource = value;
    this.nzTotal = this._dataSource.length;
    this.generateData(true);
  }

  /* tslint:disable-next-line:no-any */
  get nzDataSource(): any[] {
    return this._dataSource;
  }

  @Input()
  set nzPageIndex(value: number) {
    if (this._pageIndex === value) {
      return;
    }
    this._pageIndex = value;
    this.generateData();
    this.nzPageIndexChange.emit(this.nzPageIndex);
  }

  get nzPageIndex(): number {
    return this._pageIndex;
  }

  pageChangeClick(value: number): void {
    this.nzPageIndexChangeClick.emit(value);
  }

  @Input()
  set nzPageSize(value: number) {
    if (this._pageSize === value) {
      return;
    }
    this._pageSize = value;
    this.generateData();
    if (this.isInit) {
      this.nzPageSizeChange.emit(value);
    }
  }

  get nzPageSize(): number {
    return this._pageSize;
  }

  @Input()
  set nzTotal(value: number) {
    if (this._total === value) {
      return;
    }
    this._total = value;
  }

  get nzTotal(): number {
    return this._total;
  }

  generateData(forceRefresh: boolean = false): void {
    if (!this.isAjaxData) {
      if (this.nzIsPagination) {
        if (forceRefresh) {
          if (this.nzIsPageIndexReset) {
            this.nzPageIndex = 1;
          } else {
            const maxPageIndex = Math.ceil(this._dataSource.length / this.nzPageSize);
            this.nzPageIndex = !this.nzPageIndex ? 1 : (this.nzPageIndex > maxPageIndex ? maxPageIndex : this.nzPageIndex);
          }
        }
        this.data = this._dataSource.slice((this.nzPageIndex - 1) * this.nzPageSize, this.nzPageIndex * this.nzPageSize);
      } else {
        this.data = this._dataSource;
      }
      this.nzDataChange.emit(this.data);
    }
  }

  syncScrollTable(e: MouseEvent): void {
    if (e.currentTarget !== e.target) {
      return;
    }
    const target = e.target as HTMLElement;
    if (target.scrollLeft !== this.lastScrollLeft && this.nzScroll && this.nzScroll.x) {
      if (target === this.tableBody.nativeElement && this.tableHeader) {
        this.tableHeader.nativeElement.scrollLeft = target.scrollLeft;
      } else if (target === this.tableHeader.nativeElement && this.tableBody) {
        this.tableBody.nativeElement.scrollLeft = target.scrollLeft;
      }
      this.setScrollPositionClassName();
    }
    this.lastScrollLeft = target.scrollLeft;
  }

  setScrollPositionClassName(): void {
    if (this.tableBody) {
      if (this.tableBody.nativeElement.scrollLeft === 0) {
        this.scrollPosition = 'left';
      } else if (this.tableBody.nativeElement.scrollWidth === (this.tableBody.nativeElement.scrollLeft + this.tableBody.nativeElement.clientWidth)) {
        this.scrollPosition = 'right';
      } else {
        this.scrollPosition = 'middle';
      }
    }
  }

  ngOnInit(): void {
    const scrollbarWidth = measureScrollbar();
    this.headerBottomStyle = {
      marginBottom : `-${scrollbarWidth}px`,
      paddingBottom: `0px`
    };
    if (this.nzScroll && this.nzScroll.x && this.nzScroll.y) {
      /** magic code to sync scroll **/
      const overlay = this.overlay.create();
      overlay.dispose();
    }
  }

  constructor(private elementRef: ElementRef, private cdr: ChangeDetectorRef, private overlay: Overlay) {
    this.el = this.elementRef.nativeElement;
  }

  ngAfterViewInit(): void {
    this.isInit = true;
  }
}
