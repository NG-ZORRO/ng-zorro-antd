/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, Component, Input, TemplateRef, ViewEncapsulation } from '@angular/core';

import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { numberAttributeWithInfinityFallback } from 'ng-zorro-antd/core/util';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'nz-select-arrow',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (isMaxMultipleCountSet) {
      <span>{{ listOfValue.length }} / {{ nzMaxMultipleCount }}</span>
    }
    @if (loading) {
      <nz-icon nzType="loading" />
    } @else {
      @if (showArrow && !suffixIcon) {
        @if (search) {
          <nz-icon nzType="search" />
        } @else {
          <nz-icon nzType="down" />
        }
      } @else {
        <ng-container *nzStringTemplateOutlet="suffixIcon; let suffixIcon">
          @if (suffixIcon) {
            <nz-icon [nzType]="suffixIcon" />
          }
        </ng-container>
      }
    }
    <ng-container *nzStringTemplateOutlet="feedbackIcon">{{ feedbackIcon }}</ng-container>
  `,
  host: {
    class: 'ant-select-arrow',
    '[class.ant-select-arrow-loading]': 'loading'
  },
  imports: [NzIconModule, NzOutletModule]
})
export class NzSelectArrowComponent {
  @Input() listOfValue: NzSafeAny[] = [];
  @Input() loading = false;
  @Input() search = false;
  @Input() showArrow = false;
  @Input() isMaxMultipleCountSet = false;
  @Input() suffixIcon: TemplateRef<NzSafeAny> | string | null = null;
  @Input() feedbackIcon: TemplateRef<NzSafeAny> | string | null = null;
  @Input({ transform: numberAttributeWithInfinityFallback }) nzMaxMultipleCount = Infinity;
}
