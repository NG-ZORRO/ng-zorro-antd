import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';

import { isNonEmptyString, isTemplateRef } from 'ng-zorro-antd/core';
import { NzCalendarI18nInterface } from 'ng-zorro-antd/i18n';
import { CandyDate } from '../candy-date/candy-date';

@Component({
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  // tslint:disable-next-line:component-selector
  selector: 'calendar-footer',
  exportAs: 'calendarFooter',
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
