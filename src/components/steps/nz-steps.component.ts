import {
  AfterViewInit,
  Component,
  ContentChildren,
  Input,
  OnDestroy,
  OnInit,
  QueryList,
  ViewEncapsulation,
} from '@angular/core';
import { toBoolean } from '../util/convert';
import { NzStepComponent } from './nz-step.component';

export type NzDirection = 'horizontal' | 'vertical';

@Component({
  selector     : 'nz-steps',
  encapsulation: ViewEncapsulation.None,
  template     : `
    <div class="ant-steps" [ngClass]="_stepsClassMap" [hidden]="!_afterViewInit">
      <ng-content></ng-content>
    </div>
  `,
  styleUrls    : [
    './style/index.less'
  ]
})
export class NzStepsComponent implements OnInit, OnDestroy, AfterViewInit {
  private _progressDot = false;
  _status = 'process';
  _current = 0;
  _stepsClassMap: object;
  _afterViewInit = false;
  _direction: NzDirection = 'horizontal';
  _stepsChanges;
  @ContentChildren(NzStepComponent) steps: QueryList<NzStepComponent>;

  @Input()
  set nzDirection(value: NzDirection) {
    this._direction = value;
    this.updateChildrenSteps();
  }

  get nzDirection(): NzDirection {
    return this._direction;
  }

  @Input() nzSize: 'default' | 'small';

  @Input()
  set nzProgressDot(value: boolean) {
    this._progressDot = toBoolean(value);
    this.updateChildrenSteps();
    this.setDirectionClass();
  }

  get nzProgressDot(): boolean {
    return this._progressDot;
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
    this._stepsClassMap = {
      [`ant-steps-${this.nzDirection}`]      : true,
      [`ant-steps-label-${this.nzDirection}`]: true,
      [`ant-steps-dot`]                      : this.nzProgressDot,
      ['ant-steps-small']                    : this.nzSize === 'small'
    };
  }

  updateChildrenSteps(): void {
    setTimeout(() => {
      this.steps.toArray().forEach((step, index, arr) => {
        step._outStatus = this.nzStatus;
        step._processDot = this.nzProgressDot as boolean;
        step._direction = this.nzDirection;
        step.index = index;
        step._totalCount = arr.length;
        step._current = this.nzCurrent;
        step._first = index === 0;
        if (arr.length === index + 1) {
          step._last = true;
        } else {
          step._last = false;
          step.updateLastWidth();
        }
        if (this.nzCurrent === step.index) {
          step._status = this.nzStatus;
        }
        step.initClassMap();
      });
    });
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

  ngAfterViewInit(): void {
    setTimeout(() => {
      this._afterViewInit = true;
    });
    this.updateChildrenSteps();
    if (this.steps) {
      this._stepsChanges = this.steps.changes.subscribe(() => {
        this.updateChildrenSteps();
      });
    }
  }
}
