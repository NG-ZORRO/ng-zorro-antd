import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-avatar-badge',
  template: `
  <nz-badge [nzCount]="5" style="margin-right: 24px;">
    <ng-template #content><nz-avatar nzIcon="user" [nzShape]="'square'"></nz-avatar></ng-template>
  </nz-badge>
  <nz-badge [nzDot]="true">
    <ng-template #content><nz-avatar nzIcon="user" [nzShape]="'square'"></nz-avatar></ng-template>
  </nz-badge>
  `
})
export class NzDemoAvatarBadgeComponent { }
