/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { CdkConnectedOverlay, CdkOverlayOrigin } from '@angular/cdk/overlay';
import { CdkVirtualForOfContext, CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  TemplateRef,
  TrackByFunction,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { NzConfigKey, NzConfigService, WithConfig } from 'ng-zorro-antd/core/config';
import { NzResizeObserver } from 'ng-zorro-antd/core/resize-observers';
import { BooleanInput, NgClassInterface, NgStyleInterface, NumberInput } from 'ng-zorro-antd/core/types';
import { InputBoolean, InputNumber } from 'ng-zorro-antd/core/util';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

const NZ_CONFIG_MODULE_NAME: NzConfigKey = 'scrolling';

@Component({
  selector: 'nz-scrolling',
  exportAs: 'nzScrolling',
  preserveWhitespaces: false,
  template: `
    <ng-template
      cdkConnectedOverlay
      [cdkConnectedOverlayPanelClass]="'ant-scroll-overlay-panel'"
      [cdkConnectedOverlayOrigin]="origin"
      [cdkConnectedOverlayOpen]="true"
    >
      <ng-template
        *ngIf="nzItemTemplate && nzData.length > 0"
        [ngTemplateOutlet]="nzItemTemplate"
        [ngTemplateOutletContext]="{ $implicit: nzData[0], index: 0 }"
      ></ng-template>
    </ng-template>

    <ng-container *ngIf="nzVirtual; else commonTemplate">
      <cdk-virtual-scroll-viewport
        class="ant-scroll-viewport"
        [class]="nzViewportClass"
        [class.is-hidden]="nzHiddenBar"
        [style]="nzViewportStyle"
        [style.height]="nzViewportHeight"
        [itemSize]="isNumber(nzStaticSize) ? nzStaticSize : autoSize"
        [minBufferPx]="isNumber(nzMinBufferPx) ? nzMinBufferPx : isNumber(nzStaticSize) ? $any(nzStaticSize) * 2 : autoMinBufferPx"
        [maxBufferPx]="isNumber(nzMaxBufferPx) ? nzMaxBufferPx : isNumber(nzStaticSize) ? $any(nzStaticSize) * 5 : autoMaxBufferPx"
        [orientation]="nzOrientation"
        (scrolledIndexChange)="nzScrolledIndexChange.emit($event)"
      >
        <ng-container *ngIf="nzItemTemplate && !nzCustomContent">
          <ng-container *cdkVirtualFor="let item of nzData; let i = index; trackBy: nzTrackBy; templateCacheSize: nzTemplateCacheSize">
            <ng-template [ngTemplateOutlet]="nzItemTemplate" [ngTemplateOutletContext]="{ $implicit: item, index: i }"></ng-template>
          </ng-container>
        </ng-container>
        <ng-content *ngIf="nzCustomContent"></ng-content>
      </cdk-virtual-scroll-viewport>
    </ng-container>
    <ng-template #commonTemplate>
      <div
        cdkScrollable
        class="ant-scroll-viewport"
        [class]="nzViewportClass"
        [class.is-hidden]="nzHiddenBar"
        [style]="nzViewportStyle"
        [style.height]="nzViewportHeight"
      >
        <ng-container *ngIf="nzItemTemplate && !nzCustomContent">
          <ng-container *ngFor="let item of nzData; let i = index">
            <ng-template [ngTemplateOutlet]="nzItemTemplate" [ngTemplateOutletContext]="{ $implicit: item, index: i }"></ng-template>
          </ng-container>
        </ng-container>
        <ng-content *ngIf="nzCustomContent"></ng-content>
      </div>
    </ng-template>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NzScrollingComponent<T> implements AfterViewInit, OnDestroy {
  readonly _nzModuleName: NzConfigKey = NZ_CONFIG_MODULE_NAME;

  static ngAcceptInputType_nzVirtual: BooleanInput;
  static ngAcceptInputType_nzHiddenBar: BooleanInput;
  static ngAcceptInputType_nzCustomContent: BooleanInput;
  static ngAcceptInputType_nzStaticSize: NumberInput;
  static ngAcceptInputType_nzMinBufferPx: NumberInput;
  static ngAcceptInputType_nzMaxBufferPx: NumberInput;
  static ngAcceptInputType_nzTemplateCacheSize: NumberInput;
  static ngAcceptInputType_nzViewportHeight: number | string | null | undefined;

  @ViewChild(CdkVirtualScrollViewport, { static: false }) readonly virtualScrollViewport?: CdkVirtualScrollViewport;
  @ViewChild(CdkConnectedOverlay, { static: true }) cdkConnectedOverlay!: CdkConnectedOverlay;

  //#region valid when `nzVirtual` is true
  @Input()
  @WithConfig<boolean>()
  @InputBoolean()
  set nzVirtual(value: boolean) {
    if (this._initFlag && value) {
      setTimeout(() => this.updateItemSize());
    }
    this._nzVirtual = value;
  }
  get nzVirtual(): boolean {
    return this._nzVirtual;
  }
  @Input() @InputNumber(undefined) nzStaticSize?: number;
  @Input() @WithConfig() @InputNumber(undefined) nzMinBufferPx?: number;
  @Input() @WithConfig() @InputNumber(undefined) nzMaxBufferPx?: number;
  @Input() nzOrientation: 'horizontal' | 'vertical' = 'vertical';
  @Input() @WithConfig() @InputNumber() nzTemplateCacheSize = 20;
  @Input() nzTrackBy?: TrackByFunction<T>;
  //#endregion

  @Input()
  set nzViewportHeight(value: string | undefined) {
    this._nzViewportHeight = typeof value === 'number' ? `${value}px` : value;
  }
  get nzViewportHeight(): string | undefined {
    return this._nzViewportHeight;
  }
  @Input() @WithConfig() @InputBoolean() nzHiddenBar: boolean = false;
  @Input() @InputBoolean() nzCustomContent: boolean = false;
  @Input() nzViewportClass?: NgClassInterface | string;
  @Input() nzViewportStyle?: NgStyleInterface;
  @Input() nzData: T[] = [];
  @Input() nzItemTemplate?: TemplateRef<CdkVirtualForOfContext<T>>;

  @Output() readonly nzScrolledIndexChange = new EventEmitter<number>();
  @Output() readonly nzAutoSizeChange = new EventEmitter<number>();

  autoSize = 50;
  autoMinBufferPx = 50 * 2;
  autoMaxBufferPx = 50 * 5;
  origin: CdkOverlayOrigin;

  private _initFlag = false;
  private _nzVirtual = false;
  private _nzViewportHeight?: string;
  private destroy$ = new Subject();

  constructor(public nzConfigService: NzConfigService, private nzResizeObserver: NzResizeObserver, private elementRef: ElementRef) {
    this.origin = new CdkOverlayOrigin(this.elementRef);
  }

  ngAfterViewInit(): void {
    this.updateItemSize();
    this.nzResizeObserver
      .observe(this.cdkConnectedOverlay.overlayRef.overlayElement)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.updateItemSize();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Get size of list-item, base on `nzItemTemplate`
   */
  updateItemSize(): void {
    const itemEl = this.cdkConnectedOverlay.overlayRef.overlayElement;
    const newSize = this.nzOrientation === 'horizontal' ? itemEl!.clientWidth : itemEl!.clientHeight;
    if (newSize > 0 && (!this._initFlag || newSize !== this.autoSize)) {
      this._initFlag = true;
      this.autoSize = newSize;
      this.nzAutoSizeChange.emit(newSize);
      this.autoMinBufferPx = newSize * 2;
      this.autoMaxBufferPx = newSize * 5;
    }
  }

  isNumber(val: NumberInput): boolean {
    return typeof val === 'number';
  }
}
