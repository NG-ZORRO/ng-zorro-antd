/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';

import { NzTimelineMode } from './timeline.component';

export const NzTimelineTimeDefaultColors = ['red', 'blue', 'green', 'grey'] as const;
export type NzTimelineItemColor = typeof NzTimelineTimeDefaultColors[number];

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
        #liElement
      >
        <div class="ant-timeline-item-tail"></div>
        <div
          class="ant-timeline-item-head"
          [class.ant-timeline-item-head-red]="nzColor === 'red'"
          [class.ant-timeline-item-head-blue]="nzColor === 'blue'"
          [class.ant-timeline-item-head-green]="nzColor === 'green'"
          [class.ant-timeline-item-head-gray]="nzColor === 'gray'"
          [class.ant-timeline-item-head-custom]="!!nzDot"
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
export class NzTimelineItemComponent implements AfterViewInit, OnChanges {
  @ViewChild('template', { static: false }) template: TemplateRef<void>;
  @ViewChild('liElement', { static: false }) liElement?: ElementRef<HTMLUListElement>;
  @Input() nzColor: NzTimelineItemColor = 'blue';
  @Input() nzDot: string | TemplateRef<void>;

  isLast = false;
  position: NzTimelineMode | undefined;

  constructor(private renderer: Renderer2, private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.tryUpdateCustomColor();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.nzColor) {
      this.tryUpdateCustomColor();
    }
  }

  detectChanges(): void {
    this.cdr.detectChanges();
  }

  private tryUpdateCustomColor(): void {
    if (!this.liElement) {
      return;
    }

    const circle = this.liElement.nativeElement.querySelector('.ant-timeline-item-head');

    if (NzTimelineTimeDefaultColors.indexOf(this.nzColor) === -1) {
      this.renderer.setStyle(circle, 'border-color', this.nzColor);
    } else {
      this.renderer.removeStyle(circle, 'border-color');
    }
  }
}
