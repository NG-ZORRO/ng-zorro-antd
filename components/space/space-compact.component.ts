/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directionality } from '@angular/cdk/bidi';
import { booleanAttribute, Component, computed, ElementRef, inject, input, signal } from '@angular/core';

import { NZ_FORM_SIZE } from 'ng-zorro-antd/core/form';
import { NzSizeLDSType } from 'ng-zorro-antd/core/types';

import { NZ_SPACE_COMPACT_ITEMS, NZ_SPACE_COMPACT_SIZE } from './space-compact.token';

@Component({
  selector: 'nz-space-compact',
  exportAs: 'nzSpaceCompact',
  template: `<ng-content />`,
  host: {
    class: 'ant-space-compact',
    '[class.ant-space-compact-rtl]': `dir() === 'rtl'`,
    '[class.ant-space-compact-block]': `nzBlock()`,
    '[class.ant-space-compact-vertical]': `nzDirection() === 'vertical'`
  },
  providers: [
    { provide: NZ_SPACE_COMPACT_SIZE, useFactory: () => inject(NzSpaceCompactComponent).finalSize },
    { provide: NZ_SPACE_COMPACT_ITEMS, useFactory: () => signal([]) }
  ]
})
export class NzSpaceCompactComponent {
  protected readonly dir = inject(Directionality).valueSignal;
  private readonly formSize = inject(NZ_FORM_SIZE, { optional: true });
  readonly elementRef: ElementRef<HTMLElement> = inject(ElementRef);

  readonly nzBlock = input(false, { transform: booleanAttribute });
  readonly nzDirection = input<'vertical' | 'horizontal'>('horizontal');
  readonly nzSize = input<NzSizeLDSType>('default');
  protected readonly finalSize = computed(() => this.formSize?.() || this.nzSize());
}
