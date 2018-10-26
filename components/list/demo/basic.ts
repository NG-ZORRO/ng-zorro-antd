import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-list-basic',
  template: `
  <div style="margin-bottom: 8px;"><button nz-button (click)="change()">Switch Data</button></div>
  <nz-list [nzDataSource]="data" [nzRenderItem]="item" [nzItemLayout]="'horizontal'" [nzLoading]="loading">
    <ng-template #item let-item>
      <nz-list-item>
        <nz-list-item-meta
          [nzTitle]="nzTitle"
          nzAvatar="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          nzDescription="Ant Design, a design language for background applications, is refined by Ant UED Team">
          <ng-template #nzTitle>
            <a href="https://ng.ant.design">{{item.title}}</a>
          </ng-template>
        </nz-list-item-meta>
      </nz-list-item>
    </ng-template>
  </nz-list>
  `
})
export class NzDemoListBasicComponent {
  loading = false;
  data = [
    {
      title: 'Ant Design Title 1'
    },
    {
      title: 'Ant Design Title 2'
    },
    {
      title: 'Ant Design Title 3'
    },
    {
      title: 'Ant Design Title 4'
    }
  ];

  change(): void {
    this.loading = true;
    if (this.data.length > 0) {
      setTimeout(() => {
        this.data = [];
        this.loading = false;
      }, 1000);
    } else {
      setTimeout(() => {
        this.data = [
          {
            title: 'Ant Design Title 1'
          },
          {
            title: 'Ant Design Title 2'
          },
          {
            title: 'Ant Design Title 3'
          },
          {
            title: 'Ant Design Title 4'
          }
        ];
        this.loading = false;
      }, 1000);
    }
  }
}
