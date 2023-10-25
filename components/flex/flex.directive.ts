/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directive, Input } from '@angular/core';

import { nzAlign, nzDirection, nzGap, nzJustify, nzWrap } from 'ng-zorro-antd/flex/typings';

@Directive({
  selector: '[nz-flex],nz-flex',
  exportAs: 'nzFlex',
  host: {
    class: 'ant-flex',
    '[style.--flex-gap]': `nzGap === 'small' ? '8px' : nzGap === 'middle'? '16px': nzGap === 'large' ? '24px' : nzGap + 'px'`,
    '[style.--flex-direction]': `nzDirection`,
    '[style.--flex-justify]': `nzJustify`,
    '[style.--flex-align]': `nzAlign`,
    '[style.--flex-wrap]': `nzWrap`
  }
})
export class FlexDirective {
  @Input() nzDirection: nzDirection = 'row';
  @Input() nzJustify: nzJustify = 'flex-start';
  @Input() nzAlign: nzAlign = 'flex-start';
  @Input() nzGap: nzGap = 0;
  @Input() nzWrap: nzWrap = 'nowrap';
}
