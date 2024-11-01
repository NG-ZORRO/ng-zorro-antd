/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { afterNextRender, computed, Directive, ElementRef, inject, OnDestroy } from '@angular/core';

import { NzSpaceCompactComponent } from './space-compact.component';
import { NZ_SPACE_COMPACT_ITEM_TYPE, NZ_SPACE_COMPACT_ITEMS } from './space-compact.token';

@Directive({
  exportAs: 'nzSpaceCompactItem',
  standalone: true,
  host: {
    '[class]': 'class()'
  }
})
export class NzSpaceCompactItemDirective implements OnDestroy {
  private readonly spaceCompactCmp = inject(NzSpaceCompactComponent, { host: true, optional: true });
  private readonly items = inject(NZ_SPACE_COMPACT_ITEMS, { host: true, optional: true });
  private readonly type = inject(NZ_SPACE_COMPACT_ITEM_TYPE);

  protected class = computed(() => {
    // Only handle when the parent is space compact component
    if (!this.spaceCompactCmp || !this.items) return null;

    const items = this.items();
    const direction = this.spaceCompactCmp.nzDirection();
    const classes = [compactItemClassOf(this.type, direction)];
    const index = items.indexOf(this);
    const firstIndex = items.findIndex(element => element);
    // Array [empty, item]
    // In this case, the index of the first valid element is not 0,
    // so we need to use findIndex to find the index value of the first valid element.
    if (index === firstIndex) {
      classes.push(compactFirstItemClassOf(this.type, direction));
    } else if (index === items.length - 1) {
      classes.push(compactLastItemClassOf(this.type, direction));
    }

    return classes;
  });

  constructor() {
    if (!this.spaceCompactCmp || !this.items) return;

    const { nativeElement }: ElementRef<HTMLElement> = inject(ElementRef);

    afterNextRender(() => {
      if (nativeElement.parentElement) {
        const index = Array.from(nativeElement.parentElement.children).indexOf(nativeElement);
        this.items!.update(value => {
          const newValue = value.slice();
          newValue.splice(index, 0, this);
          return newValue;
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.items?.update(value => value.filter(o => o !== this));
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

function compactItemClassOf(type: string, direction: 'vertical' | 'horizontal'): string {
  return generateCompactClass(type, direction, 'item');
}

function compactFirstItemClassOf(type: string, direction: 'vertical' | 'horizontal'): string {
  return generateCompactClass(type, direction, 'first-item');
}

function compactLastItemClassOf(type: string, direction: 'vertical' | 'horizontal'): string {
  return generateCompactClass(type, direction, 'last-item');
}
