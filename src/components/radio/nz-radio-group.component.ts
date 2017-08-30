import {
  Component,
  OnInit,
  ViewEncapsulation,
  Input,
  ElementRef,
  AfterContentInit,
  Renderer,
  HostBinding,
  forwardRef
} from '@angular/core';

import { NzRadioComponent } from './nz-radio.component';
import { NzRadioButtonComponent } from './nz-radio-button.component';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';


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
  onChange: any = Function.prototype;
  onTouched: any = Function.prototype;

  radios: (NzRadioComponent | NzRadioButtonComponent)[] = [];

  @Input()
  get nzSize(): string {
    return this._size;
  };

  set nzSize(value: string) {
    this._size = value;
  }

  @HostBinding('class.ant-radio-group-large') get isLarge() {
    return this._size === 'large';
  };

  @HostBinding('class.ant-radio-group-small') get isSmall() {
    return this._size === 'small';
  };


  addRadio(radio: NzRadioComponent | NzRadioButtonComponent) {
    this.radios.push(radio);
  }

  selectRadio(radio: NzRadioComponent | NzRadioButtonComponent) {
    this.updateValue(radio.nzValue);
    this.onChange(radio.nzValue);
  }

  updateValue(value: any) {
    if (this._value === value) {
      return;
    }
    this._value = value;
    this.radios.forEach((item) => {
      item.nzChecked = item.nzValue === this._value;
    });
  }


  constructor(private _elementRef: ElementRef, private _render: Renderer) {
    this._el = this._elementRef.nativeElement;
  }

  ngAfterContentInit() {
    this.radios.forEach((item) => {
      item.nzChecked = item.nzValue === this._value;
    });
    /** trim text node between radio button */
    Array.from(this._el.childNodes).forEach(node => {
      if (node.nodeType === 3) {
        this._el.removeChild(node);
      }
    })
  }

  writeValue(value: any): void {
    this.updateValue(value);
  }

  registerOnChange(fn: (_: any) => {}): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.radios.forEach((radio) => {
      radio.nzDisabled = isDisabled;
    });
  }

  ngOnInit() {
    this._render.setElementClass(this._el, `${this._prefixCls}`, true);
  }
}
