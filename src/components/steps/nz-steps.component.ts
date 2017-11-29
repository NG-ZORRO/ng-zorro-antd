import {
  Component,
  OnInit,
  Input,
  ViewEncapsulation,
  OnDestroy,
  ContentChildren,
  QueryList,
  AfterViewInit
} from '@angular/core';
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
  _status = 'process';
  _current = 0;
  _stepsClassMap: Object;
  _progressDot = false;
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
  set nzProgressDot(value: boolean | string) {
    if (value === '') {
      this._progressDot = true as boolean;
    } else {
      this._progressDot = value as boolean;
    }
    this.updateChildrenSteps();
    this.setDirectionClass();
  }

  get nzProgressDot() {
    return this._progressDot as boolean | string;
  }

  @Input()
  set nzStatus(status: string) {
    this._status = status;
    this.updateChildrenSteps();
  }

  get nzStatus() {
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


  setDirectionClass() {
    this._stepsClassMap = {
      [`ant-steps-${this.nzDirection}`]      : true,
      [`ant-steps-label-${this.nzDirection}`]: true,
      [`ant-steps-dot`]                      : this.nzProgressDot,
      ['ant-steps-small']                    : this.nzSize === 'small'
    };
  }


  updateChildrenSteps() {
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
      })
    });
  }

  constructor() {
  }

  ngOnInit() {
    this.setDirectionClass();
  }

  ngOnDestroy() {
    if (this._stepsChanges) {
      this._stepsChanges.unsubscribe();
      this._stepsChanges = null;
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this._afterViewInit = true;
    });
    this.updateChildrenSteps();
    if (this.steps) {
      this._stepsChanges = this.steps.changes.subscribe(() => {
        this.updateChildrenSteps();
      })
    }
  }
}
