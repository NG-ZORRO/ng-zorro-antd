// tslint:disable: no-any
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  TemplateRef
} from '@angular/core';

import { NzUpdateHostClassService } from '../core/services/update-host-class.service';
import { toBoolean } from '../core/util/convert';

import { ListSize, NzListGrid } from './interface';

@Component({
  selector           : 'nz-list',
  template           : `
    <ng-template #itemsTpl>
      <ng-container *ngFor="let item of nzDataSource; let index = index">
        <ng-template
          [ngTemplateOutlet]="nzRenderItem"
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
            [ngTemplateOutlet]="nzRenderItem"
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
  providers          : [ NzUpdateHostClassService ],
  preserveWhitespaces: false,
  changeDetection    : ChangeDetectionStrategy.OnPush,
  styles             : [ `
    :host {
      display: block;
    }

    nz-spin {
      display: block;
    }
  ` ]
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
  _headerTpl: TemplateRef<void>;

  @Input()
  set nzHeader(value: string | TemplateRef<void>) {
    if (value instanceof TemplateRef) {
      this._header = null;
      this._headerTpl = value;
    } else {
      this._header = value;
    }

    this._isHeader = !!value;
  }

  _isFooter = false;
  _footer = '';
  _footerTpl: TemplateRef<void>;

  @Input()
  set nzFooter(value: string | TemplateRef<void>) {
    if (value instanceof TemplateRef) {
      this._footer = null;
      this._footerTpl = value;
    } else {
      this._footer = value;
    }

    this._isFooter = !!value;
  }

  @Input() nzItemLayout: 'vertical' | 'horizontal' = 'horizontal';

  @Input() nzRenderItem: TemplateRef<void>;

  private _loading = false;

  @Input()
  set nzLoading(value: boolean) {
    this._loading = toBoolean(value);
  }

  get nzLoading(): boolean {
    return this._loading;
  }

  @Input() nzLoadMore: TemplateRef<void>;
  @Input() nzPagination: TemplateRef<void>;

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

  private prefixCls = 'ant-list';

  private _setClassMap(): void {
    const classMap = {
      [ this.prefixCls ]                               : true,
      [ `${this.prefixCls}-vertical` ]                 : this.nzItemLayout === 'vertical',
      [ `${this.prefixCls}-lg` ]                       : this.nzSize === 'large',
      [ `${this.prefixCls}-sm` ]                       : this.nzSize === 'small',
      [ `${this.prefixCls}-split` ]                    : this.nzSplit,
      [ `${this.prefixCls}-bordered` ]                 : this.nzBordered,
      [ `${this.prefixCls}-loading` ]                  : this.nzLoading,
      [ `${this.prefixCls}-grid` ]                     : this.nzGrid,
      [ `${this.prefixCls}-something-after-last-item` ]: !!(this.nzLoadMore || this.nzPagination || this._isFooter)
    };
    this.updateHostClassService.updateHostClass(this.el.nativeElement, classMap);

    this.cd.detectChanges();
  }

  // endregion

  constructor(private el: ElementRef, private cd: ChangeDetectorRef, private updateHostClassService: NzUpdateHostClassService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this._setClassMap();
  }
}
