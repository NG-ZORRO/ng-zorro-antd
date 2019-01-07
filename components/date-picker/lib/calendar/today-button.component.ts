import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';

import { NzCalendarI18nInterface } from '../../../i18n/nz-i18n.interface';
import { NzI18nService } from '../../../i18n/nz-i18n.service';
import { CandyDate } from '../candy-date';

@Component({
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  // tslint:disable-next-line:component-selector
  selector: 'today-button',
  templateUrl: 'today-button.component.html'
})

export class TodayButtonComponent implements OnInit, OnChanges {
  @Input() locale: NzCalendarI18nInterface;
  @Input() hasTimePicker: boolean = false;
  @Input() disabledDate: (d: Date) => boolean;

  @Output() readonly clickToday = new EventEmitter<CandyDate>();

  prefixCls: string = 'ant-calendar';
  isDisabled: boolean = false;
  get title(): string {
    return this.i18n.formatDate(this.now.nativeDate, 'longDate');
  }

  private now: CandyDate = new CandyDate();

  constructor(private i18n: NzI18nService) { }

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.disabledDate) {
      this.isDisabled = this.disabledDate && this.disabledDate(this.now.nativeDate);
    }
  }

  onClickToday(): void {
    this.clickToday.emit(this.now.clone()); // To prevent the "now" being modified from outside, we use clone
  }
}
