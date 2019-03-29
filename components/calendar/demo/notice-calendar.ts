import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-calendar-notice-calendar',
  template: `
    <nz-calendar>
      <ul *nzDateCell="let date" class="events">
        <ng-container [ngSwitch]="date.getDate()">
          <ng-container *ngSwitchCase="8">
            <li *ngFor="let item of listDataMap.eight">
              <nz-badge [nzStatus]="item.type" [nzText]="item.content"></nz-badge>
            </li>
          </ng-container>
          <ng-container *ngSwitchCase="10">
            <li *ngFor="let item of listDataMap.ten">
              <nz-badge [nzStatus]="item.type" [nzText]="item.content"></nz-badge>
            </li>
          </ng-container>
          <ng-container *ngSwitchCase="11">
            <li *ngFor="let item of listDataMap.eleven">
              <nz-badge [nzStatus]="item.type" [nzText]="item.content"></nz-badge>
            </li>
          </ng-container>
        </ng-container>
      </ul>
      <ng-container *nzMonthCell="let month">
        <div *ngIf="getMonthData(month) as monthData" class="notes-month">
          <section>{{ monthData }}</section>
          <span>Backlog number</span>
        </div>
      </ng-container>
    </nz-calendar>
  `,
  styles: [
    `
      .events {
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

      .notes-month {
        text-align: center;
        font-size: 28px;
      }

      .notes-month section {
        font-size: 28px;
      }
    `
  ]
})
export class NzDemoCalendarNoticeCalendarComponent {
  listDataMap = {
    eight: [
      { type: 'warning', content: 'This is warning event.' },
      { type: 'success', content: 'This is usual event.' }
    ],
    ten: [
      { type: 'warning', content: 'This is warning event.' },
      { type: 'success', content: 'This is usual event.' },
      { type: 'error', content: 'This is error event.' }
    ],
    eleven: [
      { type: 'warning', content: 'This is warning event' },
      { type: 'success', content: 'This is very long usual event........' },
      { type: 'error', content: 'This is error event 1.' },
      { type: 'error', content: 'This is error event 2.' },
      { type: 'error', content: 'This is error event 3.' },
      { type: 'error', content: 'This is error event 4.' }
    ]
  };

  getMonthData(date: Date): number | null {
    if (date.getMonth() === 8) {
      return 1394;
    }
    return null;
  }
}
