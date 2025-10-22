/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { DatePipe, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  ViewEncapsulation,
  booleanAttribute,
  inject
} from '@angular/core';

import { NzCronExpressionCronErrorI18n } from 'ng-zorro-antd/i18n';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'nz-cron-expression-preview',
  exportAs: 'nzCronExpressionPreview',
  template: `
    <div class="ant-collapse ant-collapse-borderless ant-cron-expression-preview">
      <div class="ant-cron-expression-preview-dateTime" [class.ant-cron-expression-preview-dateTime-center]="!isExpand">
        @if (visible) {
          @if (!nzSemantic) {
            {{ TimeList[0] | date: 'yyyy-MM-dd HH:mm:ss' }}
          } @else {
            <ng-template [ngTemplateOutlet]="nzSemantic" />
          }
        } @else {
          {{ locale.cronError }}
        }
      </div>
      @if (visible && !isExpand) {
        <div class="ant-cron-expression-preview-content">
          <ul class="ant-cron-expression-preview-list">
            @for (item of TimeList; track item) {
              <li>
                {{ item | date: 'yyyy-MM-dd HH:mm:ss' }}
              </li>
            }
            <li><a (click)="loadMorePreview.emit()">···</a></li>
          </ul>
        </div>
      }

      <ul class="ant-cron-expression-preview-icon">
        @if (isExpand) {
          <li><nz-icon nzType="down" nzTheme="outline" (click)="setExpand()" /></li>
        } @else {
          <li><nz-icon nzType="up" nzTheme="outline" (click)="setExpand()" /></li>
        }
      </ul>
    </div>
  `,
  imports: [NgTemplateOutlet, DatePipe, NzIconModule]
})
export class NzCronExpressionPreviewComponent {
  private cdr = inject(ChangeDetectorRef);
  @Input() TimeList: Date[] = [];
  @Input({ transform: booleanAttribute }) visible: boolean = true;
  @Input() locale!: NzCronExpressionCronErrorI18n;
  @Input() nzSemantic: TemplateRef<void> | null = null;
  @Output() readonly loadMorePreview = new EventEmitter<void>();

  isExpand: boolean = true;

  setExpand(): void {
    this.isExpand = !this.isExpand;
    this.cdr.markForCheck();
  }
}
