import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';

import { DateHelperService } from '../../../i18n/date-helper.service';
import { CandyDate } from '../candy-date';

const MAX_ROW = 4;
const MAX_COL = 3;

@Component({
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  // tslint:disable-next-line:component-selector
  selector: 'month-table',
  templateUrl: 'month-table.component.html'
})

export class MonthTableComponent implements OnInit, OnChanges {
  @Input() value: CandyDate;
  @Output() readonly valueChange = new EventEmitter<CandyDate>();

  @Input() disabledDate: (date: Date) => boolean;

  prefixCls: string = 'ant-calendar-month-panel';
  panelMonths: PanelMonthData[][];

  constructor(private dateHelper: DateHelperService) { }

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.value || changes.disabledDate) {
      this.render();
    }
  }

  trackPanelMonth(_index: number, monthData: PanelMonthData): number {
    return monthData.month;
  }

  private render(): void {
    if (this.value) {
      this.panelMonths = this.makePanelMonths();
    }
  }

  private makePanelMonths(): PanelMonthData[][] {
    const months: PanelMonthData[][] = [];
    const currentMonth = this.value.getMonth();
    const today = new CandyDate();

    let monthValue = 0;
    for (let rowIndex = 0; rowIndex < MAX_ROW; rowIndex ++) {
      months[rowIndex] = [];
      for (let colIndex = 0; colIndex < MAX_COL; colIndex ++) {
        const month = this.value.setMonth(monthValue);
        const disabled = this.disabledDate ? this.disabledDate(this.value.setMonth(monthValue).nativeDate) : false;
        const content = this.dateHelper.format(month.nativeDate, 'MMM');

        const cell: PanelMonthData = months[rowIndex][colIndex] = {
          disabled,
          content,
          month: monthValue,
          title: content,
          classMap: null,
          onClick: () => this.chooseMonth(cell.month)
        };

        cell.classMap = {
          [`${this.prefixCls}-cell`]: true,
          [`${this.prefixCls}-cell-disabled`]: disabled,
          [`${this.prefixCls}-selected-cell`]: cell.month === currentMonth,
          [`${this.prefixCls}-current-cell`]: today.getYear() === this.value.getYear() && cell.month === today.getMonth()
        };

        monthValue ++;
      }
    }
    return months;
  }

  private chooseMonth(month: number): void {
    this.value = this.value.setMonth(month);
    this.valueChange.emit(this.value);
    this.render();
  }
}

export interface PanelMonthData {
  disabled: boolean;
  content: string;
  month: number;
  title: string;
  classMap: object | null;
  onClick: VoidFunction | null;
}
