/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { TemplateRef } from '@angular/core';

export interface PanelSelector {
  className: string;
  title?: string;
  label: string;
  onClick(): void;
}

export interface DateCell {
  value: Date;
  content: TemplateRef<Date> | string;
  onClick(): void;
  onMouseEnter(): void;
  isDisabled: boolean;
  isSelected: boolean;
  label?: string;
  title?: string;
  cellRender?: TemplateRef<Date> | string;
  fullCellRender?: TemplateRef<Date> | string;
  isToday?: boolean;
  classMap?: object;
}

export interface DateBodyRow {
  dateCells: DateCell[];
  isCurrent?: boolean; // Is the week that today stays in
  isActive?: boolean; // Is the week that current setting date stays in
  weekNum?: number;
  year?: number;
  classMap?: object;
}

export interface DayCell extends DateCell {
  isSelectedStartDate?: boolean;
  isSelectedEndDate?: boolean;
  isHoverStartDate?: boolean;
  isHoverEndDate?: boolean;
  isInHoverRange?: boolean;
  isInSelectedRange?: boolean;
  isLastDayOfMonth?: boolean;
  isFirstDayOfMonth?: boolean;
  isStartSingle?: boolean;
  isEndSingle?: boolean;
}

export interface DecadeCell extends DateCell {
  isBiggerThanEnd?: boolean;
  isLowerThanStart?: boolean;
}

export interface YearCell extends DateCell {
  isSameDecade?: boolean;
}
