import {
  forwardRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Renderer2
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
  template           : `
    <label
      nz-checkbox
      *ngFor="let option of options"
      [nzDisabled]="option.disabled||nzDisabled"
      [(nzChecked)]="option.checked"
      (nzCheckedChange)="onOptionChange()">
      <span>{{ option.label }}</span>
    </label>`,
  providers          : [
    {
      provide    : NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NzCheckboxGroupComponent),
      multi      : true
    }
  ]
})
export class NzCheckboxGroupComponent implements ControlValueAccessor, OnInit {
  private _disabled = false;
  private el: HTMLElement;
  private prefixCls = 'ant-checkbox-group';
  private onChange = Function.prototype;
  private onTouched = Function.prototype;
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

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    this.el = this.elementRef.nativeElement;
  }

  ngOnInit(): void {
    this.renderer.addClass(this.el, `${this.prefixCls}`);
  }
}
