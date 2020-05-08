/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { NzTimelineService } from 'ng-zorro-antd/timeline/timeline.service';

const TimelineTimeDefaultColors = ['red', 'blue', 'green', 'grey', 'gray'] as const;
export type NzTimelineItemColor = typeof TimelineTimeDefaultColors[number];

function isDefaultColor(color?: string): boolean {
  return TimelineTimeDefaultColors.findIndex(i => i === color) !== -1;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
  selector: 'nz-timeline-item, [nz-timeline-item]',
  exportAs: 'nzTimelineItem',
  template: `
    <ng-template #template>
      <ng-content></ng-content>
    </ng-template>
  `
})
export class NzTimelineItemComponent implements OnChanges {
  @ViewChild('template', { static: false }) template!: TemplateRef<void>;

  @Input() nzColor: NzTimelineItemColor = 'blue';
  @Input() nzDot?: string | TemplateRef<void>;

  constructor(private timelineService: NzTimelineService) {}

  ngOnChanges(): void {
    this.timelineService.updated$.next();
  }
}

@Component({
  selector: 'nz-timeline-item-renderer',
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
  exportAs: 'nzTimelineItemRenderer',
  template: `
    <li
      class="ant-timeline-item"
      [class.ant-timeline-item-right]="position === 'right'"
      [class.ant-timeline-item-left]="position === 'left'"
      [class.ant-timeline-item-last]="isLast"
    >
      <div class="ant-timeline-item-tail"></div>
      <div
        class="ant-timeline-item-head"
        [class.ant-timeline-item-head-red]="color === 'red'"
        [class.ant-timeline-item-head-blue]="color === 'blue'"
        [class.ant-timeline-item-head-green]="color === 'green'"
        [class.ant-timeline-item-head-gray]="color === 'gray'"
        [class.ant-timeline-item-head-custom]="!!dot"
        [style.border-color]="borderColor"
      >
        <ng-container *nzStringTemplateOutlet="dot">{{ dot }}</ng-container>
      </div>
      <div class="ant-timeline-item-content">
        <ng-template *ngTemplateOutlet="template"></ng-template>
      </div>
    </li>
  `
})
export class NzTimelineItemRendererComponent implements OnChanges {
  // properties of internal components should not have `nz` prefix
  @Input() color: NzTimelineItemColor = 'blue';
  @Input() dot?: string | TemplateRef<void>;
  @Input() isLast: boolean = false;
  @Input() position: 'left' | 'right' = 'left';
  @Input() template: TemplateRef<void> | null = null;

  borderColor: string | null = null;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.nzColor) {
      this.updateCustomColor();
    }
  }

  private updateCustomColor(): void {
    this.borderColor = isDefaultColor(this.color) ? null : this.color;
  }
}

@Component({
  selector: 'nz-timeline-pending-item',
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
  exportAs: 'nzTimelinePendingItem',
  template: `<li class="ant-timeline-item ant-timeline-item-pending">
    <div class="ant-timeline-item-tail"></div>
    <div class="ant-timeline-item-head ant-timeline-item-head-custom ant-timeline-item-head-blue">
      <ng-container *nzStringTemplateOutlet="pendingDot">
        <i *ngIf="!pendingDot" nz-icon nzType="loading"></i>
        <ng-template *ngElse>
          {{ pendingDot }}
        </ng-template>
      </ng-container>
    </div>
    <div class="ant-timeline-item-content">
      <ng-container *nzStringTemplateOutlet="pendingContent">
        {{ isPendingBoolean ? '' : pendingContent }}
      </ng-container>
    </div>
  </li>`
})
export class NzTimelinePendingItemComponent {
  @Input() pendingDot?: string | TemplateRef<void>;
  @Input() isPendingBoolean: boolean = false;
  @Input() pendingContent?: string | boolean | TemplateRef<void>;
}
