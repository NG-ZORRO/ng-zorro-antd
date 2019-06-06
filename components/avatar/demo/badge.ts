import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-avatar-badge',
  template: `
    <nz-badge [nzCount]="5" style="margin-right: 24px;">
      <nz-avatar nzIcon="user" [nzShape]="'square'"></nz-avatar>
    </nz-badge>
    <nz-badge nzDot>
      <nz-avatar nzIcon="user" [nzShape]="'square'"></nz-avatar>
    </nz-badge>
  `
})
export class NzDemoAvatarBadgeComponent {}
