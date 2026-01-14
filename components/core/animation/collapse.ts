/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { coerceCssPixelValue } from '@angular/cdk/coercion';
import { AnimationCallbackEvent, Directive, effect, ElementRef, inject, Injectable, input } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, take } from 'rxjs/operators';

import { requestAnimationFrame } from 'ng-zorro-antd/core/polyfill';

import { isAnimationEnabled, NzNoAnimationDirective } from './no-animation';

const COLLAPSE_MOTION_CLASS = 'ant-motion-collapse';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[animation-collapse]',
  host: {
    '(transitionend)': 'onTransitionEnd($event)'
  }
})
export class NzAnimationCollapseDirective {
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly noAnimation = inject(NzNoAnimationDirective, { optional: true, host: true });
  private readonly animationEnabled = isAnimationEnabled(() => !this.noAnimation?.nzNoAnimation());

  readonly open = input<boolean>(false);
  readonly leavedClassName = input<string>('');
  private firstRender = true;

  constructor() {
    effect(() => {
      const open = this.open();
      // should skip the first rendering
      const animationEnabled = this.animationEnabled() && !this.firstRender;
      const element = this.elementRef.nativeElement;
      const leavedClassName = this.leavedClassName();

      if (open && leavedClassName) {
        element.classList.remove(leavedClassName);
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
          if (leavedClassName) {
            element.classList.add(leavedClassName);
          }
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
    } else if (this.leavedClassName()) {
      this.elementRef.nativeElement.classList.add(this.leavedClassName());
    }

    this.elementRef.nativeElement.classList.remove(COLLAPSE_MOTION_CLASS);
  }
}

@Injectable()
export class NzAnimationTreeCollapseService {
  firstRender = true;
  virtualScroll = false;

  readonly animationDone$ = new Subject<void>();

  constructor() {
    this.animationDone$.pipe(debounceTime(50), take(1)).subscribe(() => {
      this.firstRender = false;
    });
  }
}

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[animation-tree-collapse]',
  host: {
    '(animate.enter)': 'onAnimationEnter($event)',
    '(animate.leave)': 'onAnimationLeave($event)'
  }
})
export class NzAnimationTreeCollapseDirective {
  private readonly treeCollapseService = inject(NzAnimationTreeCollapseService, { optional: true });
  private readonly noAnimation = inject(NzNoAnimationDirective, { optional: true, host: true });
  // should disable animation in virtual scrolling
  private readonly animationEnabled = isAnimationEnabled(
    () => !this.noAnimation?.nzNoAnimation() && !(this.treeCollapseService?.virtualScroll ?? false)
  );

  private get firstRender(): boolean {
    return this.treeCollapseService?.firstRender ?? false;
  }

  protected onAnimationEnter(event: AnimationCallbackEvent): void {
    if (!this.animationEnabled() || this.firstRender) {
      this.treeCollapseService?.animationDone$.next();
      event.animationComplete();
      return;
    }

    const element = event.target as HTMLElement;
    element.style.height = coerceCssPixelValue(0);
    element.style.opacity = '0';
    element.classList.add(COLLAPSE_MOTION_CLASS);

    const onTransitionEnd = (e: TransitionEvent): void => {
      // Only handle height transition to avoid premature cleanup
      if (e.propertyName !== 'height') {
        return;
      }
      element.removeEventListener('transitionend', onTransitionEnd);
      element.style.height = 'auto';
      element.classList.remove(COLLAPSE_MOTION_CLASS);
      event.animationComplete();
    };

    requestAnimationFrame(() => {
      element.style.height = coerceCssPixelValue(element.scrollHeight);
      element.style.opacity = '1';
    });

    element.addEventListener('transitionend', onTransitionEnd);
  }

  protected onAnimationLeave(event: AnimationCallbackEvent): void {
    if (!this.animationEnabled()) {
      event.animationComplete();
      return;
    }

    const element = event.target as HTMLElement;
    element.style.height = coerceCssPixelValue(element.scrollHeight);
    element.style.opacity = '1';
    element.classList.add(COLLAPSE_MOTION_CLASS);

    const onTransitionEnd = (e: TransitionEvent): void => {
      // Only handle height transition to avoid premature cleanup
      if (e.propertyName !== 'height') {
        return;
      }
      element.removeEventListener('transitionend', onTransitionEnd);
      event.animationComplete();
    };

    requestAnimationFrame(() => {
      element.style.height = coerceCssPixelValue(0);
      element.style.opacity = '0';
      element.style.marginBottom = '0';
    });

    element.addEventListener('transitionend', onTransitionEnd);
  }
}
