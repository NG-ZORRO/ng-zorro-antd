/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Injectable } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';

import { NzSafeAny } from 'ng-zorro-antd/core/types';

@Injectable()
export class NzRadioService {
  selected$ = new ReplaySubject<NzSafeAny>(1);
  touched$ = new Subject<void>();
  disabled$ = new ReplaySubject<boolean>(1);
  name$ = new ReplaySubject<string>(1);
  touch(): void {
    this.touched$.next();
  }
  select(value: NzSafeAny): void {
    this.selected$.next(value);
  }
  setDisabled(value: boolean): void {
    this.disabled$.next(value);
  }
  setName(value: string): void {
    this.name$.next(value);
  }
}
