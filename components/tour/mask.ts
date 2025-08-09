/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

const getRandomId = (): string => Math.random().toString(36).slice(2);

@Component({
  selector: 'nz-tour-mask',
  template: `
    <div class="ant-tour-mask">
      <svg>
        <defs>
          <mask [attr.id]="maskId">
            <rect x="0" y="0" [attr.width]="maskRectSize.width" [attr.height]="maskRectSize.height" fill="white"></rect>
          </mask>
        </defs>
        <rect x="0" y="0" width="100%" height="100%" fill="rgba(0,0,0,0.5)" [attr.mask]="maskUrl" />
      </svg>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class NzTourMaskComponent {
  private id = getRandomId();
  maskId = `ant-tour-mask-${this.id}`;
  maskUrl = `url(#${this.maskId})`;

  private isSafari = typeof navigator !== 'undefined' && /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  maskRectSize = this.isSafari ? { width: '100%', height: '100%' } : { width: '100vw', height: '100vh' };
}
