/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { AnimationEvent } from '@angular/animations';
import { Injectable, OnDestroy, signal } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';

@Injectable()
export class NzSegmentedService implements OnDestroy {
  readonly name = signal<string | null>(null);
  readonly selected$ = new ReplaySubject<string | number>(1);
  readonly activated$ = new ReplaySubject<HTMLElement>(1);
  readonly change$ = new Subject<string | number>();
  readonly disabled$ = new ReplaySubject<boolean>(1);
  readonly animationDone$ = new Subject<AnimationEvent>();
  readonly keydown$ = new Subject<KeyboardEvent>();

  ngOnDestroy(): void {
    this.selected$.complete();
    this.activated$.complete();
    this.change$.complete();
    this.disabled$.complete();
    this.animationDone$.complete();
    this.keydown$.complete();
  }
}
