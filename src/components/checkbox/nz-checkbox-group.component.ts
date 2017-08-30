import {
  Component,
  OnInit,
  ViewEncapsulation,
  Input,
  ElementRef,
  AfterContentInit,
  Renderer,
  forwardRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector     : 'nz-checkbox-group',
  encapsulation: ViewEncapsulation.None,
  template     : `
    <label
      [class.ant-checkbox-vertical]="nzType=='vertical'"
      nz-checkbox
      *ngFor="let option of _options"
      [nzDisabled]="option.disabled||nzDisabled"
      [(ngModel)]="option.checked"
      (ngModelChange)="_optionChange()">
      <span>{{option.label}}</span>
    </label>`,
  providers    : [
    {
      provide    : NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NzCheckboxGroupComponent),
      multi      : true
    }
  ],
  styleUrls    : [
    './style/index.less'
  ]
})
export class NzCheckboxGroupComponent implements OnInit, AfterContentInit, ControlValueAccessor {
  _el: HTMLElement;
  _options: Array<any>;
  _prefixCls = 'ant-checkbox-group';
  // ngModel Access
  onChange: any = Function.prototype;
  onTouched: any = Function.prototype;
  @Input() nzDisabled = false;
  @Input() nzType: string;

  _optionChange() {
    this.onChange(this._options);
  }

  constructor(private _elementRef: ElementRef, private _render: Renderer) {
    this._el = this._elementRef.nativeElement;
    this._render.setElementClass(this._el, `${this._prefixCls}`, true);
  }

  ngAfterContentInit() {
  }

  writeValue(value: any): void {
    this._options = value;
  }

  registerOnChange(fn: (_: any) => {}): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.nzDisabled = isDisabled;
  }

  ngOnInit() {
  }
}
