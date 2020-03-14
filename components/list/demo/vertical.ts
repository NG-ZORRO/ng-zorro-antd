import { Component, OnInit } from '@angular/core';

interface ItemData {
  href: string;
  title: string;
  avatar: string;
  description: string;
  content: string;
}

@Component({
  selector: 'nz-demo-list-vertical',
  template: `
    <nz-list nzItemLayout="vertical">
      <nz-list-item *ngFor="let item of data">
        <nz-list-item-meta>
          <nz-list-item-meta-avatar [nzSrc]="item.avatar"> </nz-list-item-meta-avatar>
          <nz-list-item-meta-title>
            <a href="{{ item.href }}">{{ item.title }}</a>
          </nz-list-item-meta-title>
          <nz-list-item-meta-description>
            {{ item.description }}
          </nz-list-item-meta-description>
        </nz-list-item-meta>
        {{ item.content }}
        <ul nz-list-item-actions>
          <nz-list-item-action><i nz-icon nzType="star-o" style="margin-right: 8px;"></i> 156</nz-list-item-action>
          <nz-list-item-action><i nz-icon nzType="star-o" style="margin-right: 8px;"></i> 156</nz-list-item-action>
          <nz-list-item-action><i nz-icon nzType="star-o" style="margin-right: 8px;"></i> 2</nz-list-item-action>
        </ul>
        <nz-list-item-extra>
          <img width="272" alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />
        </nz-list-item-extra>
      </nz-list-item>
    </nz-list>
    <!--    <nz-list [nzDataSource]="data" [nzItemLayout]="'vertical'" [nzRenderItem]="item" [nzPagination]="pagination" [nzFooter]="footer">-->
    <!--      <ng-template #item let-item>-->
    <!--        <nz-list-item [nzContent]="item.content" [nzActions]="[starAction, likeAction, msgAction]" [nzExtra]="extra">-->
    <!--          <ng-template #starAction><i nz-icon nzType="star-o" style="margin-right: 8px;"></i> 156</ng-template>-->
    <!--          <ng-template #likeAction><i nz-icon nzType="like-o" style="margin-right: 8px;"></i> 156</ng-template>-->
    <!--          <ng-template #msgAction><i nz-icon nzType="message" style="margin-right: 8px;"></i> 2</ng-template>-->
    <!--          <nz-list-item-meta [nzAvatar]="item.avatar" [nzTitle]="nzTitle" [nzDescription]="item.description">-->
    <!--            <ng-template #nzTitle-->
    <!--              ><a href="{{ item.href }}">{{ item.title }}</a></ng-template-->
    <!--            >-->
    <!--          </nz-list-item-meta>-->
    <!--          <ng-template #extra>-->
    <!--            <img width="272" alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />-->
    <!--          </ng-template>-->
    <!--        </nz-list-item>-->
    <!--      </ng-template>-->
    <!--      <ng-template #footer>-->
    <!--        <div><b>ant design</b> footer part</div>-->
    <!--      </ng-template>-->
    <!--      <ng-template #pagination>-->
    <!--        <nz-pagination [nzPageIndex]="1" [nzTotal]="50" (nzPageIndexChange)="loadData($event)"></nz-pagination>-->
    <!--      </ng-template>-->
    <!--    </nz-list>-->
  `
})
export class NzDemoListVerticalComponent implements OnInit {
  data: ItemData[] = [];

  ngOnInit(): void {
    this.loadData(1);
  }

  loadData(pi: number): void {
    this.data = new Array(5).fill({}).map((_, index) => {
      return {
        href: 'http://ant.design',
        title: `ant design part ${index} (page: ${pi})`,
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
        content:
          'We supply a series of design principles, practical patterns and high quality design resources ' +
          '(Sketch and Axure), to help people create their product prototypes beautifully and efficiently.'
      };
    });
  }
}
