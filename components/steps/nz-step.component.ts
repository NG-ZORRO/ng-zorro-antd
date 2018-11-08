import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, TemplateRef, ViewChild } from '@angular/core';

import { classMapToString } from '../core/style/map';
import { NgClassType } from '../core/types/ng-class';

@Component({
  changeDetection    : ChangeDetectionStrategy.OnPush,
  selector           : 'nz-step',
  preserveWhitespaces: false,
  templateUrl        : './nz-step.component.html',
  host               : {
    '[class]': 'classString'
  }
})
export class NzStepComponent {
  @ViewChild('processDotTemplate') processDotTemplate: TemplateRef<void>;

  @Input()
  set nzTitle(value: string | TemplateRef<void>) {
    this.isTitleString = !(value instanceof TemplateRef);
    this._title = value;
  }

  get nzTitle(): string | TemplateRef<void> {
    return this._title;
  }

  private _title: string | TemplateRef<void>;

  @Input()
  set nzIcon(value: NgClassType | TemplateRef<void>) {
    if (!(value instanceof TemplateRef)) {
      this.isIconString = true;
      if (typeof value === 'string') {
        const str = value as string;
        this.oldAPIIcon = str.indexOf('anticon') > -1;
      } else {
        this.oldAPIIcon = true;
      }
    } else {
      this.isIconString = false;
    }
    this._icon = value;
  }

  get nzIcon(): NgClassType | TemplateRef<void> {
    return this._icon;
  }

  private _icon: NgClassType | TemplateRef<void>;

  @Input()
  set nzStatus(status: string) {
    this._status = status;
    this.isCustomStatus = true;
  }

  get nzStatus(): string {
    return this._status;
  }

  private _status = 'wait';

  @Input()
  set nzDescription(value: string | TemplateRef<void>) {
    this.isDescriptionString = !(value instanceof TemplateRef);
    this._description = value;
  }

  get nzDescription(): string | TemplateRef<void> {
    return this._description;
  }

  private _description: string | TemplateRef<void>;

  oldAPIIcon = true;
  isCustomStatus = false;
  isDescriptionString = true;
  isTitleString = true;
  isIconString = true;
  last = false;
  showProcessDot = false;
  direction = 'horizontal';
  outStatus = 'process';
  index = 0;
  customProcessTemplate: TemplateRef<{ $implicit: TemplateRef<void>, status: string, index: number }>; // Set by parent.

  get currentIndex(): number {
    return this._currentIndex;
  }

  set currentIndex(current: number) {
    this._currentIndex = current;
    if (!this.isCustomStatus) {
      this._status = current > this.index
        ? 'finish'
        : current === this.index
          ? this.outStatus || ''
          : 'wait';
    }
  }

  private _currentIndex = 0;

  get classString(): string {
    return classMapToString({
      [ 'ant-steps-item' ]        : true,
      [ `ant-steps-item-wait` ]   : this.nzStatus === 'wait',
      [ `ant-steps-item-process` ]: this.nzStatus === 'process',
      [ `ant-steps-item-finish` ] : this.nzStatus === 'finish',
      [ `ant-steps-item-error` ]  : this.nzStatus === 'error',
      [ 'ant-steps-custom' ]      : !!this.nzIcon,
      [ 'ant-steps-next-error' ]  : (this.outStatus === 'error') && (this.currentIndex === this.index + 1)
    });
  }

  detectChanges(): void {
    this.cdr.detectChanges();
  }

  constructor(private cdr: ChangeDetectorRef) {
  }
}
