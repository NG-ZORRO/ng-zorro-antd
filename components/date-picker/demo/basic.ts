import { Component } from '@angular/core';
import getISOWeek from 'date-fns/getISOWeek';
import { en_US, NzI18nService, zh_CN } from 'ng-zorro-antd/i18n';

@Component({
  selector: 'nz-demo-date-picker-basic',
  template: `
    <nz-date-picker [(ngModel)]="date" (ngModelChange)="onChange($event)"></nz-date-picker>
    <br />
    <nz-date-picker nzMode="week" [(ngModel)]="date" (ngModelChange)="getWeek($event)"></nz-date-picker>
    <br />
    <nz-date-picker nzMode="month" [(ngModel)]="date" (ngModelChange)="onChange($event)"></nz-date-picker>
    <br />
    <nz-date-picker nzMode="year" [(ngModel)]="date" (ngModelChange)="onChange($event)"></nz-date-picker>
    <br />
    <button nz-button nzType="default" (click)="changeLanguage()">Switch language for all pickers</button>
  `,
  styles: [
    `
      nz-date-picker {
        margin: 0 8px 12px 0;
      }
    `
  ]
})
export class NzDemoDatePickerBasicComponent {
  date = null;
  isEnglish = false;

  constructor(private i18n: NzI18nService) {}

  onChange(result: Date): void {
    console.log('onChange: ', result);
  }

  getWeek(result: Date): void {
    console.log('week: ', getISOWeek(result));
  }

  changeLanguage(): void {
    this.i18n.setLocale(this.isEnglish ? zh_CN : en_US);
    this.isEnglish = !this.isEnglish;
  }
}
