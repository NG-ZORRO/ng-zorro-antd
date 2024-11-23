/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { booleanAttribute, ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';

import { NzSizeLDSType } from 'ng-zorro-antd/core/types';

import { NZ_SPACE_COMPACT_ITEMS, NZ_SPACE_COMPACT_SIZE } from './space-compact.token';

@Component({
  selector: 'nz-space-compact',
  exportAs: 'nzSpaceCompact',
  standalone: true,
  template: `<ng-content></ng-content>`,
  host: {
    class: 'ant-space-compact',
    '[class.ant-space-compact-block]': `nzBlock()`,
    '[class.ant-space-compact-vertical]': `nzDirection() === 'vertical'`
  },
  providers: [
    { provide: NZ_SPACE_COMPACT_SIZE, useFactory: () => inject(NzSpaceCompactComponent).nzSize },
    { provide: NZ_SPACE_COMPACT_ITEMS, useValue: signal([]) }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NzSpaceCompactComponent {
  nzBlock = input(false, { transform: booleanAttribute });
  nzDirection = input<'vertical' | 'horizontal'>('horizontal');
  nzSize = input<NzSizeLDSType>('default');
}
