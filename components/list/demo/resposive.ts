import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-list-resposive',
  template: `
    <nz-list nzGrid>
      <div nz-row [nzGutter]="16">
        <div nz-col [nzXl]="4" [nzLg]="6" [nzMd]="6" [nzSm]="12" [nzXs]="24" *ngFor="let item of data">
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
export class NzDemoListResposiveComponent {
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
    },
    {
      title: 'Title 5'
    },
    {
      title: 'Title 6'
    }
  ];
}
