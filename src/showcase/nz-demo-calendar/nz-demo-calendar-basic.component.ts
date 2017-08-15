import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nz-demo-calendar-basic',
  template: `
    <nz-calendar [nzLocale]="'zh-cn'"></nz-calendar>`,
  styles  : []
})
export class NzDemoCalendarBasicComponent implements OnInit {
  constructor() {
  }

  ngOnInit() {
  }
}

