import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-list-basic',
  template: `
    <div style="margin-bottom: 8px;"><button nz-button (click)="change()">Switch Data</button></div>
    <nz-list nzItemLayout="horizontal" [nzLoading]="loading">
      <nz-list-item *ngFor="let item of data">
        <nz-list-item-meta
          nzAvatar="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          nzDescription="Ant Design, a design language for background applications, is refined by Ant UED Team"
        >
          <nz-list-item-meta-title>
            <a href="https://ng.ant.design">{{ item.title }}</a>
          </nz-list-item-meta-title>
        </nz-list-item-meta>
      </nz-list-item>
      <nz-list-empty *ngIf="data.length === 0"></nz-list-empty>
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
