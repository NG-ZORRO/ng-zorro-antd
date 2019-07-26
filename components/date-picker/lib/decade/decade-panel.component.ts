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
  OnChanges,
  Output,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';

import { CandyDate } from 'ng-zorro-antd/core';
import { NzCalendarI18nInterface } from 'ng-zorro-antd/i18n';

const MAX_ROW = 4;
const MAX_COL = 3;

@Component({
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  // tslint:disable-next-line:component-selector
  selector: 'decade-panel',
  exportAs: 'decadePanel',
  templateUrl: 'decade-panel.component.html'
})
export class DecadePanelComponent implements OnChanges {
  @Input() locale: NzCalendarI18nInterface;

  @Input() value: CandyDate;
  @Output() readonly valueChange = new EventEmitter<CandyDate>();

  get startYear(): number {
    return parseInt(`${this.value.getYear() / 100}`, 10) * 100;
  }
  get endYear(): number {
    return this.startYear + 99;
  }

  prefixCls: string = 'ant-calendar-decade-panel';
  panelDecades: PanelDecadeData[][];

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.value) {
      this.render();
    }
  }

  previousCentury(): void {
    this.gotoYear(-100);
  }

  nextCentury(): void {
    this.gotoYear(100);
  }

  trackPanelDecade(_index: number, decadeData: PanelDecadeData): string {
    return decadeData.content;
  }

  private render(): void {
    if (this.value) {
      this.panelDecades = this.makePanelDecades();
    }
  }

  // Re-render panel content by the header's buttons (NOTE: Do not try to trigger final value change)
  private gotoYear(amount: number): void {
    this.value = this.value.addYears(amount);
    // this.valueChange.emit(this.value); // Do not try to trigger final value change
    this.render();
  }

  private chooseDecade(startYear: number): void {
    this.value = this.value.setYear(startYear);
    this.valueChange.emit(this.value);
  }

  private makePanelDecades(): PanelDecadeData[][] {
    const decades: PanelDecadeData[][] = [];
    const currentYear = this.value.getYear();
    const startYear = this.startYear;
    const endYear = this.endYear;
    const previousYear = startYear - 10;

    let index = 0;
    for (let rowIndex = 0; rowIndex < MAX_ROW; rowIndex++) {
      decades[rowIndex] = [];
      for (let colIndex = 0; colIndex < MAX_COL; colIndex++) {
        const start = previousYear + index * 10;
        const end = previousYear + index * 10 + 9;
        const content = `${start}-${end}`;

        const cell: PanelDecadeData = (decades[rowIndex][colIndex] = {
          content,
          title: content,
          isCurrent: currentYear >= start && currentYear <= end,
          isLowerThanStart: end < startYear,
          isBiggerThanEnd: start > endYear,
          classMap: null,
          onClick: null
        });

        cell.classMap = {
          [`${this.prefixCls}-cell`]: true,
          [`${this.prefixCls}-selected-cell`]: cell.isCurrent,
          [`${this.prefixCls}-last-century-cell`]: cell.isLowerThanStart,
          [`${this.prefixCls}-next-century-cell`]: cell.isBiggerThanEnd
        };

        if (cell.isLowerThanStart) {
          cell.onClick = () => this.previousCentury();
        } else if (cell.isBiggerThanEnd) {
          cell.onClick = () => this.nextCentury();
        } else {
          cell.onClick = () => this.chooseDecade(start);
        }

        index++;
      }
    }
    return decades;
  }
}

export interface PanelDecadeData {
  content: string;
  title: string;
  isCurrent: boolean;
  isLowerThanStart: boolean;
  isBiggerThanEnd: boolean;
  classMap?: object | null;
  onClick: VoidFunction | null;
}
