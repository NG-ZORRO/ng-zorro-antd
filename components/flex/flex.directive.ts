/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directive, Input } from '@angular/core';

import { nzAlign, nzDirection, nzJustify } from 'ng-zorro-antd/flex/typings';

@Directive({
  selector: '[nz-flex],nz-flex',
  exportAs: 'nzFlex',
  host: {
    class: 'ant-flex',
    '[class.ant-flex-direction-row]': `nzDirection === 'row'`,
    '[class.ant-flex-direction-row-reverse]': `nzDirection === 'row-reverse'`,
    '[class.ant-flex-direction-column]': `nzDirection === 'column'`,
    '[class.ant-flex-direction-column-reverse]': `nzDirection === 'column-reverse'`,
    '[class.ant-flex-justify-flex-start]': `nzJustify === 'flex-start'`,
    '[class.ant-flex-justify-center]': `nzJustify === 'center'`,
    '[class.ant-flex-justify-flex-end]': `nzJustify === 'flex-end'`,
    '[class.ant-flex-justify-space-between]': `nzJustify === 'space-between'`,
    '[class.ant-flex-justify-space-around]': `nzJustify === 'space-around'`,
    '[class.ant-flex-justify-space-evenly]': `nzJustify === 'space-evenly'`,
    '[class.ant-flex-align-flex-start]': `nzAlign === 'flex-start'`,
    '[class.ant-flex-align-center]': `nzAlign === 'center'`,
    '[class.ant-flex-align-flex-end]': `nzAlign === 'flex-end'`
  }
})
export class FlexDirective {
  @Input() nzDirection: nzDirection = 'row';
  @Input() nzJustify: nzJustify = 'flex-start';
  @Input() nzAlign: nzAlign = 'flex-start';
}
