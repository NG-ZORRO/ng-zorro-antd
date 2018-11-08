import { AfterContentInit, ChangeDetectionStrategy, Component, ContentChildren, Input, OnDestroy, QueryList, TemplateRef } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ClassMap } from '../core/interface/interface';
import { NzSizeDSType } from '../core/types/size';
import { toBoolean } from '../core/util/convert';

import { NzStepComponent } from './nz-step.component';

export type NzDirectionType = 'horizontal' | 'vertical';
export type NzStatusType = 'wait' | 'process' | 'finish' | 'error';

@Component({
  changeDetection    : ChangeDetectionStrategy.OnPush,
  selector           : 'nz-steps',
  preserveWhitespaces: false,
  templateUrl        : './nz-steps.component.html'
})
export class NzStepsComponent implements OnDestroy, AfterContentInit {
  @ContentChildren(NzStepComponent) steps: QueryList<NzStepComponent>;

  @Input() nzSize: NzSizeDSType = 'default';

  @Input()
  set nzStartIndex(value: number) {
    this._startIndex = value;
    this.updateChildrenSteps();
  }

  get nzStartIndex(): number {
    return this._startIndex;
  }

  private _startIndex = 0;

  @Input()
  set nzDirection(value: NzDirectionType) {
    this._direction = value;
    this.updateChildrenSteps();
  }

  get nzDirection(): NzDirectionType {
    return this._direction;
  }

  private _direction: NzDirectionType = 'horizontal';

  @Input()
  set nzProgressDot(value: boolean | TemplateRef<{ $implicit: TemplateRef<void>, status: string, index: number }>) {
    if (value instanceof TemplateRef) {
      this.showProcessDot = true;
      this.customProcessDotTemplate = value;
    } else {
      this.showProcessDot = toBoolean(value);
    }
    this.updateChildrenSteps();
  }

  @Input()
  set nzStatus(status: NzStatusType) {
    this._status = status;
    this.updateChildrenSteps();
  }

  get nzStatus(): NzStatusType {
    return this._status;
  }

  private _status: NzStatusType = 'process';

  @Input()
  set nzCurrent(current: number) {
    this._current = current;
    this.updateChildrenSteps();
  }

  get nzCurrent(): number {
    return this._current;
  }

  private _current = 0;

  @Input() nzLabelPlacement: 'horizontal' | 'vertical' = 'horizontal';

  private unsubscribe$ = new Subject<void>();

  showProcessDot = false;
  customProcessDotTemplate: TemplateRef<{ $implicit: TemplateRef<void>, status: string, index: number }>;

  get stepsClassMap(): ClassMap {
    return {
      [ `ant-steps-${this.nzDirection}` ]: true,
      [ `ant-steps-label-horizontal` ]   : this.nzDirection === 'horizontal',
      [ `ant-steps-label-vertical` ]     : (this.showProcessDot || this.nzLabelPlacement === 'vertical') && this.nzDirection === 'horizontal',
      [ `ant-steps-dot` ]                : this.showProcessDot,
      [ 'ant-steps-small' ]              : this.nzSize === 'small'
    };
  }

  updateChildrenSteps(): void {
    if (this.steps) {
      const length = this.steps.length;
      this.steps.toArray().forEach((step, index) => {
        Promise.resolve().then(() => {
          step.outStatus = this.nzStatus;
          step.showProcessDot = this.showProcessDot;
          if (this.customProcessDotTemplate) {
            step.customProcessTemplate = this.customProcessDotTemplate;
          }
          step.direction = this.nzDirection;
          step.index = index + this.nzStartIndex;
          step.currentIndex = this.nzCurrent;
          step.last = length === index + 1;
          step.detectChanges();
        });
      });
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngAfterContentInit(): void {
    this.updateChildrenSteps();
    if (this.steps) {
      this.steps.changes.pipe(takeUntil(this.unsubscribe$)).subscribe(this.updateChildrenSteps);
    }
  }
}
