import { Component, Input } from '@angular/core';
import { isTemplateRef, isNonEmptyString } from 'ng-zorro-antd/core';
import { DateCell } from './date-table.component';

@Component({
  selector: '[date-table-cell]',
  templateUrl: './date-table-cell.component.html',
  styles: []
})
export class DateTableCellComponent {
  isTemplateRef = isTemplateRef;
  isNonEmptyString = isNonEmptyString;

  @Input() prefixCls: 'ant-calendar' | 'ant-fullcalendar';
  @Input() cell: DateCell;
}
