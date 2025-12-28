/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ANIMATION_MODULE_TYPE,
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

export const NZ_NO_ANIMATION_CLASS = 'nz-animate-disabled';

@Directive({
  selector: '[nzNoAnimation]',
  exportAs: 'nzNoAnimation',
  host: {
    [`[class.${NZ_NO_ANIMATION_CLASS}]`]: `nzNoAnimation() || animationType === 'NoopAnimations'`
  }
})
export class NzNoAnimationDirective {
  readonly animationType = inject(ANIMATION_MODULE_TYPE, { optional: true });
  readonly nzNoAnimation = input(false, { transform: booleanAttribute });
}

/**
 * @deprecated Will be removed in v23, please use {@link NzNoAnimationDirective} instead.
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

function _internalAnimationEnabled(): boolean {
  return inject(ANIMATION_MODULE_TYPE, { optional: true }) !== 'NoopAnimations';
}

/**
 * If the current animation mode is `NoopAnimations`, returns the false as a signal.
 * Otherwise, returns the result of the provided getter as a computed signal.
 * @param getter A function that returns the outer logic for whether animations are enabled.
 */
export function isAnimationEnabled(getter: () => boolean): Signal<boolean> {
  if (typeof ngDevMode !== 'undefined' && ngDevMode) {
    assertInInjectionContext(isAnimationEnabled);
  }

  return _internalAnimationEnabled() ? computed(getter) : signal(false);
}

/**
 * If the current animation mode is `NoopAnimations`, returns the no-animation class as a signal.
 * Otherwise, returns the result of the provided class name getter as a computed signal.
 * @param classNameGetter A function that returns the class name string.
 */
export function withAnimationCheck(classNameGetter: () => string): Signal<string> {
  if (typeof ngDevMode !== 'undefined' && ngDevMode) {
    assertInInjectionContext(withAnimationCheck);
  }

  return _internalAnimationEnabled() ? computed(classNameGetter) : signal(NZ_NO_ANIMATION_CLASS);
}
