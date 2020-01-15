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
  ContentChild,
  ContentChildren,
  Input,
  OnChanges,
  OnDestroy,
  QueryList,
  SimpleChanges,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { NzTimelineItemComponent } from './timeline-item.component';

export type NzTimelineMode = 'left' | 'alternate' | 'right';

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
      <ng-container *ngIf="nzReverse" [ngTemplateOutlet]="pendingTemplate"></ng-container>
      <ng-container *ngFor="let item of timelineItems">
        <ng-template [ngTemplateOutlet]="item.template"></ng-template>
      </ng-container>
      <ng-container *ngIf="!nzReverse" [ngTemplateOutlet]="pendingTemplate"></ng-container>
      <!-- Pending dot. -->
    </ul>
    <ng-template #pendingTemplate>
      <li *ngIf="nzPending" class="ant-timeline-item ant-timeline-item-pending">
        <div class="ant-timeline-item-tail"></div>
        <div class="ant-timeline-item-head ant-timeline-item-head-custom ant-timeline-item-head-blue">
          <ng-container *nzStringTemplateOutlet="nzPendingDot">
            {{ nzPendingDot }}<i *ngIf="!nzPendingDot" nz-icon nzType="loading"></i>
          </ng-container>
        </div>
        <div class="ant-timeline-item-content">
          <ng-container *nzStringTemplateOutlet="nzPending">
            {{ isPendingBoolean ? '' : nzPending }}
          </ng-container>
        </div>
      </li>
    </ng-template>
    <!-- Grasp items -->
    <ng-content></ng-content>
  `
})
export class NzTimelineComponent implements AfterContentInit, OnChanges, OnDestroy {
  @ContentChildren(NzTimelineItemComponent) listOfTimeLine: QueryList<NzTimelineItemComponent>;
  @ContentChild('pending', { static: false }) _pendingContent: TemplateRef<void>;

  @Input() nzMode: NzTimelineMode;
  @Input() nzPending: string | boolean | TemplateRef<void>;
  @Input() nzPendingDot: string | TemplateRef<void>;
  @Input() nzReverse: boolean = false;

  isPendingBoolean: boolean = false;
  timelineItems: NzTimelineItemComponent[] = [];

  private destroy$ = new Subject<void>();

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    const modeChanges = changes.nzMode;
    const reverseChanges = changes.nzReverse;
    const pendingChanges = changes.nzPending;

    const shouldChangeByMode = modeChanges && (modeChanges.previousValue !== modeChanges.currentValue || modeChanges.isFirstChange());
    const shouldChangeByReverse =
      reverseChanges && reverseChanges.previousValue !== reverseChanges.currentValue && !reverseChanges.isFirstChange();

    if (shouldChangeByMode || shouldChangeByReverse) {
      this.updateChildren();
    }

    if (pendingChanges) {
      this.isPendingBoolean = pendingChanges.currentValue === true;
    }
  }

  ngAfterContentInit(): void {
    this.updateChildren();
    if (this.listOfTimeLine) {
      this.listOfTimeLine.changes.pipe(takeUntil(this.destroy$)).subscribe(() => {
        this.updateChildren();
      });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private updateChildren(): void {
    if (this.listOfTimeLine && this.listOfTimeLine.length) {
      const length = this.listOfTimeLine.length;
      this.listOfTimeLine.forEach((item, index) => {
        item.isLast = !this.nzReverse ? index === length - 1 : index === 0;
        item.position =
          this.nzMode === 'left' || !this.nzMode
            ? undefined
            : this.nzMode === 'right'
            ? 'right'
            : this.nzMode === 'alternate' && index % 2 === 0
            ? 'left'
            : 'right';
        item.detectChanges();
      });
      this.timelineItems = this.nzReverse ? this.listOfTimeLine.toArray().reverse() : this.listOfTimeLine.toArray();
    }
    this.cdr.markForCheck();
  }
}
