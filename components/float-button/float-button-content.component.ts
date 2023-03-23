/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'nz-float-button-content',
  exportAs: 'nzFloatButtonContent',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="ant-float-btn-body">
      <div class="ant-float-btn-content">
        <ng-container *ngIf="nzDescription || nzIcon; else defaultIcon">
          <div class="ant-float-btn-icon" *ngIf="nzIcon">
            <ng-template [ngTemplateOutlet]="nzIcon"></ng-template>
          </div>
          <div class="ant-float-btn-description" *ngIf="nzDescription && nzShape === 'square'">
            <ng-template [ngTemplateOutlet]="nzDescription"></ng-template>
          </div>
        </ng-container>
        <ng-template #defaultIcon>
          <div class="ant-float-btn-icon">
            <span nz-icon nzType="file-text" nzTheme="outline"></span>
          </div>
        </ng-template>
      </div>
    </div>
  `
})
export class NzFloatButtonContentComponent {
  @Input() nzIcon: TemplateRef<void> | null = null;
  @Input() nzDescription: TemplateRef<void> | null = null;
  @Input() nzShape: 'circle' | 'square' = 'circle';
  constructor() {}
}
