import {
  forwardRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewEncapsulation
} from '@angular/core';

import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { FocusMonitor } from '@angular/cdk/a11y';

import { InputBoolean } from '../core/util/convert';

export interface NzCheckBoxOptionInterface {
  label: string;
  value: string;
  checked?: boolean;
  disabled?: boolean;
}

@Component({
  selector           : 'nz-checkbox-group',
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
export class NzCheckboxGroupComponent implements ControlValueAccessor, OnInit {
  // tslint:disable-next-line:no-any
  onChange: (value: any) => void = () => null;
  // tslint:disable-next-line:no-any
  onTouched: () => any = () => null;
  options: NzCheckBoxOptionInterface[];
  @Input() @InputBoolean() nzDisabled = false;

  onOptionChange(): void {
    this.onChange(this.options);
  }

  constructor(private elementRef: ElementRef, private focusMonitor: FocusMonitor) {
  }

  ngOnInit(): void {
    this.focusMonitor.monitor(this.elementRef, true).subscribe(focusOrigin => {
      if (!focusOrigin) {
        Promise.resolve().then(() => this.onTouched());
      }
    });
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
}
