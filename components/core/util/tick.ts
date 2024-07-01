/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Observable, Subject } from 'rxjs';
import { take } from 'rxjs/operators';

export function inNextTick(): Observable<void> {
  const timer = new Subject<void>();
  Promise.resolve().then(() => timer.next());
  return timer.pipe(take(1));
}
