/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Injectable, NgZone } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { auditTime } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NzDomEventService {
  private countOfResizeListener = 0;
  private readonly resizeSource = new Subject<void>();
  private readonly domEventListeners = new Map<
    string,
    {
      handler(event: Event): void;
    }
  >();

  constructor(private ngZone: NgZone) {}

  registerResizeListener(): Observable<void> {
    this.countOfResizeListener += 1;

    if (this.countOfResizeListener === 1) {
      this.domEventListeners.set('resize', {
        handler: (): void => {
          this.resizeSource.next();
        }
      });

      this.ngZone.runOutsideAngular(() => {
        this.domEventListeners.forEach((config, name) => {
          window.addEventListener(name, config.handler);
        });
      });
    }

    return this.resizeSource.pipe(auditTime(16));
  }

  unregisterResizeListener(): void {
    this.countOfResizeListener -= 1;

    if (this.countOfResizeListener === 0) {
      this.domEventListeners.forEach((config, name) => {
        window.removeEventListener(name, config.handler);
      });

      this.domEventListeners.clear();
    }
  }
}
