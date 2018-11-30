import { ChangeDetectionStrategy, Component, EventEmitter, Output, ViewEncapsulation } from '@angular/core';

import { NzCheckboxComponent } from './nz-checkbox.component';

@Component({
  selector           : 'nz-checkbox-wrapper',
  preserveWhitespaces: false,
  changeDetection    : ChangeDetectionStrategy.OnPush,
  encapsulation      : ViewEncapsulation.None,
  templateUrl        : './nz-checkbox-wrapper.component.html',
  host               : {
    '[class.ant-checkbox-group]': 'true'
  }
})
export class NzCheckboxWrapperComponent {
  @Output() readonly nzOnChange = new EventEmitter<string[]>();
  private checkboxList: NzCheckboxComponent[] = [];

  addCheckbox(value: NzCheckboxComponent): void {
    this.checkboxList.push(value);
  }

  removeCheckbox(value: NzCheckboxComponent): void {
    this.checkboxList.splice(this.checkboxList.indexOf(value), 1);
  }

  outputValue(): string[] {
    const checkedList = this.checkboxList.filter(item => item.nzChecked);
    return checkedList.map(item => item.nzValue);
  }

  onChange(): void {
    this.nzOnChange.emit(this.outputValue());
  }
}
