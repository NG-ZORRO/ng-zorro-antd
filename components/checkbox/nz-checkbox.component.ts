import {
  forwardRef,
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Renderer2,
  ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { toBoolean } from '../core/util/convert';
import { NzCheckboxWrapperComponent } from './nz-checkbox-wrapper.component';

@Component({
  selector           : '[nz-checkbox]',
  preserveWhitespaces: false,
  template           : `
    <span [ngClass]="classMap">
      <input
        #inputElement
        type="checkbox"
        class="ant-checkbox-input"
        (blur)="onBlur()">
      <span class="ant-checkbox-inner"></span>
    </span>
    <ng-content></ng-content>
  `,
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
  private el: HTMLElement;
  private prefixCls = 'ant-checkbox';
  private onChange = Function.prototype;
  private onTouched = Function.prototype;
  @ViewChild('inputElement')
  private inputElement: ElementRef;
  classMap = {};
  @Input() nzValue: string;

  @Input()
  set nzAutoFocus(value: boolean) {
    this._autoFocus = toBoolean(value);
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

  @HostListener('click', [ '$event' ])
  onClick(e: MouseEvent): void {
    e.preventDefault();
    this.inputElement.nativeElement.focus();
    if (!this.nzDisabled) {
      this.updateValue(!this.checked);
    }
  }

  set checked(value: boolean) {
    this._checked = value;
    this.inputElement.nativeElement.value = value;
  }

  get checked(): boolean {
    return this._checked;
  }

  onBlur(): void {
    this.onTouched();
  }

  updateValue(value: boolean): void {
    if (value === this.checked) {
      return;
    }
    this.onChange(value);
    this.checked = value;
    this.updateClassMap();
    if (this.nzCheckboxWrapperComponent) {
      this.nzCheckboxWrapperComponent.onChange();
    }
  }

  writeValue(value: boolean): void {
    this.checked = value;
    this.updateClassMap();
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
      [ `${this.prefixCls}-checked` ]      : this.checked && (!this.nzIndeterminate),
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

  constructor(private elementRef: ElementRef, private renderer: Renderer2, @Optional() private nzCheckboxWrapperComponent: NzCheckboxWrapperComponent) {
    this.el = this.elementRef.nativeElement;
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
    if (this.nzAutoFocus) {
      this.renderer.setAttribute(this.inputElement.nativeElement, 'autofocus', 'autofocus');
    }
  }

  ngOnDestroy(): void {
    if (this.nzCheckboxWrapperComponent) {
      this.nzCheckboxWrapperComponent.removeCheckbox(this);
    }
  }
}
