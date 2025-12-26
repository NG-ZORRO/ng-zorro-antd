/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { _IdGenerator } from '@angular/cdk/a11y';
import { computed, DestroyRef, inject, Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';

import { isAnimationEnabled } from 'ng-zorro-antd/core/animation';

@Injectable()
export class NzSegmentedService {
  private readonly defaultName = inject(_IdGenerator).getId('segmented_');

  readonly name = signal<string | null>(this.defaultName);
  readonly selected$ = new ReplaySubject<string | number>(1);
  readonly activated$ = new ReplaySubject<HTMLElement>(1);
  readonly change$ = new Subject<string | number>();
  readonly disabled$ = new ReplaySubject<boolean>(1);
  readonly animating$ = new BehaviorSubject<boolean>(false);
  readonly keydown$ = new Subject<KeyboardEvent>();

  private readonly _animating = toSignal(this.animating$, { initialValue: false });
  readonly animationEnabled = isAnimationEnabled(() => true);
  readonly showThumb = computed(() => this.animationEnabled() && this._animating());

  constructor() {
    inject(DestroyRef).onDestroy(() => {
      this.selected$.complete();
      this.activated$.complete();
      this.change$.complete();
      this.disabled$.complete();
      this.animating$.complete();
      this.keydown$.complete();
    });
  }

  setName(name: string | null | undefined): void {
    this.name.set(typeof name === 'undefined' ? this.defaultName : name);
  }
}
