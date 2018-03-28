import { forwardRef, Component, OnChanges } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { DateRangePickerComponent } from './date-range-picker.component';

@Component({
  selector: 'nz-week-picker',
  templateUrl: 'date-range-picker.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => NzWeekPickerComponent)
  }]
})

export class NzWeekPickerComponent extends DateRangePickerComponent {
  showWeek: boolean = true;
}
