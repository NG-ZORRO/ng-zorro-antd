import {
  forwardRef,
  AfterContentInit,
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnInit,
  Renderer2,
  ViewEncapsulation,
} from '@angular/core';

import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NzRadioButtonComponent } from './nz-radio-button.component';
import { NzRadioComponent } from './nz-radio.component';

@Component({
  selector     : 'nz-radio-group',
  encapsulation: ViewEncapsulation.None,
  template     : `
    <ng-content></ng-content>`,
  providers    : [
    {
      provide    : NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NzRadioGroupComponent),
      multi      : true
    }
  ],
  styleUrls    : [
    './style/index.less'
  ]
})
export class NzRadioGroupComponent implements OnInit, AfterContentInit, ControlValueAccessor {
  _el: HTMLElement;
  _value: string;
  _size: string;
  _prefixCls = 'ant-radio-group';

  // ngModel Access
  onChange: (_: string) => void = () => null;
  onTouched: () => void = () => null;

  radios: Array<NzRadioComponent | NzRadioButtonComponent> = [];

  @Input()
  set nzSize(value: string) {
    this._size = value;
  }

  get nzSize(): string {
    return this._size;
  }

  @HostBinding('class.ant-radio-group-large')
  get isLarge(): boolean {
    return this._size === 'large';
  }

  @HostBinding('class.ant-radio-group-small')
  get isSmall(): boolean {
    return this._size === 'small';
  }

  addRadio(radio: NzRadioComponent | NzRadioButtonComponent): void {
    this.radios.push(radio);
    radio.nzChecked = radio.nzValue === this._value;
  }

  selectRadio(radio: NzRadioComponent | NzRadioButtonComponent): void {
    this.updateValue(radio.nzValue);
  }

  updateValue(value: string): void {
    if (this._value === value) {
      return;
    }
    this._value = value;
    this.onChange(value);
    this.radios.forEach((item) => {
      item.nzChecked = item.nzValue === this._value;
    });
  }

  constructor(private _elementRef: ElementRef, private _render: Renderer2) {
    this._el = this._elementRef.nativeElement;
  }

  ngAfterContentInit(): void {
    this.radios.forEach((item) => {
      item.nzChecked = item.nzValue === this._value;
    });
    /** trim text node between radio button */
    Array.from(this._el.childNodes).forEach(node => {
      if (node.nodeType === 3) {
        this._el.removeChild(node);
      }
    });
  }

  writeValue(value: string): void {
    this.updateValue(value);
  }

  registerOnChange(fn: (_: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.radios.forEach((radio) => {
      radio.nzDisabled = isDisabled;
    });
  }

  ngOnInit(): void {
    this._render.addClass(this._el, `${this._prefixCls}`);
  }
}
