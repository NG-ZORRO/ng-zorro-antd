/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { NzAvatarModule } from 'ng-zorro-antd/avatar';

@Component({
  selector: 'nz-list-item-meta-title',
  exportAs: 'nzListItemMetaTitle',
  template: `
    <h4 class="ant-list-item-meta-title">
      <ng-content></ng-content>
    </h4>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NzListItemMetaTitleComponent {}

@Component({
  selector: 'nz-list-item-meta-description',
  exportAs: 'nzListItemMetaDescription',
  template: `
    <div class="ant-list-item-meta-description">
      <ng-content></ng-content>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NzListItemMetaDescriptionComponent {}

@Component({
  selector: 'nz-list-item-meta-avatar',
  exportAs: 'nzListItemMetaAvatar',
  template: `
    <div class="ant-list-item-meta-avatar">
      @if (nzSrc) {
        <nz-avatar [nzSrc]="nzSrc" />
      } @else {
        <ng-content />
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NzAvatarModule]
})
export class NzListItemMetaAvatarComponent {
  @Input() nzSrc?: string;
}
