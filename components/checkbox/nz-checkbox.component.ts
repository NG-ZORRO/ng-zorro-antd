import {
  forwardRef,
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  Renderer2,
  ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { isEmpty } from '../core/util/check';
import { toBoolean } from '../core/util/convert';

import { NzCheckboxWrapperComponent } from './nz-checkbox-wrapper.component';

@Component({
  selector           : '[nz-checkbox]',
  preserveWhitespaces: false,
  templateUrl        : './nz-checkbox.component.html',
  providers          : [
    {
      provide    : NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NzCheckboxComponent),
      multi      : true
    }
  ]
})
export class NzCheckboxComponent implements OnInit, ControlValueAccessor, OnChanges, AfterViewInit, OnDestroy {
  private _disabled = false;
  private _indeterminate = false;
  private _autoFocus = false;
  private _checked = false;
  private el: HTMLElement = this.elementRef.nativeElement;
  private isInit = false;
  private prefixCls = 'ant-checkbox';
  private onChange = Function.prototype;
  private onTouched = Function.prototype;
  @ViewChild('inputElement')
  private inputElement: ElementRef;
  @ViewChild('contentElement') contentElement: ElementRef;
  classMap = {};
  @Output() nzCheckedChange = new EventEmitter<boolean>();
  @Input() nzValue: string;

  @Input()
  set nzAutoFocus(value: boolean) {
    this._autoFocus = toBoolean(value);
    this.updateAutoFocus();
  }

  get nzAutoFocus(): boolean {
    return this._autoFocus;
  }

  @Input()
  set nzDisabled(value: boolean) {
    this._disabled = toBoolean(value);
  }

  get nzDisabled(): boolean {
    return this._disabled;
  }

  @Input()
  set nzIndeterminate(value: boolean) {
    this._indeterminate = toBoolean(value);
  }

  get nzIndeterminate(): boolean {
    return this._indeterminate;
  }

  @Input()
  set nzChecked(value: boolean) {
    this._checked = value;
    this.updateClassMap();
  }

  get nzChecked(): boolean {
    return this._checked;
  }

  @HostListener('click', [ '$event' ])
  onClick(e: MouseEvent): void {
    e.preventDefault();
    this.inputElement.nativeElement.focus();
    if (!this.nzDisabled) {
      this.updateValue(!this.nzChecked);
    }
  }

  onBlur(): void {
    this.onTouched();
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

  updateValue(value: boolean): void {
    this.onChange(value);
    this.nzCheckedChange.emit(value);
    this.nzChecked = value;
    if (this.nzCheckboxWrapperComponent) {
      this.nzCheckboxWrapperComponent.onChange();
    }
  }

  writeValue(value: boolean): void {
    this.nzChecked = value;
  }

  registerOnChange(fn: (_: boolean) => {}): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.nzDisabled = isDisabled;
  }

  updateClassMap(): void {
    this.classMap = {
      [ this.prefixCls ]                   : true,
      [ `${this.prefixCls}-checked` ]      : this.nzChecked && (!this.nzIndeterminate),
      [ `${this.prefixCls}-disabled` ]     : this.nzDisabled,
      [ `${this.prefixCls}-indeterminate` ]: this.nzIndeterminate
    };
  }

  focus(): void {
    this.inputElement.nativeElement.focus();
  }

  blur(): void {
    this.inputElement.nativeElement.blur();
  }

  checkContent(): void {
    if (isEmpty(this.contentElement.nativeElement)) {
      this.renderer.setStyle(this.contentElement.nativeElement, 'display', 'none');
    } else {
      this.renderer.removeStyle(this.contentElement.nativeElement, 'display');
    }
  }

  constructor(private elementRef: ElementRef, private renderer: Renderer2, @Optional() private nzCheckboxWrapperComponent: NzCheckboxWrapperComponent) {
  }

  ngOnInit(): void {
    this.renderer.addClass(this.el, `${this.prefixCls}-wrapper`);
    this.updateClassMap();
    if (this.nzCheckboxWrapperComponent) {
      this.nzCheckboxWrapperComponent.addCheckbox(this);
    }
  }

  ngOnChanges(): void {
    this.updateClassMap();
  }

  ngAfterViewInit(): void {
    this.isInit = true;
    this.updateAutoFocus();
    this.checkContent();
  }

  ngOnDestroy(): void {
    if (this.nzCheckboxWrapperComponent) {
      this.nzCheckboxWrapperComponent.removeCheckbox(this);
    }
  }
}
