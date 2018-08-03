import {
  forwardRef,
  AfterContentInit,
  Component,
  ElementRef,
  HostBinding,
  Input
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { isNotNil } from '../core/util/check';
import { toBoolean } from '../core/util/convert';

export type NzRadioGroupSizeType = 'large' | 'default' | 'small';
export type NzRadioButtonStyle = 'outline' | 'solid';

import { NzRadioButtonComponent } from './nz-radio-button.component';
import { NzRadioComponent } from './nz-radio.component';

@Component({
  selector           : 'nz-radio-group',
  preserveWhitespaces: false,
  templateUrl        : './nz-radio-group.component.html',
  host               : {
    '[class.ant-radio-group]': 'true'
  },
  providers          : [
    {
      provide    : NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NzRadioGroupComponent),
      multi      : true
    }
  ]
})
export class NzRadioGroupComponent implements AfterContentInit, ControlValueAccessor {
  private _size: NzRadioGroupSizeType = 'default';
  private _name: string;
  private _disabled: boolean;
  el: HTMLElement;
  value: string;

  // ngModel Access
  onChange: (_: string) => void = () => null;
  onTouched: () => void = () => null;

  radios: Array<NzRadioComponent | NzRadioButtonComponent> = [];

  @Input()
  set nzSize(value: NzRadioGroupSizeType) {
    this._size = value;
  }

  get nzSize(): NzRadioGroupSizeType {
    return this._size;
  }

  @Input()
  set nzDisabled(value: boolean) {
    this._disabled = toBoolean(value);
    this.updateDisabledState();
  }

  get nzDisabled(): boolean {
    return this._disabled;
  }

  @Input()
  set nzName(value: string) {
    this._name = value;
    this.updateChildrenName();
  }

  get nzName(): string {
    return this._name;
  }

  @Input() nzButtonStyle: NzRadioButtonStyle = 'outline';

  updateDisabledState(): void {
    if (isNotNil(this.nzDisabled)) {
      this.radios.forEach((radio) => {
        radio.nzDisabled = this.nzDisabled;
      });
    }
  }

  updateChildrenName(): void {
    if (this.nzName) {
      this.radios.forEach((item) => {
        item.name = this.nzName;
      });
    }
  }

  syncCheckedValue(): void {
    this.radios.forEach((item) => {
      item.nzChecked = item.nzValue === this.value;
    });
  }

  @HostBinding('class.ant-radio-group-large')
  get isLarge(): boolean {
    return this.nzSize === 'large';
  }

  @HostBinding('class.ant-radio-group-small')
  get isSmall(): boolean {
    return this.nzSize === 'small';
  }

  @HostBinding('class.ant-radio-group-solid')
  get isSolid(): boolean {
    return this.nzButtonStyle === 'solid';
  }

  addRadio(radio: NzRadioComponent | NzRadioButtonComponent): void {
    this.radios.push(radio);
    radio.nzChecked = radio.nzValue === this.value;
  }

  selectRadio(radio: NzRadioComponent | NzRadioButtonComponent): void {
    this.updateValue(radio.nzValue, true);
  }

  updateValue(value: string, emit: boolean): void {
    this.value = value;
    this.syncCheckedValue();
    if (emit) {
      this.onChange(value);
    }
  }

  constructor(private elementRef: ElementRef) {
    this.el = this.elementRef.nativeElement;
  }

  ngAfterContentInit(): void {
    this.syncCheckedValue();
    this.updateChildrenName();
    Promise.resolve().then(() => {
      this.updateDisabledState();
    });
  }

  writeValue(value: string): void {
    this.updateValue(value, false);
  }

  registerOnChange(fn: (_: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.nzDisabled = isDisabled;
  }
}
