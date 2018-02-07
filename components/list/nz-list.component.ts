// tslint:disable: no-any
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ElementRef, Input, OnChanges, Renderer2, SimpleChanges, TemplateRef } from '@angular/core';
import { toBoolean } from '../core/util/convert';
import { ListSize, NzListGrid } from './interface';

@Component({
  selector: 'nz-list',
  template: `
  <ng-template #itemsTpl>
    <ng-container *ngFor="let item of nzDataSource; let index = index">
      <ng-template
        [ngTemplateOutlet]="nzItem"
        [ngTemplateOutletContext]="{ $implicit: item, index: index }"></ng-template>
    </ng-container>
  </ng-template>
  <div *ngIf="_isHeader" class="ant-list-header">
    <ng-container *ngIf="_header; else _headerTpl">{{ _header }}</ng-container>
  </div>
  <nz-spin [nzSpinning]="nzLoading">
    <div *ngIf="nzGrid; else itemsTpl" nz-row [nzGutter]="nzGrid.gutter">
      <div nz-col [nzSpan]="nzGrid.span" [nzXs]="nzGrid.xs" [nzSm]="nzGrid.sm" [nzMd]="nzGrid.md" [nzLg]="nzGrid.lg" [nzXl]="nzGrid.xl" [nzXXl]="nzGrid.xxl"
          *ngFor="let item of nzDataSource; let index = index">
          <ng-template
            [ngTemplateOutlet]="nzItem"
            [ngTemplateOutletContext]="{ $implicit: item, index: index }"></ng-template>
      </div>
    </div>
  </nz-spin>
  <ng-template [ngTemplateOutlet]="nzLoadMore"></ng-template>
  <ng-content></ng-content>
  <div *ngIf="nzPagination" class="ant-list-pagination">
    <ng-template [ngTemplateOutlet]="nzPagination"></ng-template>
  </div>
  <div *ngIf="_isFooter" class="ant-list-footer">
    <ng-container *ngIf="_footer; else _footerTpl">{{ _footer }}</ng-container>
  </div>
  `,
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NzListComponent implements OnChanges {
  // region: fields
  @Input() nzDataSource: any[] = [];

  private _bordered = false;
  @Input()
  set nzBordered(value: boolean) {
    this._bordered = toBoolean(value);
  }
  get nzBordered(): boolean {
    return this._bordered;
  }

  @Input() nzGrid: NzListGrid;

  _isHeader = false;
  _header = '';
  _headerTpl: TemplateRef<any>;
  @Input()
  set nzHeader(value: string | TemplateRef<any>) {
    if (value instanceof TemplateRef) {
      this._headerTpl = value;
    } else {
      this._header = value;
    }

    this._isHeader = !!value;
  }

  _isFooter = false;
  _footer = '';
  _footerTpl: TemplateRef<any>;
  @Input()
  set nzFooter(value: string | TemplateRef<any>) {
    if (value instanceof TemplateRef) {
      this._footerTpl = value;
    } else {
      this._footer = value;
    }

    this._isFooter = !!value;
  }

  @Input() nzItemLayout: 'vertical' | 'horizontal' = 'horizontal';

  @ContentChild('item') nzItem: TemplateRef<any>;

  private _loading = false;
  @Input()
  set nzLoading(value: boolean) {
    this._loading = toBoolean(value);
  }
  get nzLoading(): boolean {
    return this._loading;
  }

  @ContentChild('loadMore') nzLoadMore: TemplateRef<any>;
  @ContentChild('pagination') nzPagination: TemplateRef<any>;

  @Input() nzSize: ListSize = 'default';

  private _split = true;
  @Input()
  set nzSplit(value: boolean) {
    this._split = toBoolean(value);
  }
  get nzSplit(): boolean {
    return this._split;
  }
  // endregion

  // region: styles

  _prefixCls = 'ant-list';
  _classList: string[] = [];

  private _setClassMap(): void {
    this._classList.forEach(cls => this.renderer.removeClass(this.el.nativeElement, cls));

    this._classList = [
      this._prefixCls,
      this.nzItemLayout === 'vertical' && `${this._prefixCls}-vertical`,
      this.nzSize === 'large' && `${this._prefixCls}-lg`,
      this.nzSize === 'small' && `${this._prefixCls}-sm`,
      this.nzSplit && `${this._prefixCls}-split`,
      this.nzBordered && `${this._prefixCls}-bordered`,
      this.nzLoading && `${this._prefixCls}-loading`,
      this.nzGrid && `${this._prefixCls}-grid`,
      !!(this.nzLoadMore || this.nzPagination || this._isFooter) && `${this._prefixCls}-something-after-last-item`
    ].filter(item => !!item);

    this._classList.forEach(cls => this.renderer.addClass(this.el.nativeElement, cls));

    this.cd.detectChanges();
  }

  // endregion

  constructor(private el: ElementRef, private renderer: Renderer2, private cd: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    this._setClassMap();
  }
}
