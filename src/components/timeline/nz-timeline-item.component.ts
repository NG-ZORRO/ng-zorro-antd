import {
  Component,
  ContentChild,
  Input,
  OnInit,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector     : 'nz-timeline-item',
  encapsulation: ViewEncapsulation.None,
  template     : `
    <li
      class="ant-timeline-item"
      [class.ant-timeline-item-last]="_lastItem">
      <div class="ant-timeline-item-tail"></div>
      <div class="ant-timeline-item-head"
        [class.ant-timeline-item-head-custom]="_custom"
        [ngClass]="itemHeadClass">
        <ng-template [ngTemplateOutlet]="_customContent">
        </ng-template>
      </div>
      <div class="ant-timeline-item-content">
        <ng-content></ng-content>
      </div>
    </li>`,
  styleUrls    : []
})
export class NzTimelineItemComponent implements OnInit {
  itemHeadClass = { 'ant-timeline-item-head-blue': true };
  _color: string = 'blue';
  _custom = false;
  _lastItem = false;
  @ContentChild('custom') _customContent: TemplateRef<void>;

  @Input()
  set nzColor(color: string) {
    this._color = color;
    // TODO: There is no removal process, is the result correct?
    if (color === 'green') {
      this.itemHeadClass[ 'ant-timeline-item-head-green' ] = true;
    } else if (color === 'red') {
      this.itemHeadClass[ 'ant-timeline-item-head-red' ] = true;
    } else {
      this.itemHeadClass[ 'ant-timeline-item-head-blue' ] = true;
    }
  }

  get nzColor(): string {
    return this._color;
  }

  ngOnInit(): void {
    if (this._customContent) {
      this._custom = true;
    }
  }

}
