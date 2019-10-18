/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, NgZone, OnDestroy } from '@angular/core';

import { Subject } from 'rxjs';

import { isTouchEvent } from 'ng-zorro-antd/core';
import { NzResizeHandleMouseDownEvent } from './nz-resize-handle.component';

@Injectable()
export class NzResizableService implements OnDestroy {
  private document: Document;
  private listeners = new Map<string, (event: MouseEvent | TouchEvent) => void>();

  handleMouseDown$ = new Subject<NzResizeHandleMouseDownEvent>();
  documentMouseUp$ = new Subject<MouseEvent | TouchEvent>();
  documentMouseMove$ = new Subject<MouseEvent | TouchEvent>();
  mouseEntered$ = new Subject<boolean>();

  // tslint:disable-next-line:no-any
  constructor(private ngZone: NgZone, @Inject(DOCUMENT) document: any) {
    this.document = document;
  }

  startResizing(event: MouseEvent | TouchEvent): void {
    const _isTouchEvent = isTouchEvent(event);
    this.clearListeners();
    const moveEvent = _isTouchEvent ? 'touchmove' : 'mousemove';
    const upEvent = _isTouchEvent ? 'touchend' : 'mouseup';
    const moveEventHandler = (e: MouseEvent | TouchEvent) => {
      this.documentMouseMove$.next(e);
    };
    const upEventHandler = (e: MouseEvent | TouchEvent) => {
      this.documentMouseUp$.next(e);
      this.clearListeners();
    };

    this.listeners.set(moveEvent, moveEventHandler);
    this.listeners.set(upEvent, upEventHandler);

    this.ngZone.runOutsideAngular(() => {
      this.listeners.forEach((handler, name) => {
        this.document.addEventListener(name, handler as EventListener);
      });
    });
  }

  private clearListeners(): void {
    this.listeners.forEach((handler, name) => {
      this.document.removeEventListener(name, handler as EventListener);
    });
    this.listeners.clear();
  }

  ngOnDestroy(): void {
    this.handleMouseDown$.complete();
    this.documentMouseUp$.complete();
    this.documentMouseMove$.complete();
    this.mouseEntered$.complete();
    this.clearListeners();
  }
}
