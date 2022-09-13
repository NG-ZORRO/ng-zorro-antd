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
    <span nz-icon nzType="loading" *ngIf="loading; else defaultArrow"></span>
    <ng-template #defaultArrow>
      <ng-container *ngIf="showArrow && !suffixIcon; else suffixTemplate">
        <span nz-icon nzType="down" *ngIf="!search"></span>
        <span nz-icon nzType="search" *ngIf="search"></span>
      </ng-container>
      <ng-template #suffixTemplate>
        <ng-container *nzStringTemplateOutlet="suffixIcon; let suffixIcon">
          <span *ngIf="suffixIcon" nz-icon [nzType]="suffixIcon"></span>
        </ng-container>
      </ng-template>
    </ng-template>
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
