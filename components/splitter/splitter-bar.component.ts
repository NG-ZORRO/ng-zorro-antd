/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: '[nz-splitter-bar]',
  template: `<div class="ant-splitter-bar-dragger"></div>`,
  host: {
    role: 'separator',
    class: 'ant-splitter-bar',
    '[attr.aria-valuenow]': 'ariaNow()',
    '[attr.aria-valuemin]': 'ariaMin()',
    '[attr.aria-valuemax]': 'ariaMax()'
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NzSplitterBarComponent {
  ariaNow = input.required<number>();
  ariaMin = input.required<number>();
  ariaMax = input.required<number>();
}
