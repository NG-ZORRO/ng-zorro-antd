/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directive, Input } from '@angular/core';

type HandlerSize = 'default' | 'small';

@Directive({
  selector: 'color-handler',
  host: {
    class: 'ant-color-picker-handler',
    '[style.background-color]': 'color',
    '[class.ant-color-picker-handler-sm]': `size === 'small'`
  }
})
export class HandlerDirective {
  @Input() color: string | null = null;
  @Input() size: HandlerSize = 'default';
}
