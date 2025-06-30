/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { type Direction, Directionality } from '@angular/cdk/bidi';
import { assertInInjectionContext, computed, inject, type Signal, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

type InjectedDirectionality = Signal<Direction> & { isRtl: Signal<boolean> };

export function nzInjectDirectionality(onChange?: (direction: Direction) => void): InjectedDirectionality {
  if (typeof ngDevMode !== 'undefined' && ngDevMode) {
    assertInInjectionContext(nzInjectDirectionality);
  }

  const directionality = inject(Directionality, { optional: true });
  const direction = signal<Direction>(directionality?.value || 'ltr');

  directionality?.change.pipe(takeUntilDestroyed()).subscribe(newDirection => {
    direction.set(newDirection);
    onChange?.(newDirection);
  });

  return Object.defineProperty(direction.asReadonly(), 'isRtl', {
    value: computed(() => direction() === 'rtl')
  }) as InjectedDirectionality;
}
