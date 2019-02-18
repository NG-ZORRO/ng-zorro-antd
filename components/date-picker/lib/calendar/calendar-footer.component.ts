import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, TemplateRef, ViewEncapsulation } from '@angular/core';

import { isNonEmptyString, isTemplateRef } from '../../../core/util/check';
import { NzCalendarI18nInterface } from '../../../i18n/nz-i18n.interface';
import { CandyDate } from '../candy-date';

@Component({
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  // tslint:disable-next-line:component-selector
  selector: 'calendar-footer',
  templateUrl: 'calendar-footer.component.html'
})
export class CalendarFooterComponent {
  @Input() locale: NzCalendarI18nInterface;
  @Input() showToday: boolean = false;
  @Input() hasTimePicker: boolean = false;
  @Input() isRange: boolean = false;

  @Input() showTimePicker: boolean = false;
  @Output() readonly showTimePickerChange = new EventEmitter<boolean>();

  @Input() timePickerDisabled: boolean = false;
  @Input() okDisabled: boolean = false;
  @Input() disabledDate: (d: Date) => boolean;
  @Input() extraFooter: TemplateRef<void> | string;
  @Input() rangeQuickSelector: TemplateRef<void>;

  @Output() readonly clickOk = new EventEmitter<void>();
  @Output() readonly clickToday = new EventEmitter<CandyDate>();

  prefixCls: string = 'ant-calendar';
  isTemplateRef = isTemplateRef;
  isNonEmptyString = isNonEmptyString;
}
