/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CandyDate } from 'ng-zorro-antd/core/time';
import { NzCalendarI18nInterface } from 'ng-zorro-antd/i18n';
import { NzDateMode } from '../standard-types';
import { PanelSelector } from './interface';

export abstract class AbstractPanelHeader implements OnInit, OnChanges {
  prefixCls: string = `ant-picker-header`;
  selectors: PanelSelector[] = [];

  @Input() value!: CandyDate;
  @Input() locale!: NzCalendarI18nInterface;
  @Input() showSuperPreBtn: boolean = true;
  @Input() showSuperNextBtn: boolean = true;
  @Input() showPreBtn: boolean = true;
  @Input() showNextBtn: boolean = true;

  @Output() readonly panelModeChange = new EventEmitter<NzDateMode>();
  @Output() readonly valueChange = new EventEmitter<CandyDate>();

  abstract getSelectors(): PanelSelector[];

  superPreviousTitle(): string {
    return this.locale.previousYear;
  }

  previousTitle(): string {
    return this.locale.previousMonth;
  }

  superNextTitle(): string {
    return this.locale.nextYear;
  }

  nextTitle(): string {
    return this.locale.nextMonth;
  }

  superPrevious(): void {
    this.changeValue(this.value.addYears(-1));
  }

  superNext(): void {
    this.changeValue(this.value.addYears(1));
  }

  previous(): void {
    this.changeValue(this.value.addMonths(-1));
  }

  next(): void {
    this.changeValue(this.value.addMonths(1));
  }

  changeValue(value: CandyDate): void {
    if (this.value !== value) {
      this.value = value;
      this.valueChange.emit(this.value);
      this.render();
    }
  }

  changeMode(mode: NzDateMode): void {
    this.panelModeChange.emit(mode);
  }

  private render(): void {
    if (this.value) {
      this.selectors = this.getSelectors();
    }
  }

  ngOnInit(): void {
    if (!this.value) {
      this.value = new CandyDate(); // Show today by default
    }
    this.selectors = this.getSelectors();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.value || changes.locale) {
      this.render();
    }
  }
}
