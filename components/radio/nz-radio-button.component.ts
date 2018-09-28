import {
  Component,
  OnInit
} from '@angular/core';
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
}
