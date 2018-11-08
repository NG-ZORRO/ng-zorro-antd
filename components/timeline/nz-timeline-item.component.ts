import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, OnInit, Renderer2, TemplateRef, ViewChild } from '@angular/core';

import { ClassMap } from '../core/interface/interface';
import { NzTimelineMode } from './nz-timeline.component';

@Component({
  changeDetection    : ChangeDetectionStrategy.OnPush,
  selector           : 'nz-timeline-item, [nz-timeline-item]',
  preserveWhitespaces: false,
  templateUrl        : './nz-timeline-item.component.html'
})
export class NzTimelineItemComponent implements OnInit {
  @ViewChild('liTemplate') liTemplate: ElementRef;

  @Input()
  set nzDot(value: string | TemplateRef<void>) {
    this.isDotString = !(value instanceof TemplateRef);
    this._dot = value;
  }

  get nzDot(): string | TemplateRef<void> {
    return this._dot;
  }

  private _dot: string | TemplateRef<void>;

  @Input()
  set nzColor(color: string) {
    this._color = color;
    this.tryUpdateCustomColor();
  }

  get nzColor(): string {
    return this._color;
  }

  private _color: string = 'blue';
  private _prefixCls = 'ant-timeline-item';

  isDotString: boolean;
  isLast = false;
  position: NzTimelineMode | undefined;

  get timelineItemCls(): ClassMap {
    return {
      [ `${this._prefixCls}-right` ]: this.position === 'right',
      [ `${this._prefixCls}-left` ]: this.position === 'left',
      [ `${this._prefixCls}-last` ] : this.isLast
    };
  }

  get timelineItemDotCls(): ClassMap {
    return {
      [ `${this._prefixCls}-head-red` ]   : this.nzColor === 'red',
      [ `${this._prefixCls}-head-blue` ]  : this.nzColor === 'blue',
      [ `${this._prefixCls}-head-green` ] : this.nzColor === 'green',
      [ `${this._prefixCls}-head-custom` ]: !!this.nzDot
    };
  }

  private tryUpdateCustomColor(): void {
    const defaultColors = [ 'blue', 'red', 'green' ];
    const circle = this.liTemplate.nativeElement.querySelector('.ant-timeline-item-head');
    if (defaultColors.indexOf(this._color) === -1) {
      this.renderer.setStyle(circle, 'border-color', this._color);
    } else {
      this.renderer.removeStyle(circle, 'border-color');
    }
  }

  /**
   * Invoked by parent to detect changes. Because timeline items are content children not view children,
   * they are not detected when parent invokes `cdr.detectChanges`.
   */
  detectChanges(): void {
    this.cdr.detectChanges();
  }

  constructor(private renderer: Renderer2, private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.tryUpdateCustomColor();
  }
}
