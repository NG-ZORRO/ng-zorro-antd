/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, Component, Input, TemplateRef, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'nz-card-meta',
  exportAs: 'nzCardMeta',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    @if (nzAvatar) {
      <div class="ant-card-meta-avatar">
        <ng-template [ngTemplateOutlet]="nzAvatar"></ng-template>
      </div>
    }
    @if (nzTitle || nzDescription) {
      <div class="ant-card-meta-detail">
        @if (nzTitle) {
          <div class="ant-card-meta-title">
            <ng-container *nzStringTemplateOutlet="nzTitle">{{ nzTitle }}</ng-container>
          </div>
        }
        @if (nzDescription) {
          <div class="ant-card-meta-description">
            <ng-container *nzStringTemplateOutlet="nzDescription">{{ nzDescription }}</ng-container>
          </div>
        }
      </div>
    }
  `,
  host: { class: 'ant-card-meta' }
})
export class NzCardMetaComponent {
  @Input() nzTitle: string | TemplateRef<void> | null = null;
  @Input() nzDescription: string | TemplateRef<void> | null = null;
  @Input() nzAvatar: TemplateRef<void> | null = null;

  constructor() {}
}
