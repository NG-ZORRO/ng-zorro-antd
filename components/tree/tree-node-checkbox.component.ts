/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, Component, Input, booleanAttribute } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'nz-tree-node-checkbox[builtin]',
  template: `
    <span [class.ant-tree-checkbox-inner]="!nzSelectMode" [class.ant-select-tree-checkbox-inner]="nzSelectMode"></span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
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
export class NzTreeNodeBuiltinCheckboxComponent {
  @Input() nzSelectMode = false;
  @Input({ transform: booleanAttribute }) isChecked?: boolean;
  @Input({ transform: booleanAttribute }) isHalfChecked?: boolean;
  @Input({ transform: booleanAttribute }) isDisabled?: boolean;
  @Input({ transform: booleanAttribute }) isDisableCheckbox?: boolean;
}
