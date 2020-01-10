import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-skeleton-list',
  template: `
    <nz-switch [(ngModel)]="loading"></nz-switch>
    <nz-list [nzDataSource]="listData" [nzRenderItem]="item" [nzItemLayout]="'vertical'">
      <ng-template #item let-item>
        <nz-list-item
          [nzContent]="loading ? ' ' : item.content"
          [nzActions]="loading ? [] : [starAction, likeAction, msgAction]"
          [nzExtra]="loading ? '' : extra"
        >
          <nz-skeleton [nzLoading]="loading" [nzActive]="true" [nzAvatar]="true">
            <ng-template #starAction><i nz-icon nzType="star-o" style="margin-right: 8px;"></i> 156</ng-template>
            <ng-template #likeAction><i nz-icon nzType="like-o" style="margin-right: 8px;"></i> 156</ng-template>
            <ng-template #msgAction><i nz-icon nzType="message" style="margin-right: 8px;"></i> 2</ng-template>
            <nz-list-item-meta [nzAvatar]="item.avatar" [nzTitle]="nzTitle" [nzDescription]="item.description">
              <ng-template #nzTitle
                ><a href="{{ item.href }}">{{ item.title }}</a></ng-template
              >
            </nz-list-item-meta>
            <ng-template #extra>
              <img width="272" alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />
            </ng-template>
          </nz-skeleton>
        </nz-list-item>
      </ng-template>
    </nz-list>
  `
})
export class NzDemoSkeletonListComponent {
  loading = true;
  listData = new Array(3).fill({}).map((_i, index) => {
    return {
      href: 'http://ng.ant.design',
      title: `ant design part ${index}`,
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
      content:
        'We supply a series of design principles, practical patterns and high quality design resources ' +
        '(Sketch and Axure), to help people create their product prototypes beautifully and efficiently.'
    };
  });
}
