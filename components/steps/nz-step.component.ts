import {
  Component,
  ElementRef,
  Input,
  TemplateRef,
  ViewChild
} from '@angular/core';

import { NzUpdateHostClassService } from '../core/services/update-host-class.service';

// tslint:disable-next-line:no-any
export type StepNgClassType = string | string[] | Set<string> | { [ klass: string ]: any; };

@Component({
  selector           : 'nz-step',
  providers          : [ NzUpdateHostClassService ],
  preserveWhitespaces: false,
  templateUrl        : './nz-step.component.html'
})
export class NzStepComponent {
  private _status = 'wait';
  private _currentIndex = 0;
  private _description: string | TemplateRef<void>;
  private _icon: StepNgClassType | TemplateRef<void>;
  private _title: string | TemplateRef<void>;
  private el: HTMLElement = this.elementRef.nativeElement;
  oldAPIIcon = true; // Make the user defined icon compatible to old API. Should be removed in 2.0.
  isCustomStatus = false;
  isDescriptionString = true;
  isTitleString = true;
  isIconString = true;
  last = false;
  showProcessDot = false;
  direction = 'horizontal';
  outStatus = 'process';
  index = 0;
  @ViewChild('processDotTemplate') processDotTemplate: TemplateRef<void>;
  customProcessTemplate: TemplateRef<{ $implicit: TemplateRef<void>, status: string, index: number }>;

  @Input()
  set nzTitle(value: string | TemplateRef<void>) {
    this.isTitleString = !(value instanceof TemplateRef);
    this._title = value;
  }

  get nzTitle(): string | TemplateRef<void> {
    return this._title;
  }

  @Input()
  set nzIcon(value: StepNgClassType | TemplateRef<void>) {
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

  get nzIcon(): StepNgClassType | TemplateRef<void> {
    return this._icon;
  }

  @Input()
  set nzStatus(status: string) {
    this._status = status;
    this.isCustomStatus = true;
    this.updateClassMap();
  }

  get nzStatus(): string {
    return this._status;
  }

  @Input()
  set nzDescription(value: string | TemplateRef<void>) {
    this.isDescriptionString = !(value instanceof TemplateRef);
    this._description = value;
  }

  get nzDescription(): string | TemplateRef<void> {
    return this._description;
  }

  get currentIndex(): number {
    return this._currentIndex;
  }

  set currentIndex(current: number) {
    this._currentIndex = current;
    if (!this.isCustomStatus) {
      if (current > this.index) {
        this._status = 'finish';
      } else if (current === this.index) {
        if (this.outStatus) {
          this._status = this.outStatus;
        }
      } else {
        this._status = 'wait';
      }
    }
    this.updateClassMap();
  }

  updateClassMap(): void {
    const classMap = {
      [ 'ant-steps-item' ]        : true,
      [ `ant-steps-item-wait` ]   : this.nzStatus === 'wait',
      [ `ant-steps-item-process` ]: this.nzStatus === 'process',
      [ `ant-steps-item-finish` ] : this.nzStatus === 'finish',
      [ `ant-steps-item-error` ]  : this.nzStatus === 'error',
      [ 'ant-steps-custom' ]      : !!this.nzIcon,
      [ 'ant-steps-next-error' ]  : (this.outStatus === 'error') && (this.currentIndex === this.index + 1)
    };
    this.nzUpdateHostClassService.updateHostClass(this.el, classMap);
  }

  constructor(private elementRef: ElementRef, private nzUpdateHostClassService: NzUpdateHostClassService) {
  }
}
