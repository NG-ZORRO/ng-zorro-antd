/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'nz-cascader-option-checkbox[builtin]',
  template: `
    <span
      [class.ant-cascader-option-checkbox-inner]="!nzSelectMode"
      [class.ant-cascader-option-checkbox-inner]="nzSelectMode"
    ></span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  host: {
    '[class.ant-cascader-option-checkbox]': `nzSelectMode`,
    '[class.ant-cascader-option-checkbox-checked]': `nzSelectMode && isChecked`,
    '[class.ant-cascader-option-checkbox-indeterminate]': `nzSelectMode && isHalfChecked`,
    '[class.ant-cascader-option-checkbox-disabled]': `nzSelectMode && (isDisabled || isDisableCheckbox)`
  }
})
export class NzCascaderOptionBuiltinCheckboxComponent {
  @Input() nzSelectMode = false;
  @Input() isChecked?: boolean;
  @Input() isHalfChecked?: boolean;
  @Input() isDisabled?: boolean;
  @Input() isDisableCheckbox?: boolean;
}
