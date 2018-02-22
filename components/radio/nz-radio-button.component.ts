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
      <input type="radio" #inputElement class="ant-radio-button-input" [disabled]="nzDisabled" [(ngModel)]="nzChecked" (blur)="onBlur()" [attr.name]="name">
      <span class="ant-radio-button-inner"></span>
    </span>
    <span><ng-content></ng-content></span>
  `,
  host               : {
    '[class.ant-radio-button-wrapper]'         : 'true',
    '[class.ant-radio-button-wrapper-checked]' : 'nzChecked',
    '[class.ant-radio-button-wrapper-disabled]': 'nzDisabled'
  }
})
export class NzRadioButtonComponent extends NzRadioComponent implements OnInit {
  prefixCls = 'ant-radio-button';
}
