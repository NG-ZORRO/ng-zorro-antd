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

/**
 * If the current animation mode is `NoopAnimations`, returns the no-animation class as a signal.
 * Otherwise, returns the result of the provided class name getter as a computed signal.
 * @param classNameGetter A function that returns the class name string.
 */
export function withAnimationCheck(classNameGetter: () => string): Signal<string> {
  if (typeof ngDevMode !== 'undefined' && ngDevMode) {
    assertInInjectionContext(withAnimationCheck);
  }

  const animationType = inject(ANIMATION_MODULE_TYPE, { optional: true });
  return animationType === 'NoopAnimations' ? signal(NZ_NO_ANIMATION_CLASS) : computed(classNameGetter);
}
