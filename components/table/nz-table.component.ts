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
  ViewChild,
} from '@angular/core';
import { toBoolean } from '../core/util/convert';
import { measureScrollbar } from '../core/util/mesureScrollBar';
import { NzThDirective } from './nz-th.directive';

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
            [class.ant-table-scroll-position-left]="_scrollPosition==='left'"
            [class.ant-table-scroll-position-right]="_scrollPosition==='right'"
            [class.ant-table-scroll-position-middle]="_scrollPosition==='middle'"
            [class.ant-table-bordered]="nzBordered"
            [class.ant-table-large]="(nzSize!=='middle')&&(nzSize!=='small')"
            [class.ant-table-middle]="nzSize=='middle'"
            [class.ant-table-small]="nzSize=='small'">
            <div class="ant-table-title" *ngIf="nzShowTitle">
              <ng-content select="[nz-table-title]"></ng-content>
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
          (nzPageIndexClickChange)="pageChangeClick($event)">
        </nz-pagination>
      </nz-spin>
    </div>
    <ng-template #tableInner>
      <div class="ant-table-header" #tableHeader (scroll)="syncScrollTable($event)" [ngStyle]="_headerBottomStyle" *ngIf="nzScroll">
        <table [class.ant-table-fixed]="nzScroll?.x" [style.width]="nzScroll?.x">
          <colgroup *ngIf="!colgroup">
            <col *ngFor="let th of ths" [style.width]="th.nzWidth" [style.minWidth]="th.nzWidth">
          </colgroup>
          <ng-template [ngTemplateOutlet]="colgroup" [ngIf]="colgroup"></ng-template>
          <ng-template [ngTemplateOutlet]="fixedHeader"></ng-template>
        </table>
      </div>
      <div class="ant-table-body" #tableBody (scroll)="syncScrollTable($event)" [style.maxHeight]="nzScroll?.y" [style.overflow-y]="nzScroll?.y?'scroll':''" [style.overflow-x]="nzScroll?.x?'auto':''">
        <table [class.ant-table-fixed]="nzScroll?.x" [style.width]="nzScroll?.x">
          <colgroup *ngIf="!colgroup">
            <col [style.width]="th.nzWidth" [style.minWidth]="th.nzWidth" *ngFor="let th of ths">
          </colgroup>
          <ng-template [ngTemplateOutlet]="colgroup" [ngIf]="colgroup"></ng-template>
          <ng-content></ng-content>
        </table>
      </div>
      <div class="ant-table-placeholder" *ngIf="data.length==0 && !nzCustomNoResult">
        <span>{{ 'Table.emptyText' | nzTranslate }}</span>
      </div>
      <div class="ant-table-placeholder" *ngIf="data.length==0 && nzCustomNoResult">
        <ng-content select="[noResult]"></ng-content>
      </div>
      <div class="ant-table-footer" *ngIf="nzShowFooter">
        <ng-content select="[nz-table-footer]"></ng-content>
      </div>
    </ng-template>
  `
})
export class NzTableComponent implements AfterViewInit, OnInit {
  private _bordered = false;
  private _customNoResult = false;
  private _isPageIndexReset = true;
  private _isPagination = true;
  private _loading = false;
  private _showSizeChanger = false;
  private _showQuickJumper = false;
  private _showTotal = false;
  private _showFooter = false;
  private _showTitle = false;
  _scrollPosition: string;
  _lastScrollLeft = 0;

  /** public data for ngFor tr */
  // TODO: the data cannot be type-checked in current design
  /* tslint:disable-next-line:no-any */
  data: any[] = [];
  _scroll: { x: string; y: string };
  _el: HTMLElement;
  _headerBottomStyle;
  _current = 1;
  _total: number;
  _pageSize = 10;
  /* tslint:disable-next-line:no-any */
  _dataSet: any[] = [];
  _isInit = false;
  _isAjax = false;
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
  @ContentChildren(NzThDirective, { descendants: true }) ths = [];

  @Input()
  set nzBordered(value: boolean) {
    this._bordered = toBoolean(value);
  }

  get nzBordered(): boolean {
    return this._bordered;
  }

  @Input()
  set nzCustomNoResult(value: boolean) {
    this._customNoResult = toBoolean(value);
  }

  get nzCustomNoResult(): boolean {
    return this._customNoResult;
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
  set nzShowFooter(value: boolean) {
    this._showFooter = toBoolean(value);
  }

  get nzShowFooter(): boolean {
    return this._showFooter;
  }

  @Input()
  set nzShowTitle(value: boolean) {
    this._showTitle = toBoolean(value);
  }

  get nzShowTitle(): boolean {
    return this._showTitle;
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
    this._cd.detectChanges();
    if (value && value.x) {
      this._scrollPosition = 'left';
    }
  }

  get nzScroll(): { x: string; y: string } {
    return this._scroll;
  }

  /** async data */
  @Input()
  /* tslint:disable-next-line:no-any */
  set nzAjaxData(data: any[]) {
    this._isAjax = true;
    this.data = data;
  }

  /* tslint:disable-next-line:no-any */
  get nzAjaxData(): any[] {
    return this.data;
  }

  /** sync data */
  @Input()
  /* tslint:disable-next-line:no-any */
  set nzDataSource(value: any[]) {
    this._dataSet = value;
    this.nzTotal = this._dataSet.length;
    this._generateData(true);
  }

  /* tslint:disable-next-line:no-any */
  get nzDataSource(): any[] {
    return this._dataSet;
  }

  @Input()
  set nzPageIndex(value: number) {
    if (this._current === value) {
      return;
    }
    this._current = value;
    this._generateData();
    this.nzPageIndexChange.emit(this.nzPageIndex);
  }

  get nzPageIndex(): number {
    return this._current;
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
    this._generateData();
    if (this._isInit) {
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

  _generateData(forceRefresh: boolean = false): void {
    if (!this._isAjax) {
      if (this.nzIsPagination) {
        if (forceRefresh) {
          if (this.nzIsPageIndexReset) {
            this.nzPageIndex = 1;
          } else {
            const maxPageIndex = Math.ceil(this._dataSet.length / this.nzPageSize);
            this.nzPageIndex = !this.nzPageIndex ? 1 : (this.nzPageIndex > maxPageIndex ? maxPageIndex : this.nzPageIndex);
          }
        }
        this.data = this._dataSet.slice((this.nzPageIndex - 1) * this.nzPageSize, this.nzPageIndex * this.nzPageSize);
      } else {
        this.data = this._dataSet;
      }
      this.nzDataChange.emit(this.data);
    }
  }

  syncScrollTable(e: MouseEvent): void {
    if (e.currentTarget !== e.target) {
      return;
    }
    const target = e.target as HTMLElement;
    if (target.scrollLeft !== this._lastScrollLeft && this.nzScroll && this.nzScroll.x) {
      if (target === this.tableBody.nativeElement && this.tableHeader) {
        this.tableHeader.nativeElement.scrollLeft = target.scrollLeft;
      } else if (target === this.tableHeader.nativeElement && this.tableBody) {
        this.tableBody.nativeElement.scrollLeft = target.scrollLeft;
      }
      this.setScrollPositionClassName();
    }
    this._lastScrollLeft = target.scrollLeft;
  }

  setScrollPositionClassName(): void {
    if (this.tableBody) {
      if (this.tableBody.nativeElement.scrollLeft === 0) {
        this._scrollPosition = 'left';
      } else if (this.tableBody.nativeElement.scrollWidth === (this.tableBody.nativeElement.scrollLeft + this.tableBody.nativeElement.clientWidth)) {
        this._scrollPosition = 'right';
      } else {
        this._scrollPosition = 'middle';
      }
    }
  }

  ngOnInit(): void {
    const scrollbarWidth = measureScrollbar();
    this._headerBottomStyle = {
      marginBottom : `-${scrollbarWidth}px`,
      paddingBottom: `0px`
    };
    if (this.nzScroll && this.nzScroll.x && this.nzScroll.y) {
      /** magic code to sync scroll **/
      const overlay = this.overlay.create();
      overlay.dispose();
    }
  }

  constructor(private _elementRef: ElementRef, private _cd: ChangeDetectorRef, private overlay: Overlay) {
    this._el = this._elementRef.nativeElement;
  }

  ngAfterViewInit(): void {
    this._isInit = true;
  }
}
