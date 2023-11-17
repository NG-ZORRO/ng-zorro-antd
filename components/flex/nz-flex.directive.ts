/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directive, Input } from '@angular/core';

import { nzAlign, nzDirection, nzFlex, nzGap, nzJustify, nzWrap } from './typings';

@Directive({
  selector: '[nz-flex],nz-flex',
  exportAs: 'nzFlex',
  standalone: true,
  host: {
    class: 'ant-flex',
    '[style.--flex-direction]': `nzDirection`,
    '[style.--flex-justify]': `nzJustify`,
    '[style.--flex-align]': `nzAlign`,
    '[style.--flex-gap]': `nzGap === 'small' ? '8px' : nzGap === 'middle'? '16px': nzGap === 'large' ? '24px' : nzGap + 'px'`,
    '[style.--flex-wrap]': `nzWrap`,
    '[style.--flex]': `nzFlex`
  }
})
export class NzFlexDirective {
  @Input() nzDirection: nzDirection = 'row';
  @Input() nzJustify: nzJustify = 'normal';
  @Input() nzAlign: nzAlign = 'normal';
  @Input() nzGap: nzGap = 0;
  @Input() nzWrap: nzWrap = 'nowrap';
  @Input() nzFlex: nzFlex = 'unset';
}
