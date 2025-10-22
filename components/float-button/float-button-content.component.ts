/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, Component, input, TemplateRef } from '@angular/core';

import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzShapeSCType } from 'ng-zorro-antd/core/types';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'nz-float-button-content',
  exportAs: 'nzFloatButtonContent',
  imports: [NzIconModule, NzOutletModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="ant-float-btn-body">
      <div class="ant-float-btn-content">
        @if (nzDescription() || nzIcon()) {
          @if (nzIcon()) {
            <div class="ant-float-btn-icon">
              <ng-container *nzStringTemplateOutlet="nzIcon(); let icon">
                <nz-icon [nzType]="icon" nzTheme="outline" />
              </ng-container>
            </div>
          }
          @if (nzDescription() && nzShape() === 'square') {
            <div class="ant-float-btn-description">
              <ng-container *nzStringTemplateOutlet="nzDescription()">
                {{ nzDescription() }}
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
  readonly nzIcon = input<string | TemplateRef<void> | null>(null);
  readonly nzDescription = input<string | TemplateRef<void> | null>(null);
  readonly nzShape = input<NzShapeSCType>('circle');
}
