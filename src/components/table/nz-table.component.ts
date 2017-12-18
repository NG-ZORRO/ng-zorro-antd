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
  QueryList,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { toBoolean } from '../util/convert';
import { measureScrollbar } from '../util/mesureScrollBar';
import { NzThDirective } from './nz-th.directive';

@Component({
  selector     : 'nz-table',
  encapsulation: ViewEncapsulation.None,
  template     : `
    <div
      class="ant-table-wrapper"
      [class.ant-table-empty]="data.length==0">
      <nz-spin [nzSpinning]="nzLoading">
        <div>
          <div
            class="ant-table"
            [class.ant-table-fixed-header]="nzScroll"
            [class.ant-table-scroll-position-left]="nzScroll"
            [class.ant-table-bordered]="nzBordered"
            [class.ant-table-large]="(nzSize!=='middle')&&(nzSize!=='small')"
            [class.ant-table-middle]="nzSize=='middle'"
            [class.ant-table-small]="nzSize=='small'">
            <div class="ant-table-title" *ngIf="nzShowTitle">
              <ng-content select="[nz-table-title]"></ng-content>
            </div>
            <div class="ant-table-content">
              <div [class.ant-table-scroll]="nzScroll">
                <div class="ant-table-header" [ngStyle]="_headerBottomStyle" *ngIf="nzScroll">
                  <table>
                    <colgroup>
                      <col *ngFor="let th of ths" [style.width]="th.nzWidth" [style.minWidth]="th.nzWidth">
                    </colgroup>
                    <ng-template [ngTemplateOutlet]="fixedHeader"></ng-template>
                  </table>
                </div>
                <div class="ant-table-body" [style.maxHeight.px]="nzScroll?.y" [style.overflowY]="nzScroll?.y?'scroll':''">
                  <table>
                    <colgroup>
                      <col [style.width]="th.nzWidth" [style.minWidth]="th.nzWidth" *ngFor="let th of ths">
                    </colgroup>
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
              </div>
            </div>
          </div>
        </div>
        <nz-pagination
          *ngIf="nzIsPagination&&data.length"
          [nzInTable]="true"
          [nzShowSizeChanger]="nzShowSizeChanger"
          [nzPageSizeSelectorValues]="nzPageSizeSelectorValues"
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
  `,
  styleUrls    : [
    './style/index.less',
    './style/patch.less'
  ]
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

  /** public data for ngFor tr */
  // TODO: the data cannot be type-checked in current design
  /* tslint:disable-next-line:no-any */
  data: any[] = [];
  _scroll: { y: number };
  _el: HTMLElement;
  _headerBottomStyle;
  _current = 1;
  _total: number;
  _pageSize = 10;
  /* tslint:disable-next-line:no-any */
  _dataSet: any[] = [];
  _isInit = false;
  _isAjax = false;
  ths = [];
  @Output() nzPageSizeChange: EventEmitter<number> = new EventEmitter();
  @Output() nzPageIndexChange: EventEmitter<number> = new EventEmitter();
  /* tslint:disable-next-line:no-any */
  @Output() nzDataChange: EventEmitter<any[]> = new EventEmitter();
  @Output() nzPageIndexChangeClick: EventEmitter<number> = new EventEmitter();
  @Input() nzSize: string;

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

  /** page size changer select values */
  @Input() nzPageSizeSelectorValues = [10, 20, 30, 40, 50];
  @ContentChild('nzFixedHeader') fixedHeader: TemplateRef<void>;

  @ContentChildren(NzThDirective, { descendants: true })
  set setThs(value: QueryList<NzThDirective>) {
    this.ths = value.toArray();
  }

  @Input()
  set nzScroll(value: { y: number }) {
    this._scroll = value;
    this._cd.detectChanges();
  }

  get nzScroll(): { y: number } {
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

  ngOnInit(): void {
    const scrollbarWidth = measureScrollbar();
    this._headerBottomStyle = {
      marginBottom : `-${scrollbarWidth}px`,
      paddingBottom: `0px`
    };
  }

  constructor(private _elementRef: ElementRef, private _cd: ChangeDetectorRef) {
    this._el = this._elementRef.nativeElement;
  }

  ngAfterViewInit(): void {
    this._isInit = true;
  }
}
