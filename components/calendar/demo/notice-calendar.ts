import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-calendar-notice-calendar',
  template: `
<nz-calendar>
  <ul *nzDateCell="let date" class="events">
     <ng-container *ngFor="let event of objects; trackBy:getEvents">
        <li nz-popover *ngIf="event.date.getTime() === date.getTime()"
         nzTitle="{{event.title}}" nzContent="{{event.content}}">
           <nz-badge [nzStatus]="event.type" [nzText]="event.title"></nz-badge>
        </li>
     </ng-container>
  </ul>
  <ul *nzMonthCell="let month" class="events">
     <ng-container *ngFor="let event of getMonthEvents(month)">
       <li nz-popover nzTitle="{{event.title}}" nzContent="{{event.content}}">
           <nz-badge [nzStatus]="event.type" [nzText]="event.title"></nz-badge>
       </li>
     </ng-container>
  </ul>
</nz-calendar>
`,
  styles: [`
  .events {
    text-align: center;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .events .ant-badge-status {
    overflow: hidden;
    white-space: nowrap;
    width: 100%;
    text-overflow: ellipsis;
    font-size: 12px;
  }
` ]
})
export class NzDemoCalendarNoticeCalendarComponent {
  current = new Date();
  tomorrow = new Date();
  yesterday = new Date();
  nextMonth = new Date();

  constructor() {
    this.tomorrow.setDate(this.tomorrow.getDate() + 1);
    this.yesterday.setDate(this.yesterday.getDate() - 1);
    this.nextMonth.setMonth(this.nextMonth.getMonth() + 1);
    // Ignore time
    this.current.setHours(0,0,0,0);
    this.tomorrow.setHours(0,0,0,0);
    this.yesterday.setHours(0,0,0,0);
    this.nextMonth.setHours(0,0,0,0);
  }

  objects =
  [{
    type: 'warning', content: 'This is warning event', title: 'This is title to warning event',
    date: this.tomorrow
  },
  {
    type: 'success', content: 'This is very long usual event with very very long decription...',
    title: 'This is title to event with long description', date: this.current
  },
  {
    type: 'error', content: 'This is error event', title: 'This is title to error event',
    date: this.yesterday
  },
  {
    type: 'default', content: 'This is default event', title: 'This is title to default event',
    date: this.nextMonth
  }];
 
  getEvents(index, event) {
    return event;
  }

  getMonthEvents(month: Date) {
    return this.objects.filter(value => {
      return value.date.getMonth() === month.getMonth();
    });
  }
}
