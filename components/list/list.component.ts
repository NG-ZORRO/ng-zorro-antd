/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Direction, Directionality } from '@angular/cdk/bidi';
import { NgTemplateOutlet } from '@angular/common';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  DestroyRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  TemplateRef,
  ViewEncapsulation,
  booleanAttribute,
  inject
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BehaviorSubject, Observable } from 'rxjs';

import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzDirectionVHType, NzSafeAny, NzSizeLDSType } from 'ng-zorro-antd/core/types';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzSpinModule } from 'ng-zorro-antd/spin';

import { NzListGrid } from './interface';
import {
  NzListEmptyComponent,
  NzListFooterComponent,
  NzListHeaderComponent,
  NzListLoadMoreDirective,
  NzListPaginationComponent
} from './list-cell';

@Component({
  selector: 'nz-list, [nz-list]',
  exportAs: 'nzList',
  template: `
    @if (nzHeader) {
      <nz-list-header>
        <ng-container *nzStringTemplateOutlet="nzHeader">{{ nzHeader }}</ng-container>
      </nz-list-header>
    }

    <ng-content select="nz-list-header" />

    <nz-spin [nzSpinning]="nzLoading">
      <ng-container>
        @if (nzLoading && nzDataSource && nzDataSource.length === 0) {
          <div [style.min-height.px]="53"></div>
        }
        @if (nzGrid && nzDataSource) {
          <div nz-row [nzGutter]="nzGrid.gutter || null">
            @for (item of nzDataSource; track item) {
              <div
                nz-col
                [nzSpan]="nzGrid.span || null"
                [nzXs]="nzGrid.xs || null"
                [nzSm]="nzGrid.sm || null"
                [nzMd]="nzGrid.md || null"
                [nzLg]="nzGrid.lg || null"
                [nzXl]="nzGrid.xl || null"
                [nzXXl]="nzGrid.xxl || null"
              >
                <ng-template
                  [ngTemplateOutlet]="nzRenderItem"
                  [ngTemplateOutletContext]="{ $implicit: item, index: $index }"
                />
              </div>
            }
          </div>
        } @else {
          <div class="ant-list-items">
            @for (item of nzDataSource; track item) {
              <ng-container>
                <ng-template
                  [ngTemplateOutlet]="nzRenderItem"
                  [ngTemplateOutletContext]="{ $implicit: item, index: $index }"
                />
              </ng-container>
            }
            <ng-content />
          </div>
        }

        @if (!nzLoading && nzDataSource && nzDataSource.length === 0) {
          <nz-list-empty [nzNoResult]="nzNoResult" />
        }
      </ng-container>
    </nz-spin>

    @if (nzFooter) {
      <nz-list-footer>
        <ng-container *nzStringTemplateOutlet="nzFooter">{{ nzFooter }}</ng-container>
      </nz-list-footer>
    }

    <ng-content select="nz-list-footer, [nz-list-footer]" />

    <ng-template [ngTemplateOutlet]="nzLoadMore" />
    <ng-content select="nz-list-load-more, [nz-list-load-more]" />

    @if (nzPagination) {
      <nz-list-pagination>
        <ng-template [ngTemplateOutlet]="nzPagination" />
      </nz-list-pagination>
    }

    <ng-content select="nz-list-pagination, [nz-list-pagination]" />
  `,
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
  },
  imports: [
    NgTemplateOutlet,
    NzListHeaderComponent,
    NzOutletModule,
    NzSpinModule,
    NzGridModule,
    NzListEmptyComponent,
    NzListFooterComponent,
    NzListPaginationComponent
  ]
})
export class NzListComponent implements AfterContentInit, OnChanges, OnInit {
  private directionality = inject(Directionality);
  private destroyRef = inject(DestroyRef);

  @Input() nzDataSource?: NzSafeAny[];
  @Input({ transform: booleanAttribute }) nzBordered = false;
  @Input() nzGrid?: NzListGrid | '' | null | undefined = '';
  @Input() nzHeader?: string | TemplateRef<void>;
  @Input() nzFooter?: string | TemplateRef<void>;
  @Input() nzItemLayout: NzDirectionVHType = 'horizontal';
  @Input() nzRenderItem: TemplateRef<{ $implicit: NzSafeAny; index: number }> | null = null;
  @Input({ transform: booleanAttribute }) nzLoading = false;
  @Input() nzLoadMore: TemplateRef<void> | null = null;
  @Input() nzPagination?: TemplateRef<void>;
  @Input() nzSize: NzSizeLDSType = 'default';
  @Input({ transform: booleanAttribute }) nzSplit = true;
  @Input() nzNoResult?: string | TemplateRef<void>;

  @ContentChild(NzListFooterComponent) nzListFooterComponent!: NzListFooterComponent;
  @ContentChild(NzListPaginationComponent) nzListPaginationComponent!: NzListPaginationComponent;
  @ContentChild(NzListLoadMoreDirective) nzListLoadMoreDirective!: NzListLoadMoreDirective;

  hasSomethingAfterLastItem = false;
  dir: Direction = 'ltr';
  private itemLayoutNotifySource = new BehaviorSubject<NzDirectionVHType>(this.nzItemLayout);

  get itemLayoutNotify$(): Observable<NzDirectionVHType> {
    return this.itemLayoutNotifySource.asObservable();
  }

  constructor() {
    this.destroyRef.onDestroy(() => this.itemLayoutNotifySource.unsubscribe());
  }

  ngOnInit(): void {
    this.dir = this.directionality.value;
    this.directionality.change?.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((direction: Direction) => {
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

  ngAfterContentInit(): void {
    this.hasSomethingAfterLastItem = this.getSomethingAfterLastItem();
  }
}
