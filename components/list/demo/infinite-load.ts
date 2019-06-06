// tslint:disable:no-any
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'nz-demo-list-infinite-load',
  template: `
    <div>
      <cdk-virtual-scroll-viewport itemSize="73" class="demo-infinite-container">
        <nz-list>
          <nz-list-item *cdkVirtualFor="let item of ds">
            <nz-skeleton *ngIf="!item" [nzAvatar]="true" [nzParagraph]="{ rows: 1 }"></nz-skeleton>
            <nz-list-item-meta
              *ngIf="item"
              [nzTitle]="nzTitle"
              nzAvatar="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              [nzDescription]="item.email"
            >
              <ng-template #nzTitle>
                <a href="https://ng.ant.design">{{ item.name.last }}</a>
              </ng-template>
            </nz-list-item-meta>
          </nz-list-item>
        </nz-list>
      </cdk-virtual-scroll-viewport>
    </div>
  `,
  styles: [
    `
      .demo-infinite-container {
        height: 300px;
        border: 1px solid #e8e8e8;
        border-radius: 4px;
      }

      nz-list {
        padding: 24px;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NzDemoListInfiniteLoadComponent {
  ds = new MyDataSource(this.http);

  constructor(private http: HttpClient) {}
}

class MyDataSource extends DataSource<string | undefined> {
  private length = 100000;
  private pageSize = 10;
  private cachedData = Array.from<any>({ length: this.length });
  private fetchedPages = new Set<number>();
  private dataStream = new BehaviorSubject<any[]>(this.cachedData);
  private subscription = new Subscription();

  constructor(private http: HttpClient) {
    super();
  }

  connect(collectionViewer: CollectionViewer): Observable<any[]> {
    this.subscription.add(
      collectionViewer.viewChange.subscribe(range => {
        const startPage = this.getPageForIndex(range.start);
        const endPage = this.getPageForIndex(range.end - 1);
        for (let i = startPage; i <= endPage; i++) {
          this.fetchPage(i);
        }
      })
    );
    return this.dataStream;
  }

  disconnect(): void {
    this.subscription.unsubscribe();
  }

  private getPageForIndex(index: number): number {
    return Math.floor(index / this.pageSize);
  }

  private fetchPage(page: number): void {
    if (this.fetchedPages.has(page)) {
      return;
    }
    this.fetchedPages.add(page);

    this.http
      .get(`https://randomuser.me/api/?results=${this.pageSize}&inc=name,gender,email,nat&noinfo`)
      .subscribe((res: any) => {
        this.cachedData.splice(page * this.pageSize, this.pageSize, ...res.results);
        this.dataStream.next(this.cachedData);
      });
  }
}
