/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { AnimationEvent } from '@angular/animations';
import { _IdGenerator } from '@angular/cdk/a11y';
import { inject, Injectable, OnDestroy, signal } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';

@Injectable()
export class NzSegmentedService implements OnDestroy {
  private readonly defaultName = inject(_IdGenerator).getId('segmented_');

  readonly name = signal<string | null>(this.defaultName);
  readonly selected$ = new ReplaySubject<string | number>(1);
  readonly activated$ = new ReplaySubject<HTMLElement>(1);
  readonly change$ = new Subject<string | number>();
  readonly disabled$ = new ReplaySubject<boolean>(1);
  readonly animationDone$ = new Subject<AnimationEvent>();
  readonly keydown$ = new Subject<KeyboardEvent>();

  setName(name: string | null | undefined): void {
    this.name.set(typeof name === 'undefined' ? this.defaultName : name);
  }

  ngOnDestroy(): void {
    this.selected$.complete();
    this.activated$.complete();
    this.change$.complete();
    this.disabled$.complete();
    this.animationDone$.complete();
    this.keydown$.complete();
  }
}
