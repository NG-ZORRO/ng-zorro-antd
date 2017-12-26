import {
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  OnInit,
  Renderer2,
  ViewEncapsulation,
} from '@angular/core';

import { toBoolean } from '../util/convert';
import { NzRadioGroupComponent } from './nz-radio-group.component';

@Component({
  selector     : '[nz-radio]',
  encapsulation: ViewEncapsulation.None,
  template     : `
    <span [ngClass]="_classMap">
      <span [ngClass]="_innerPrefixCls"></span>
      <input type="radio" [ngClass]="_inputPrefixCls" [(ngModel)]="nzChecked" (focus)="nzFocus()" (blur)="nzBlur()">
    </span>
    <ng-content></ng-content>
  `,
  styleUrls    : [
    './style/index.less'
  ]
})
export class NzRadioComponent implements OnInit {
  private _checked = false;
  private _disabled = false;
  private _focused = false;
  _el: HTMLElement;
  _classMap;
  _value: string;
  _prefixCls = 'ant-radio';
  _innerPrefixCls = `${this._prefixCls}-inner`;
  _inputPrefixCls = `${this._prefixCls}-input`;

  @Input()
  @HostBinding('class.ant-radio-wrapper-checked')
  set nzChecked(value: boolean) {
    this._checked = toBoolean(value);
    this.setClassMap();
  }

  get nzChecked(): boolean {
    return this._checked;
  }

  @Input()
  get nzValue(): string {
    return this._value;
  }

  set nzValue(value: string) {
    if (this._value === value) {
      return;
    }
    this._value = value;
  }

  @Input()
  @HostBinding('class.ant-radio-wrapper-disabled')
  set nzDisabled(value: boolean) {
    this._disabled = toBoolean(value);
    this.setClassMap();
  }

  get nzDisabled(): boolean {
    return this._disabled;
  }

  @HostListener('click', [ '$event' ])
  onClick(e: MouseEvent): void {
    e.preventDefault();
    if (!this._disabled) {
      this._checked = true;
      this.setClassMap();
      this._nzRadioGroup.selectRadio(this);
    }
  }

  nzFocus(): void {
    this._focused = true;
    this.setClassMap();
  }

  nzBlur(): void {
    this._focused = false;
    this.setClassMap();
    this._nzRadioGroup.onTouched();
  }

  setClassMap(): void {
    this._classMap = {
      [this._prefixCls]              : true,
      [`${this._prefixCls}-checked`] : this._checked,
      [`${this._prefixCls}-focused`] : this._focused,
      [`${this._prefixCls}-disabled`]: this._disabled
    };
  }

  constructor(private _elementRef: ElementRef, public _renderer: Renderer2, public _nzRadioGroup: NzRadioGroupComponent) {
    this._el = this._elementRef.nativeElement;
  }

  ngOnInit(): void {
    this._nzRadioGroup.addRadio(this);
    this._renderer.addClass(this._el, `${this._prefixCls}-wrapper`);
    this.setClassMap();
  }
}
