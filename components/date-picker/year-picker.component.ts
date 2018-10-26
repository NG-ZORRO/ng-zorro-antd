import { forwardRef, Component, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { NzI18nService } from '../i18n/nz-i18n.service';

import { HeaderPickerComponent, SupportHeaderPanel } from './header-picker.component';

@Component({
  selector: 'nz-year-picker',
  templateUrl: './header-picker.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => NzYearPickerComponent)
  }],
  host               : {
    '[class.ant-calendar-picker]': 'true'
  }
})

export class NzYearPickerComponent extends HeaderPickerComponent {
  @Input() nzFormat: string = 'yyyy';

  endPanelMode: SupportHeaderPanel = 'year';
  constructor(i18n: NzI18nService) {
    super(i18n);
  }
}
