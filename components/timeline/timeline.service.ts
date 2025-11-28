/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable()
export class TimelineService {
  check$ = new ReplaySubject<void>(1);

  markForCheck(): void {
    this.check$.next();
  }
}
