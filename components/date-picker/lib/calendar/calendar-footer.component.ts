import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';

import { isNonEmptyString, isTemplateRef } from '../../../core/util/check';
import { NzCalendarI18nInterface } from '../../../i18n/nz-i18n.interface';
import { CandyDate } from '../candy-date';

@Component({
  selector: 'calendar-footer',
  templateUrl: 'calendar-footer.component.html'
})
export class CalendarFooterComponent {
  @Input() locale: NzCalendarI18nInterface;
  @Input() showToday: boolean = false;
  @Input() hasTimePicker: boolean = false;
  @Input() isRange: boolean = false;

  @Input() showTimePicker: boolean = false;
  @Output() showTimePickerChange = new EventEmitter<boolean>();

  // @Input() disabled: boolean = false;
  @Input() timePickerDisabled: boolean = false;
  @Input() okDisabled: boolean = false;
  @Input() disabledDate: (d: Date) => boolean;
  @Input() extraFooter: TemplateRef<void> | string;
  @Input() rangeQuickSelector: TemplateRef<void>;

  @Output() clickOk = new EventEmitter<void>();
  @Output() clickToday = new EventEmitter<CandyDate>();

  prefixCls: string = 'ant-calendar';
  isTemplateRef = isTemplateRef;
  isNonEmptyString = isNonEmptyString;
}
