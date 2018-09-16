import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, TemplateRef } from '@angular/core';

import { FunctionProp } from '../../../core/types/common-wrap';
import { NzCalendarI18nInterface } from '../../../i18n/nz-i18n.interface';
import { DisabledDateFn, PanelMode } from '../../standard-types';
import { CandyDate } from '../candy-date';

@Component({
  selector: 'inner-popup',
  templateUrl: 'inner-popup.component.html'
})

export class InnerPopupComponent implements OnInit, OnChanges {
  @Input() showWeek: boolean;

  @Input() locale: NzCalendarI18nInterface;
  @Input() showTimePicker: boolean;
  // tslint:disable-next-line:no-any
  @Input() timeOptions: any;
  @Input() enablePrev: boolean;
  @Input() enableNext: boolean;
  @Input() disabledDate: DisabledDateFn;
  @Input() dateRender: FunctionProp<TemplateRef<Date> | string>;
  @Input() selectedValue: CandyDate[]; // Range ONLY
  @Input() hoverValue: CandyDate[]; // Range ONLY

  @Input() panelMode: PanelMode;
  @Output() panelModeChange = new EventEmitter<PanelMode>();

  @Input() value: CandyDate;

  @Output() headerChange = new EventEmitter<CandyDate>(); // Emitted when user changed the header's value
  @Output() selectDate = new EventEmitter<CandyDate>(); // Emitted when the date is selected by click the date panel
  @Output() selectTime = new EventEmitter<CandyDate>();
  @Output() dayHover = new EventEmitter<CandyDate>(); // Emitted when hover on a day by mouse enter

  prefixCls: string = 'ant-calendar';

  constructor() { }

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.value && !this.value) {
      this.value = new CandyDate();
    }
  }

  onSelectTime(date: Date): void {
    this.selectTime.emit(new CandyDate(date));
  }

  // The value real changed to outside
  onSelectDate(date: CandyDate | Date): void {
    // this.value = date instanceof CandyDate ? date : new CandyDate(date);
    const value  = date instanceof CandyDate ? date : new CandyDate(date);
    this.selectDate.emit(value);
  }
}
