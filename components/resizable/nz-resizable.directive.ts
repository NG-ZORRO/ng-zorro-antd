/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Platform } from '@angular/cdk/platform';
import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  NgZone,
  OnDestroy,
  Output,
  Renderer2
} from '@angular/core';

import { InputBoolean } from 'ng-zorro-antd/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { NzResizableService } from './nz-resizable.service';
import { NzResizeHandleMouseDownEvent } from './nz-resize-handle.component';

export interface NzResizeEvent {
  width?: number;
  height?: number;
  col?: number;
  mouseEvent?: MouseEvent;
}

@Directive({
  selector: '[nz-resizable]',
  providers: [NzResizableService],
  host: {
    '[class.nz-resizable]': 'true',
    '[class.nz-resizable-resizing]': 'resizing',
    '(mouseenter)': 'onMouseenter()',
    '(mouseleave)': 'onMouseleave()'
  }
})
export class NzResizableDirective implements AfterViewInit, OnDestroy {
  @Input() nzBounds: 'window' | 'parent' | ElementRef<HTMLElement> = 'parent';
  @Input() nzMaxHeight: number;
  @Input() nzMaxWidth: number;
  @Input() nzMinHeight: number = 40;
  @Input() nzMinWidth: number = 40;
  @Input() nzGridColumnCount: number = -1;
  @Input() nzMaxColumn: number = -1;
  @Input() nzMinColumn: number = -1;
  @Input() @InputBoolean() nzLockAspectRatio: boolean = false;
  @Input() @InputBoolean() nzPreview: boolean = false;
  @Output() readonly nzResize = new EventEmitter<NzResizeEvent>();
  @Output() readonly nzResizeEnd = new EventEmitter<NzResizeEvent>();
  @Output() readonly nzResizeStart = new EventEmitter<NzResizeEvent>();

  resizing = false;
  elRect: ClientRect | DOMRect;
  currentHandleEvent: NzResizeHandleMouseDownEvent;
  ghostElement: HTMLDivElement | null;
  el: HTMLElement;
  sizeCache: NzResizeEvent | null;
  private destroy$ = new Subject<void>();

  constructor(
    private elementRef: ElementRef<HTMLElement>,
    private renderer: Renderer2,
    private ngZone: NgZone,
    private nzResizableService: NzResizableService,
    private platform: Platform
  ) {
    this.nzResizableService.handleMouseDown$.pipe(takeUntil(this.destroy$)).subscribe(event => {
      this.resizing = true;
      this.currentHandleEvent = event;
      this.setCursor();
      this.nzResizeStart.emit({
        mouseEvent: event.mouseEvent
      });
      this.elRect = this.el.getBoundingClientRect();
    });
  }

  @HostListener('document:mouseup', ['$event'])
  onMouseup($event: MouseEvent): void {
    this.ngZone.runOutsideAngular(() => {
      if (this.resizing) {
        this.resizing = false;
        this.nzResizableService.documentMouseUp$.next();
        this.endResize($event);
      }
    });
  }

  @HostListener('document:mousemove', ['$event'])
  onMousemove($event: MouseEvent): void {
    this.ngZone.runOutsideAngular(() => {
      if (this.resizing) {
        this.resize($event);
      }
    });
  }

  onMouseenter(): void {
    this.nzResizableService.mouseEntered$.next(true);
  }

  onMouseleave(): void {
    this.nzResizableService.mouseEntered$.next(false);
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
    let col = 0;
    let spanWidth = 0;
    let maxWidth = Infinity;
    let minWidth = this.nzMinWidth;
    let maxHeight = Infinity;
    if (this.nzBounds === 'parent') {
      const parent = this.renderer.parentNode(this.el);
      if (parent instanceof HTMLElement) {
        const parentRect = parent.getBoundingClientRect();
        maxWidth = this.nzMaxWidth
          ? this.nzMaxWidth < parentRect.width
            ? this.nzMaxWidth
            : parentRect.width
          : parentRect.width;
        maxHeight = this.nzMaxHeight
          ? this.nzMaxHeight < parentRect.height
            ? this.nzMaxHeight
            : parentRect.height
          : parentRect.height;
      }
    } else if (this.nzBounds === 'window') {
      if (typeof window !== 'undefined') {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        maxWidth = this.nzMaxWidth ? (this.nzMaxWidth < windowWidth ? this.nzMaxWidth : windowWidth) : windowWidth;
        maxHeight = this.nzMaxHeight
          ? this.nzMaxHeight < windowHeight
            ? this.nzMaxHeight
            : windowHeight
          : windowHeight;
      }
    } else if (this.nzBounds && this.nzBounds.nativeElement && this.nzBounds.nativeElement instanceof HTMLElement) {
      const boundsRect = this.nzBounds.nativeElement.getBoundingClientRect();
      maxWidth = this.nzMaxWidth
        ? this.nzMaxWidth < boundsRect.width
          ? this.nzMaxWidth
          : boundsRect.width
        : boundsRect.width;
      maxHeight = this.nzMaxHeight
        ? this.nzMaxHeight < boundsRect.height
          ? this.nzMaxHeight
          : boundsRect.height
        : boundsRect.height;
    }

    if (this.nzGridColumnCount !== -1) {
      spanWidth = maxWidth / this.nzGridColumnCount;
      minWidth = this.nzMinColumn !== -1 ? spanWidth * this.nzMinColumn : minWidth;
      maxWidth = this.nzMaxColumn !== -1 ? spanWidth * this.nzMaxColumn : maxWidth;
    }

    if (ratio !== -1) {
      if (/(left|right)/i.test(this.currentHandleEvent.direction)) {
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

  setCursor(): void {
    switch (this.currentHandleEvent.direction) {
      case 'left':
      case 'right':
        this.renderer.setStyle(document.body, 'cursor', 'col-resize');
        break;
      case 'top':
      case 'bottom':
        this.renderer.setStyle(document.body, 'cursor', 'row-resize');
        break;
      case 'topLeft':
      case 'bottomRight':
        this.renderer.setStyle(document.body, 'cursor', 'nwse-resize');
        break;
      case 'topRight':
      case 'bottomLeft':
        this.renderer.setStyle(document.body, 'cursor', 'nesw-resize');
        break;
    }
    this.renderer.setStyle(document.body, 'user-select', 'none');
  }

  resize($event: MouseEvent): void {
    const elRect = this.elRect;
    let width = elRect.width;
    let height = elRect.height;
    const ratio = this.nzLockAspectRatio ? width / height : -1;
    switch (this.currentHandleEvent.direction) {
      case 'bottomRight':
        width = $event.clientX - elRect.left;
        height = $event.clientY - elRect.top;
        break;
      case 'bottomLeft':
        width = elRect.width + this.currentHandleEvent.mouseEvent.clientX - $event.clientX;
        height = $event.clientY - elRect.top;
        break;
      case 'topRight':
        width = $event.clientX - elRect.left;
        height = elRect.height + this.currentHandleEvent.mouseEvent.clientY - $event.clientY;
        break;
      case 'topLeft':
        width = elRect.width + this.currentHandleEvent.mouseEvent.clientX - $event.clientX;
        height = elRect.height + this.currentHandleEvent.mouseEvent.clientY - $event.clientY;
        break;
      case 'top':
        height = elRect.height + this.currentHandleEvent.mouseEvent.clientY - $event.clientY;
        break;
      case 'right':
        width = $event.clientX - elRect.left;
        break;
      case 'bottom':
        height = $event.clientY - elRect.top;
        break;
      case 'left':
        width = elRect.width + this.currentHandleEvent.mouseEvent.clientX - $event.clientX;
    }
    const size = this.calcSize(width, height, ratio);
    this.sizeCache = { ...size };
    this.nzResize.emit({
      ...size,
      mouseEvent: $event
    });
    if (this.nzPreview) {
      this.previewResize(size);
    }
  }

  endResize($event: MouseEvent): void {
    this.renderer.setStyle(document.body, 'cursor', '');
    this.renderer.setStyle(document.body, 'user-select', '');
    this.removeGhostElement();
    const size = this.sizeCache
      ? { ...this.sizeCache }
      : {
          width: this.elRect.width,
          height: this.elRect.height
        };
    this.nzResizeEnd.emit({
      ...size,
      mouseEvent: $event
    });
    this.sizeCache = null;
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
    if (this.platform.isBrowser) {
      this.el = this.elementRef.nativeElement;
      this.setPosition();
    }
  }

  ngOnDestroy(): void {
    this.ghostElement = null;
    this.sizeCache = null;
    this.destroy$.next();
    this.destroy$.complete();
  }
}
