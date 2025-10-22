/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Direction, Directionality } from '@angular/cdk/bidi';
import { NgTemplateOutlet } from '@angular/common';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  Input,
  OnChanges,
  OnInit,
  QueryList,
  SimpleChange,
  SimpleChanges,
  TemplateRef,
  ViewEncapsulation,
  booleanAttribute,
  inject,
  DestroyRef
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { NzTimelineItemComponent } from './timeline-item.component';
import { TimelineService } from './timeline.service';
import { NzTimelineMode, NzTimelinePosition } from './typings';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'nz-timeline',
  providers: [TimelineService],
  exportAs: 'nzTimeline',
  template: `
    <ul
      class="ant-timeline"
      [class.ant-timeline-label]="hasLabelItem"
      [class.ant-timeline-right]="!hasLabelItem && nzMode === 'right'"
      [class.ant-timeline-alternate]="nzMode === 'alternate' || nzMode === 'custom'"
      [class.ant-timeline-pending]="!!nzPending"
      [class.ant-timeline-reverse]="nzReverse"
      [class.ant-timeline-rtl]="dir === 'rtl'"
    >
      <!-- pending dot (reversed) -->
      @if (nzReverse) {
        <ng-container [ngTemplateOutlet]="pendingTemplate"></ng-container>
      }
      <!-- timeline items -->
      @for (item of timelineItems; track item) {
        <ng-template [ngTemplateOutlet]="item.template"></ng-template>
      }
      @if (!nzReverse) {
        <ng-container [ngTemplateOutlet]="pendingTemplate"></ng-container>
      }
      <!-- pending dot -->
    </ul>
    <ng-template #pendingTemplate>
      @if (nzPending) {
        <li class="ant-timeline-item ant-timeline-item-pending">
          <div class="ant-timeline-item-tail"></div>
          <div class="ant-timeline-item-head ant-timeline-item-head-custom ant-timeline-item-head-blue">
            <ng-container *nzStringTemplateOutlet="nzPendingDot">
              {{ nzPendingDot }}
              @if (!nzPendingDot) {
                <nz-icon nzType="loading" />
              }
            </ng-container>
          </div>
          <div class="ant-timeline-item-content">
            <ng-container *nzStringTemplateOutlet="nzPending">
              {{ isPendingBoolean ? '' : nzPending }}
            </ng-container>
          </div>
        </li>
      }
    </ng-template>
    <!-- Grasp items -->
    <ng-content></ng-content>
  `,
  imports: [NgTemplateOutlet, NzOutletModule, NzIconModule]
})
export class NzTimelineComponent implements AfterContentInit, OnChanges, OnInit {
  private cdr = inject(ChangeDetectorRef);
  private timelineService = inject(TimelineService);
  private directionality = inject(Directionality);
  private destroyRef = inject(DestroyRef);

  @ContentChildren(NzTimelineItemComponent) listOfItems!: QueryList<NzTimelineItemComponent>;

  @Input() nzMode: NzTimelineMode = 'left';
  @Input() nzPending?: string | boolean | TemplateRef<void>;
  @Input() nzPendingDot?: string | TemplateRef<void>;
  @Input({ transform: booleanAttribute }) nzReverse: boolean = false;

  isPendingBoolean: boolean = false;
  timelineItems: NzTimelineItemComponent[] = [];
  dir: Direction = 'ltr';
  hasLabelItem = false;

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
    this.timelineService.check$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.cdr.markForCheck();
    });

    this.directionality.change?.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(direction => {
      this.dir = direction;
      this.cdr.detectChanges();
    });

    this.dir = this.directionality.value;
  }

  ngAfterContentInit(): void {
    this.updateChildren();

    this.listOfItems.changes.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.updateChildren();
    });
  }

  private updateChildren(): void {
    if (this.listOfItems && this.listOfItems.length) {
      const length = this.listOfItems.length;
      let hasLabelItem = false;

      this.listOfItems.forEach((item: NzTimelineItemComponent, index: number) => {
        item.isLast = !this.nzReverse ? index === length - 1 : index === 0;
        item.position = getInferredTimelineItemPosition(index, this.nzMode);

        if (!hasLabelItem && item.nzLabel) {
          hasLabelItem = true;
        }

        item.detectChanges();
      });

      this.timelineItems = this.nzReverse ? this.listOfItems.toArray().reverse() : this.listOfItems.toArray();
      this.hasLabelItem = hasLabelItem;
    } else {
      this.timelineItems = [];
      this.hasLabelItem = false;
    }

    this.cdr.markForCheck();
  }
}

function simpleChangeActivated(simpleChange?: SimpleChange): boolean {
  return !!(simpleChange && (simpleChange.previousValue !== simpleChange.currentValue || simpleChange.isFirstChange()));
}

function getInferredTimelineItemPosition(index: number, mode: NzTimelineMode): NzTimelinePosition | undefined {
  if (mode === 'custom') {
    return undefined;
  } else if (mode === 'left' || mode === 'right') {
    return mode;
  } else {
    return mode === 'alternate' && index % 2 === 0 ? 'left' : 'right';
  }
}
