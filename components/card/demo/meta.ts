import { Component } from '@angular/core';
@Component({
  selector: 'nz-demo-card-meta',
  template: `
    <nz-card style="width:300px;">
      <ng-template #cover>
        <img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />
      </ng-template>
      <ng-template #body>
        <div nz-card-meta>
          <ng-template #metaAvatar><nz-avatar nzSrc="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"></nz-avatar></ng-template>
          <ng-template #metaTitle>Card title</ng-template>
          <ng-template #metaDescription>This is the description</ng-template>
        </div>
      </ng-template>
      <ng-template #actions>
        <li style="width: 33.3333%;">
          <span><i class="anticon anticon-setting"></i></span>
        </li>
        <li style="width: 33.3333%;">
          <span><i class="anticon anticon-edit"></i></span>
        </li>
        <li style="width: 33.3333%;">
          <span><i class="anticon anticon-ellipsis"></i></span>
        </li>
      </ng-template>
    </nz-card>
  `,
  styles  : []
})
export class NzDemoCardMetaComponent { }
