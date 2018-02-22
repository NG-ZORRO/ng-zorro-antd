import {
  forwardRef,
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  Optional,
  Renderer2,
  ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { toBoolean } from '../core/util/convert';

import { NzRadioGroupComponent } from './nz-radio-group.component';

@Component({
  selector           : '[nz-radio]',
  preserveWhitespaces: false,
  template           : `
    <span [ngClass]="classMap">
      <span class="ant-radio-inner"></span>
      <input #inputElement type="radio" class="ant-radio-input" [(ngModel)]="nzChecked" (focus)="nzFocus()" (blur)="nzBlur()" [attr.name]="name">
    </span>
    <span><ng-content></ng-content></span>
  `,
  host               : {
    '[class.ant-radio-wrapper]'         : 'true',
    '[class.ant-radio-wrapper-checked]' : 'nzChecked',
    '[class.ant-radio-wrapper-disabled]': 'nzDisabled'
  },
  providers          : [
    {
      provide    : NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NzRadioComponent),
      multi      : true
    }
  ]
})
export class NzRadioComponent implements OnInit, ControlValueAccessor, AfterViewInit {
  private _checked = false;
  private _disabled = false;
  private _autoFocus = false;
  isInit = false;
  classMap;
  name: string;
  focused = false;
  prefixCls = 'ant-radio';
  @ViewChild('inputElement') inputElement: ElementRef;
  onChange: (_: boolean) => void = () => null;
  onTouched: () => void = () => null;
  @Input() nzValue: string;

  set nzChecked(value: boolean) {
    this._checked = toBoolean(value);
    this.updateInputFocus();
    this.setClassMap();
  }

  get nzChecked(): boolean {
    return this._checked;
  }

  @Input()
  set nzDisabled(value: boolean) {
    this._disabled = toBoolean(value);
    this.setClassMap();
  }

  get nzDisabled(): boolean {
    return this._disabled;
  }

  @Input()
  set nzAutoFocus(value: boolean) {
    this._autoFocus = toBoolean(value);
    this.updateAutoFocus();
  }

  get nzAutoFocus(): boolean {
    return this._autoFocus;
  }

  updateAutoFocus(): void {
    if (this.isInit) {
      if (this.nzAutoFocus) {
        this.renderer.setAttribute(this.inputElement.nativeElement, 'autofocus', 'autofocus');
      } else {
        this.renderer.removeAttribute(this.inputElement.nativeElement, 'autofocus');
      }
    }
  }

  updateInputFocus(): void {
    if (this.inputElement) {
      if (this.nzChecked) {
        this.focused = true;
        this.inputElement.nativeElement.focus();
      } else {
        this.focused = false;
        this.inputElement.nativeElement.blur();
      }
    }
  }

  @HostListener('click', [ '$event' ])
  onClick(e: MouseEvent): void {
    e.preventDefault();
    if (!this._disabled) {
      if (this.nzRadioGroup) {
        this.nzChecked = true;
        this.setClassMap();
        this.nzRadioGroup.selectRadio(this);
      } else {
        this.updateValue(true);
      }
    }
  }

  nzFocus(): void {
    this.focused = true;
    this.setClassMap();
  }

  nzBlur(): void {
    this.focused = false;
    this.setClassMap();
    this.onTouched();
    if (this.nzRadioGroup) this.nzRadioGroup.onTouched();
  }

  setClassMap(): void {
    this.classMap = {
      [ this.prefixCls ]              : true,
      [ `${this.prefixCls}-checked` ] : this.nzChecked,
      [ `${this.prefixCls}-focused` ] : this.focused,
      [ `${this.prefixCls}-disabled` ]: this.nzDisabled
    };
  }

  focus(): void {
    this.inputElement.nativeElement.focus();
  }

  blur(): void {
    this.inputElement.nativeElement.blur();
  }

  constructor(@Optional() public nzRadioGroup: NzRadioGroupComponent, private renderer: Renderer2) {
  }

  ngOnInit(): void {
    if (this.nzRadioGroup) this.nzRadioGroup.addRadio(this);
    this.setClassMap();
  }

  updateValue(value: boolean): void {
    if (value === this.nzChecked) {
      return;
    }
    this.onChange(value);
    this.nzChecked = value;
    this.setClassMap();
  }

  setDisabledState(isDisabled: boolean): void {
    this.nzDisabled = isDisabled;
  }

  writeValue(value: boolean): void {
    this.nzChecked = value;
    this.setClassMap();
  }

  registerOnChange(fn: (_: boolean) => {}): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  ngAfterViewInit(): void {
    this.isInit = true;
    this.updateAutoFocus();
    this.updateInputFocus();
  }
}
