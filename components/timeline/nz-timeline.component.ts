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

import { Subscription } from 'rxjs/Subscription';

import { NzTimelineItemComponent } from './nz-timeline-item.component';

@Component({
  selector           : 'nz-timeline',
  preserveWhitespaces: false,
  template           : `
    <ul class="ant-timeline" [class.ant-timeline-pending]="nzPending">
      <ng-content></ng-content>
      <li *ngIf="nzPending" class="ant-timeline-item ant-timeline-item-pending">
        <div class="ant-timeline-item-tail"></div>
        <div class="ant-timeline-item-head ant-timeline-item-head-custom ant-timeline-item-head-blue">
          <i class="anticon anticon-spin anticon-loading"></i>
        </div>
        <div class="ant-timeline-item-content">
          <ng-container *ngIf="isPendingString; else pendingTemplate">{{ isPendingBoolean ? '' : nzPending }}</ng-container>
          <ng-template #pendingTemplate>
            <ng-template [ngTemplateOutlet]="nzPending"></ng-template>
          </ng-template>
        </div>
      </li>
    </ul>`
})
export class NzTimelineComponent implements AfterContentInit, OnDestroy {
  private _pending: string | boolean | TemplateRef<void>;
  private timeLineSubscription: Subscription;
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
    if (this.timeLineSubscription) {
      this.timeLineSubscription.unsubscribe();
      this.timeLineSubscription = null;
    }
  }

  ngAfterContentInit(): void {
    this.updateChildrenTimeLine();
    if (this.listOfTimeLine) {
      this.timeLineSubscription = this.listOfTimeLine.changes.subscribe(() => {
        this.updateChildrenTimeLine();
      });
    }
  }
}
