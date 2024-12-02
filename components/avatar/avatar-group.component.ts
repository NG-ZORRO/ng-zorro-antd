/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'nz-avatar-group',
  exportAs: 'nzAvatarGroup',
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ant-avatar-group'
  }
})
export class NzAvatarGroupComponent {}
