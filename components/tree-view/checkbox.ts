/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { BooleanInput } from 'ng-zorro-antd/core/types';
import { InputBoolean } from 'ng-zorro-antd/core/util';

@Component({
  selector: 'nz-tree-node-checkbox:not([builtin])',
  template: `
    <span class="ant-tree-checkbox-inner"></span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  host: {
    class: 'ant-tree-checkbox',
    '[class.ant-tree-checkbox-checked]': `nzChecked`,
    '[class.ant-tree-checkbox-indeterminate]': `nzIndeterminate`,
    '[class.ant-tree-checkbox-disabled]': `nzDisabled`,
    '(click)': 'onClick($event)'
  }
})
export class NzTreeNodeCheckboxComponent {
  static ngAcceptInputType_nzDisabled: BooleanInput;

  @Input() nzChecked?: boolean;
  @Input() nzIndeterminate?: boolean;
  @Input() @InputBoolean() nzDisabled?: boolean;
  @Output() readonly nzClick = new EventEmitter<MouseEvent>();

  onClick(e: MouseEvent): void {
    if (!this.nzDisabled) {
      this.nzClick.emit(e);
    }
  }
}
