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

export type NzDirection = 'horizontal' | 'vertical';

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
  private _status = 'process';
  private _current = 0;
  private _direction: NzDirection = 'horizontal';
  private _stepsChanges: Subscription;
  stepsClassMap: object;
  showProcessDot = false;
  customProcessDotTemplate: TemplateRef<{ $implicit: TemplateRef<void>, status: string, index: number }>;
  @ContentChildren(NzStepComponent) steps: QueryList<NzStepComponent>;
  @Input() nzSize: 'default' | 'small' = 'default';

  @Input()
  set nzDirection(value: NzDirection) {
    this._direction = value;
    this.updateChildrenSteps();
  }

  get nzDirection(): NzDirection {
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
    this.setDirectionClass();
  }

  @Input()
  set nzStatus(status: string) {
    this._status = status;
    this.updateChildrenSteps();
  }

  get nzStatus(): string {
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

  setDirectionClass(): void {
    this.stepsClassMap = {
      [ `ant-steps-${this.nzDirection}` ]: true,
      [ `ant-steps-label-horizontal` ]   : this.nzDirection === 'horizontal',
      [ `ant-steps-label-vertical` ]     : this.showProcessDot,
      [ `ant-steps-dot` ]                : this.showProcessDot,
      [ 'ant-steps-small' ]              : this.nzSize === 'small'
    };
  }

  updateChildrenSteps(): void {
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
        step.initClassMap();
      });
    }
  }

  ngOnInit(): void {
    this.setDirectionClass();
  }

  ngOnDestroy(): void {
    if (this._stepsChanges) {
      this._stepsChanges.unsubscribe();
      this._stepsChanges = null;
    }
  }

  ngAfterContentInit(): void {
    this.updateChildrenSteps();
    if (this.steps) {
      this._stepsChanges = this.steps.changes.subscribe(() => {
        this.updateChildrenSteps();
      });
    }
  }
}
