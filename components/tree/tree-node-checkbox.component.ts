/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'nz-tree-node-checkbox',
  template: ` <span [class.ant-tree-checkbox-inner]="!nzSelectMode" [class.ant-select-tree-checkbox-inner]="nzSelectMode"></span> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  host: {
    '[class.ant-select-tree-checkbox]': `nzSelectMode`,
    '[class.ant-select-tree-checkbox-checked]': `nzSelectMode && isChecked`,
    '[class.ant-select-tree-checkbox-indeterminate]': `nzSelectMode && isHalfChecked`,
    '[class.ant-select-tree-checkbox-disabled]': `nzSelectMode && (isDisabled || isDisableCheckbox)`,
    '[class.ant-tree-checkbox]': `!nzSelectMode`,
    '[class.ant-tree-checkbox-checked]': `!nzSelectMode && isChecked`,
    '[class.ant-tree-checkbox-indeterminate]': `!nzSelectMode && isHalfChecked`,
    '[class.ant-tree-checkbox-disabled]': `!nzSelectMode && (isDisabled || isDisableCheckbox)`
  }
})
export class NzTreeNodeCheckboxComponent {
  @Input() nzSelectMode = false;
  @Input() isChecked?: boolean;
  @Input() isHalfChecked?: boolean;
  @Input() isDisabled?: boolean;
  @Input() isDisableCheckbox?: boolean;
}
