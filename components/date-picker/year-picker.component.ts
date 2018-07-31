import { forwardRef, Component, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

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
    '[class.ant-checkbox-group]': 'true'
  }
})

export class NzYearPickerComponent extends HeaderPickerComponent {
  @Input() nzFormat: string = 'yyyy';

  endPanelMode: SupportHeaderPanel = 'year';
}
