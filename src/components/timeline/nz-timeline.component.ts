import {
  AfterContentInit,
  Component,
  ContentChild,
  ContentChildren,
  OnInit,
  QueryList,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { NzTimelineItemComponent } from './nz-timeline-item.component';

@Component({
  selector     : 'nz-timeline',
  encapsulation: ViewEncapsulation.None,
  template     : `
    <ul class="ant-timeline" [class.ant-timeline-pending]="_isPending">
      <ng-content></ng-content>
      <li *ngIf="_isPending" class="ant-timeline-item ant-timeline-item-pending">
        <div class="ant-timeline-item-tail"></div>
        <div class="ant-timeline-item-head ant-timeline-item-head-blue"></div>
        <div class="ant-timeline-item-content">
          <ng-template [ngTemplateOutlet]="_pendingContent">
          </ng-template>
        </div>
      </li>
    </ul>`,
  styleUrls    : [ './style/index.less' ]
})
export class NzTimelineComponent implements OnInit, AfterContentInit {
  _isPending = false;
  items: NzTimelineItemComponent[] = [];
  @ContentChildren(NzTimelineItemComponent) _listOfTimeline: QueryList<NzTimelineItemComponent>;
  @ContentChild('pending') _pendingContent: TemplateRef<void>;

  ngOnInit(): void {
    if (this._pendingContent) {
      this._isPending = true;
    }
  }

  ngAfterContentInit(): void {
    setTimeout(_ => {
      if (this._listOfTimeline && this._listOfTimeline.length) {
        const listArray = this._listOfTimeline.toArray();
        listArray[ listArray.length - 1 ]._lastItem = true;
      }
    });
  }
}
