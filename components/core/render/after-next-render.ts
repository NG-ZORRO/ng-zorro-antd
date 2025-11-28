/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { InjectionToken, Injector, afterNextRender, inject } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * An injection token representing `afterNextRender` as an observable rather
 * than a callback-based API has been added. This might be necessary in code
 * where streams of data are already being used and we need to wait until
 * the change detection ends before performing any tasks.
 */
export const NZ_AFTER_NEXT_RENDER$ = new InjectionToken<Observable<void>>(
  typeof ngDevMode !== 'undefined' && ngDevMode ? 'nz-after-next-render' : '',
  {
    providedIn: 'root',
    factory: () => {
      const injector = inject(Injector);

      return new Observable<void>(subscriber => {
        const ref = afterNextRender(
          () => {
            subscriber.next();
            subscriber.complete();
          },
          { injector }
        );

        return () => ref.destroy();
      });
    }
  }
);
