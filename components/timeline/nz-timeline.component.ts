import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  ElementRef,
  Input,
  OnDestroy,
  QueryList,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { reverseChildNodes } from '../core/dom/reverse';
import { ClassMap } from '../core/interface/interface';
import { NzTimelineItemComponent } from './nz-timeline-item.component';

export type NzTimelineMode = 'left' | 'alternate' | 'right';

@Component({
  changeDetection    : ChangeDetectionStrategy.OnPush,
  selector           : 'nz-timeline',
  preserveWhitespaces: false,
  templateUrl        : './nz-timeline.component.html'
})
export class NzTimelineComponent implements AfterContentInit, OnDestroy {
  @ViewChild('timeline') timeline: ElementRef<HTMLElement>;
  @ContentChildren(NzTimelineItemComponent) listOfTimeLine: QueryList<NzTimelineItemComponent>;
  @ContentChild('pending') _pendingContent: TemplateRef<void>;

  @Input()
  set nzReverse(value: boolean) {
    if (this._reverse !== value) {
      this._reverse = value;
      this.reverseChildTimelineDots();
    }
  }

  get nzReverse(): boolean {
    return this._reverse;
  }

  private _reverse: boolean = false;

  @Input()
  set nzMode(value: NzTimelineMode) {
    if (this._mode !== value) {
      this._mode = value;
      this.updateChildren();
    }
  }

  get nzMode(): NzTimelineMode {
    return this._mode;
  }

  private _mode: NzTimelineMode;

  @Input()
  set nzPending(value: string | boolean | TemplateRef<void>) {
    this.isPendingString = !(value instanceof TemplateRef);
    this.isPendingBoolean = value === true;
    this._pending = value;
  }

  get nzPending(): string | boolean | TemplateRef<void> {
    return this._pending;
  }

  private _pending: string | boolean | TemplateRef<void>;

  @Input()
  set nzPendingDot(value: string | TemplateRef<void>) {
    this.isPendingDotString = !(value instanceof TemplateRef);
    this._pendingDot = value;
  }

  get nzPendingDot(): string | TemplateRef<void> {
    return this._pendingDot;
  }

  private _pendingDot: string | TemplateRef<void>;

  private _prefixCls = 'ant-timeline';

  get timelineCls(): ClassMap {
    return {
      [ `${this._prefixCls}` ]          : true,
      [ `${this._prefixCls}-right` ]    : this.nzMode === 'right',
      [ `${this._prefixCls}-alternate` ]: this.nzMode === 'alternate',
      [ `${this._prefixCls}-pending` ]  : !!this.nzPending,
      [ `${this._prefixCls}-reverse` ]  : this.nzReverse
    };
  }

  private unsubscribe$ = new Subject<void>();

  isPendingString: boolean;
  isPendingBoolean: boolean = false;
  isPendingDotString: boolean;

  updateChildren(): void {
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
      this.cdr.detectChanges();
    }
  }

  private reverseChildTimelineDots(): void {
    reverseChildNodes(this.timeline.nativeElement as HTMLElement);
    this.updateChildren();
  }

  constructor(private cdr: ChangeDetectorRef) {
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngAfterContentInit(): void {
    this.updateChildren();
    if (this.listOfTimeLine) {
      this.listOfTimeLine.changes.pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
        this.updateChildren();
      });
    }
  }
}
