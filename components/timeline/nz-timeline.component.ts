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

import { toBoolean } from '../core/util/convert';

import { NzTimelineItemComponent } from './nz-timeline-item.component';

@Component({
  selector           : 'nz-timeline',
  preserveWhitespaces: false,
  template           : `
    <ul class="ant-timeline" [class.ant-timeline-pending]="nzPending">
      <ng-content></ng-content>
      <li *ngIf="nzPending" class="ant-timeline-item ant-timeline-item-pending">
        <div class="ant-timeline-item-tail"></div>
        <div class="ant-timeline-item-head ant-timeline-item-head-blue"></div>
        <div class="ant-timeline-item-content">
          <ng-template [ngTemplateOutlet]="_pendingContent">
          </ng-template>
        </div>
      </li>
    </ul>`
})
export class NzTimelineComponent implements AfterContentInit, OnDestroy {
  _pending = false;
  _timelineChanges;

  @Input() set nzPending(value: boolean) {
    this._pending = toBoolean(value);
  }

  get nzPending(): boolean {
    return this._pending;
  }

  items: NzTimelineItemComponent[] = [];
  @ContentChildren(NzTimelineItemComponent) _listOfTimeline: QueryList<NzTimelineItemComponent>;
  @ContentChild('pending') _pendingContent: TemplateRef<void>;

  updateChildrenTimeline(): void {
    if (this._listOfTimeline && this._listOfTimeline.length) {
      const listArray = this._listOfTimeline.toArray();
      listArray[ listArray.length - 1 ]._lastItem = true;
    }
  }

  ngOnDestroy(): void {
    if (this._timelineChanges) {
      this._timelineChanges.unsubscribe();
      this._timelineChanges = null;
    }
  }

  ngAfterContentInit(): void {
    this.updateChildrenTimeline();
    if (this._listOfTimeline) {
      this._timelineChanges = this._listOfTimeline.changes.subscribe(() => {
        this.updateChildrenTimeline();
      });
    }
  }
}
