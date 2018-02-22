import {
  Component,
  HostBinding,
  Input,
  OnInit
} from '@angular/core';

import { toBoolean } from '../core/util/convert';

import { NzRadioComponent } from './nz-radio.component';

@Component({
  selector           : '[nz-radio-button]',
  preserveWhitespaces: false,
  template           : `
    <span [ngClass]="classMap">
      <span class="ant-radio-button-inner"></span>
      <input type="radio" #inputElement class="ant-radio-button-input" [(ngModel)]="nzChecked" (focus)="nzFocus()" (blur)="nzBlur()" [attr.name]="name">
    </span>
    <span><ng-content></ng-content></span>
  `,
  host               : {
    '[class.ant-radio-button-wrapper]': 'true',
    '[class.ant-radio-button-wrapper-checked]': 'nzChecked',
    '[class.ant-radio-button-wrapper-disabled]': 'nzDisabled'
  }
})
export class NzRadioButtonComponent extends NzRadioComponent implements OnInit {
  prefixCls = 'ant-radio-button';
}
