/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directionality } from '@angular/cdk/bidi';
import { afterNextRender, computed, DestroyRef, Directive, ElementRef, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { NzSpaceCompactComponent } from './space-compact.component';
import { NZ_SPACE_COMPACT_ITEM_TYPE, NZ_SPACE_COMPACT_ITEMS } from './space-compact.token';

@Directive({
  exportAs: 'nzSpaceCompactItem',
  host: {
    '[class]': 'class()'
  }
})
export class NzSpaceCompactItemDirective {
  /**
   * Ancestor component injected from the parent.
   * Note that it is not necessarily the direct parent component.
   */
  private readonly spaceCompactCmp = inject(NzSpaceCompactComponent, { host: true, optional: true });
  private readonly items = inject(NZ_SPACE_COMPACT_ITEMS, { host: true, optional: true });
  private readonly type = inject(NZ_SPACE_COMPACT_ITEM_TYPE);
  private readonly elementRef: ElementRef<HTMLElement> = inject(ElementRef);
  private readonly directionality = inject(Directionality);
  private readonly dir = toSignal(this.directionality.change, { initialValue: this.directionality.value });

  private get parentElement(): HTMLElement | null {
    return this.elementRef.nativeElement?.parentElement;
  }

  protected class = computed(() => {
    // Only handle when the parent is space compact component
    if (!this.spaceCompactCmp || !this.items) return null;
    // Ensure that the injected ancestor component's elements are parent elements
    if (this.parentElement !== this.spaceCompactCmp!.elementRef.nativeElement) return null;

    const items = this.items();
    const direction = this.spaceCompactCmp.nzDirection();
    const classes = [compactItemClassOf(this.type, direction, this.dir() === 'rtl')];
    const index = items.indexOf(this);
    const firstIndex = items.findIndex(element => element);
    // Array [empty, item]
    // In this case, the index of the first valid element is not 0,
    // so we need to use findIndex to find the index value of the first valid element.
    if (index === firstIndex) {
      classes.push(compactFirstItemClassOf(this.type, direction));
    }
    if (index === items.length - 1) {
      classes.push(compactLastItemClassOf(this.type, direction));
    }

    return classes;
  });

  constructor() {
    if (!this.spaceCompactCmp || !this.items) return;

    afterNextRender(() => {
      // Ensure that the injected ancestor component's elements are parent elements
      if (this.parentElement === this.spaceCompactCmp!.elementRef.nativeElement) {
        const index = Array.from(this.parentElement.children).indexOf(this.elementRef.nativeElement);
        this.items!.update(value => {
          const newValue = value.slice();
          newValue.splice(index, 0, this);
          return newValue;
        });
      }
    });

    inject(DestroyRef).onDestroy(() => {
      this.items?.update(value => value.filter(o => o !== this));
    });
  }
}

function generateCompactClass(
  type: string,
  direction: 'vertical' | 'horizontal',
  position: 'item' | 'first-item' | 'last-item'
): string {
  const directionPrefix = direction === 'vertical' ? 'vertical-' : '';
  return `ant-${type}-compact-${directionPrefix}${position}`;
}

function compactItemClassOf(type: string, direction: 'vertical' | 'horizontal', rtl?: boolean): string {
  const rtlSuffix = rtl ? '-rtl' : '';
  return `${generateCompactClass(type, direction, 'item')}${rtlSuffix}`;
}

function compactFirstItemClassOf(type: string, direction: 'vertical' | 'horizontal'): string {
  return generateCompactClass(type, direction, 'first-item');
}

function compactLastItemClassOf(type: string, direction: 'vertical' | 'horizontal'): string {
  return generateCompactClass(type, direction, 'last-item');
}
