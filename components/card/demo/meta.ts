import { Component } from '@angular/core';

import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'nz-demo-card-meta',
  imports: [NzAvatarModule, NzCardModule, NzIconModule],
  template: `
    <nz-card style="width:300px;" [nzCover]="coverTemplate" [nzActions]="[actionSetting, actionEdit, actionEllipsis]">
      <nz-card-meta
        nzTitle="Card title"
        nzDescription="This is the description"
        [nzAvatar]="avatarTemplate"
      ></nz-card-meta>
    </nz-card>
    <ng-template #avatarTemplate>
      <nz-avatar nzSrc="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"></nz-avatar>
    </ng-template>
    <ng-template #coverTemplate>
      <img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />
    </ng-template>
    <ng-template #actionSetting>
      <span nz-icon nzType="setting"></span>
    </ng-template>
    <ng-template #actionEdit>
      <span nz-icon nzType="edit"></span>
    </ng-template>
    <ng-template #actionEllipsis>
      <span nz-icon nzType="ellipsis"></span>
    </ng-template>
  `
})
export class NzDemoCardMetaComponent {}
