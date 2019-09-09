/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  Renderer2,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';

import { InputBoolean, NgClassType } from 'ng-zorro-antd/core';
import { Subject } from 'rxjs';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'nz-step',
  exportAs: 'nzStep',
  preserveWhitespaces: false,
  templateUrl: './nz-step.component.html',
  host: {
    '[class.ant-steps-item-wait]': 'nzStatus === "wait"',
    '[class.ant-steps-item-process]': 'nzStatus === "process"',
    '[class.ant-steps-item-finish]': 'nzStatus === "finish"',
    '[class.ant-steps-item-error]': 'nzStatus === "error"',
    '[class.ant-steps-item-active]': 'currentIndex === index',
    '[class.ant-steps-item-disabled]': 'nzDisabled',
    '[class.ant-steps-item-custom]': '!!nzIcon',
    '[class.ant-steps-next-error]': '(outStatus === "error") && (currentIndex === index + 1)'
  }
})
export class NzStepComponent implements OnDestroy {
  @ViewChild('processDotTemplate', { static: false }) processDotTemplate: TemplateRef<void>;

  @Input() nzTitle: string | TemplateRef<void>;
  @Input() nzSubtitle: string | TemplateRef<void>;
  @Input() nzDescription: string | TemplateRef<void>;
  @Input() @InputBoolean() nzDisabled = false;

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

  customProcessTemplate: TemplateRef<{ $implicit: TemplateRef<void>; status: string; index: number }>; // Set by parent.
  direction = 'horizontal';
  index = 0;
  last = false;
  outStatus = 'process';
  showProcessDot = false;
  clickable = false;
  click$ = new Subject<number>();

  get currentIndex(): number {
    return this._currentIndex;
  }

  set currentIndex(current: number) {
    this._currentIndex = current;
    if (!this.isCustomStatus) {
      this._status = current > this.index ? 'finish' : current === this.index ? this.outStatus || '' : 'wait';
    }
  }

  private _currentIndex = 0;

  constructor(private cdr: ChangeDetectorRef, renderer: Renderer2, elementRef: ElementRef) {
    renderer.addClass(elementRef.nativeElement, 'ant-steps-item');
  }

  onClick(): void {
    if (this.clickable && this.currentIndex !== this.index && !this.nzDisabled) {
      this.click$.next(this.index);
    }
  }

  markForCheck(): void {
    this.cdr.markForCheck();
  }

  ngOnDestroy(): void {
    this.click$.complete();
  }
}
