/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directionality } from '@angular/cdk/bidi';
import { coerceCssPixelValue } from '@angular/cdk/coercion';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  input,
  ViewEncapsulation
} from '@angular/core';

import { isAnimationEnabled, NzNoAnimationDirective } from 'ng-zorro-antd/core/animation';
import { requestAnimationFrame } from 'ng-zorro-antd/core/polyfill';
import { generateClassName, getClassListFromValue } from 'ng-zorro-antd/core/util';

const MENU_PREFIX = 'ant-menu';
const COLLAPSE_MOTION_CLASS = 'ant-motion-collapse';

@Component({
  selector: '[nz-submenu-inline-child]',
  exportAs: 'nzSubmenuInlineChild',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<ng-content />`,
  host: {
    '[class]': 'mergedClass()',
    '(transitionend)': 'onTransitionEnd($event)'
  }
})
export class NzSubmenuInlineChildComponent {
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly noAnimation = inject(NzNoAnimationDirective, { optional: true, host: true });
  private readonly animationEnabled = isAnimationEnabled(() => !this.noAnimation?.nzNoAnimation?.());
  protected readonly dir = inject(Directionality).valueSignal;

  readonly menuClass = input<string>('');
  readonly open = input(false);

  private firstRender = true;

  protected readonly mergedClass = computed(() => {
    const customCls = getClassListFromValue(this.menuClass()) || [];
    const cls = [
      MENU_PREFIX,
      generateClassName(MENU_PREFIX, 'inline'),
      generateClassName(MENU_PREFIX, 'sub'),
      ...customCls
    ];
    if (this.dir() === 'rtl') {
      cls.push(generateClassName(MENU_PREFIX, 'rtl'));
    }
    return cls;
  });

  constructor() {
    effect(() => {
      const open = this.open();
      // should skip the first rendering
      const animationEnabled = this.animationEnabled() && !this.firstRender;
      const element = this.elementRef.nativeElement;

      if (open) {
        element.classList.remove(generateClassName(MENU_PREFIX, 'submenu-hidden'));
      }

      if (animationEnabled) {
        /**
         * | open  | animation stage | height | opacity |
         * | ----  | --------------- | ------ | ------- |
         * | true  | before          | 0            | 1 |
         * | true  | active          | scrollHeight | 1 |
         * | true  | end             | auto         | 1 |
         * | false | before          | scrollHeight | 0 |
         * | false | active          | 0            | 0 |
         * | false | end             | 0            | 0 |
         */
        element.classList.add(COLLAPSE_MOTION_CLASS);

        if (open) {
          // Wait for next frame to get correct scrollHeight after removing hidden class
          requestAnimationFrame(() => {
            const scrollHeight = this.getActualScrollHeight(element);
            element.style.height = coerceCssPixelValue(scrollHeight);
            element.style.opacity = '1';
          });
        } else {
          // Used for setting height to actual height when transition start
          const scrollHeight = this.getActualScrollHeight(element);
          element.style.height = coerceCssPixelValue(scrollHeight);
          requestAnimationFrame(() => {
            element.style.height = coerceCssPixelValue(0);
            element.style.opacity = '0';
          });
        }
      } else {
        if (open) {
          element.style.height = 'auto';
          element.style.opacity = '1';
        } else {
          element.style.height = coerceCssPixelValue(0);
          element.style.opacity = '0';
        }
      }

      this.firstRender = false;
    });
  }

  // Calculate height by summing up direct children's offsetHeight
  // This naturally excludes collapsed nested submenus since they have height: 0
  private getActualScrollHeight(element: HTMLElement): number {
    return Array.from(element.children).reduce((acc, child) => acc + (child as HTMLElement).offsetHeight, 0);
  }

  protected onTransitionEnd(event: TransitionEvent): void {
    if (!this.animationEnabled() || event.target !== this.elementRef.nativeElement) {
      return;
    }

    // set height to auto after transition end, so that it's height can be changed along with content
    if (this.open()) {
      this.elementRef.nativeElement.style.height = 'auto';
    } else {
      this.elementRef.nativeElement.classList.add(generateClassName(MENU_PREFIX, 'submenu-hidden'));
    }
    this.elementRef.nativeElement.classList.remove(COLLAPSE_MOTION_CLASS);
  }
}
