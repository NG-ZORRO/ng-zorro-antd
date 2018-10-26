import { DOCUMENT } from '@angular/common';
import {
  Component,
  Inject,
  OnInit,
  Optional,
  Renderer2
} from '@angular/core';

import { NzRadioGroupComponent } from './nz-radio-group.component';
import { NzRadioComponent } from './nz-radio.component';

@Component({
  selector           : '[nz-radio-button]',
  preserveWhitespaces: false,
  templateUrl        : './nz-radio-button.component.html',
  host               : {
    '[class.ant-radio-button-wrapper]'         : 'true',
    '[class.ant-radio-button-wrapper-checked]' : 'nzChecked',
    '[class.ant-radio-button-wrapper-disabled]': 'nzDisabled'
  }
})
export class NzRadioButtonComponent extends NzRadioComponent implements OnInit {
  prefixCls = 'ant-radio-button';
  /* tslint:disable-next-line:no-any */
  constructor(@Optional() nzRadioGroup: NzRadioGroupComponent, renderer: Renderer2, @Inject(DOCUMENT) document: any) {
    super(nzRadioGroup, renderer, document);
  }
}
