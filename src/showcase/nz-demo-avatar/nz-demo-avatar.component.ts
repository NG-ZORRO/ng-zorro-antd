import { Component } from '@angular/core';

@Component({
  selector   : 'nz-demo-avatar',
  templateUrl: './nz-demo-avatar.html'
})
export class NzDemoAvatarComponent {
  NzDemoAvatarBasicCode = require('!!raw-loader!./nz-demo-avatar-basic.component')
  NzDemoAvatarTypeCode = require('!!raw-loader!./nz-demo-avatar-type.component')
  NzDemoAvatarAutoSizeCode = require('!!raw-loader!./nz-demo-avatar-autosize.component')
  NzDemoAvatarBadgeCode = require('!!raw-loader!./nz-demo-avatar-badge.component')
}
