/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Output, Renderer2, ViewEncapsulation } from '@angular/core';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzCheckboxComponent } from './checkbox.component';

@Component({
  selector: 'nz-checkbox-wrapper',
  exportAs: 'nzCheckboxWrapper',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: ` <ng-content></ng-content> `
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

  constructor(renderer: Renderer2, elementRef: ElementRef) {
    renderer.addClass(elementRef.nativeElement, 'ant-checkbox-group');
  }
}
