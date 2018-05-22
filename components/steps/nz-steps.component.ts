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
import { Subscription } from 'rxjs/Subscription';

import { toBoolean } from '../core/util/convert';

import { NzStepComponent } from './nz-step.component';

export type NzDirectionType = 'horizontal' | 'vertical';
export type NzStatusType = 'wait' | 'process' | 'finish' | 'error';
export type NzSizeType = 'default' | 'small';

@Component({
  selector           : 'nz-steps',
  preserveWhitespaces: false,
  template           : `
    <div class="ant-steps" [ngClass]="stepsClassMap">
      <ng-content></ng-content>
    </div>
  `
})
export class NzStepsComponent implements OnInit, OnDestroy, AfterContentInit {
  private _status: NzStatusType = 'process';
  private _current = 0;
  private _size: NzSizeType = 'default';
  private _direction: NzDirectionType = 'horizontal';
  private stepsSubscription: Subscription;
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
        step.index = index;
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
    if (this.stepsSubscription) {
      this.stepsSubscription.unsubscribe();
      this.stepsSubscription = null;
    }
  }

  ngAfterContentInit(): void {
    Promise.resolve().then(() => this.updateChildrenSteps());
    if (this.steps) {
      this.stepsSubscription = this.steps.changes.subscribe(this.updateChildrenSteps);
    }
  }
}
