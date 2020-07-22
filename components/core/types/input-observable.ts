/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { SimpleChange } from '@angular/core';
import { Observable } from 'rxjs';

export interface InputObservable {
  getInputObservable<K extends keyof this>(changeType: K): Observable<SimpleChange>;
}
