import {
  Component,
  HostBinding,
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
  _checked = false;
  _disabled = false;
  _prefixCls = 'ant-radio-button';
  _innerPrefixCls = `${this._prefixCls}-inner`;
  _inputPrefixCls = `${this._prefixCls}-input`;

  @Input()
  @HostBinding('class.ant-radio-button-wrapper-disabled')
  set nzDisabled(value: boolean) {
    this._disabled = toBoolean(value);
    this.setClassMap();
  }

  get nzDisabled(): boolean {
    return this._disabled;
  }

  @Input()
  @HostBinding('class.ant-radio-button-wrapper-checked')
  set nzChecked(value: boolean) {
    this._checked = toBoolean(value);
    this.setClassMap();
  }

  get nzChecked(): boolean {
    return this._checked;
  }
}
