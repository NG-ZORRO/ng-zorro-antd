import { forwardRef, Component } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { DateRangePickerComponent } from './date-range-picker.component';

@Component({
  selector: 'nz-date-picker',
  templateUrl: 'date-range-picker.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => NzDatePickerComponent)
  }]
})

export class NzDatePickerComponent extends DateRangePickerComponent {
  isRange: boolean = false;
}
