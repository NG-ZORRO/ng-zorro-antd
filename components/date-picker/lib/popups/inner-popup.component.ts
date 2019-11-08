/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';

import { CandyDate, FunctionProp } from 'ng-zorro-antd/core';
import { NzCalendarI18nInterface } from 'ng-zorro-antd/i18n';
import { DisabledDateFn, PanelMode } from '../../standard-types';

@Component({
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  // tslint:disable-next-line:component-selector
  selector: 'inner-popup',
  exportAs: 'innerPopup',
  templateUrl: 'inner-popup.component.html'
})
export class InnerPopupComponent {
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
  @Output() readonly panelModeChange = new EventEmitter<PanelMode>();

  @Input() value: CandyDate;

  @Output() readonly headerChange = new EventEmitter<CandyDate>(); // Emitted when user changed the header's value
  @Output() readonly selectDate = new EventEmitter<CandyDate>(); // Emitted when the date is selected by click the date panel
  @Output() readonly selectTime = new EventEmitter<CandyDate>();
  @Output() readonly dayHover = new EventEmitter<CandyDate>(); // Emitted when hover on a day by mouse enter

  prefixCls: string = 'ant-calendar';

  onSelectTime(date: Date): void {
    this.selectTime.emit(new CandyDate(date));
  }

  // The value real changed to outside
  onSelectDate(date: CandyDate | Date): void {
    const value = date instanceof CandyDate ? date : new CandyDate(date);
    this.selectDate.emit(value);
  }
}
