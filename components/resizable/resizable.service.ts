/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, NgZone, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { isTouchEvent } from 'ng-zorro-antd/core/util';

import { NzResizeHandleMouseDownEvent } from './resize-handle.component';

@Injectable()
export class NzResizableService implements OnDestroy {
  private document: Document;
  private listeners = new Map<string, (event: MouseEvent | TouchEvent) => void>();

  /**
   * The `OutsideAngular` prefix means that the subject will emit events outside of the Angular zone,
   * so that becomes a bit more descriptive for those who'll maintain the code in the future:
   * ```ts
   * nzResizableService.handleMouseDownOutsideAngular$.subscribe(event => {
   *   console.log(Zone.current); // <root>
   *   console.log(NgZone.isInAngularZone()); // false
   * });
   * ```
   */
  handleMouseDownOutsideAngular$ = new Subject<NzResizeHandleMouseDownEvent>();
  documentMouseUpOutsideAngular$ = new Subject<MouseEvent | TouchEvent>();
  documentMouseMoveOutsideAngular$ = new Subject<MouseEvent | TouchEvent>();
  mouseEnteredOutsideAngular$ = new Subject<boolean>();

  constructor(private ngZone: NgZone, @Inject(DOCUMENT) document: NzSafeAny) {
    this.document = document;
  }

  startResizing(event: MouseEvent | TouchEvent): void {
    const _isTouchEvent = isTouchEvent(event);
    this.clearListeners();
    const moveEvent = _isTouchEvent ? 'touchmove' : 'mousemove';
    const upEvent = _isTouchEvent ? 'touchend' : 'mouseup';
    const moveEventHandler = (e: MouseEvent | TouchEvent): void => {
      this.documentMouseMoveOutsideAngular$.next(e);
    };
    const upEventHandler = (e: MouseEvent | TouchEvent): void => {
      this.documentMouseUpOutsideAngular$.next(e);
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
    this.handleMouseDownOutsideAngular$.complete();
    this.documentMouseUpOutsideAngular$.complete();
    this.documentMouseMoveOutsideAngular$.complete();
    this.mouseEnteredOutsideAngular$.complete();
    this.clearListeners();
  }
}
