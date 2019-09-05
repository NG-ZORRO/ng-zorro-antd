/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { NzDatePickerComponent } from 'ng-zorro-antd';

import { InputBoolean, InputNumber } from 'ng-zorro-antd/core';
import { interval, Subscription } from 'rxjs';

import { getCurrentTime } from './nz-time-range.utils';

export interface NzTimeRangeChange {
  start: Date;
  stop: Date;
  range: number;
}

export const defaultRanges = [
  10 * 60 * 1000, // 10 min
  60 * 10 * 60 * 1000, // 1h
  12 * 60 * 10 * 60 * 1000, // 12h
  24 * 60 * 10 * 60 * 1000 // 1 day
];

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'nz-time-range',
  templateUrl: './nz-time-range.component.html',
  host: {
    class: 'ant-time-range'
  }
})
export class NzTimeRangeComponent implements OnChanges, OnInit, OnDestroy {
  @ViewChild(NzDatePickerComponent, { static: true }) datePicker: NzDatePickerComponent;

  @Input() @InputBoolean() nzAutoRefresh: boolean = false;
  @Input() @InputBoolean() nzShowAutoRefresh: boolean = false;
  @Input() @InputNumber() nzAutoRefreshInterval: number = 5000;
  @Input() nzRanges: number[] = defaultRanges;
  @Input() @InputNumber() nzRange: number;

  @Output() readonly nzAutoRefreshChange = new EventEmitter<boolean>();
  @Output() readonly nzRangeChange = new EventEmitter<number>();
  @Output() readonly nzTimeRangeChange = new EventEmitter<NzTimeRangeChange>();

  range: number;

  /** A pair of start time and stop time. */
  datepickerTimes: [Date, Date] | Date[];

  /** If user use the date-picker to select a range, then there would be a new label for it. */
  derivedRange: number | null = null;

  private startTime: number;
  private stopTime: number;

  private autoRefreshTimer_: Subscription | null;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    const { nzRange, nzAutoRefresh } = changes;

    if (nzRange && !nzRange.isFirstChange()) {
      if (this.nzRanges.indexOf(nzRange.currentValue) === -1) {
        this.derivedRange = nzRange.currentValue;
      }
      this.range = nzRange.currentValue;
      this.recalcCurrentTime();
      this.emitTimeChange();
    }

    if (nzAutoRefresh) {
      this.setAutoRefresh(nzAutoRefresh.currentValue);
    }
  }

  ngOnInit(): void {
    if (!this.nzRange) {
      this.nzRange = this.nzRanges[0];
    }

    this.range = this.nzRange;

    this.refreshTimeWithCurrentRange();
  }

  ngOnDestroy(): void {
    this.clearAutoRefresher();
  }

  onRangeSelect(range: number): void {
    this.range = range;
    this.derivedRange = null;

    this.recalcCurrentTime();
    this.emitRangeChange();
    this.cdr.markForCheck();
  }

  onRangePickerChange(e: [Date, Date]): void {
    this.datepickerTimes = e;
    this.startTime = e[0].getTime();
    this.stopTime = e[1].getTime();
    this.range = this.stopTime - this.startTime;

    if (this.nzRanges.indexOf(this.range) !== -1) {
      this.derivedRange = this.range;
    } else {
      this.derivedRange = null;
    }

    this.emitRangeChange();
  }

  refreshTimeWithCurrentRange(): void {
    this.recalcCurrentTime();
    this.emitTimeChange();

    this.cdr.markForCheck();
  }

  onToggleAutoRefresh(): void {
    this.nzAutoRefresh = !this.nzAutoRefresh;
    this.nzAutoRefreshChange.emit(this.nzAutoRefresh);
    this.setAutoRefresh(this.nzAutoRefresh);
  }

  private setAutoRefresh(enable: boolean): void {
    if (enable) {
      this.createAutoRefresher();
    } else {
      this.clearAutoRefresher();
    }
  }

  private createAutoRefresher(): void {
    this.clearAutoRefresher();

    this.autoRefreshTimer_ = interval(this.nzAutoRefreshInterval).subscribe(() => {
      this.refreshTimeWithCurrentRange();
    });
  }

  private clearAutoRefresher(): void {
    if (this.autoRefreshTimer_) {
      this.autoRefreshTimer_.unsubscribe();
    }
  }

  private recalcCurrentTime(): void {
    const stopTime = (this.stopTime = getCurrentTime());
    const startTime = (this.startTime = stopTime - this.range);

    this.datepickerTimes = [new Date(startTime), new Date(stopTime)];
  }

  private emitRangeChange(): void {
    this.nzRangeChange.emit(this.range);
    this.emitTimeChange(); // If range is changed, then should emit time change as well.
  }

  private emitTimeChange(): void {
    this.nzTimeRangeChange.emit({
      start: new Date(this.startTime),
      stop: new Date(this.stopTime),
      range: this.stopTime - this.startTime
    });
  }
}
