import { forwardRef, Component, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { NzI18nService } from '../i18n/nz-i18n.service';

import { HeaderPickerComponent, SupportHeaderPanel } from './header-picker.component';

@Component({
  selector: 'nz-month-picker',
  templateUrl: './header-picker.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => NzMonthPickerComponent)
  }],
  host               : {
    '[class.ant-calendar-picker]': 'true'
  }
})

export class NzMonthPickerComponent extends HeaderPickerComponent {
  @Input() nzFormat: string = 'yyyy-MM';

  endPanelMode: SupportHeaderPanel = 'month';
  constructor(i18n: NzI18nService) {
    super(i18n);
  }
}
