import {
  AfterContentInit,
  Component,
  ContentChildren,
  Input,
  OnDestroy,
  OnInit,
  QueryList,
  TemplateRef
} from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { toBoolean } from '../core/util/convert';

import { NzStepComponent } from './nz-step.component';

export type NzDirectionType = 'horizontal' | 'vertical';
export type NzStatusType = 'wait' | 'process' | 'finish' | 'error';
export type NzSizeType = 'default' | 'small';

@Component({
  selector           : 'nz-steps',
  preserveWhitespaces: false,
  templateUrl        : './nz-steps.component.html'
})
export class NzStepsComponent implements OnInit, OnDestroy, AfterContentInit {
  private _status: NzStatusType = 'process';
  private _current = 0;
  private _size: NzSizeType = 'default';
  private _direction: NzDirectionType = 'horizontal';
  private _startIndex = 0;
  private unsubscribe$ = new Subject<void>();

  stepsClassMap: object;
  showProcessDot = false;
  customProcessDotTemplate: TemplateRef<{ $implicit: TemplateRef<void>, status: string, index: number }>;
  @ContentChildren(NzStepComponent) steps: QueryList<NzStepComponent>;

  @Input() set nzSize(value: NzSizeType) {
    this._size = value;
    this.updateClassMap();
  }

  get nzSize(): NzSizeType {
    return this._size;
  }

  @Input()
  set nzStartIndex(value: number) {
    this._startIndex = value;
    this.updateChildrenSteps();
  }

  get nzStartIndex(): number {
    return this._startIndex;
  }

  @Input()
  set nzDirection(value: NzDirectionType) {
    this._direction = value;
    this.updateClassMap();
    this.updateChildrenSteps();
  }

  get nzDirection(): NzDirectionType {
    return this._direction;
  }

  @Input()
  set nzProgressDot(value: boolean | TemplateRef<{ $implicit: TemplateRef<void>, status: string, index: number }>) {
    if (value instanceof TemplateRef) {
      this.showProcessDot = true;
      this.customProcessDotTemplate = value;
    } else {
      this.showProcessDot = toBoolean(value);
    }
    this.updateChildrenSteps();
    this.updateClassMap();
  }

  @Input()
  set nzStatus(status: NzStatusType) {
    this._status = status;
    this.updateChildrenSteps();
  }

  get nzStatus(): NzStatusType {
    return this._status;
  }

  @Input()
  set nzCurrent(current: number) {
    this._current = current;
    this.updateChildrenSteps();
  }

  get nzCurrent(): number {
    return this._current;
  }

  updateClassMap(): void {
    this.stepsClassMap = {
      [ `ant-steps-${this.nzDirection}` ]: true,
      [ `ant-steps-label-horizontal` ]   : this.nzDirection === 'horizontal',
      [ `ant-steps-label-vertical` ]     : this.showProcessDot && (this.nzDirection === 'horizontal'),
      [ `ant-steps-dot` ]                : this.showProcessDot,
      [ 'ant-steps-small' ]              : this.nzSize === 'small'
    };
  }

  updateChildrenSteps = () => {
    if (this.steps) {
      this.steps.toArray().forEach((step, index, arr) => {
        step.outStatus = this.nzStatus;
        step.showProcessDot = this.showProcessDot;
        if (this.customProcessDotTemplate) {
          step.customProcessTemplate = this.customProcessDotTemplate;
        }
        step.direction = this.nzDirection;
        step.index = index + this.nzStartIndex;
        step.currentIndex = this.nzCurrent;
        step.last = arr.length === index + 1;
        step.updateClassMap();
      });
    }
  }

  ngOnInit(): void {
    this.updateClassMap();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngAfterContentInit(): void {
    Promise.resolve().then(() => this.updateChildrenSteps());
    if (this.steps) {
       this.steps.changes.pipe(takeUntil(this.unsubscribe$)).subscribe(this.updateChildrenSteps);
    }
  }
}
