/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Platform } from '@angular/cdk/platform';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
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
import { NzDomEventService } from 'ng-zorro-antd/core';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { fromEvent, merge, Subject } from 'rxjs';
import { delay, filter, finalize, startWith, takeUntil } from 'rxjs/operators';
import { NzTableDataInterface } from './table.types';

@Component({
  selector: 'nz-table-inner-scroll',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class="ant-table-content">
      <div *ngIf="scroll.y" #tableHeaderElement [style]="headerStyleMap" class="ant-table-header nz-table-hide-scrollbar">
        <table nz-table-inner [scroll]="scroll" [listOfColWidth]="listOfColWidth" [theadTemplate]="theadTemplate"></table>
      </div>
      <div #tableBodyElement *ngIf="!virtualScroll" class="ant-table-body" [style]="bodyStyleMap">
        <table nz-table-inner [scroll]="scroll" [listOfColWidth]="listOfColWidth" [theadTemplate]="theadTemplate" [hideThead]="!!scroll.y">
          <ng-template [ngTemplateOutlet]="contentTemplate"></ng-template>
        </table>
      </div>
      <cdk-virtual-scroll-viewport
        #tableBodyElement
        *ngIf="virtualScroll"
        [hidden]="!data.length"
        [itemSize]="virtualItemSize"
        [maxBufferPx]="virtualMaxBufferPx"
        [minBufferPx]="virtualMinBufferPx"
        [style.height]="scroll.y"
      >
        <table nz-table-inner [scroll]="scroll" [listOfColWidth]="listOfColWidth">
          <tbody>
            <ng-container *cdkVirtualFor="let item of data; let i = index; trackBy: virtualForTrackBy">
              <ng-template [ngTemplateOutlet]="virtualTemplate" [ngTemplateOutletContext]="{ $implicit: item, index: i }"></ng-template>
            </ng-container>
          </tbody>
        </table>
      </cdk-virtual-scroll-viewport>
    </div>
  `,
  host: {
    '[class.ant-table-container]': 'true'
  }
})
export class NzTableInnerScrollComponent implements OnChanges, AfterViewInit, OnDestroy {
  @Input() data: NzTableDataInterface[] = [];
  @Input() scroll: { x?: string | null; y?: string | null } = { x: null, y: null };
  @Input() contentTemplate: TemplateRef<NzSafeAny> | null = null;
  @Input() virtualScroll = false;
  @Input() widthConfig: string[] = [];
  @Input() listOfColWidth: string[] = [];
  @Input() theadTemplate: TemplateRef<NzSafeAny> | null = null;
  @Input() virtualTemplate: TemplateRef<NzSafeAny> | null = null;
  @Input() virtualItemSize = 0;
  @Input() virtualMaxBufferPx = 200;
  @Input() virtualMinBufferPx = 100;
  @Input() tableMainElement: HTMLDivElement;
  @Input() virtualForTrackBy: TrackByFunction<NzTableDataInterface> | null = null;
  @ViewChild('tableHeaderElement', { read: ElementRef }) tableHeaderElement: ElementRef;
  @ViewChild('tableBodyElement', { read: ElementRef }) tableBodyElement: ElementRef;
  @ViewChild(CdkVirtualScrollViewport, { read: CdkVirtualScrollViewport })
  cdkVirtualScrollViewport: CdkVirtualScrollViewport;
  headerStyleMap = {};
  bodyStyleMap = {};
  private data$ = new Subject<void>();
  private destroy$ = new Subject<void>();

  setScrollPositionClassName(): void {
    if (this.scroll && this.scroll.x) {
      const nativeElement = this.tableBodyElement.nativeElement;
      const scrollWidth = nativeElement.scrollWidth;
      const scrollLeft = nativeElement.scrollLeft;
      const clientWidth = nativeElement.clientWidth;
      if (scrollWidth === clientWidth && scrollWidth !== 0) {
        this.resetClassName();
      } else if (scrollLeft === 0) {
        this.resetClassName();
        this.addClassName(['right']);
      } else if (scrollWidth === scrollLeft + clientWidth) {
        this.resetClassName();
        this.addClassName(['left']);
      } else {
        this.resetClassName();
        this.addClassName(['left', 'right']);
      }
    }
  }

  resetClassName(): void {
    this.renderer.removeClass(this.tableMainElement, 'ant-table-ping-left');
    this.renderer.removeClass(this.tableMainElement, 'ant-table-ping-right');
  }

  addClassName(listOfPosition: string[]): void {
    const prefix = 'ant-table-ping';
    listOfPosition.forEach(position => {
      this.renderer.addClass(this.tableMainElement, `${prefix}-${position}`);
    });
  }

  constructor(
    private renderer: Renderer2,
    private ngZone: NgZone,
    private platform: Platform,
    private nzDomEventService: NzDomEventService
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    const { scroll, data } = changes;
    if (scroll) {
      this.headerStyleMap = {
        overflowX: 'hidden',
        overflowY: this.scroll.y ? 'scroll' : 'hidden'
      };
      this.bodyStyleMap = {
        overflowY: this.scroll.y ? 'scroll' : null,
        overflowX: this.scroll.x ? 'auto' : null,
        maxHeight: this.scroll.y
      };
    }
    if (data) {
      this.data$.next();
    }
  }
  ngAfterViewInit(): void {
    if (this.platform.isBrowser) {
      this.ngZone.runOutsideAngular(() => {
        const scroll$ = fromEvent<MouseEvent>(this.tableBodyElement.nativeElement, 'scroll').pipe(
          filter(() => !!this.scroll.x),
          takeUntil(this.destroy$)
        );
        const resize$ = this.nzDomEventService.registerResizeListener().pipe(
          takeUntil(this.destroy$),
          finalize(() => this.nzDomEventService.unregisterResizeListener())
        );
        const setClassName$ = merge(scroll$, resize$, this.data$).pipe(startWith(true), delay(0));
        const syncScroll$ = scroll$.pipe(filter(() => !!this.scroll.y));
        setClassName$.subscribe(() => this.setScrollPositionClassName());
        syncScroll$.subscribe(() => (this.tableHeaderElement.nativeElement.scrollLeft = this.tableBodyElement.nativeElement.scrollLeft));
      });
    }
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
