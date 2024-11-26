/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Platform } from '@angular/cdk/platform';
import { CdkVirtualScrollViewport, ScrollingModule } from '@angular/cdk/scrolling';
import { NgStyle, NgTemplateOutlet } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  Renderer2,
  SimpleChanges,
  TemplateRef,
  TrackByFunction,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { merge, Subject } from 'rxjs';
import { delay, filter, startWith, switchMap, takeUntil } from 'rxjs/operators';

import { NzResizeService } from 'ng-zorro-antd/core/services';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { fromEventOutsideAngular } from 'ng-zorro-antd/core/util';

import { NzTableSummaryFixedType } from '../table.types';
import { NzTableContentComponent } from './table-content.component';
import { NzTbodyComponent } from './tbody.component';

@Component({
  selector: 'nz-table-inner-scroll',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    @if (scrollY) {
      <div #tableHeaderElement [ngStyle]="headerStyleMap" class="ant-table-header nz-table-hide-scrollbar">
        <table
          nz-table-content
          tableLayout="fixed"
          [scrollX]="scrollX"
          [listOfColWidth]="listOfColWidth"
          [theadTemplate]="theadTemplate"
          [tfootTemplate]="tfootFixed === 'top' ? tfootTemplate : null"
        ></table>
      </div>
      @if (!virtualTemplate) {
        <div #tableBodyElement class="ant-table-body" [ngStyle]="bodyStyleMap">
          <table
            nz-table-content
            tableLayout="fixed"
            [scrollX]="scrollX"
            [listOfColWidth]="listOfColWidth"
            [contentTemplate]="contentTemplate"
          ></table>
        </div>
      } @else {
        <cdk-virtual-scroll-viewport
          #tableBodyElement
          [itemSize]="virtualItemSize"
          [maxBufferPx]="virtualMaxBufferPx"
          [minBufferPx]="virtualMinBufferPx"
          [style.height]="data.length ? scrollY : noDataVirtualHeight"
        >
          <table nz-table-content tableLayout="fixed" [scrollX]="scrollX" [listOfColWidth]="listOfColWidth">
            <tbody>
              <ng-container *cdkVirtualFor="let item of data; let i = index; trackBy: virtualForTrackBy">
                <ng-template
                  [ngTemplateOutlet]="virtualTemplate"
                  [ngTemplateOutletContext]="{ $implicit: item, index: i }"
                ></ng-template>
              </ng-container>
            </tbody>
          </table>
        </cdk-virtual-scroll-viewport>
      }
      @if (tfootFixed === 'bottom') {
        <div #tableFootElement class="ant-table-summary" [ngStyle]="headerStyleMap">
          <table
            nz-table-content
            tableLayout="fixed"
            [scrollX]="scrollX"
            [listOfColWidth]="listOfColWidth"
            [tfootTemplate]="tfootTemplate"
          ></table>
        </div>
      }
    } @else {
      <div class="ant-table-content" #tableBodyElement [ngStyle]="bodyStyleMap">
        <table
          nz-table-content
          tableLayout="fixed"
          [scrollX]="scrollX"
          [listOfColWidth]="listOfColWidth"
          [theadTemplate]="theadTemplate"
          [contentTemplate]="contentTemplate"
          [tfootTemplate]="tfootTemplate"
        ></table>
      </div>
    }
  `,
  host: { class: 'ant-table-container' },
  imports: [NzTableContentComponent, NgStyle, ScrollingModule, NgTemplateOutlet, NzTbodyComponent],
  standalone: true
})
export class NzTableInnerScrollComponent<T> implements OnChanges, AfterViewInit, OnDestroy {
  @Input() data: readonly T[] = [];
  @Input() scrollX: string | null = null;
  @Input() scrollY: string | null = null;
  @Input() contentTemplate: TemplateRef<NzSafeAny> | null = null;
  @Input() widthConfig: string[] = [];
  @Input() listOfColWidth: ReadonlyArray<string | null> = [];
  @Input() theadTemplate: TemplateRef<NzSafeAny> | null = null;
  @Input() tfootTemplate: TemplateRef<NzSafeAny> | null = null;
  @Input() tfootFixed: NzTableSummaryFixedType | null = null;
  @Input() virtualTemplate: TemplateRef<NzSafeAny> | null = null;
  @Input() virtualItemSize = 0;
  @Input() virtualMaxBufferPx = 200;
  @Input() virtualMinBufferPx = 100;
  @Input() tableMainElement?: HTMLDivElement;
  @Input() virtualForTrackBy: TrackByFunction<T> = index => index;
  @ViewChild('tableHeaderElement', { read: ElementRef }) tableHeaderElement!: ElementRef;
  @ViewChild('tableBodyElement', { read: ElementRef }) tableBodyElement!: ElementRef;
  @ViewChild('tableFootElement', { read: ElementRef }) tableFootElement?: ElementRef;
  @ViewChild(CdkVirtualScrollViewport, { read: CdkVirtualScrollViewport })
  cdkVirtualScrollViewport?: CdkVirtualScrollViewport;
  headerStyleMap = {};
  bodyStyleMap = {};
  @Input() verticalScrollBarWidth = 0;
  @Input() noDataVirtualHeight = '182px';
  private data$ = new Subject<void>();
  private scroll$ = new Subject<void>();
  private destroy$ = new Subject<void>();

  setScrollPositionClassName(clear: boolean = false): void {
    const { scrollWidth, scrollLeft, clientWidth } = this.tableBodyElement.nativeElement;
    const leftClassName = 'ant-table-ping-left';
    const rightClassName = 'ant-table-ping-right';
    if ((scrollWidth === clientWidth && scrollWidth !== 0) || clear) {
      this.renderer.removeClass(this.tableMainElement, leftClassName);
      this.renderer.removeClass(this.tableMainElement, rightClassName);
    } else if (scrollLeft === 0) {
      this.renderer.removeClass(this.tableMainElement, leftClassName);
      this.renderer.addClass(this.tableMainElement, rightClassName);
    } else if (scrollWidth === scrollLeft + clientWidth) {
      this.renderer.removeClass(this.tableMainElement, rightClassName);
      this.renderer.addClass(this.tableMainElement, leftClassName);
    } else {
      this.renderer.addClass(this.tableMainElement, leftClassName);
      this.renderer.addClass(this.tableMainElement, rightClassName);
    }
  }

  constructor(
    private renderer: Renderer2,
    private ngZone: NgZone,
    private platform: Platform,
    private resizeService: NzResizeService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    const { scrollX, scrollY, data } = changes;
    if (scrollX || scrollY) {
      const hasVerticalScrollBar = this.verticalScrollBarWidth !== 0;
      this.headerStyleMap = {
        overflowX: 'hidden',
        overflowY: this.scrollY && hasVerticalScrollBar ? 'scroll' : 'hidden'
      };
      this.bodyStyleMap = {
        overflowY: this.scrollY ? 'scroll' : 'hidden',
        overflowX: this.scrollX ? 'auto' : null,
        maxHeight: this.scrollY
      };
      // Caretaker note: we have to emit the value outside the Angular zone, thus DOM timer (`delay(0)`) and `scroll`
      // event listener will be also added outside the Angular zone.
      this.ngZone.runOutsideAngular(() => this.scroll$.next());
    }
    if (data) {
      // See the comment above.
      this.ngZone.runOutsideAngular(() => this.data$.next());
    }
  }

  ngAfterViewInit(): void {
    if (this.platform.isBrowser) {
      this.ngZone.runOutsideAngular(() => {
        const scrollEvent$ = this.scroll$.pipe(
          startWith(null),
          delay(0),
          switchMap(() =>
            fromEventOutsideAngular<MouseEvent>(this.tableBodyElement.nativeElement, 'scroll').pipe(startWith(true))
          ),
          takeUntil(this.destroy$)
        );
        const resize$ = this.resizeService.subscribe().pipe(takeUntil(this.destroy$));
        const data$ = this.data$.pipe(takeUntil(this.destroy$));
        const setClassName$ = merge(scrollEvent$, resize$, data$, this.scroll$).pipe(
          startWith(true),
          delay(0),
          takeUntil(this.destroy$)
        );
        setClassName$.subscribe(() => this.setScrollPositionClassName());
        scrollEvent$.pipe(filter(() => !!this.scrollY)).subscribe(() => {
          this.tableHeaderElement.nativeElement.scrollLeft = this.tableBodyElement.nativeElement.scrollLeft;
          if (this.tableFootElement) {
            this.tableFootElement.nativeElement.scrollLeft = this.tableBodyElement.nativeElement.scrollLeft;
          }
        });
      });
    }
  }

  ngOnDestroy(): void {
    this.setScrollPositionClassName(true);
    this.destroy$.next();
    this.destroy$.complete();
  }
}
