/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  QueryList,
  SimpleChange,
  SimpleChanges,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { NzTimelineService } from 'ng-zorro-antd/timeline/timeline.service';
import { merge, Subject } from 'rxjs';
import { debounceTime, take, takeUntil } from 'rxjs/operators';

import { NzTimelineItemComponent } from './timeline-item.component';

const TimelineModes = ['left', 'alternate', 'right'] as const;
export type NzTimelineMode = typeof TimelineModes[number];

interface TimelineItemData {
  color: string;
  position: 'left' | 'right';
  dot?: string | TemplateRef<void>;
  template: TemplateRef<void>;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
  selector: 'nz-timeline',
  exportAs: 'nzTimeline',
  template: `
    <ul
      class="ant-timeline"
      [class.ant-timeline-right]="nzMode === 'right'"
      [class.ant-timeline-alternate]="nzMode === 'alternate'"
      [class.ant-timeline-pending]="!!nzPending"
      [class.ant-timeline-reverse]="nzReverse"
    >
      <!-- User inserted timeline dots. -->
      <nz-timeline-pending-item
        *ngIf="nzReverse && nzPending"
        [pendingDot]="nzPendingDot"
        [isPendingBoolean]="isPendingBoolean"
        [pendingContent]="nzPending"
      ></nz-timeline-pending-item>
      <nz-timeline-item-renderer
        *ngFor="let item of timelineItems; let isLast = last"
        [color]="item.color"
        [template]="item.template"
        [position]="item.position"
        [dot]="item.dot"
        [isLast]="isLast"
      >
      </nz-timeline-item-renderer>
      <nz-timeline-pending-item
        *ngIf="!nzReverse && nzPending"
        [pendingDot]="nzPendingDot"
        [isPendingBoolean]="isPendingBoolean"
        [pendingContent]="nzPending"
      ></nz-timeline-pending-item>
    </ul>
    <!-- Grasp items -->
    <ng-template>
      <ng-content></ng-content>
    </ng-template>
  `,
  providers: [NzTimelineService]
})
export class NzTimelineComponent implements AfterContentInit, OnChanges, OnDestroy {
  @ContentChildren(NzTimelineItemComponent) listOfItems!: QueryList<NzTimelineItemComponent>;

  @Input() nzMode?: NzTimelineMode;
  @Input() nzPending?: string | boolean | TemplateRef<void>;
  @Input() nzPendingDot?: string | TemplateRef<void>;
  @Input() nzReverse: boolean = false;

  isPendingBoolean: boolean = false;
  timelineItems: TimelineItemData[] = [];

  private destroy$ = new Subject<void>();

  constructor(private timelineService: NzTimelineService, private cdr: ChangeDetectorRef, private ngZone: NgZone) {}

  ngOnChanges(changes: SimpleChanges): void {
    const { nzMode, nzReverse, nzPending } = changes;

    if (simpleChangeActivated(nzMode) || simpleChangeActivated(nzReverse)) {
      this.updateChildren();
    }

    if (nzPending) {
      this.isPendingBoolean = nzPending.currentValue === true;
    }
  }

  ngAfterContentInit(): void {
    merge(this.ngZone.onStable.pipe(take(1)), this.listOfItems.changes, this.timelineService.updated$.pipe(debounceTime(16)))
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.updateChildren());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private updateChildren(): void {
    if (this.listOfItems && this.listOfItems.length) {
      const itemsArray = this.nzReverse ? this.listOfItems.toArray().reverse() : this.listOfItems.toArray();
      this.timelineItems = itemsArray.map((item, index) => {
        return {
          dot: item.nzDot,
          position: getPositionByIndexAndMode(index, this.nzMode),
          template: item.template,
          color: item.nzColor
        };
      });
    }
    this.cdr.markForCheck();
  }
}

function simpleChangeActivated(simpleChange?: SimpleChange): boolean {
  return !!(simpleChange && (simpleChange.previousValue !== simpleChange.currentValue || simpleChange.isFirstChange()));
}

function getPositionByIndexAndMode(index: number, mode?: NzTimelineMode): 'left' | 'right' {
  return mode === 'left' || !mode ? 'left' : mode === 'right' ? 'right' : mode === 'alternate' && index % 2 === 0 ? 'left' : 'right';
}
