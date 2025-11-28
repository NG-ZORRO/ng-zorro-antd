/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, TemplateRef } from '@angular/core';

import { NzBadgeComponent } from 'ng-zorro-antd/badge';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzShapeSCType } from 'ng-zorro-antd/core/types';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { NzFloatButtonBadge } from './typings';

@Component({
  selector: 'nz-float-button-content',
  exportAs: 'nzFloatButtonContent',
  imports: [NzIconModule, NzOutletModule, NzBadgeComponent, NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (nzBadge()) {
      <nz-badge
        [nzDot]="nzBadge()?.nzDot"
        [nzShowDot]="nzBadge()?.nzDot"
        [nzCount]="nzBadge()?.nzCount"
        [nzShowZero]="nzBadge()?.nzShowZero"
        [nzOverflowCount]="nzBadge()?.nzOverflowCount!"
        [nzColor]="nzBadge()?.nzColor"
        [nzOffset]="nzBadge()?.nzOffset"
        [nzSize]="nzBadge()?.nzSize || 'default'"
      >
        <ng-container *ngTemplateOutlet="button"></ng-container>
      </nz-badge>
    } @else {
      <ng-container *ngTemplateOutlet="button"></ng-container>
    }
    <ng-template #button>
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
    </ng-template>
  `
})
export class NzFloatButtonContentComponent {
  readonly nzBadge = input<NzFloatButtonBadge | null>(null);
  readonly nzIcon = input<string | TemplateRef<void> | null>(null);
  readonly nzDescription = input<string | TemplateRef<void> | null>(null);
  readonly nzShape = input<NzShapeSCType>('circle');
}
