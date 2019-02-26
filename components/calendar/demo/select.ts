import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-calendar-select',
  template: `
    <nz-alert nzMessage="Your selected date: {{ selectedValue | date:'yyyy-MM-dd' }}"></nz-alert>
    <nz-calendar [(ngModel)]="selectedValue"
      (selectChange)="selectChange($event)"
      (nzValueChange)="valueChange($event)"
    ></nz-calendar>
  `
})
export class NzDemoCalendarSelectComponent {
  selectedValue = new Date('2017-01-25');

  selectChange(select: Date): void {
    console.log(`Select value: ${select}`);
  }

  valueChange(value: Date): void {
    console.log(`Current value: ${value}`);
  }
}
