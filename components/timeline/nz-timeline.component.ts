import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  QueryList,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { reverseChildNodes } from '../core/util/dom';
import { NzTimelineItemComponent } from './nz-timeline-item.component';

export type NzTimelineMode = 'left' | 'alternate' | 'right';

@Component({
  changeDetection    : ChangeDetectionStrategy.OnPush,
  encapsulation      : ViewEncapsulation.None,
  preserveWhitespaces: false,
  selector           : 'nz-timeline',
  templateUrl        : './nz-timeline.component.html'
})
export class NzTimelineComponent implements AfterContentInit, OnChanges, OnDestroy {
  @ViewChild('timeline') timeline: ElementRef<HTMLElement>;
  @ContentChildren(NzTimelineItemComponent) listOfTimeLine: QueryList<NzTimelineItemComponent>;
  @ContentChild('pending') _pendingContent: TemplateRef<void>;

  @Input() nzMode: NzTimelineMode;
  @Input() nzPending: string | boolean | TemplateRef<void>;
  @Input() nzPendingDot: string | TemplateRef<void>;
  @Input() nzReverse: boolean = false;

  isPendingBoolean: boolean = false;

  private destroy$ = new Subject<void>();

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    const modeChanges = changes.nzMode;
    const reverseChanges = changes.nzReverse;
    const pendingChanges = changes.nzPending;

    if (modeChanges && (modeChanges.previousValue !== modeChanges.currentValue || modeChanges.isFirstChange())) {
      this.updateChildren();
    }
    if (reverseChanges && reverseChanges.previousValue !== reverseChanges.currentValue && !reverseChanges.isFirstChange()) {
      this.reverseChildTimelineDots();
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
      this.listOfTimeLine.toArray().forEach((item, index) => {
        item.isLast = !this.nzReverse ? index === length - 1 : index === 0;
        item.position = this.nzMode === 'left' || !this.nzMode
          ? undefined
          : this.nzMode === 'right'
            ? 'right'
            : this.nzMode === 'alternate' && index % 2 === 0 ? 'left' : 'right';
        item.detectChanges();
      });
      this.cdr.markForCheck();
    }
  }

  private reverseChildTimelineDots(): void {
    reverseChildNodes(this.timeline.nativeElement as HTMLElement);
    this.updateChildren();
  }
}
