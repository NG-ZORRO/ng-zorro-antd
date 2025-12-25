/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { _IdGenerator } from '@angular/cdk/a11y';
import { ANIMATION_MODULE_TYPE, inject, Injectable, OnDestroy, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class NzSegmentedService implements OnDestroy {
  private readonly animationType = inject(ANIMATION_MODULE_TYPE, { optional: true });
  private readonly defaultName = inject(_IdGenerator).getId('segmented_');

  readonly name = signal<string | null>(this.defaultName);
  readonly selected$ = new ReplaySubject<string | number>(1);
  readonly activated$ = new ReplaySubject<HTMLElement>(1);
  readonly change$ = new Subject<string | number>();
  readonly disabled$ = new ReplaySubject<boolean>(1);
  readonly animating$ = new BehaviorSubject<boolean>(false);
  readonly keydown$ = new Subject<KeyboardEvent>();

  readonly showThumb = toSignal(this.animating$.pipe(map(animating => this._animationEnabled && animating)));

  get _animationEnabled(): boolean {
    return this.animationType !== 'NoopAnimations';
  }

  setName(name: string | null | undefined): void {
    this.name.set(typeof name === 'undefined' ? this.defaultName : name);
  }

  ngOnDestroy(): void {
    this.selected$.complete();
    this.activated$.complete();
    this.change$.complete();
    this.disabled$.complete();
    this.animating$.complete();
    this.keydown$.complete();
  }
}
