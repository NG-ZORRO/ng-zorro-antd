import { Component } from '@angular/core';

import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';

@Component({
  selector: 'nz-demo-calendar-notice-calendar',
  imports: [NzBadgeModule, NzCalendarModule],
  template: `
    <nz-calendar>
      <ul *nzDateCell="let date" class="events">
        @switch (date.getDate()) {
          @case (8) {
            @for (item of listDataMap.eight; track $index) {
              <li>
                <nz-badge [nzStatus]="item.type" [nzText]="item.content"></nz-badge>
              </li>
            }
          }
          @case (10) {
            @for (item of listDataMap.ten; track $index) {
              <li>
                <nz-badge [nzStatus]="item.type" [nzText]="item.content"></nz-badge>
              </li>
            }
          }
          @case (11) {
            @for (item of listDataMap.eleven; track $index) {
              <li>
                <nz-badge [nzStatus]="item.type" [nzText]="item.content"></nz-badge>
              </li>
            }
          }
        }
      </ul>
      <ng-container *nzMonthCell="let month">
        @if (getMonthData(month); as monthData) {
          <div class="notes-month">
            <section>{{ monthData }}</section>
            <span>Backlog number</span>
          </div>
        }
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
    `
  ]
})
export class NzDemoCalendarNoticeCalendarComponent {
  readonly listDataMap = {
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
