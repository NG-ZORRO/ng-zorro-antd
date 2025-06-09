/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { DestroyRef, inject, Injectable, NgZone, RendererFactory2 } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { auditTime, finalize } from 'rxjs/operators';

const NOOP = (): void => {};

@Injectable({
  providedIn: 'root'
})
export class NzResizeService {
  private ngZone = inject(NgZone);
  private destroyRef = inject(DestroyRef);
  private readonly resizeSource$ = new Subject<void>();

  private listeners = 0;

  private renderer = inject(RendererFactory2).createRenderer(null, null);

  private disposeHandle = NOOP;

  private handler = (): void => {
    this.ngZone.run(() => {
      this.resizeSource$.next();
    });
  };

  constructor() {
    this.destroyRef.onDestroy(() => {
      // Caretaker note: the `handler` is an instance property (it's not defined on the class prototype).
      this.handler = NOOP;
    });
  }

  connect(): Observable<void> {
    this.registerListener();

    return this.resizeSource$.pipe(
      auditTime(16),
      finalize(() => this.unregisterListener())
    );
  }

  disconnet(): void {
    this.unregisterListener();
  }

  private registerListener(): void {
    if (this.listeners === 0) {
      this.ngZone.runOutsideAngular(() => {
        this.disposeHandle = this.renderer.listen('window', 'resize', this.handler);
      });
    }

    this.listeners += 1;
  }

  private unregisterListener(): void {
    this.listeners -= 1;

    if (this.listeners === 0) {
      this.disposeHandle();
      this.disposeHandle = NOOP;
    }
  }
}
