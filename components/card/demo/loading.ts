import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-card-loading',
  template: `
    <nz-switch [(ngModel)]="loading"></nz-switch>
    <nz-card style="width: 300px;margin-top: 16px" [nzLoading]="loading">
      <nz-card-meta [nzAvatar]="avatarTemplate" nzTitle="Card title" nzDescription="This is the description"></nz-card-meta>
    </nz-card>
    <nz-card style="width: 300px;margin-top: 16px" [nzActions]="[actionSetting, actionEdit, actionEllipsis]">
      <nz-skeleton [nzActive]="true" [nzLoading]="loading" [nzAvatar]="{ size: 'large' }">
        <nz-card-meta [nzAvatar]="avatarTemplate" nzTitle="Card title" nzDescription="This is the description"></nz-card-meta>
      </nz-skeleton>
    </nz-card>
    <ng-template #avatarTemplate>
      <nz-avatar nzSrc="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"></nz-avatar>
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
export class NzDemoCardLoadingComponent {
  loading = true;
}
