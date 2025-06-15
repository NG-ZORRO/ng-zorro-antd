/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Platform } from '@angular/cdk/platform';
import {
  AfterViewInit,
  booleanAttribute,
  DestroyRef,
  Directive,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  NgZone,
  numberAttribute,
  OnDestroy,
  Output,
  Renderer2
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs/operators';

import { ensureInBounds, fromEventOutsideAngular } from 'ng-zorro-antd/core/util';

import { getEventWithPoint } from './resizable-utils';
import { NzResizableService } from './resizable.service';
import { NzResizeDirection, NzResizeHandleMouseDownEvent } from './resize-handle.component';

export interface NzResizeEvent {
  width?: number;
  height?: number;
  col?: number;
  mouseEvent?: MouseEvent | TouchEvent;
  direction?: NzResizeDirection;
}

@Directive({
  selector: '[nz-resizable]',
  exportAs: 'nzResizable',
  providers: [NzResizableService],
  host: {
    class: 'nz-resizable',
    '[class.nz-resizable-resizing]': 'resizing',
    '[class.nz-resizable-disabled]': 'nzDisabled'
  }
})
export class NzResizableDirective implements AfterViewInit, OnDestroy {
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly renderer = inject(Renderer2);
  private readonly nzResizableService = inject(NzResizableService);
  private readonly platform = inject(Platform);
  private readonly ngZone = inject(NgZone);
  private readonly destroyRef = inject(DestroyRef);

  @Input() nzBounds: 'window' | 'parent' | ElementRef<HTMLElement> = 'parent';
  @Input() nzMaxHeight?: number;
  @Input() nzMaxWidth?: number;
  @Input({ transform: numberAttribute }) nzMinHeight: number = 40;
  @Input({ transform: numberAttribute }) nzMinWidth: number = 40;
  @Input({ transform: numberAttribute }) nzGridColumnCount: number = -1;
  @Input({ transform: numberAttribute }) nzMaxColumn: number = -1;
  @Input({ transform: numberAttribute }) nzMinColumn: number = -1;
  @Input({ transform: booleanAttribute }) nzLockAspectRatio: boolean = false;
  @Input({ transform: booleanAttribute }) nzPreview: boolean = false;
  @Input({ transform: booleanAttribute }) nzDisabled: boolean = false;
  @Output() readonly nzResize = new EventEmitter<NzResizeEvent>();
  @Output() readonly nzResizeEnd = new EventEmitter<NzResizeEvent>();
  @Output() readonly nzResizeStart = new EventEmitter<NzResizeEvent>();

  resizing = false;
  private elRect!: DOMRect;
  private currentHandleEvent: NzResizeHandleMouseDownEvent | null = null;
  private ghostElement: HTMLDivElement | null = null;
  private el!: HTMLElement;
  private sizeCache: NzResizeEvent | null = null;

  constructor() {
    this.nzResizableService.handleMouseDownOutsideAngular$.pipe(takeUntilDestroyed()).subscribe(event => {
      if (this.nzDisabled) {
        return;
      }
      this.resizing = true;
      this.nzResizableService.startResizing(event.mouseEvent);
      this.currentHandleEvent = event;
      if (this.nzResizeStart.observers.length) {
        this.ngZone.run(() => this.nzResizeStart.emit({ mouseEvent: event.mouseEvent, direction: event.direction }));
      }
      this.elRect = this.el.getBoundingClientRect();
    });

    this.nzResizableService.documentMouseUpOutsideAngular$
      .pipe(takeUntilDestroyed(), filter(Boolean))
      .subscribe(event => {
        if (this.resizing) {
          this.resizing = false;
          this.nzResizableService.documentMouseUpOutsideAngular$.next(null);
          this.endResize(event);
        }
      });

    this.nzResizableService.documentMouseMoveOutsideAngular$.pipe(takeUntilDestroyed()).subscribe(event => {
      if (this.resizing) {
        this.resize(event);
      }
    });
  }

  setPosition(): void {
    const position = getComputedStyle(this.el).position;
    if (position === 'static' || !position) {
      this.renderer.setStyle(this.el, 'position', 'relative');
    }
  }

  calcSize(width: number, height: number, ratio: number): NzResizeEvent {
    let newWidth: number;
    let newHeight: number;
    let maxWidth: number;
    let maxHeight: number;
    let col = 0;
    let spanWidth = 0;
    let minWidth = this.nzMinWidth;
    let boundWidth = Infinity;
    let boundHeight = Infinity;
    if (this.nzBounds === 'parent') {
      const parent = this.renderer.parentNode(this.el);
      if (parent instanceof HTMLElement) {
        const parentRect = parent.getBoundingClientRect();
        boundWidth = parentRect.width;
        boundHeight = parentRect.height;
      }
    } else if (this.nzBounds === 'window') {
      if (typeof window !== 'undefined') {
        boundWidth = window.innerWidth;
        boundHeight = window.innerHeight;
      }
    } else if (this.nzBounds && this.nzBounds.nativeElement && this.nzBounds.nativeElement instanceof HTMLElement) {
      const boundsRect = this.nzBounds.nativeElement.getBoundingClientRect();
      boundWidth = boundsRect.width;
      boundHeight = boundsRect.height;
    }

    maxWidth = ensureInBounds(this.nzMaxWidth!, boundWidth);
    // eslint-disable-next-line prefer-const
    maxHeight = ensureInBounds(this.nzMaxHeight!, boundHeight);

    if (this.nzGridColumnCount !== -1) {
      spanWidth = maxWidth / this.nzGridColumnCount;
      minWidth = this.nzMinColumn !== -1 ? spanWidth * this.nzMinColumn : minWidth;
      maxWidth = this.nzMaxColumn !== -1 ? spanWidth * this.nzMaxColumn : maxWidth;
    }

    if (ratio !== -1) {
      if (/(left|right)/i.test(this.currentHandleEvent!.direction)) {
        newWidth = Math.min(Math.max(width, minWidth), maxWidth);
        newHeight = Math.min(Math.max(newWidth / ratio, this.nzMinHeight), maxHeight);
        if (newHeight >= maxHeight || newHeight <= this.nzMinHeight) {
          newWidth = Math.min(Math.max(newHeight * ratio, minWidth), maxWidth);
        }
      } else {
        newHeight = Math.min(Math.max(height, this.nzMinHeight), maxHeight);
        newWidth = Math.min(Math.max(newHeight * ratio, minWidth), maxWidth);
        if (newWidth >= maxWidth || newWidth <= minWidth) {
          newHeight = Math.min(Math.max(newWidth / ratio, this.nzMinHeight), maxHeight);
        }
      }
    } else {
      newWidth = Math.min(Math.max(width, minWidth), maxWidth);
      newHeight = Math.min(Math.max(height, this.nzMinHeight), maxHeight);
    }

    if (this.nzGridColumnCount !== -1) {
      col = Math.round(newWidth / spanWidth);
      newWidth = col * spanWidth;
    }

    return {
      col,
      width: newWidth,
      height: newHeight
    };
  }

  resize(event: MouseEvent | TouchEvent): void {
    const elRect = this.elRect;
    const resizeEvent = getEventWithPoint(event);
    const handleEvent = getEventWithPoint(this.currentHandleEvent!.mouseEvent);
    let width = elRect.width;
    let height = elRect.height;
    const ratio = this.nzLockAspectRatio ? width / height : -1;
    switch (this.currentHandleEvent!.direction) {
      case 'bottomRight':
        width = resizeEvent.clientX - elRect.left;
        height = resizeEvent.clientY - elRect.top;
        break;
      case 'bottomLeft':
        width = elRect.width + handleEvent.clientX - resizeEvent.clientX;
        height = resizeEvent.clientY - elRect.top;
        break;
      case 'topRight':
        width = resizeEvent.clientX - elRect.left;
        height = elRect.height + handleEvent.clientY - resizeEvent.clientY;
        break;
      case 'topLeft':
        width = elRect.width + handleEvent.clientX - resizeEvent.clientX;
        height = elRect.height + handleEvent.clientY - resizeEvent.clientY;
        break;
      case 'top':
        height = elRect.height + handleEvent.clientY - resizeEvent.clientY;
        break;
      case 'right':
        width = resizeEvent.clientX - elRect.left;
        break;
      case 'bottom':
        height = resizeEvent.clientY - elRect.top;
        break;
      case 'left':
        width = elRect.width + handleEvent.clientX - resizeEvent.clientX;
    }
    const size = this.calcSize(width, height, ratio);
    this.sizeCache = { ...size };
    // Re-enter the Angular zone and run the change detection only if there are any `nzResize` listeners,
    // e.g.: `<div nz-resizable (nzResize)="..."></div>`.
    if (this.nzResize.observers.length) {
      this.ngZone.run(() => {
        this.nzResize.emit({
          ...size,
          mouseEvent: event,
          direction: this.currentHandleEvent!.direction
        });
      });
    }
    if (this.nzPreview) {
      this.previewResize(size);
    }
  }

  endResize(event: MouseEvent | TouchEvent): void {
    this.removeGhostElement();
    const size = this.sizeCache
      ? { ...this.sizeCache }
      : {
          width: this.elRect.width,
          height: this.elRect.height
        };
    // Re-enter the Angular zone and run the change detection only if there are any `nzResizeEnd` listeners,
    // e.g.: `<div nz-resizable (nzResizeEnd)="..."></div>`.
    if (this.nzResizeEnd.observers.length) {
      this.ngZone.run(() => {
        this.nzResizeEnd.emit({
          ...size,
          mouseEvent: event,
          direction: this.currentHandleEvent!.direction
        });
      });
    }
    this.sizeCache = null;
    this.currentHandleEvent = null;
  }

  previewResize({ width, height }: NzResizeEvent): void {
    this.createGhostElement();
    this.renderer.setStyle(this.ghostElement, 'width', `${width}px`);
    this.renderer.setStyle(this.ghostElement, 'height', `${height}px`);
  }

  createGhostElement(): void {
    if (!this.ghostElement) {
      this.ghostElement = this.renderer.createElement('div');
      this.renderer.setAttribute(this.ghostElement, 'class', 'nz-resizable-preview');
    }
    this.renderer.appendChild(this.el, this.ghostElement);
  }

  removeGhostElement(): void {
    if (this.ghostElement) {
      this.renderer.removeChild(this.el, this.ghostElement);
    }
  }

  ngAfterViewInit(): void {
    if (!this.platform.isBrowser) {
      return;
    }

    this.el = this.elementRef.nativeElement;
    this.setPosition();

    fromEventOutsideAngular(this.el, 'mouseenter')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.nzResizableService.mouseEnteredOutsideAngular$.next(true);
      });

    fromEventOutsideAngular(this.el, 'mouseleave')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.nzResizableService.mouseEnteredOutsideAngular$.next(false);
      });
  }

  ngOnDestroy(): void {
    this.ghostElement = null;
    this.sizeCache = null;
  }
}
