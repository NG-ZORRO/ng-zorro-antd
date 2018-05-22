// tslint:disable:no-any
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';

const fakeDataUrl = 'https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo';

@Component({
  selector: 'nz-demo-list-infinite-load',
  template: `
  <div class="demo-infinite-container"
    infiniteScroll
    [infiniteScrollDistance]="2"
    [infiniteScrollThrottle]="50"
    (scrolled)="onScroll()"
    [scrollWindow]="false">
    <nz-list [nzDataSource]="data" [nzRenderItem]="item">
      <ng-template #item let-item>
        <nz-list-item>
          <nz-list-item-meta
              [nzTitle]="nzTitle"
              nzAvatar="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              [nzDescription]="item.email">
              <ng-template #nzTitle>
                  <a href="https://ng.ant.design">{{item.name.last}}</a>
              </ng-template>
          </nz-list-item-meta>
        </nz-list-item>
      </ng-template>
      <nz-spin *ngIf="loading && hasMore" class="demo-loading"></nz-spin>
    </nz-list>
  </div>
  `,
  styles: [ `
  :host ::ng-deep .demo-infinite-container {
    border: 1px solid #e8e8e8;
    border-radius: 4px;
    overflow: auto;
    padding: 8px 24px;
    height: 300px;
  }
  :host ::ng-deep .demo-loading {
    position: absolute;
    bottom: -40px;
    left: 50%;
  }
  ` ]
})
export class NzDemoListInfiniteLoadComponent implements OnInit {
  data: any[] = [];
  loading = false;
  hasMore = true;

  constructor(private http: HttpClient, private msg: NzMessageService) {}

  ngOnInit(): void {
    this.getData((res: any) => this.data = res.results);
  }

  getData(callback: (res: any) => void): void {
    this.http.get(fakeDataUrl).subscribe((res: any) => callback(res));
  }

  onScroll(): void {
    if (this.loading) return;
    this.loading = true;
    if (this.data.length > 14) {
      this.msg.warning('Infinite List loaded all');
      this.hasMore = false;
      this.loading = false;
      return;
    }
    this.getData((res: any) => {
      this.data = this.data.concat(res.results);
      this.loading = false;
    });
  }
}
