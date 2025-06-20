/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewEncapsulation,
  booleanAttribute,
  inject
} from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzStringTemplateOutletDirective } from 'ng-zorro-antd/core/outlet';
import { CandyDate } from 'ng-zorro-antd/core/time';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { DateHelperService, NzCalendarI18nInterface } from 'ng-zorro-antd/i18n';

import { transCompatFormat } from './lib/util';
import { PREFIX_CLASS } from './util';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'calendar-footer',
  imports: [NgTemplateOutlet, NzButtonModule, NzStringTemplateOutletDirective],
  template: `
    <div class="{{ prefixCls }}-footer">
      @if (extraFooter) {
        <div class="{{ prefixCls }}-footer-extra">
          <ng-template [nzStringTemplateOutlet]="extraFooter">{{ extraFooter }}</ng-template>
        </div>
      }

      @if (showToday) {
        <a
          class="{{ prefixCls }}-today-btn {{ isTodayDisabled ? prefixCls + '-today-btn-disabled' : '' }}"
          role="button"
          (click)="isTodayDisabled ? null : onClickToday()"
          title="{{ todayTitle }}"
        >
          {{ locale.today }}
        </a>
      }

      @if (hasTimePicker || rangeQuickSelector) {
        <ul class="{{ prefixCls }}-ranges">
          <ng-container *ngTemplateOutlet="rangeQuickSelector" />
          @if (showNow) {
            <li class="{{ prefixCls }}-now">
              <a class="{{ prefixCls }}-now-btn" (click)="isTodayDisabled ? null : onClickToday()">
                {{ locale.now }}
              </a>
            </li>
          }

          @if (hasTimePicker) {
            <li class="{{ prefixCls }}-ok">
              <button
                nz-button
                type="button"
                nzType="primary"
                nzSize="small"
                [disabled]="okDisabled"
                (click)="okDisabled ? null : clickOk.emit()"
              >
                {{ locale.ok }}
              </button>
            </li>
          }
        </ul>
      }
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarFooterComponent implements OnChanges {
  private dateHelper = inject(DateHelperService);
  @Input() locale!: NzCalendarI18nInterface;
  @Input({ transform: booleanAttribute }) showToday: boolean = false;
  @Input({ transform: booleanAttribute }) showNow: boolean = false;
  @Input({ transform: booleanAttribute }) hasTimePicker: boolean = false;
  @Input({ transform: booleanAttribute }) isRange: boolean = false;

  @Input({ transform: booleanAttribute }) okDisabled: boolean = false;
  @Input() disabledDate?: (d: Date) => boolean;
  @Input() extraFooter?: TemplateRef<void> | string;
  @Input() rangeQuickSelector: TemplateRef<NzSafeAny> | null = null;

  @Output() readonly clickOk = new EventEmitter<void>();
  @Output() readonly clickToday = new EventEmitter<CandyDate>();

  prefixCls: string = PREFIX_CLASS;
  isTodayDisabled: boolean = false;
  todayTitle: string = '';

  ngOnChanges(changes: SimpleChanges): void {
    const now: Date = new Date();
    if (changes.disabledDate) {
      this.isTodayDisabled = !!(this.disabledDate && this.disabledDate(now));
    }
    if (changes.locale) {
      // NOTE: Compat for DatePipe formatting rules
      const dateFormat: string = transCompatFormat(this.locale.dateFormat);
      this.todayTitle = this.dateHelper.format(now, dateFormat);
    }
  }

  onClickToday(): void {
    const now: CandyDate = new CandyDate();
    this.clickToday.emit(now.clone()); // To prevent the "now" being modified from outside, we use clone
  }
}
