/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';

import { NzTimelineMode } from './timeline.component';

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
      <li
        class="ant-timeline-item"
        [class.ant-timeline-item-right]="position === 'right'"
        [class.ant-timeline-item-left]="position === 'left'"
        [class.ant-timeline-item-last]="isLast"
      >
        <div class="ant-timeline-item-tail"></div>
        <div
          class="ant-timeline-item-head"
          [class.ant-timeline-item-head-red]="nzColor === 'red'"
          [class.ant-timeline-item-head-blue]="nzColor === 'blue'"
          [class.ant-timeline-item-head-green]="nzColor === 'green'"
          [class.ant-timeline-item-head-gray]="nzColor === 'gray'"
          [class.ant-timeline-item-head-custom]="!!nzDot"
          [style.border-color]="borderColor"
        >
          <ng-container *nzStringTemplateOutlet="nzDot">{{ nzDot }}</ng-container>
        </div>
        <div class="ant-timeline-item-content">
          <ng-content></ng-content>
        </div>
      </li>
    </ng-template>
  `
})
export class NzTimelineItemComponent implements OnChanges {
  @ViewChild('template', { static: false }) template!: TemplateRef<void>;

  @Input() nzColor: NzTimelineItemColor = 'blue';
  @Input() nzDot?: string | TemplateRef<void>;

  isLast = false;
  borderColor: string | null = null;
  position: NzTimelineMode | undefined;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.nzColor) {
      this.updateCustomColor();
    }
  }

  detectChanges(): void {
    this.cdr.detectChanges();
  }

  private updateCustomColor(): void {
    this.borderColor = isDefaultColor(this.nzColor) ? null : this.nzColor;
  }
}
