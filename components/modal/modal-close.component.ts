/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { ModalOptions } from './modal-types';

@Component({
  selector: 'button[nz-modal-close]',
  exportAs: 'nzModalCloseBuiltin',
  template: `
    <span class="ant-modal-close-x">
      <ng-container *nzStringTemplateOutlet="config.nzCloseIcon; let closeIcon">
        <nz-icon [nzType]="closeIcon" class="ant-modal-close-icon" />
      </ng-container>
    </span>
  `,
  host: {
    class: 'ant-modal-close',
    'aria-label': 'Close'
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NzIconModule, NzOutletModule]
})
export class NzModalCloseComponent {
  public readonly config = inject(ModalOptions);
}
