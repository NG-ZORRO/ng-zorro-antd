/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, Component, EventEmitter, Output, ViewEncapsulation } from '@angular/core';

import { NzSafeAny } from 'ng-zorro-antd/core/types';

import { NzCheckboxComponent } from './checkbox.component';

/**
 * @deprecated Will be removed in v21. It is recommended to use `<nz-checkbox-group>`.
 */
@Component({
  selector: 'nz-checkbox-wrapper',
  exportAs: 'nzCheckboxWrapper',
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'ant-checkbox-group'
  }
})
export class NzCheckboxWrapperComponent {
  @Output() readonly nzOnChange = new EventEmitter<NzSafeAny[]>();
  private checkboxList: NzCheckboxComponent[] = [];

  addCheckbox(value: NzCheckboxComponent): void {
    this.checkboxList.push(value);
  }

  removeCheckbox(value: NzCheckboxComponent): void {
    this.checkboxList.splice(this.checkboxList.indexOf(value), 1);
  }

  onChange(): void {
    const listOfCheckedValue = this.checkboxList.filter(item => item.nzChecked).map(item => item.nzValue);
    this.nzOnChange.emit(listOfCheckedValue);
  }
}
