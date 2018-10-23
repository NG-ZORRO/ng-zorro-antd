import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-list-vertical',
  template: `
  <nz-list
    [nzDataSource]="data"
    [nzItemLayout]="'vertical'"
    [nzRenderItem]="item"
    [nzPagination]="pagination">
      <ng-template #item let-item>
          <nz-list-item [nzContent]="item.content" [nzActions]="[starAction,likeAction,msgAction]" [nzExtra]="extra">
              <ng-template #starAction><i nz-icon type="star-o" style="margin-right: 8px;"></i> 156</ng-template>
              <ng-template #likeAction><i nz-icon type="like-o" style="margin-right: 8px;"></i> 156</ng-template>
              <ng-template #msgAction><i nz-icon type="message" style="margin-right: 8px;"></i> 2</ng-template>
              <nz-list-item-meta
                  [nzAvatar]="item.avatar"
                  [nzTitle]="nzTitle"
                  [nzDescription]="item.description">
                  <ng-template #nzTitle><a href="{{item.href}}">{{item.title}}</a></ng-template>
              </nz-list-item-meta>
              <ng-template #extra>
                  <img width="272" alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png">
              </ng-template>
          </nz-list-item>
      </ng-template>
      <ng-template #pagination>
          <nz-pagination [nzPageIndex]="1" [nzTotal]="50"></nz-pagination>
      </ng-template>
  </nz-list>
  `
})
export class NzDemoListVerticalComponent {
  data = new Array(5).fill({}).map((i, index) => {
    return {
      href: 'http://ant.design',
      title: `ant design part ${index}`,
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
      content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.'
    };
  });
}
