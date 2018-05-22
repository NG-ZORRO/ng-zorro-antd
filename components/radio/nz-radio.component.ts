import { DOCUMENT } from '@angular/common';
import {
  forwardRef,
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Inject,
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
      <input #inputElement type="radio" class="ant-radio-input" [disabled]="nzDisabled" [(ngModel)]="nzChecked" (blur)="onBlur()" [attr.name]="name">
      <span class="ant-radio-inner"></span>
    </span>
    <span><ng-content></ng-content></span>
  `,
  host               : {
    '[class.ant-radio-wrapper]'         : 'true',
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
  prefixCls = 'ant-radio';
  @ViewChild('inputElement') inputElement: ElementRef;
  onChange: (_: boolean) => void = () => null;
  onTouched: () => void = () => null;
  @Input() nzValue: string;

  set nzChecked(value: boolean) {
    this._checked = toBoolean(value);
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
        if (this.document.activeElement.nodeName === 'BODY') {
          this.inputElement.nativeElement.focus();
        }
      } else {
        this.inputElement.nativeElement.blur();
      }
    }
  }

  @HostListener('click', [ '$event' ])
  onClick(e: MouseEvent): void {
    e.preventDefault();
    this.setClassMap();
    if (this.nzDisabled || this.nzChecked) {
      this.updateInputFocus();
      return;
    } else {
      if (this.nzRadioGroup) {
        this.nzRadioGroup.selectRadio(this);
      } else {
        this.updateValue(true);
      }
      this.updateInputFocus();
    }
  }

  onBlur(): void {
    this.onTouched();
    if (this.nzRadioGroup) { this.nzRadioGroup.onTouched(); }
  }

  setClassMap(): void {
    this.classMap = {
      [ this.prefixCls ]              : true,
      [ `${this.prefixCls}-checked` ] : this.nzChecked,
      [ `${this.prefixCls}-disabled` ]: this.nzDisabled
    };
  }

  focus(): void {
    this.inputElement.nativeElement.focus();
  }

  blur(): void {
    this.inputElement.nativeElement.blur();
    this.onBlur();
  }

  /* tslint:disable-next-line:no-any */
  constructor(@Optional() public nzRadioGroup: NzRadioGroupComponent, private renderer: Renderer2, @Inject(DOCUMENT) private document: any) {
  }

  ngOnInit(): void {
    if (this.nzRadioGroup) { this.nzRadioGroup.addRadio(this); }
    this.setClassMap();
  }

  updateValue(value: boolean): void {
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
