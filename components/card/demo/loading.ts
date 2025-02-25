import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzSwitchModule } from 'ng-zorro-antd/switch';

@Component({
  selector: 'nz-demo-card-loading',
  imports: [FormsModule, NzAvatarModule, NzCardModule, NzIconModule, NzSwitchModule, NzSkeletonModule],
  template: `
    <nz-switch [(ngModel)]="loading"></nz-switch>
    <nz-card style="width: 300px;margin-top: 16px" [nzLoading]="loading">
      <nz-card-meta
        [nzAvatar]="avatarTemplate"
        nzTitle="Card title"
        nzDescription="This is the description"
      ></nz-card-meta>
    </nz-card>
    <nz-card style="width: 300px;margin-top: 16px" [nzActions]="[actionSetting, actionEdit, actionEllipsis]">
      <nz-skeleton [nzActive]="true" [nzLoading]="loading" [nzAvatar]="{ size: 'large' }">
        <nz-card-meta
          [nzAvatar]="avatarTemplate"
          nzTitle="Card title"
          nzDescription="This is the description"
        ></nz-card-meta>
      </nz-skeleton>
    </nz-card>
    <ng-template #avatarTemplate>
      <nz-avatar nzSrc="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"></nz-avatar>
    </ng-template>
    <ng-template #actionSetting>
      <nz-icon nzType="setting" />
    </ng-template>
    <ng-template #actionEdit>
      <nz-icon nzType="edit" />
    </ng-template>
    <ng-template #actionEllipsis>
      <nz-icon nzType="ellipsis" />
    </ng-template>
  `
})
export class NzDemoCardLoadingComponent {
  loading = true;
}
