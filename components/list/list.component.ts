/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Direction, Directionality } from '@angular/cdk/bidi';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  SimpleChanges,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { BooleanInput, NzDirectionVHType, NzSafeAny, NzSizeLDSType } from 'ng-zorro-antd/core/types';
import { InputBoolean } from 'ng-zorro-antd/core/util';

import { NzListGrid } from './interface';
import { NzListFooterComponent, NzListLoadMoreDirective, NzListPaginationComponent } from './list-cell';

@Component({
  selector: 'nz-list, [nz-list]',
  exportAs: 'nzList',
  template: `
    <ng-template #itemsTpl>
      <div class="ant-list-items">
        <ng-container *ngFor="let item of nzDataSource; let index = index">
          <ng-template
            [ngTemplateOutlet]="nzRenderItem"
            [ngTemplateOutletContext]="{ $implicit: item, index: index }"
          ></ng-template>
        </ng-container>
        <ng-content></ng-content>
      </div>
    </ng-template>

    <nz-list-header *ngIf="nzHeader">
      <ng-container *nzStringTemplateOutlet="nzHeader">{{ nzHeader }}</ng-container>
    </nz-list-header>
    <ng-content select="nz-list-header"></ng-content>

    <nz-spin [nzSpinning]="nzLoading">
      <ng-container>
        <div *ngIf="nzLoading && nzDataSource && nzDataSource.length === 0" [style.min-height.px]="53"></div>
        <div *ngIf="nzGrid && nzDataSource; else itemsTpl" nz-row [nzGutter]="nzGrid.gutter || null">
          <div
            nz-col
            [nzSpan]="nzGrid.span || null"
            [nzXs]="nzGrid.xs || null"
            [nzSm]="nzGrid.sm || null"
            [nzMd]="nzGrid.md || null"
            [nzLg]="nzGrid.lg || null"
            [nzXl]="nzGrid.xl || null"
            [nzXXl]="nzGrid.xxl || null"
            *ngFor="let item of nzDataSource; let index = index"
          >
            <ng-template
              [ngTemplateOutlet]="nzRenderItem"
              [ngTemplateOutletContext]="{ $implicit: item, index: index }"
            ></ng-template>
          </div>
        </div>
        <nz-list-empty
          *ngIf="!nzLoading && nzDataSource && nzDataSource.length === 0"
          [nzNoResult]="nzNoResult"
        ></nz-list-empty>
      </ng-container>
    </nz-spin>

    <nz-list-footer *ngIf="nzFooter">
      <ng-container *nzStringTemplateOutlet="nzFooter">{{ nzFooter }}</ng-container>
    </nz-list-footer>
    <ng-content select="nz-list-footer, [nz-list-footer]"></ng-content>

    <ng-template [ngTemplateOutlet]="nzLoadMore"></ng-template>
    <ng-content select="nz-list-load-more, [nz-list-load-more]"></ng-content>

    <nz-list-pagination *ngIf="nzPagination">
      <ng-template [ngTemplateOutlet]="nzPagination"></ng-template>
    </nz-list-pagination>
    <ng-content select="nz-list-pagination, [nz-list-pagination]"></ng-content>
  `,
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ant-list',
    '[class.ant-list-rtl]': `dir === 'rtl'`,
    '[class.ant-list-vertical]': 'nzItemLayout === "vertical"',
    '[class.ant-list-lg]': 'nzSize === "large"',
    '[class.ant-list-sm]': 'nzSize === "small"',
    '[class.ant-list-split]': 'nzSplit',
    '[class.ant-list-bordered]': 'nzBordered',
    '[class.ant-list-loading]': 'nzLoading',
    '[class.ant-list-something-after-last-item]': 'hasSomethingAfterLastItem'
  }
})
export class NzListComponent implements AfterContentInit, OnChanges, OnDestroy, OnInit {
  static ngAcceptInputType_nzBordered: BooleanInput;
  static ngAcceptInputType_nzLoading: BooleanInput;
  static ngAcceptInputType_nzSplit: BooleanInput;
  static ngAcceptInputType_nzGrid: '' | NzListGrid | null | undefined;

  @Input() nzDataSource?: NzSafeAny[];
  @Input() @InputBoolean() nzBordered = false;
  @Input() nzGrid?: NzListGrid | '' = '';
  @Input() nzHeader?: string | TemplateRef<void>;
  @Input() nzFooter?: string | TemplateRef<void>;
  @Input() nzItemLayout: NzDirectionVHType = 'horizontal';
  @Input() nzRenderItem: TemplateRef<{ $implicit: NzSafeAny; index: number }> | null = null;
  @Input() @InputBoolean() nzLoading = false;
  @Input() nzLoadMore: TemplateRef<void> | null = null;
  @Input() nzPagination?: TemplateRef<void>;
  @Input() nzSize: NzSizeLDSType = 'default';
  @Input() @InputBoolean() nzSplit = true;
  @Input() nzNoResult?: string | TemplateRef<void>;

  @ContentChild(NzListFooterComponent) nzListFooterComponent!: NzListFooterComponent;
  @ContentChild(NzListPaginationComponent) nzListPaginationComponent!: NzListPaginationComponent;
  @ContentChild(NzListLoadMoreDirective) nzListLoadMoreDirective!: NzListLoadMoreDirective;

  hasSomethingAfterLastItem = false;
  dir: Direction = 'ltr';
  private itemLayoutNotifySource = new BehaviorSubject<NzDirectionVHType>(this.nzItemLayout);
  private destroy$ = new Subject<void>();

  get itemLayoutNotify$(): Observable<NzDirectionVHType> {
    return this.itemLayoutNotifySource.asObservable();
  }

  constructor(@Optional() private directionality: Directionality) {}
  ngOnInit(): void {
    this.dir = this.directionality.value;
    this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction: Direction) => {
      this.dir = direction;
    });
  }

  getSomethingAfterLastItem(): boolean {
    return !!(
      this.nzLoadMore ||
      this.nzPagination ||
      this.nzFooter ||
      this.nzListFooterComponent ||
      this.nzListPaginationComponent ||
      this.nzListLoadMoreDirective
    );
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.nzItemLayout) {
      this.itemLayoutNotifySource.next(this.nzItemLayout);
    }
  }

  ngOnDestroy(): void {
    this.itemLayoutNotifySource.unsubscribe();
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngAfterContentInit(): void {
    this.hasSomethingAfterLastItem = this.getSomethingAfterLastItem();
  }
}
