/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * A unstable container's DOM is not stable when the component initializes.
 * So it should emit a DOMRendered event after it's DOM is stable.
 *
 * For components that rely on a stable DOM from its ancestors (e.g affix and carousel)
 * it should re-render once it receives that DOMRendered event.
 */
import { InjectionToken, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { inNextTick } from '../util';

export const NZ_UNSTABLE_CONTAINER_TOKEN = new InjectionToken('nz_unstable_container_token');

export abstract class UnstableContainer implements OnDestroy {
  private domStable$ = new Subject<void>();

  ngOnDestroy(): void {
    this.domStable$.complete();
  }

  markDOMStable(): void {
    // Wait for the next tick.
    inNextTick().subscribe(() => this.domStable$.next());
  }

  subscribeDOMChange(): Observable<void> {
    return this.domStable$.asObservable();
  }
}
