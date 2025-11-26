/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  assertInInjectionContext,
  booleanAttribute,
  computed,
  Directive,
  inject,
  input,
  NgModule,
  Provider,
  signal,
  Signal
} from '@angular/core';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';

export const NZ_NO_ANIMATION_CLASS = 'nz-animate-disabled';

@Directive({
  selector: '[nzNoAnimation]',
  exportAs: 'nzNoAnimation',
  host: {
    '[class.nz-animate-disabled]': `nzNoAnimation() || animationType === 'NoopAnimations'`
  }
})
export class NzNoAnimationDirective {
  readonly animationType = inject(ANIMATION_MODULE_TYPE, { optional: true });
  readonly nzNoAnimation = input(false, { transform: booleanAttribute });
}

/**
 * @deprecated Will be removed in v23, please use `NzNoAnimationDirective` instead.
 */
@NgModule({
  imports: [NzNoAnimationDirective],
  exports: [NzNoAnimationDirective]
})
export class NzNoAnimationModule {}

/**
 * Returns the set of dependency-injection providers to disable animations in a context.
 */
export function provideNzNoAnimation(): Provider[] {
  return [
    {
      provide: ANIMATION_MODULE_TYPE,
      useValue: 'NoopAnimations'
    }
  ];
}

export function wrapAnimationClass(classNameGetter: () => string): Signal<string> {
  if (typeof ngDevMode !== 'undefined' && ngDevMode) {
    assertInInjectionContext(wrapAnimationClass);
  }

  const animationType = inject(ANIMATION_MODULE_TYPE, { optional: true });
  return animationType === 'NoopAnimations' ? signal(NZ_NO_ANIMATION_CLASS) : computed(classNameGetter);
}
