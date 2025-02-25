/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directive, Input, booleanAttribute } from '@angular/core';

import { NzAlign, NzFlex, NzGap, NzJustify, NzWrap } from './typings';

@Directive({
  selector: '[nz-flex],nz-flex',
  exportAs: 'nzFlex',
  host: {
    class: 'ant-flex',
    '[class.ant-flex-vertical]': `nzVertical`,
    '[class.ant-flex-justify-flex-start]': `nzJustify === 'flex-start'`,
    '[class.ant-flex-justify-center]': `nzJustify === 'center'`,
    '[class.ant-flex-justify-flex-end]': `nzJustify === 'flex-end'`,
    '[class.ant-flex-justify-space-between]': `nzJustify === 'space-between'`,
    '[class.ant-flex-justify-space-around]': `nzJustify === 'space-around'`,
    '[class.ant-flex-justify-space-evenly]': `nzJustify === 'space-evenly'`,
    '[class.ant-flex-justify-start]': `nzJustify === 'start'`,
    '[class.ant-flex-justify-end]': `nzJustify === 'end'`,
    '[class.ant-flex-justify-right]': `nzJustify === 'right'`,
    '[class.ant-flex-justify-left]': `nzJustify === 'left'`,
    '[class.ant-flex-justify-stretch]': `nzJustify === 'stretch'`,
    '[class.ant-flex-justify-normal]': `nzJustify === 'normal'`,
    '[class.ant-flex-align-flex-start]': `nzAlign === 'flex-start'`,
    '[class.ant-flex-align-center]': `nzAlign === 'center'`,
    '[class.ant-flex-align-flex-end]': `nzAlign === 'flex-end'`,
    '[class.ant-flex-align-space-between]': `nzAlign === 'space-between'`,
    '[class.ant-flex-align-space-around]': `nzAlign === 'space-around'`,
    '[class.ant-flex-align-space-evenly]': `nzAlign === 'space-evenly'`,
    '[class.ant-flex-align-start]': `nzAlign === 'start'`,
    '[class.ant-flex-align-end]': `nzAlign === 'end'`,
    '[class.ant-flex-align-right]': `nzAlign === 'right'`,
    '[class.ant-flex-align-left]': `nzAlign === 'left'`,
    '[class.ant-flex-align-stretch]': `nzAlign === 'stretch'`,
    '[class.ant-flex-align-normal]': `nzAlign === 'normal'`,
    '[class.ant-flex-wrap-wrap]': `nzWrap === 'wrap'`,
    '[class.ant-flex-wrap-wrap-reverse]': `nzWrap === 'wrap-reverse'`,
    '[class.ant-flex-wrap-nowrap]': `nzWrap === 'nowrap'`,
    '[style.gap]': `gap`,
    '[style.flex]': `nzFlex`
  }
})
export class NzFlexDirective {
  @Input({ transform: booleanAttribute }) nzVertical: boolean = false;
  @Input() nzJustify: NzJustify = 'normal';
  @Input() nzAlign: NzAlign = 'normal';
  @Input() nzGap: NzGap = 0;
  @Input() nzWrap: NzWrap = 'nowrap';
  @Input() nzFlex: NzFlex = 'unset';

  protected get gap(): string {
    switch (this.nzGap) {
      case 'small':
        return '8px';
      case 'middle':
        return '16px';
      case 'large':
        return '24px';
      default:
        if (typeof this.nzGap === 'number') {
          return `${this.nzGap}px`;
        }
        return this.nzGap;
    }
  }
}
