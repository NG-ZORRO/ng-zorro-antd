// tslint:disable:no-any
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';

const fakeDataUrl = 'https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo';

@Component({
  selector: 'nz-demo-list-loadmore',
  template: `
  <nz-list
    class="demo-loadmore-list"
    [nzDataSource]="data"
    [nzItemLayout]="'horizontal'"
    [nzLoading]="loading"
    [nzRenderItem]="item"
    [nzLoadMore]="loadMore">
    <ng-template #item let-item>
      <nz-list-item [nzContent]="'content'" [nzActions]="[editAction,moreAction]">
        <ng-template #editAction><a (click)="edit(item)">edit</a></ng-template>
        <ng-template #moreAction><a (click)="edit(item)">more</a></ng-template>
        <nz-list-item-meta
            [nzTitle]="nzTitle"
            nzAvatar="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            nzDescription="Ant Design, a design language for background applications, is refined by Ant UED Team">
            <ng-template #nzTitle>
                <a href="https://ng.ant.design">{{item.name.last}}</a>
            </ng-template>
        </nz-list-item-meta>
      </nz-list-item>
    </ng-template>
    <ng-template #loadMore>
      <div *ngIf="showLoadingMore" class="loadmore">
        <button nz-button *ngIf="!loadingMore" (click)="onLoadMore()">loading more</button>
        <nz-spin *ngIf="loadingMore" [nzSpinning]="loadingMore"></nz-spin>
      </div>
    </ng-template>
  </nz-list>
  `,
  styles: [ `
  :host ::ng-deep .demo-loadmore-list {
    min-height: 350px;
  }
  :host ::ng-deep .loadmore {
    text-align: center;
    margin-top: 12px;
    height: 32px;
    line-height: 32px;
  }
  ` ]
})
export class NzDemoListLoadmoreComponent implements OnInit {
  loading = true; // bug
  loadingMore = false;
  showLoadingMore = true;
  data = [];

  constructor(private http: HttpClient, private msg: NzMessageService) {}

  ngOnInit(): void {
      this.getData((res: any) => {
        this.data = res.results;
        this.loading = false;
      });
  }

  getData(callback: (res: any) => void): void {
      this.http.get(fakeDataUrl).subscribe((res: any) => callback(res));
  }

  onLoadMore(): void {
    this.loadingMore = true;
    this.http.get(fakeDataUrl).subscribe((res: any) => {
      this.data = this.data.concat(res.results);
      this.loadingMore = false;
    });
  }

  edit(item: any): void {
      this.msg.success(item.email);
  }
}
