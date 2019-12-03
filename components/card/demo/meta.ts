import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-card-meta',
  template: `
    <nz-card style="width:300px;" [nzCover]="coverTemplate" [nzActions]="[actionSetting, actionEdit, actionEllipsis]">
      <nz-card-meta nzTitle="Card title" nzDescription="This is the description" [nzAvatar]="avatarTemplate"></nz-card-meta>
    </nz-card>
    <ng-template #avatarTemplate>
      <nz-avatar nzSrc="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"></nz-avatar>
    </ng-template>
    <ng-template #coverTemplate>
      <img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />
    </ng-template>
    <ng-template #actionSetting>
      <i nz-icon nzType="setting"></i>
    </ng-template>
    <ng-template #actionEdit>
      <i nz-icon nzType="edit"></i>
    </ng-template>
    <ng-template #actionEllipsis>
      <i nz-icon nzType="ellipsis"></i>
    </ng-template>
  `
})
export class NzDemoCardMetaComponent {}
