import {
  forwardRef,
  Component,
  Input,
  ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { toBoolean } from '../core/util/convert';

export interface NzCheckBoxOptionInterface {
  label: string;
  value: string;
  checked?: boolean;
  disabled?: boolean;
}

@Component({
  selector           : 'nz-checkbox-group',
  preserveWhitespaces: false,
  encapsulation      : ViewEncapsulation.None,
  templateUrl        : './nz-checkbox-group.component.html',
  providers          : [
    {
      provide    : NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NzCheckboxGroupComponent),
      multi      : true
    }
  ],
  host               : {
    '[class.ant-checkbox-group]': 'true'
  }
})
export class NzCheckboxGroupComponent implements ControlValueAccessor {
  private _disabled = false;
  // tslint:disable-next-line:no-any
  private onChange: (value: any) => void = () => {};
  // tslint:disable-next-line:no-any
  private onTouched: () => any = () => {};
  options: NzCheckBoxOptionInterface[];

  @Input()
  set nzDisabled(value: boolean) {
    this._disabled = toBoolean(value);
  }

  get nzDisabled(): boolean {
    return this._disabled;
  }

  onOptionChange(): void {
    this.onChange(this.options);
  }

  writeValue(value: NzCheckBoxOptionInterface[]): void {
    this.options = value;
  }

  registerOnChange(fn: (_: NzCheckBoxOptionInterface[]) => {}): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.nzDisabled = isDisabled;
  }

  constructor() {
  }
}
