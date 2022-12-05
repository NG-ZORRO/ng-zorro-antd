/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  ChangeDetectorRef,
  TemplateRef
} from '@angular/core';

import { InputBoolean } from 'ng-zorro-antd/core/util';
import { NzCronExpressionCronErrorI18n } from 'ng-zorro-antd/i18n';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'nz-cron-expression-preview',
  exportAs: 'nzCronExpressionPreview',
  template: `<div class="ant-collapse ant-collapse-borderless ant-cron-expression-preview">
    <div class="ant-cron-expression-preview-dateTime" [class.ant-cron-expression-preview-dateTime-center]="!isExpand">
      <ng-container *ngIf="visible; else cronError">
        <ng-container *ngIf="!nzSemantic; else semanticTemplate">
          {{ TimeList[0] | date: 'YYYY-MM-dd HH:mm:ss' }}
        </ng-container>
        <ng-template #semanticTemplate [ngTemplateOutlet]="nzSemantic"></ng-template>
      </ng-container>
      <ng-template #cronError>{{ locale.cronError }}</ng-template>
    </div>
    <div *ngIf="visible" class="ant-cron-expression-preview-content">
      <div class="ant-cron-expression-preview-content-date">
        <ng-container *ngIf="!isExpand">
          <ul class="ant-cron-expression-preview-list">
            <li *ngFor="let item of TimeList">
              {{ item | date: 'YYYY-MM-dd HH:mm:ss' }}
            </li>
            <li><a (click)="loadMorePreview.emit()">···</a></li>
          </ul>
        </ng-container>
      </div>
      <ul class="ant-cron-expression-preview-icon">
        <li *ngIf="isExpand"><span nz-icon nzType="down" nzTheme="outline" (click)="setExpand()"></span></li>
        <li *ngIf="!isExpand"><span nz-icon nzType="up" nzTheme="outline" (click)="setExpand()"></span></li>
      </ul>
    </div>
  </div>`
})
export class NzCronExpressionPreviewComponent {
  @Input() TimeList: Date[] = [];
  @Input() @InputBoolean() visible: boolean = true;
  @Input() locale!: NzCronExpressionCronErrorI18n;
  @Input() nzSemantic: TemplateRef<void> | null = null;
  @Output() readonly loadMorePreview = new EventEmitter<void>();

  isExpand: boolean = true;

  constructor(private cdr: ChangeDetectorRef) {}

  setExpand(): void {
    this.isExpand = !this.isExpand;
    this.cdr.markForCheck();
  }
}
