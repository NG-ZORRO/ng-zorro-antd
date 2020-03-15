import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-list-grid',
  template: `
    <nz-list nzGrid>
      <div nz-row [nzGutter]="16">
        <div nz-col [nzSpan]="6" *ngFor="let item of data">
          <nz-list-item>
            <nz-card [nzTitle]="item.title">
              Card content
            </nz-card>
          </nz-list-item>
        </div>
      </div>
    </nz-list>
  `
})
export class NzDemoListGridComponent {
  data = [
    {
      title: 'Title 1'
    },
    {
      title: 'Title 2'
    },
    {
      title: 'Title 3'
    },
    {
      title: 'Title 4'
    }
  ];
}
