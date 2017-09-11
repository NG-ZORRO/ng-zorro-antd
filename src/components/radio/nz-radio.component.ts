import {
  Component,
  OnInit,
  ViewEncapsulation,
  Input,
  ElementRef,
  Renderer2,
  HostListener,
  HostBinding
} from '@angular/core';

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
  _el: HTMLElement;
  _classMap;
  _value: string;
  _prefixCls = 'ant-radio';
  _innerPrefixCls = `${this._prefixCls}-inner`;
  _inputPrefixCls = `${this._prefixCls}-input`;
  _checked = false;
  _focused = false;
  _disabled = false;

  @Input()
  @HostBinding('class.ant-radio-wrapper-checked')
  set nzChecked(value: boolean) {
    this._checked = value;
    this.setClassMap();
  }

  get nzChecked(): boolean {
    return this._checked;
  };


  @Input()
  get nzValue(): string {
    return this._value;
  };

  set nzValue(value: string) {
    if (this._value === value) {
      return;
    }
    this._value = value;
  }


  @Input()
  @HostBinding('class.ant-radio-wrapper-disabled')
  get nzDisabled(): boolean {
    return this._disabled;
  };

  set nzDisabled(value: boolean) {
    this._disabled = value;
    this.setClassMap();
  }

  @HostListener('click', [ '$event' ])
  onClick(e) {
    e.preventDefault();
    if (!this._disabled) {
      this._checked = true;
      this.setClassMap();
      this._nzRadioGroup.selectRadio(this);
    }
  }

  nzFocus() {
    this._focused = true;
    this.setClassMap();
  }

  nzBlur() {
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
    this._nzRadioGroup.addRadio(this);
  }

  ngOnInit() {
    this._renderer.addClass(this._el, `${this._prefixCls}-wrapper`);
    this.setClassMap();
  }
}
