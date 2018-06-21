import {
  AfterContentInit,
  Component,
  ContentChild,
  ContentChildren,
  Input,
  OnDestroy,
  QueryList,
  TemplateRef
} from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { NzTimelineItemComponent } from './nz-timeline-item.component';

@Component({
  selector           : 'nz-timeline',
  preserveWhitespaces: false,
  templateUrl        : './nz-timeline.component.html'
})
export class NzTimelineComponent implements AfterContentInit, OnDestroy {
  private _pending: string | boolean | TemplateRef<void>;
  private unsubscribe$ = new Subject<void>();
  isPendingString: boolean;
  isPendingBoolean: boolean = false;

  @Input()
  set nzPending(value: string | boolean | TemplateRef<void>) {
    this.isPendingString = !(value instanceof TemplateRef);
    this.isPendingBoolean = value === true;
    this._pending = value;
  }

  get nzPending(): string | boolean | TemplateRef<void> {
    return this._pending;
  }

  @ContentChildren(NzTimelineItemComponent) listOfTimeLine: QueryList<NzTimelineItemComponent>;
  @ContentChild('pending') _pendingContent: TemplateRef<void>;

  updateChildrenTimeLine(): void {
    if (this.listOfTimeLine && this.listOfTimeLine.length) {
      this.listOfTimeLine.toArray().forEach((item, index) => item.isLast = index === this.listOfTimeLine.length - 1);
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngAfterContentInit(): void {
    this.updateChildrenTimeLine();
    if (this.listOfTimeLine) {
      this.listOfTimeLine.changes.pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
        this.updateChildrenTimeLine();
      });
    }
  }
}
