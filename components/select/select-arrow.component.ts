/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, Component, Input, TemplateRef, ViewEncapsulation } from '@angular/core';

import { NzSafeAny } from 'ng-zorro-antd/core/types';

@Component({
  selector: 'nz-select-arrow',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (loading) {
      <span nz-icon nzType="loading"></span>
    } @else {
      @if (showArrow && !suffixIcon) {
        @if (!search) {
          <span nz-icon nzType="down"></span>
        }
        @if (search) {
          <span nz-icon nzType="search"></span>
        }
      } @else {
        <ng-container *nzStringTemplateOutlet="suffixIcon; let suffixIcon">
          @if (suffixIcon) {
            <span nz-icon [nzType]="suffixIcon"></span>
          }
        </ng-container>
      }
    }
    <ng-container *nzStringTemplateOutlet="feedbackIcon">{{ feedbackIcon }}</ng-container>
  `,
  host: {
    class: 'ant-select-arrow',
    '[class.ant-select-arrow-loading]': 'loading'
  }
})
export class NzSelectArrowComponent {
  @Input() loading = false;
  @Input() search = false;
  @Input() showArrow = false;
  @Input() suffixIcon: TemplateRef<NzSafeAny> | string | null = null;
  @Input() feedbackIcon: TemplateRef<NzSafeAny> | string | null = null;

  constructor() {}
}
