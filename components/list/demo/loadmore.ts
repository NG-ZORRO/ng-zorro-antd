/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';

const count = 5;
const fakeDataUrl = 'https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo';

@Component({
  selector: 'nz-demo-list-loadmore',
  imports: [NzButtonModule, NzListModule, NzSkeletonModule],
  template: `
    <nz-list class="demo-loadmore-list" [nzLoading]="initLoading">
      @for (item of list; track item) {
        <nz-list-item>
          @if (item.loading) {
            <nz-skeleton [nzAvatar]="true" [nzActive]="true" [nzTitle]="false" [nzLoading]="true" />
          } @else {
            <ng-container>
              <nz-list-item-meta
                nzAvatar="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                nzDescription="Ant Design, a design language for background applications, is refined by Ant UED Team"
              >
                <nz-list-item-meta-title>
                  <a href="https://ng.ant.design">{{ item.name.last }}</a>
                </nz-list-item-meta-title>
              </nz-list-item-meta>
              content
              <ul nz-list-item-actions>
                <nz-list-item-action><a (click)="edit(item)">edit</a></nz-list-item-action>
                <nz-list-item-action><a (click)="edit(item)">more</a></nz-list-item-action>
              </ul>
            </ng-container>
          }
        </nz-list-item>
      }
      <div class="loadmore" nz-list-load-more>
        @if (!loadingMore) {
          <button nz-button (click)="onLoadMore()">loading more</button>
        }
      </div>
    </nz-list>
  `,
  styles: [
    `
      .demo-loadmore-list {
        min-height: 350px;
      }
      .loadmore {
        text-align: center;
        margin-top: 12px;
        height: 32px;
        line-height: 32px;
      }
    `
  ]
})
export class NzDemoListLoadmoreComponent implements OnInit {
  initLoading = true; // bug
  loadingMore = false;
  data: any[] = [];
  list: Array<{ loading: boolean; name: any }> = [];

  constructor(
    private http: HttpClient,
    private msg: NzMessageService
  ) {}

  ngOnInit(): void {
    this.getData((res: any) => {
      this.data = res.results;
      this.list = res.results;
      this.initLoading = false;
    });
  }

  getData(callback: (res: any) => void): void {
    this.http
      .get(fakeDataUrl)
      .pipe(catchError(() => of({ results: [] })))
      .subscribe((res: any) => callback(res));
  }

  onLoadMore(): void {
    this.loadingMore = true;
    this.list = this.data.concat([...Array(count)].fill({}).map(() => ({ loading: true, name: {} })));
    this.http
      .get(fakeDataUrl)
      .pipe(catchError(() => of({ results: [] })))
      .subscribe((res: any) => {
        this.data = this.data.concat(res.results);
        this.list = [...this.data];
        this.loadingMore = false;
      });
  }

  edit(item: any): void {
    this.msg.success(item.email);
  }
}
