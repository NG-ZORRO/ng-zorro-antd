/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Injectable, NgZone, Renderer2, RendererFactory2 } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { auditTime } from 'rxjs/operators';

interface Listener {
  handler(e: Event): void;
  unsubscribe?(): void;
  countOfListeners: number;
}

@Injectable({
  providedIn: 'root'
})
export class NzDomEventService {
  private readonly resizeSource = new Subject<void>();
  private readonly domEventListeners = new Map<string, Listener>();
  private renderer: Renderer2;

  constructor(private ngZone: NgZone, private rendererFactory2: RendererFactory2) {
    this.renderer = this.rendererFactory2.createRenderer(null, null);
  }

  registerResizeListener(): Observable<void> {
    if (!this.domEventListeners.has('resize')) {
      this.domEventListeners.set('resize', {
        handler: (): void => {
          this.resizeSource.next();
        },
        countOfListeners: 0
      });
    }

    const listener = this.domEventListeners.get('resize')!;
    this.tryToStartListener(listener, 'resize');

    return this.resizeSource.pipe(auditTime(16));
  }

  unregisterResizeListener(): void {
    if (!this.domEventListeners.has('resize')) {
      return;
    }

    const listener = this.domEventListeners.get('resize')!;
    this.tryToStopListener(listener);
  }

  private tryToStartListener(l: Listener, name: string): void {
    l.countOfListeners += 1;
    this.ngZone.runOutsideAngular(() => {
      if (l.countOfListeners === 1) {
        l.unsubscribe = this.renderer.listen('window', name, l.handler);
      }
    });
  }

  private tryToStopListener(l: Listener): void {
    l.countOfListeners -= 1;
    if (l.countOfListeners === 0) {
      l.unsubscribe!();
      l.unsubscribe = undefined;
    }
  }
}
