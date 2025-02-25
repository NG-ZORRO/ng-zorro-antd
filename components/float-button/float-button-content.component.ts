/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, TemplateRef } from '@angular/core';

import { NzStringTemplateOutletDirective } from 'ng-zorro-antd/core/outlet';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'nz-float-button-content',
  exportAs: 'nzFloatButtonContent',
  imports: [NzIconModule, NgTemplateOutlet, NzStringTemplateOutletDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="ant-float-btn-body">
      <div class="ant-float-btn-content">
        @if (nzDescription || nzIcon) {
          @if (nzIcon) {
            <div class="ant-float-btn-icon">
              <ng-template [ngTemplateOutlet]="nzIcon"></ng-template>
            </div>
          }
          @if (nzDescription && nzShape === 'square') {
            <div class="ant-float-btn-description">
              <ng-container *nzStringTemplateOutlet="nzDescription">
                {{ nzDescription }}
              </ng-container>
            </div>
          }
        } @else {
          <div class="ant-float-btn-icon">
            <nz-icon nzType="file-text" nzTheme="outline" />
          </div>
        }
      </div>
    </div>
  `
})
export class NzFloatButtonContentComponent {
  @Input() nzIcon: TemplateRef<void> | null = null;
  @Input() nzDescription: string | TemplateRef<void> | null = null;
  @Input() nzShape: 'circle' | 'square' = 'circle';
}
