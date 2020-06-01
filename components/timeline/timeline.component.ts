/**
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
  OnChanges,
  OnDestroy,
  OnInit,
  QueryList,
  SimpleChange,
  SimpleChanges,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { NzTimelineItemComponent } from './timeline-item.component';
import { TimelineService } from './timeline.service';

const TimelineModes = ['left', 'alternate', 'right'] as const;
export type NzTimelineMode = typeof TimelineModes[number];

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
  selector: 'nz-timeline',
  providers: [TimelineService],
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
export class NzTimelineComponent implements AfterContentInit, OnChanges, OnDestroy, OnInit {
  @ContentChildren(NzTimelineItemComponent) listOfItems!: QueryList<NzTimelineItemComponent>;

  @Input() nzMode?: NzTimelineMode;
  @Input() nzPending?: string | boolean | TemplateRef<void>;
  @Input() nzPendingDot?: string | TemplateRef<void>;
  @Input() nzReverse: boolean = false;

  isPendingBoolean: boolean = false;
  timelineItems: NzTimelineItemComponent[] = [];

  private destroy$ = new Subject<void>();

  constructor(private cdr: ChangeDetectorRef, private timelineService: TimelineService) {}

  ngOnChanges(changes: SimpleChanges): void {
    const { nzMode, nzReverse, nzPending } = changes;

    if (simpleChangeActivated(nzMode) || simpleChangeActivated(nzReverse)) {
      this.updateChildren();
    }

    if (nzPending) {
      this.isPendingBoolean = nzPending.currentValue === true;
    }
  }
  ngOnInit(): void {
    this.timelineService.check$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.cdr.markForCheck();
    });
  }

  ngAfterContentInit(): void {
    this.updateChildren();

    this.listOfItems.changes.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.updateChildren();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private updateChildren(): void {
    if (this.listOfItems && this.listOfItems.length) {
      const length = this.listOfItems.length;
      this.listOfItems.forEach((item, index) => {
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
      this.timelineItems = this.nzReverse ? this.listOfItems.toArray().reverse() : this.listOfItems.toArray();
    }
    this.cdr.markForCheck();
  }
}

function simpleChangeActivated(simpleChange?: SimpleChange): boolean {
  return !!(simpleChange && (simpleChange.previousValue !== simpleChange.currentValue || simpleChange.isFirstChange()));
}
