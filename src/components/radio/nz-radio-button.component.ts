import {
  Component,
  HostBinding, HostListener,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';

import { toBoolean } from '../util/convert';
import { NzRadioComponent } from './nz-radio.component';

@Component({
  selector     : '[nz-radio-button]',
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
export class NzRadioButtonComponent extends NzRadioComponent implements OnInit {
  private _radioButtonDisabled = false;
  private _radioButtonChecked = false;
  _prefixCls = 'ant-radio-button';
  _innerPrefixCls = `${this._prefixCls}-inner`;
  _inputPrefixCls = `${this._prefixCls}-input`;

  @Input()
  @HostBinding('class.ant-radio-button-wrapper-disabled')
  set nzDisabled(value: boolean) {
    this._radioButtonDisabled = toBoolean(value);
    this.setClassMap();
  }

  get nzDisabled(): boolean {
    return this._radioButtonDisabled;
  }

  @Input()
  @HostBinding('class.ant-radio-button-wrapper-checked')
  set nzChecked(value: boolean) {
    this._radioButtonChecked = toBoolean(value);
    this.setClassMap();
  }

  get nzChecked(): boolean {
    return this._radioButtonChecked;
  }

  @HostListener('click', [ '$event' ])
  onClick(e: MouseEvent): void {
    e.preventDefault();
    if (!this._radioButtonDisabled) {
      if (this._nzRadioGroup) {
        this._radioButtonChecked = true;
        this.setClassMap();
        this._nzRadioGroup.selectRadio(this);
      } else {
        this.updateValue(!this._radioButtonChecked);
      }
    }
  }

  setClassMap(): void {
    this._classMap = {
      [this._prefixCls]              : true,
      [`${this._prefixCls}-checked`] : this._radioButtonChecked,
      [`${this._prefixCls}-disabled`]: this._radioButtonDisabled
    };
  }

  updateValue(value: boolean): void {
    if (value === this._radioButtonChecked) {
      return;
    }
    this.onChange(value);
    this._radioButtonChecked = value;
    this.setClassMap();
  }

  writeValue(value: boolean): void {
    this._radioButtonChecked = value;
    this.setClassMap();
  }
}
