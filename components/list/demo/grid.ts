// tslint:disable
import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-list-grid',
  template: `
  <nz-list [nzDataSource]="data" [nzGrid]="{gutter: 16, span: 6}">
    <ng-template #item let-item>
      <nz-list-item [nzContent]="nzContent">
        <ng-template #nzContent>
          <nz-card>
            <ng-template #title>{{item.title}}</ng-template>
            <ng-template #body>Card content</ng-template>
          </nz-card>
        </ng-template>
      </nz-list-item>
    </ng-template>
  </nz-list>
  `
})
export class NzDemoListGridComponent {
  data = [
    {
      title: 'Title 1',
    },
    {
      title: 'Title 2',
    },
    {
      title: 'Title 3',
    },
    {
      title: 'Title 4',
    },
  ];
}
