import { Component } from '@angular/core';
import { en_US, fa_IR, NzI18nService } from 'ng-zorro-antd';

import { Moment } from 'jalali-moment';
@Component({
  selector: 'nz-demo-date-picker-basic',
  template: `
    <nz-date-picker [nzDateLocale]="dateLocale" [(ngModel)]="date" (ngModelChange)="onChange($event)"></nz-date-picker>
    <br />
    <nz-month-picker
      [nzDateLocale]="dateLocale"
      [(ngModel)]="date"
      (ngModelChange)="onChange($event)"
      nzPlaceHolder="Select month"
    ></nz-month-picker>
    <br />
    <nz-year-picker
      [nzDateLocale]="dateLocale"
      [(ngModel)]="date"
      (ngModelChange)="onChange($event)"
      nzPlaceHolder="Select year"
    ></nz-year-picker>
    <br />
    <nz-range-picker
      [nzDateLocale]="dateLocale"
      [(ngModel)]="dateRange"
      (ngModelChange)="onChange($event)"
      nzShowTime
    ></nz-range-picker>
    <br />
    <nz-week-picker
      [nzDateLocale]="dateLocale"
      [(ngModel)]="date"
      (ngModelChange)="getWeek($event)"
      nzPlaceHolder="Select week"
    ></nz-week-picker>
    <br />
    <button nz-button nzType="default" (click)="changeLanguage()">Switch language for all pickers</button>
  `,
  styles: [
    `
      nz-date-picker,
      nz-month-picker,
      nz-year-picker,
      nz-range-picker,
      nz-week-picker {
        margin: 0 8px 12px 0;
      }
    `
  ]
})
export class NzDemoDatePickerBasicComponent {
  date = null; // new Date();
  dateRange = []; // [ new Date(), addDays(new Date(), 3) ];
  isEnglish = false;
  dateLocale = 'en';

  constructor(private i18n: NzI18nService) {}

  onChange(result: Moment): void {
    console.log('onChange: ', result);
  }

  getWeek(result: Moment): void {
    console.log('week: ', result.isoWeek());
  }

  changeLanguage(): void {
    this.i18n.setLocale(this.isEnglish ? fa_IR : en_US);
    this.dateLocale = this.isEnglish ? 'fa' : 'en';
    this.isEnglish = !this.isEnglish;
  }
}
