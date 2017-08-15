import {
  Component,
  ViewEncapsulation,
  Input,
  ElementRef,
  AfterViewInit,
  EventEmitter,
  Output
} from '@angular/core';

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
            [class.ant-table-bordered]="nzBordered"
            [class.ant-table-large]="(nzSize!=='middle')&&(nzSize!=='small')"
            [class.ant-table-middle]="nzSize=='middle'"
            [class.ant-table-small]="nzSize=='small'">
            <div class="ant-table-title" *ngIf="nzShowTitle">
              <ng-content select="[nz-table-title]"></ng-content>
            </div>
            <div class="ant-table-content">
              <div class="ant-table-body">
                <table>
                  <ng-content></ng-content>
                </table>
              </div>
              <div class="ant-table-placeholder" *ngIf="data.length==0 && !nzCustomNoResult">
                <span>没有数据</span>
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
      </nz-spin>
      <nz-pagination
        *ngIf="nzIsPagination&&data.length"
        class="ant-table-pagination"
        [nzShowSizeChanger]="nzShowSizeChanger"
        [nzShowQuickJumper]="nzShowQuickJumper"
        [nzShowTotal]="nzShowTotal"
        [nzSize]="(nzSize=='middle'||nzSize=='small')?'small':''"
        [(nzPageSize)]="nzPageSize"
        [nzTotal]="nzTotal"
        [(nzPageIndex)]="nzPageIndex"
        (nzPageIndexClickChange)="pageChangeClick($event)">
      </nz-pagination>
    </div>
  `,
  styleUrls    : [
    './style/index.less',
    './style/patch.less'
  ]
})
export class NzTableComponent implements AfterViewInit {
  /** public data for ngFor tr */
  data = [];
  _el: HTMLElement;
  _current = 1;
  _total: number;
  _pageSize = 10;
  _dataSet = [];
  _isInit = false;
  _isAjax = false;
  @Output() nzPageSizeChange: EventEmitter<any> = new EventEmitter();
  @Output() nzPageIndexChange: EventEmitter<any> = new EventEmitter();
  @Output() nzDataChange: EventEmitter<any> = new EventEmitter();
  @Output() nzPageIndexChangeClick: EventEmitter<any> = new EventEmitter();
  @Input() nzBordered = false;
  @Input() nzSize: string;
  @Input() nzCustomNoResult = false;
  @Input() nzIsPagination = true;
  @Input() nzLoading = false;
  @Input() nzShowSizeChanger = false;
  @Input() nzShowQuickJumper = false;
  @Input() nzShowTotal = false;
  @Input() nzShowFooter = false;
  @Input() nzShowTitle = false;

  /** async data */
  @Input()
  get nzAjaxData() {
    return this.data;
  }

  set nzAjaxData(data) {
    this._isAjax = true;
    this.data = data;
  }

  /** sync data */
  @Input()
  get nzDataSource() {
    return this._dataSet;
  }

  set nzDataSource(value) {
    this._dataSet = value;
    this.nzTotal = this._dataSet.length;
    this._generateData(true);
  }

  @Input()
  get nzPageIndex() {
    return this._current;
  };

  set nzPageIndex(value: number) {
    if (this._current === value) {
      return;
    }
    this._current = value;
    this._generateData();
    this.nzPageIndexChange.emit(this.nzPageIndex);
  };

  pageChangeClick(value) {
    this.nzPageIndex = value;
    this.nzPageIndexChangeClick.emit(value);
  }

  @Input()
  get nzPageSize() {
    return this._pageSize;
  };

  set nzPageSize(value: number) {
    if (this._pageSize === value) {
      return;
    }
    this._pageSize = value;
    this._generateData();
    if (this._isInit) {
      this.nzPageSizeChange.emit(value);
    }
  };

  @Input()
  get nzTotal() {
    return this._total;
  };

  set nzTotal(value: number) {
    if (this._total === value) {
      return;
    }
    this._total = value;
  }

  _generateData(forceRefresh = false) {
    if (!this._isAjax) {
      if (this.nzIsPagination) {
        if (forceRefresh) {
          this.nzPageIndex = 1;
        }
        this.data = this._dataSet.slice((this.nzPageIndex - 1) * this.nzPageSize, this.nzPageIndex * this.nzPageSize);
      } else {
        this.data = this._dataSet;
      }
      this.nzDataChange.emit(this.data);
    }
  }

  constructor(private _elementRef: ElementRef) {
    this._el = this._elementRef.nativeElement;
  }

  ngAfterViewInit() {
    this._isInit = true;
  }
}

