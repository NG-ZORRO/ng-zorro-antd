import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, ElementRef,
  Input,
  Renderer2,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';

import { NgClassType } from '../core/types/ng-class';

@Component({
  changeDetection    : ChangeDetectionStrategy.OnPush,
  encapsulation      : ViewEncapsulation.None,
  selector           : 'nz-step',
  preserveWhitespaces: false,
  templateUrl        : './nz-step.component.html',
  host               : {
    '[class.ant-steps-item-wait]'   : 'nzStatus === "wait"',
    '[class.ant-steps-item-process]': 'nzStatus === "process"',
    '[class.ant-steps-item-finish]' : 'nzStatus === "finish"',
    '[class.ant-steps-item-error]'  : 'nzStatus === "error"',
    '[class.ant-steps-custom]'      : '!!nzIcon',
    '[class.ant-steps-next-error]'  : '(outStatus === "error") && (currentIndex === index + 1)'
  }
})
export class NzStepComponent {
  @ViewChild('processDotTemplate') processDotTemplate: TemplateRef<void>;

  @Input() nzTitle: string | TemplateRef<void>;
  @Input() nzDescription: string | TemplateRef<void>;

  @Input()
  get nzStatus(): string {
    return this._status;
  }

  set nzStatus(status: string) {
    this._status = status;
    this.isCustomStatus = true;
  }

  isCustomStatus = false;
  private _status = 'wait';

  @Input()
  get nzIcon(): NgClassType | TemplateRef<void> {
    return this._icon;
  }

  set nzIcon(value: NgClassType | TemplateRef<void>) {
    if (!(value instanceof TemplateRef)) {
      this.isIconString = true;
      this.oldAPIIcon = typeof value === 'string' && value.indexOf('anticon') > -1;
    } else {
      this.isIconString = false;
    }
    this._icon = value;
  }

  oldAPIIcon = true;
  isIconString = true;
  private _icon: NgClassType | TemplateRef<void>;

  customProcessTemplate: TemplateRef<{ $implicit: TemplateRef<void>, status: string, index: number }>; // Set by parent.
  direction = 'horizontal';
  index = 0;
  last = false;
  outStatus = 'process';
  showProcessDot = false;

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

  constructor(private cdr: ChangeDetectorRef, renderer: Renderer2, elementRef: ElementRef) {
    renderer.addClass(elementRef.nativeElement, 'ant-steps-item');
  }

  markForCheck(): void {
    this.cdr.markForCheck();
  }
}
