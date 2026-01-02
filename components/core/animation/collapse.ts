/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { animate, AnimationTriggerMetadata, query, stagger, style, transition, trigger } from '@angular/animations';
import { coerceCssPixelValue } from '@angular/cdk/coercion';
import { Directive, effect, ElementRef, inject, input } from '@angular/core';

import { requestAnimationFrame } from 'ng-zorro-antd/core/polyfill';

import { AnimationCurves } from './animation-consts';
import { isAnimationEnabled, NzNoAnimationDirective } from './no-animation';

const COLLAPSE_MOTION_CLASS = 'ant-motion-collapse';

export const treeCollapseMotion: AnimationTriggerMetadata = trigger('treeCollapseMotion', [
  transition('* => *', [
    query(
      'nz-tree-node:leave,nz-tree-builtin-node:leave',
      [
        style({ overflow: 'hidden' }),
        stagger(0, [
          animate(`150ms ${AnimationCurves.EASE_IN_OUT}`, style({ height: 0, opacity: 0, 'padding-bottom': 0 }))
        ])
      ],
      {
        optional: true
      }
    ),
    query(
      'nz-tree-node:enter,nz-tree-builtin-node:enter',
      [
        style({ overflow: 'hidden', height: 0, opacity: 0, 'padding-bottom': 0 }),
        stagger(0, [
          animate(
            `150ms ${AnimationCurves.EASE_IN_OUT}`,
            style({ overflow: 'hidden', height: '*', opacity: '*', 'padding-bottom': '*' })
          )
        ])
      ],
      {
        optional: true
      }
    )
  ])
]);

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
